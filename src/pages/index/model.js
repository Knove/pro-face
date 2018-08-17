import { message } from "antd";
import { getSessionUser } from "../../services/common";

export default {
  namespace: "chatbox",

  state: {
    sessionUserInfo: {}
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
      } else
        // 权限不足，强制退出
        window.location.href = "/";
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/") {
          dispatch({
            type: "getSessionUserForNormal",
            payload: {}
          });
        }
      });
    }
  }
};
