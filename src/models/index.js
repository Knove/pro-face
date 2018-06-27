import { getSessionUser } from "../services/common";
import { queryPrototypeType, queryPrototype } from "../services/index";
import { message } from "antd";
export default {
  namespace: "index",

  state: {
    sessionUserInfo: {}, // 获取到的session User 信息
    PrototypeTypeList: [], // 左侧 原型  类型 的列表
    PrototypeList: [], // 右侧 原型 的列表
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

  effects: {
    // 合并数据
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save", payload });
    },
    // 管理页面获取当前Session用户
    *getSessionUser({ payload }, { call, put, select }) {
      const backData = yield call(getSessionUser, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            sessionUserInfo: backData.data.data
          }
        });
        if (
          backData.data.data.power !== "admin" &&
          backData.data.data.power !== "ctrl"
        )
          // 权限不足，强制退出
          window.location.href = "/";
      } else
        // 权限不足，强制退出
        window.location.href = "/";
    },
    // 普通用户 获取Session 登陆信息
    *getSessionUserForNormal({ payload }, { call, put, select }) {
      const backData = yield call(getSessionUser, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            sessionUserInfo: backData.data.data
          }
        });
      } else
        // 权限不足，强制退出
        window.location.href = "/";
    },
    // 获取所有原型类型
    *queryPrototypeType({ payload }, { call, put, select }) {
      const backData = yield call(queryPrototypeType, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            PrototypeTypeList: backData.data.data
          }
        });
      } else
        message.error("获取列表失败，请刷新重试。");
    },
    // 根据原型类型id 获取原型
    *queryPrototype({ payload }, { call, put, select }) {
      const backData = yield call(queryPrototype, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            PrototypeList: backData.data.data.pageData
          }
        });
      } else
        message.error("获取列表失败，请刷新重试。");
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // 如果是在管理页面，则每次操作都要进行Session 用户的权限审查
        if (location.pathname.indexOf("/ctrl/pro") >= 0) {
          // TODO:
          dispatch({
            type: "getSessionUser",
            payload: {}
          });
        }
        if(location.pathname === "/") {
          dispatch({
            type: "getSessionUserForNormal",
            payload: {}
          });
          dispatch({
            type: "queryPrototypeType",
            payload: {}
          });
        }
      });
    }
  }
};
