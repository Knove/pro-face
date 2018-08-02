import React from "react";
import { connect } from "dva";
import moment from "moment";
import {
  Modal,
  Slider,
  Table,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Spin,
  Icon,
  Button,
  Popconfirm,
  Popover
} from "antd";
import router from "umi/router";

const Option = Select.Option;
const FormItem = Form.Item;
const confirm = Modal.confirm;

class Index extends React.Component {
  alertSaveModlue = rows => {
    this.props.dispatch({
      type: "conf/save",
      payload: {
        visible: true,
        modalDate: rows.dateMoment,
        modalConf: String(rows.confId)
      }
    });
  };
  alertViewModlue = (rows, id) => {
    let modalSeedata = {};
    rows.dataInfo &&
      rows.dataInfo.map(item => {
        if (item._id === id) {
          modalSeedata = item;
        }
      });
    this.props.dispatch({
      type: "conf/save",
      payload: {
        visibleSee: true,
        modalSeedata
      }
    });
  };
  mergeData = payload => {
    this.props.dispatch({
      type: "conf/save",
      payload
    });
  };
  submitOk = () => {
    const data = this.props.conf;
    const dispatch = this.props.dispatch;
    if (
      data.modalTitle &&
      data.modalNumber &&
      data.modalType &&
      data.modalText &&
      data.modalTime
    ) {
      if (data.modalNumber <= 3) {
        Modal.info({
          title: "人数过少",
          content: (
            <div>
              <p>会议预约不成功，人数较少请到前台或茶水间边吃边聊？</p>
            </div>
          )
        });
      } else if (
        data.modalNumber > 3 &&
        data.modalTime[1] - data.modalTime[0] >= 6 &&
        data.modalTime[1] - data.modalTime[0] <= 8
      ) {
        confirm({
          title: "注意",
          content: "会议时间有些长，请中途注意休息。确定要继续预定吗？",
          onOk() {
            dispatch({
              type: "conf/addConference",
              payload: {}
            });
          }
        });
      } else if (
        data.modalNumber > 3 &&
        data.modalTime[1] - data.modalTime[0] >= 8 &&
        data.modalTime[1] - data.modalTime[0] <= 12
      ) {
        confirm({
          title: "注意",
          content:
            "会议时间过长，请考虑分阶段会议以提高效率和会议室使用效率。确定要继续预定吗？",
          onOk() {
            dispatch({
              type: "conf/addConference",
              payload: {}
            });
          }
        });
      } else if (
        data.modalNumber > 3 &&
        data.modalTime[1] - data.modalTime[0] >= 12
      ) {
        confirm({
          title: "注意",
          content:
            "确定要占用一天的时间来开会吗？非会议的工作请单独找工作区办公，会议请注意节奏提高会议效率。确定要继续预定吗？",
          onOk() {
            dispatch({
              type: "conf/addConference",
              payload: {}
            });
          }
        });
      } else {
        this.props.dispatch({
          type: "conf/addConference",
          payload: {}
        });
      }
    } else {
      Modal.info({
        title: "信息不完整",
        content: (
          <div>
            <p>请完善输入的信息</p>
          </div>
        )
      });
    }
  };
  delete = id => {
    this.props.dispatch({
      type: "conf/deleteConference",
      payload: {
        _id: id
      }
    });
  };
  render() {
    const data = this.props.conf;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const marks = {};
    for (let i = 0; i <= 24; i += 2) {
      marks[i] = moment("207707278", "YYYYMMDDH")
        .add(i / 2, "hour")
        .format("HH:mm");
    }
    function formatter(value) {
      return moment("207707278", "YYYYMMDDH")
        .add(value / 2, "hour")
        .format("HH:mm");
    }
    let confActionType = "信息加载中";
    if (data.modalSeedata.date_day) {
      const startTime = moment(data.modalSeedata.date_day).add(
        8 + data.modalSeedata.date_start / 2,
        "hours"
      );
      const endTime = moment(data.modalSeedata.date_day).add(
        8 + data.modalSeedata.date_end / 2,
        "hours"
      );
      if (moment().diff(startTime) < 0) {
        confActionType = "未开始";
      } else if (moment().diff(startTime) >= 0 && moment().diff(endTime) < 0) {
        confActionType = "进行中";
      } else if (moment().diff(endTime) >= 0) {
        confActionType = "已结束";
      }
    }

    const columns = [
      {
        title: (
          <div
            style={{
              textAlign: "center"
            }}
          >
            日期
          </div>
        ),
        dataIndex: "date",
        width: "5%",
        render: (value, row, index) => {
          const obj = {
            children: (
              <div
                style={{
                  textAlign: "center"
                }}
              >
                {value}
              </div>
            ),
            props: {}
          };
          if (
            index === 0 ||
            index === 6 ||
            index === 12 ||
            index === 18 ||
            index === 24 ||
            index === 30 ||
            index === 36
          ) {
            obj.props.rowSpan = 6;
          }
          if (
            (index > 0 && index < 6) ||
            (index > 6 && index < 12) ||
            (index > 12 && index < 18) ||
            (index > 18 && index < 24) ||
            (index > 24 && index < 30) ||
            (index > 30 && index < 36) ||
            (index > 36 && index < 42)
          ) {
            obj.props.rowSpan = 0;
          }
          return obj;
        }
      },
      {
        title: (
          <div
            style={{
              textAlign: "center"
            }}
          >
            会议室
          </div>
        ),
        dataIndex: "conf",
        // width: "5%",
        render: (value, row, index) => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            {value}
          </div>
        )
      }
    ];
    for (let i = 0; i <= 24; i++) {
      columns.push({
        title: (
          <div
            style={{
              textAlign: "center"
            }}
          >
            {moment("207707278", "YYYYMMDDH")
              .add(i / 2, "hour")
              .format("HH:mm")}
          </div>
        ),
        dataIndex: "time" + i,
        // width: "3%",
        render: (value, row, index) => {
          if (value && value.type && value.type.indexOf("k") < 0) {
            return {
              children: (
                <Popover
                  content=<span>
                    {value.user}（{value.num}人）{value.title}
                  </span>
                  trigger="hover"
                >
                  <div
                    className={"full conf-lv" + value.type}
                    onClick={() => this.alertViewModlue(row, value._id)}
                  >
                    <span className="td-text">
                      {value.user}（{value.num}人）{value.title}
                    </span>
                  </div>
                </Popover>
              ),
              props: {
                colSpan: value.date_end - value.date_start + 1
              }
            };
          } else if (value) {
            return {
              children: <div className={"full conf-lv" + value.type} />,
              props: {
                colSpan: 0
              }
            };
          }
          return {
            children: (
              <div
                className={"full conf-lv" + value}
                onClick={() => this.alertSaveModlue(row)}
              />
            ),
            props: {
              colSpan: 1
            }
          };
        }
      });
    }
    const confArray = [
      "采桑子",
      "如梦令",
      "画唐春",
      "西江月",
      "定风波",
      "过龙门"
    ];
    const weekly = {
      Thursday: "星期四",
      Friday: "星期五",
      Saturday: "星期六",
      Sunday: "星期天",
      Monday: "星期一",
      Tuesday: "星期二",
      Wednesday: "星期三"
    };
    const tableData = [];
    for (let i = 1; i <= 42; i++) {
      // 初始化数据
      const tableDay = moment(moment(Date()).format("YYYYMMDD"), "YYYYMMDD")
        .add(4 * (i - 1), "hour")
        .format("YYYY/MM/DD");
      const daydata = {
        key: i,
        date: (
          <>
            {tableDay} <br />
            {
              weekly[
                moment()
                  .add(i / 6, "DAY")
                  .format("dddd")
              ]
            }
          </>
        ),
        confId: (i - 1) % 6,
        time: tableDay,
        clearMoment: moment(moment(Date()).format("YYYYMMDD"), "YYYYMMDD"),
        dateMoment: moment(moment(Date()).format("YYYYMMDD"), "YYYYMMDD").add(
          4 * (i - 1),
          "hour"
        ),
        conf: confArray[(i - 1) % 6],
        dataInfo: [] // 放置信息集合
      };
      // 获取日期数据
      data.confData.map(item => {
        if (
          moment(item.date_day).format("YYYY/MM/DD") === tableDay &&
          parseInt(item.conf) === (i - 1) % 6
        ) {
          daydata.dataInfo.push(item);
          daydata["time" + item.date_start] = item;
          for (let i = 1; i <= item.date_end - item.date_start; i++)
            daydata["time" + (item.date_start + i)] = item.type + "k";
        }
      });

      tableData.push(daydata);
    }
    function disabledDate(current) {
      // Can not select days before today and today
      return (
        current &&
        (current < moment().add(-1, "days") ||
          current > moment().add(6, "days"))
      );
    }
    return (
      <div className="main-div conf">
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          pagination={false}
        />
        <Modal
          title="预定会议室"
          visible={data.visible}
          width="50%"
          confirmLoading={this.props.loading}
          okText="预定"
          cancelText="取消"
          onOk={() => this.submitOk()}
          destroyOnClose
          onCancel={() =>
            this.mergeData({
              visible: false,
              modalTitle: "",
              modalNumber: 0,
              modalConf: "",
              modalType: "1",
              modalTime: [0, 24],
              modalDate: "",
              modalText: ""
            })
          }
        >
          <FormItem {...formItemLayout} label="会议主题">
            <Input
              onChange={value =>
                this.mergeData({ modalTitle: value.target.value })
              }
              value={data.modalTitle}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="会议日期">
            <DatePicker
              value={data.modalDate}
              disabledDate={disabledDate}
              onChange={value => this.mergeData({ modalDate: value })}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="会议时间段">
            <Slider
              range
              min={0}
              max={24}
              value={data.modalTime}
              tipFormatter={formatter}
              marks={marks}
              onChange={value => this.mergeData({ modalTime: value })}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="会议备注">
            <Input
              onChange={value =>
                this.mergeData({ modalText: value.target.value })
              }
              value={data.modalText}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="会议室">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择会议室"
              onChange={value => this.mergeData({ modalConf: value })}
              value={data.modalConf}
            >
              <Option value="0">采桑子（人数：6-8）</Option>
              <Option value="1">如梦令（人数：4-6）</Option>
              <Option value="2">画堂春（人数：15-18）</Option>
              <Option value="3">西江月（人数：6-8）</Option>
              <Option value="4">定风波（人数：30 + ）</Option>
              <Option value="5">过龙门（人数：30 +）</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="会议类型">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择会议类型"
              onChange={value => this.mergeData({ modalType: value })}
              value={data.modalType}
            >
              <Option value="1">
                <span style={{ color: "#a0d911" }}>小组会议</span>
              </Option>
              <Option value="2">
                <span style={{ color: "#1890ff" }}>部门级会议</span>
              </Option>
              <Option value="3">
                <span style={{ color: "#f5222d" }}>公司级会议</span>
              </Option>
              <Option value="4">
                <span style={{ color: "#391085" }}>外部会议</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="会议人数">
            <InputNumber
              min={0}
              max={200}
              value={data.modalNumber}
              onChange={value => this.mergeData({ modalNumber: value })}
            />
          </FormItem>
        </Modal>

        <Modal
          title="会议信息"
          visible={data.visibleSee}
          width="50%"
          footer={
            confActionType === "未开始" &&
            (data.modalSeedata.username === data.sessionUserInfo.username ||
              data.sessionUserInfo.power === "admin") ? (
              [
                <Button
                  onClick={() =>
                    this.mergeData({
                      visibleSee: false,
                      modalSeedata: {}
                    })
                  }
                >
                  关闭
                </Button>,
                <Popconfirm
                  title="你确定要撤销这条会议么? 撤销后无法恢复！ 注：已经开始的会议不可撤销！"
                  onConfirm={() => this.delete(data.modalSeedata._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">撤销此会议</Button>
                </Popconfirm>
              ]
            ) : (
              <Button
                onClick={() =>
                  this.mergeData({
                    visibleSee: false,
                    modalSeedata: {}
                  })
                }
              >
                关闭
              </Button>
            )
          }
          destroyOnClose
          onCancel={() =>
            this.mergeData({
              visibleSee: false,
              modalSeedata: {}
            })
          }
        >
          <FormItem {...formItemLayout} label="会议主题">
            {data.modalSeedata.title}
          </FormItem>
          <FormItem {...formItemLayout} label="发起人">
            {data.modalSeedata.user}
          </FormItem>
          <FormItem {...formItemLayout} label="会议日期">
            {moment(data.modalSeedata.date_day).format("YYYY/MM/DD")}
          </FormItem>
          <FormItem {...formItemLayout} label="会议状态">
            {confActionType}
          </FormItem>
          <FormItem {...formItemLayout} label="会议时间段">
            <Slider
              range
              min={0}
              max={24}
              value={[data.modalSeedata.date_start, data.modalSeedata.date_end]}
              tipFormatter={formatter}
              marks={marks}
              disabled
            />
          </FormItem>
          <FormItem {...formItemLayout} label="会议备注">
            {data.modalSeedata.text}
          </FormItem>
          <FormItem {...formItemLayout} label="会议人数">
            {data.modalSeedata.num}
          </FormItem>
          <FormItem {...formItemLayout} label="会议室">
            <Select
              style={{ width: "100%" }}
              value={data.modalSeedata.conf}
              disabled
            >
              <Option value="0">采桑子</Option>
              <Option value="1">如梦令</Option>
              <Option value="2">画堂春</Option>
              <Option value="3">西江月</Option>
              <Option value="4">定风波</Option>
              <Option value="5">过龙门</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="会议类型">
            <Select
              style={{ width: "100%" }}
              disabled
              value={data.modalSeedata.type}
            >
              <Option value="1">小组级会议</Option>
              <Option value="2">部门级会议</Option>
              <Option value="3">公司级会议</Option>
              <Option value="4">外部会议</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="会议人数">
            <InputNumber
              min={0}
              max={200}
              disabled
              value={data.modalSeedata.num}
            />
          </FormItem>
        </Modal>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const conf = state.conf;
  return { conf, loading: state.loading.models.conf };
}
export default connect(mapStateToProps)(Index);
