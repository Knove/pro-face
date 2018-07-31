import { getSessionUser } from "../services/common";
import { message } from "antd";
export default {
  namespace: "conf",

  state: {
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.indexOf("/conf") >= 0) {
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
