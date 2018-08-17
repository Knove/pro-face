import React from "react";
import { connect } from "dva";
import { Card, Icon, Breadcrumb } from "antd";
import router from "umi/router";
import moment from "moment";
import QueueAnim from "rc-queue-anim";

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
          : now >= 14 && now < 18 ? "下午好" : "晚上好";
    return (
      <div style={{ minHeight: h }} className="main-div">
        <Card className="chatBox-title">
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
        {/* <Card title="Card title">

        </Card> */}
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
