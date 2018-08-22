import { message } from "antd";
import { getSessionUser } from "../services/common";
import { getDiscuss } from "../pages/index/service";
export default {
  namespace: "chatbox",

  state: {
    sessionUserInfo: {},
    disscussList: []
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
    // 获取全部帖子
    *getDiscuss({ payload }, { call, put, select }) {
      const backData = yield call(getDiscuss, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            disscussList: backData.data.data
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
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
        if (!backData.data.data.checkUser || !backData.data.data.alterPass)
          // 权限不足，强制退出
          window.location.href = "/";
      }
      // 权限不足，强制退出
      else window.location.href = "/";
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/") {
          // INIT
          dispatch({
            type: "save",
            payload: {
              disscussList: []
            }
          });
          dispatch({
            type: "getSessionUserForNormal",
            payload: {}
          });
          dispatch({
            type: "getDiscuss",
            payload: {}
          });
        }
      });
    }
  }
};
