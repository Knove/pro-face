import { message } from "antd";
import { getSessionUser } from "../services/common";
import {
  addDiscuss,
  getDiscussById,
  addDiscussChatBox,
  getDiscussChatBoxByDiscussId,
  discussClickAdd
} from "../pages/index/service";

export default {
  namespace: "discuss",

  state: {
    sessionUserInfo: {}, // 储存的当前用户信息
    htmlData: "", // 富文本数据
    newTitle: "", // 发布时候的标题
    newType: "", // 发布时候的类型
    duscussInfo: {}, // 该帖子的详细信息
    duscussChatBoxInfo: [], // 该帖子的留言板List
    chatBoxText: "" // 留言板内容存储
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
    // 增加帖子
    *update({ payload }, { call, put, select }) {
      const { htmlData, newTitle, newType } = yield select(store => store.cb);
      payload.htmlData = htmlData;
      payload.newTitle = newTitle;
      payload.newType = newType;
      const backData = yield call(addDiscuss, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("发布成功！");
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 留言
    *apply({ payload }, { call, put, select }) {
      const { duscussInfo, chatBoxText } = yield select(store => store.cb);
      payload.discussId = duscussInfo._id;
      payload.text = chatBoxText;
      const backData = yield call(addDiscussChatBox, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("留言成功！");
        yield put({
          type: "getDiscussChatBoxByDiscussId",
          payload: {
            id: duscussInfo._id
          }
        });
        yield put({
          type: "save",
          payload: {
            chatBoxText: ""
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取帖子详细信息
    *getDiscussInfo({ payload }, { call, put, select }) {
      const backData = yield call(getDiscussById, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            duscussInfo: backData.data.data
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取该帖子的留言信息
    *getDiscussChatBoxByDiscussId({ payload }, { call, put, select }) {
      const backData = yield call(getDiscussChatBoxByDiscussId, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            duscussChatBoxInfo: backData.data.data
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 点击量 +  1
    *discussClickAdd({ payload }, { call }) {
      yield call(discussClickAdd, payload);
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
        if (location.pathname.indexOf("/cb/") >= 0) {
          // INIT
          dispatch({
            type: "save",
            payload: {
              duscussInfo: {}, // 该帖子的详细信息
              duscussChatBoxInfo: [], // 该帖子的留言板List
              chatBoxText: "" // 留言板内容存储
            }
          });
          // 点击量 + 1
          dispatch({
            type: "discussClickAdd",
            payload: {
              id: location.pathname.split("/")[2]
            }
          });
          dispatch({
            type: "getSessionUserForNormal",
            payload: {}
          });
          dispatch({
            type: "getDiscussInfo",
            payload: {
              id: location.pathname.split("/")[2]
            }
          });
          dispatch({
            type: "getDiscussChatBoxByDiscussId",
            payload: {
              id: location.pathname.split("/")[2]
            }
          });
        }
      });
    }
  }
};
