import { getSessionUser } from "../services/common";
import { message } from "antd";
export default {
  namespace: "index",

  state: {
    sessionUserInfo: {} // 获取到的session User 信息
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
    // 获取当前Session用户
    *getSessionUser({ payload }, { call, put, select }) {
      const backData = yield call(getSessionUser, payload);
      if (
        backData.data &&
        backData.data.status === "200"
      ) {
        yield put({
          type: "save",
          payload: {
            sessionUserInfo: backData.data.data
          }
        });
        if (backData.data.data.power !== "admin" && backData.data.data.power !== "ctrl") {
          // 权限不足，强制退出
          window.location.href = "/";
        }
      } else {
          // 权限不足，强制退出
          window.location.href = "/";
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.indexOf("/ctrl/pro") >= 0) {
          // TODO:
          dispatch({
            type: "getSessionUser",
            payload: {}
          });
        }
      });
    }
  }
};
