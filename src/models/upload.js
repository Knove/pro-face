import { getSessionUser, uploadFile } from "../services/common";
import { message } from "antd";
export default {
  namespace: "upload",

  state: {
    fileList: [] // 获取到的session User 信息
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
    // 上传文件
    *uploadFile({ payload }, { call, put, select }) {
      const backData = yield call(uploadFile, payload);
      console.log(backData);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      });
    }
  }
};
