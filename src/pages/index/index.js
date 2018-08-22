import React from "react";
import { connect } from "dva";
import { Card, Row, Col } from "antd";
import router from "umi/router";
import moment from "moment";
import QueueAnim from "rc-queue-anim";
import { ChatBox, Updating, FuncAction } from "./components";

class Chatbox extends React.Component {
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    const data = this.props.chatbox;
    const now = moment().format("HH");
    const hello =
      now < 11
        ? "早上好"
        : now >= 11 && now < 14
          ? "中午好"
          : now >= 14 && now < 18
            ? "下午好"
            : "晚上好";
    return (
      <div style={{ minHeight: h }} className="main-div">
        <Card className="chatBox-title" style={{ marginBottom: 15 }}>
          <QueueAnim>
            <img
              className="portrait"
              src={require("../../assets/default.png")}
              key="c"
            />
            <div className="title-text" key="a">
              {hello}，{data.sessionUserInfo.realyName || ""}
            </div>
            <div className="context-div" key="b">
              <span className="context-text">辰森世纪</span>
            </div>
          </QueueAnim>
        </Card>
        <Row style={{ margin: "0 10%" }} gutter={16}>
          <Col span={16}>
            <ChatBox
              data={data}
              action={this.props}
              loading={this.props.loading}
            />
          </Col>
          <Col span={8}>
            <FuncAction
              data={data}
              action={this.props}
              loading={this.props.loading}
            />
            {/* <Updating
              data={data}
              action={this.props}
              loading={this.props.loading}
            /> */}
          </Col>
        </Row>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const chatbox = state.chatbox;
  return { chatbox, loading: state.loading.models.chatbox };
}
export default connect(mapStateToProps)(Chatbox);
