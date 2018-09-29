import {
  addConference,
  getConference,
  deleteConference
} from "../services/conf";
import moment from "moment";
import { getSessionUser } from "../services/common";
import { message, Modal, Tag } from "antd";
export default {
  namespace: "conf",

  state: {
    visible: false,
    visibleSee: false, // 查看模态框的内容
    manualVisable: false, // 手册的显示与否 (在laylouts控制)
    modalDate: "", // 预定框的日期内容
    modalTime: [0, 24], // 预定框的开始结束时间
    modalTitle: "", // 预定框的会议主题
    modalNumber: 0, // 预定框的人数
    modalType: "1", // 预定框的会议类型
    modalConf: "", // 预定的哪个会议室
    modalText: "", // 会议室备注
    confData: [], // 后台反的会议室信息
    modalSeedata: {}, // 查看 会议信息的模态框数据
    sessionUserInfo: {} // 当前登陆用户
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
    // 增加一条预约信息
    *addConference({ payload }, { call, put, select }) {
      const {
        modalDate,
        modalTime,
        modalTitle,
        modalNumber,
        modalType,
        modalConf,
        modalText
      } = yield select(state => state.conf);
      const modalTimeClear =  moment(moment(modalDate).format("YYYYMMDD"), "YYYYMMDD");
      const sendData = {
        title: modalTitle,
        num: modalNumber,
        type: modalType,
        date_start: modalTime[0],
        date_end: modalTime[1],
        date_day: modalTimeClear,
        conf: modalConf,
        text: modalText
      };
      // 要提前十分钟预定！
      if (
        moment().diff(moment(modalTimeClear).add(8 + modalTime[0] / 2, "hours")) >
        -600000
      ) {
        Modal.info({
          title: "时间段提醒",
          content: (
            <div>
              <p>请提前十分钟预约会议室！</p>
            </div>
          )
        });
      } else {
        const backData = yield call(addConference, sendData);
        if (backData.data && backData.data.status === "200") {
          if (backData.data.data.flag === "2") {
            Modal.info({
              title: "冲突提醒",
              content: (
                <div>
                  <p>您选择的时间段和另外一场会议有冲突！冲突会议信息：</p>
                  <p>
                    会议: <Tag color="blue">{backData.data.data.title}</Tag>
                  </p>
                  <p>
                    发起者: {backData.data.data.user} |{" "}
                    {backData.data.data.username}
                  </p>
                  <p>您可以去联系他进行调整！</p>
                  <p>（发起会议者可以撤销会议）</p>
                </div>
              )
            });
          } else {
            message.success("添加成功！");
            yield put({
              type: "save",
              payload: {
                visible: false,
                modalDate: "", // 预定框的日期内容
                modalTime: [0, 24], // 预定框的开始结束时间
                modalTitle: "", // 预定框的会议主题
                modalNumber: 0, // 预定框的人数
                modalType: "1", // 预定框的会议类型
                modalConf: "", // 预定的哪个会议室
                modalText: ""
              }
            });
            yield put({
              type: "getConference",
              payload: {}
            });
          }
        } else {
          message.warning("发生错误，错误信息：" + backData.data.msg);
        }
      }
    },
    // 撤销会议！
    *deleteConference({ payload }, { call, put, select }) {
      const backData = yield call(deleteConference, payload);
      if (backData.data && backData.data.status === "200") {
        message.success("成功撤销此条会议！");
        yield put({
          type: "save",
          payload: {
            visibleSee: false,
            modalSeedata: {}
          }
        });
        yield put({
          type: "getConference",
          payload: {}
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 查看预约信息！
    *getConference({ payload }, { call, put, select }) {
      const backData = yield call(getConference, payload);
      if (
        backData.data &&
        backData.data.status === "200" &&
        backData.data.data
      ) {
        yield put({
          type: "save",
          payload: {
            confData: backData.data.data
          }
        });
      } else {
        message.warning("发生错误，错误信息：" + backData.data.msg);
      }
    },
    // 获取当前Session用户
    *getSessionUserOfAlterPass({ payload }, { call, put, select }) {
      const backData = yield call(getSessionUser, payload);
      if (backData.data && backData.data.status === "200") {
        // 获取成功到 外域登录用户信息
        yield put({
          type: "save",
          payload: {
            sessionUserInfo: backData.data.data
          }
        });
        if (!backData.data.data.checkUser || !backData.data.data.alterPass)
          // 权限不足，强制退出
          window.location.href = "/";
      } else {
        // 非法莫名直接访问，将直接跳到首页
        window.location.href = "/";
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/conf") {
          // TODO:
          dispatch({
            type: "getConference",
            payload: {}
          });
          dispatch({
            type: "getSessionUserOfAlterPass",
            payload: {}
          });
        }
      });
    }
  }
};
