import { addUser } from "../services/user";
import { message } from "antd";
export default {
  namespace: "user",

  state: {
    prototypeTypeName: ""
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
    // 增加一位用户
    *addUser({ payload }, { call, put, select }) {
      const backData = yield call(addUser, payload);
      // // console.log(backData);
      if (backData.data && backData.data.status === "200") {
        message.success("添加成功！");
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  }
};
