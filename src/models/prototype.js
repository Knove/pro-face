import { addPrototypeType } from "../services/prototype";
import { message } from "antd";
export default {
  namespace: "prototype",

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
    // 增加一条原型类型
    *addPrototypeTypeName({ payload }, { call, put, select }) {
      const { prototypeTypeName } = yield select(state => state.prototype);
      const sendData = {
        prototypeTypeName: prototypeTypeName
      };
      const backData = yield call(addPrototypeType, sendData);
      console.log(backData);
      if (backData.data && backData.data.status === "200") {
        message.success("添加成功！");
        yield put({
          type: "save",
          payload: {
            prototypeTypeName: ""
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  }
};
