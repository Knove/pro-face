import React from "react";
import { Drawer, Table, Alert } from "antd";
import router from "umi/router";
import moment from "moment";

class ListRight extends React.Component {
  render() {
    const __ = this.props.props.conf;
    const columns = [
      {
        title: "会议室",
        dataIndex: "conf",
        key: "conf"
      },
      {
        title: "最大容纳人数",
        dataIndex: "number",
        key: "number"
      },
      {
        title: "投影设备",
        dataIndex: "projection",
        key: "projection"
      },
      {
        title: "支持电脑接口",
        dataIndex: "IO",
        key: "IO"
      },
      {
        title: "备注",
        dataIndex: "text",
        key: "text"
      }
    ];
    const data = [
      {
        conf: "采桑子",
        number: "6-8",
        projection: "电视",
        IO: "HDMI",
        text: ""
      },
      {
        conf: "如梦令",
        number: "4-6",
        projection: "电视",
        IO: "HDMI",
        text: ""
      },
      {
        conf: "画堂春",
        number: "15-18",
        projection: "投影",
        IO: "VGI",
        text: ""
      },
      {
        conf: "西江月",
        number: "15-18",
        projection: "无",
        IO: "无",
        text: "可搭配投影仪使用"
      },
      {
        conf: "定风波",
        number: "30 + ",
        projection: "投影",
        IO: "VGI",
        text: ""
      },
      {
        conf: "过龙门",
        number: "30 + ",
        projection: "投影",
        IO: "VGI",
        text: ""
      }
    ];
    return (
      <div>
        <Drawer
          title="会议室使用手册"
          placement="right"
          width="50%"
          closable={false}
          onClose={() => this.props.mergeData({ manualVisable: false })}
          visible={__.manualVisable}
        >
          <Table columns={columns} dataSource={data} pagination={false} />
          <Alert
            message="小提示"
            description={
              <>
                <p>
                  1、至少提前十分钟预定，如果变更或者取消，请自行操作。已经开始和已经结束的不可取消。
                </p>
                <p>
                  2、如果遇到时间以及会议室冲突，请去联系对方，根据商议结果进行系统上会议预约信息更改。
                </p>
                <p>
                  3、如果需要翻页笔、电话会议专用音响、话筒等工具，请在备注中注明并联系相关人员。
                </p>
                <p>
                  4、会议优先等级 <br />
                  <span style={{ fontSize: 17 }}>
                    <span style={{ color: "#391085" }}>外部会议</span> {">"}{" "}
                    <span style={{ color: "#f5222d" }}>公司级会议</span>
                    {">"} <span style={{ color: "#a0d911" }}>部门级会议</span>{" "}
                    {">"} <span style={{ color: "#1890ff" }}>小组会议</span>
                  </span>
                </p>
                <p>
                  5、会议预约人数必须4人及以上。同一人在同一时间不能预约多个会议室。
                </p>
                <p>
                  6、预约的时间范围是该时间段的往后半小时。例如要预约个下午4点到5点的会议，则应该选择时间段为16:00和16:30。而不是16:00和17:00。
                </p>
              </>
            }
            type="info"
          />
        </Drawer>
      </div>
    );
  }
}
export default ListRight;
