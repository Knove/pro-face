import React from "react";
import { Card, Badge, Pagination, Button, Icon, Popconfirm } from "antd";
import router from "umi/router";
import moment from "moment";
import QueueAnim from "rc-queue-anim";

class ChatBox extends React.Component {
  handleClick = item => {
    this.props.action.dispatch({
      type: "index/queryPrototype",
      payload: {
        typeId: item.key,
        webPage: {
          nowPage: 1,
          pageSize: 10000
        }
      }
    });
    this.props.action.dispatch({
      type: "index/queryDoc",
      payload: {
        pro_id: item.key
      }
    });
  };
  render() {
    const data = this.props.data;
    const gridStyle = {
      width: "100%"
    };
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 218;
    const typeOption = {
      1: "工作交流",
      2: "原型问题",
      3: "消息推送",
      4: "其他"
    };
    const gridLineList =
      data.disscussList &&
      data.disscussList.map(item => (
        <div key={Math.random()}>
          <Card.Grid style={gridStyle}>
            <img
              className="portrait-small"
              src={require("../../../assets/default.png")}
            />
            <div className="say-title">
              <a onClick={() => router.push("/cb/" + item._id)}>{item.title}</a>
            </div>
            <div className="say-info">
              <a>{item.realy_name}</a> / {typeOption[item.type]} /{" "}
              {moment(item.show_date).format("YYYY-MM-DD")}
            </div>
            <Badge
              count={item.talk_number}
              className="right-badge"
              style={{
                backgroundColor: "#fff",
                color: "#999",
                boxShadow: "0 0 0 1px #d9d9d9 inset"
              }}
            />
          </Card.Grid>
        </div>
      ));
    return (
      <div style={{ height: h }} className="chatbox-main">
        <Card
          title="工作交流"
          className="chatbox-div"
          bodyStyle={{ padding: "0 !important", height: "90%" }}
          bordered={false}
        >
          <div className="context">
            <QueueAnim>{gridLineList}</QueueAnim>
          </div>
        </Card>
      </div>
    );
  }
}
export default ChatBox;
