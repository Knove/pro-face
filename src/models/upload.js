import { queryPrototypeType, uploadFile } from "../services/common";
import { message } from "antd";
export default {
  namespace: "upload",

  state: {
    fileList: [], // 获取到的session User 信息
    uploadType: "", // 上传类型！
    prototypeTypeList: [] // 获取到的所有原型 类型 List
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
      message.info("上传请求发起成功！正在跳转至主页……");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/ctrl/common/upload") {
          // 请求原型类型
          dispatch({
            type: "queryPrototypeType",
            payload: {}
          });
        }
      });
    }
  }
};
