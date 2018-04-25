import {
  getRoles,
  addRole,
  deleteRole,
  getRolesProType,
  getProType,
  addProTypeForRole,
  getUserRole
} from "../services/roles";
import router from "umi/router";
import { message } from "antd";

export default {
  namespace: "roles",

  state: {
    detailRoleId: "", // detail页的当前角色Id
    detailRoleName: "", // detail页的当前角色Name
    roleList: [], // 获取到的session User 信息
    roleProTypeList: [], // 当前角色 能访问的原型List
    addModalVisible: false, //  新增模态框 的 显示控制
    detailAddModalVisible: false, // detail页的增加原型模态框 的显示控制
    proTypeList: [], // 所有原型 组 的集合
    userRoleList: [], // 角色对应的用户 集合
    addUserValue: [], // 增加用户时候搜索框的值
    userData: [{
      value: "123",
      text: "!23"
    }], // 获取到的user 信息
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

  effects: {
    // 获取当前所有角色List
    *getRoles({ payload }, { call, put, select }) {
      const backData = yield call(getRoles, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            roleList: backData.data.data
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取当前角色的所有可见原型
    *getRolesProType({ payload }, { call, put, select }) {
      const backData = yield call(getRolesProType, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            roleProTypeList: backData.data.data
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取适用当前角色的所有用户
    *getUserRole({ payload }, { call, put, select }) {
      const { detailRoleId } = yield select(store => store.roles);
      if (!detailRoleId) {
        router.push("/ctrl/pro/roles");
        yield put({
          type: "getRoles",
          payload: {}
        });
        yield false;
      }
      payload.role_id = detailRoleId;
      const backData = yield call(getUserRole, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            userRoleList: backData.data.data
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取所有原型类型
    *getProType({ payload }, { call, put, select }) {
      const { detailRoleId } = yield select(store => store.roles);
      if (!detailRoleId) {
        router.push("/ctrl/pro/roles");
        yield put({
          type: "getRoles",
          payload: {}
        });
        yield false;
      }
      const backData = yield call(getProType, payload);
      if (backData.data && backData.data.status === "200") {
        yield put({
          type: "save",
          payload: {
            proTypeList: backData.data.data
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 增加角色
    *addRole({ payload }, { call, put }) {
      const backData = yield call(addRole, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("添加角色成功!");
        yield put({
          type: "getRoles",
          payload: {}
        });
        yield put({
          type: "save",
          payload: {
            addModalVisible: false
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 增加 角色对应的 原型组
    *addProTypeForRole({ payload }, { call, put, select }) {
      const { detailRoleId } = yield select(state => state.roles);
      payload.role_id = detailRoleId;
      const backData = yield call(addProTypeForRole, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("添加角色成功!");
        yield put({
          type: "getRolesProType",
          payload: {
            role_id: detailRoleId
          }
        });
      } else {
        message.error("发生错误，错误信息：" + backData.data.msg);
      }
    },
    *deleteRole({ payload }, { call, put }) {
      const backData = yield call(deleteRole, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("删除角色成功!");
        yield put({
          type: "getRoles",
          payload: {}
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
          dispatch({
            type: "getRoles",
            payload: {}
          });
        }
        if (location.pathname === "/ctrl/pro/roles-detail") {
          dispatch({
            type: "getProType",
            payload: {}
          });
          dispatch({
            type: "getUserRole",
            payload: {}
          });
        }
      });
    }
  }
};
