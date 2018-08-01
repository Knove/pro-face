import { getSessionUser } from "../services/common";
import { addConference } from "../services/conf";
import { message } from "antd";
export default {
  namespace: "conf",

  state: {
    visible: false,
    modalDate: "", // 预定框的日期内容
    modalTime: [0, 24], // 预定框的开始结束时间
    modalTitle: "", // 预定框的会议主题
    modalNumber: 0, // 预定框的人数
    modalType: "1", // 预定框的会议类型
    modalConf: "" // 预定的哪个会议室
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
        modalConf
      } = yield select(state => state.conf);
      const sendData = {
        title: modalTitle,
        num: modalNumber,
        type: modalType,
        date_start: modalTime[0],
        date_end: modalTime[1],
      };
      const backData = yield call(addConference, sendData);
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
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.indexOf("/conf") >= 0) {
          // TODO:
          dispatch({
            type: "getSessionUser",
            payload: {}
          });
        }
      });
    }
  }
};
