import {
  getSessionUser,
  sendCaptcha,
  checkLogin,
  checkLoginOfAlterPass,
  sendCaptchaOfAlterPass,
  checkUser
} from "../services/common";
import { message } from "antd";
import router from "umi/router";

export default {
  namespace: "login",

  state: {
    sessionUserInfo: {}, // 获取到的session User 信息
    username: "", // 登录框中的username
    password: "" // 登录框中的password
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
    // 登陆操作
    *login({ payload }, { call, put, select }) {
      const { username, password } = yield select(state => state.login);
      const sendData = {
        username,
        password
      };
      const backData = yield call(checkUser, sendData);
      console.log(backData);
      if (backData.data) {
        console.log(router.location.query.from);
        if (backData.data.status === "200" && backData.data.data) {
          message.success("登陆成功！正在跳转……");
          yield put({
            type: "save",
            payload: {
              username: "",
              password: ""
            }
          });
          setTimeout(() => {
            if (router.location.query.from)
            window.location.href = router.location.query.from;
            else
            window.location.href = "/";
          }, 1000);
        } else if (backData.data.status === "200" && !backData.data.data) {
          message.warning("用户名或密码错误！");
        } else if (backData.data.status === "201") {
          // 201 错误码，不在合法区域登陆
          window.location.href = "/ctrl?path=checkLogin";
        } else if (backData.data.status === "202") {
          // 202 错误码，密码格式有问题
          window.location.href = "/ctrl?path=alterPass";
        } else {
          message.warning("未知错误，请联系Knove 17862973490");
        }
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
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
    // 获取当前Session用户
    *getSessionUserOfAlterPass({ payload }, { call, put, select }) {
      const backData = yield call(getSessionUser, payload);
      if (
        backData.data &&
        backData.data.status === "200" &&
        backData.data.data.alterPass === false
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
        message.error("发送失败！请联系管理员Knove, 17862973490", 5);
      }
    },
    *sendCaptchaOfAlterPass({ payload }, { call, put, select }) {
      const { sessionUserInfo } = yield select(state => state.login);
      payload.username = sessionUserInfo.username;
      const backData = yield call(sendCaptchaOfAlterPass, payload);
      if (backData.data && backData.data.status === "200") {
        // 如果成功发送！
        message.success("成功发送验证码，请去您的邮箱查收！");
      } else {
        message.error("发送失败！请联系管理员Knove, 17862973490", 5);
      }
    },
    // 验证操作！
    *checkLogin({ payload }, { call, put, select }) {
      const backData = yield call(checkLogin, payload);
      if (backData.data && backData.data.status === "200") {
        // 如果成功登录
        message.success("验证成功！正在跳转登录页……");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        message.error("验证失败！验证码错误！");
      }
    },
    *checkLoginOfAlterPass({ payload }, { call, put, select }) {
      const { sessionUserInfo } = yield select(state => state.login);
      payload.userName = sessionUserInfo.username;
      const backData = yield call(checkLoginOfAlterPass, payload);
      if (backData.data && backData.data.status === "200") {
        // 如果成功登录
        message.success("修改密码成功！正在跳转登录页……");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        message.error("验证失败！验证码验证失败或者密码出现问题！");
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/login") {
          // 初始化
          dispatch({
            type: "save",
            payload: {
              username: "",
              password: ""
            }
          });
        }
        if (location.pathname === "/ctrl/alterPass") {
          // 修改密码
          dispatch({
            type: "getSessionUserOfAlterPass",
            payload: {}
          });
        }
        if (location.pathname === "/ctrl/checkLogin") {
          //
          dispatch({
            type: "getSessionUser",
            payload: {}
          });
        }
      });
    }
  }
};
