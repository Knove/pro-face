import { getRoles } from "../services/roles";
import { message } from "antd";
export default {
  namespace: "roles",

  state: {
    roleList: [] // 获取到的session User 信息
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
    // 获取当前所有角色List
    *getSessionUser({ payload }, { call, put, select }) {
      const backData = yield call(getRoles, payload);
      if (backData.data && backData.data.status === "200") {
        // 获取成功到 外域登录用户信息
        yield put({
          type: "save",
          payload: {
            roleList: backData.data.data
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/ctrl/pro/roles") {
          // TODO:
        }
      });
    }
  }
};
