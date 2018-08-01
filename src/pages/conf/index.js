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
  InputNumber
} from "antd";
import router from "umi/router";

const Option = Select.Option;
const FormItem = Form.Item;

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
  mergeData = payload => {
    this.props.dispatch({
      type: "conf/save",
      payload
    });
  };
  submitOk = () => {
    this.props.dispatch({
      type: "conf/addConference",
      payload : {}
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
    const back_data = [
      {
        date_start: 4,
        date_end: 7,
        date_day: Date(),
        type: "1",
        conf: "2",
        title:
          "济南19届新同学入职济南19届新同学入职济南19届新同学入职济南19届新同学入职",
        num: 44,
        user: "孙佳勇",
        user_id: "123123213",
        id: "!23124asdjasdhjaksdasd"
      },
      {
        date_start: 8,
        date_end: 12,
        date_day: Date(),
        type: "3",
        conf: "1",
        title: "计划会议A",
        num: 11,
        user: "王勇",
        user_id: "123123213",
        id: "A53124sdsdhjaksdasd"
      },
      {
        date_start: 1,
        date_end: 12,
        date_day: Date(),
        type: "4",
        conf: "5",
        title: "新零售对餐饮行业的变革",
        num: 153,
        user: "王翠燕",
        user_id: "123123213",
        id: "A53124sdsdhjaksdasd"
      }
    ];
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
        width: "5%",
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
        title: moment("207707278", "YYYYMMDDH")
          .add(i / 2, "hour")
          .format("HH:mm"),
        dataIndex: "time" + i,
        width: "3%",
        render: (value, row, index) => {
          if (value && value.type && value.type.indexOf("k") < 0) {
            return {
              children: (
                <div className={"full conf-lv" + value.type}>
                  <span className="td-text">
                    {value.user}（{value.num}人）{value.title}
                  </span>
                </div>
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
            {moment()
              .add(i / 6, "DAY")
              .format("dddd")}
          </>
        ),
        confId: (i - 1) % 6,
        time: tableDay,
        dateMoment: moment(moment(Date()).format("YYYYMMDD"), "YYYYMMDD").add(
          4 * (i - 1),
          "hour"
        ),
        conf: confArray[(i - 1) % 6]
      };
      // 获取日期数据
      back_data.map(item => {
        if (
          moment(item.date_day).format("YYYY/MM/DD") === tableDay &&
          parseInt(item.conf) === (i - 1) % 6
        ) {
          daydata["time" + item.date_start] = item;
          for (let i = 1; i <= item.date_end - item.date_start; i++)
            daydata["time" + (item.date_start + i)] = item.type + "k";
        }
      });

      tableData.push(daydata);
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
              modalDate: ""
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
            <DatePicker value={data.modalDate} />
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
          <FormItem {...formItemLayout} label="会议室">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择会议室"
              onChange={value => this.mergeData({ modalConf: value })}
              value={data.modalConf}
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
              placeholder="请选择会议类型"
              onChange={value => this.mergeData({ modalType: value })}
              value={data.modalType}
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
              value={data.modalNumber}
              onChange={value => this.mergeData({ modalNumber: value })}
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
