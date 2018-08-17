import { queryPrototypeType, uploadFile, uploadFileToType } from "../services/common";
import { queryPrototype } from "../services/index";
import { message } from "antd";
export default {
  namespace: "upload",

  state: {
    fileList: [], // 上传的文件List
    uploadType: "", // 上传类型！
    connectPro: "", // 关联原型
    PrototypeTypeList: [], // 获取到的所有原型 类型 List
    fileText: "", // 文件简介
    PrototypeList: [], // 根据原型类型id 获取到的原型List
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
        window.location.href = "/prod";
      }, 1000);
    },
    // 上传文档！
    *uploadFileToType({ payload }, { call, put, select }) {
      const backData = yield call(uploadFileToType, payload);
      console.log(backData);
      message.info("上传请求发起成功！正在跳转至主页……");
      setTimeout(() => {
        window.location.href = "/prod";
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
      } else message.error("获取列表失败，请刷新重试。");
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
          dispatch({
            type: "save",
            payload: {
              uploadType: "",
              fileList: [],
              fileText: "",
            }
          });
        }
        if (location.pathname === "/ctrl/pro/add-type-file") {
          // 请求原型类型
          dispatch({
            type: "queryPrototypeType",
            payload: {}
          });
          dispatch({
            type: "save",
            payload: {
              uploadType: "",
              fileList: [],
              fileText: "",
            }
          });
        }
      });
    }
  }
};
