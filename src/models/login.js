import { getSessionUser, sendCaptcha, checkLogin } from "../services/common";
import { message } from "antd";
export default {
  namespace: "login",

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
        backData.data.status === "200" &&
        backData.data.data.checkUser === false
      ) {
        // 获取成功到 外域登录用户信息
        yield put({
          type: "save",
          payload: {
            sessionUserInfo: backData.data.data
          }
        });
      } else {
        // 非法莫名直接访问，将直接跳到首页
        window.location.href = "/";
      }
    },
    // 发送验证码操作!
    *sendCaptcha({ payload }, { call, put, select }) {
      const backData = yield call(sendCaptcha, payload);
      if (backData.data && backData.data.status === "200") {
        // 如果成功发送！
        message.success("成功发送验证码，请去您的邮箱查收！");
      } else {
        message.error("发送失败！请联系管理员Knove, 17862973490",5);
      }
    },
    // 验证操作！
    *checkLogin({ payload }, { call, put, select }) {
      const backData = yield call(checkLogin, payload);
      if (backData.data && backData.data.status === "200") {
        // 如果成功登录
        message.success("验证成功！正在跳转登录");
        setTimeout(()=>{
          window.location.href = "/";
        },1000)
      } else {
        message.error("验证失败！验证码错误！");
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/ctrl/checkLogin") {
          // DOTO
          dispatch({
            type: "getSessionUser",
            payload: {}
          });
        }
      });
    }
  }
};
