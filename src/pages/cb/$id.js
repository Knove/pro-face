import React from "react";
import { connect } from "dva";
import { Card, Row, Col, Divider, Tag, List, Input, Button, message } from "antd";
import router from "umi/router";
import moment from "moment";
import QueueAnim from "rc-queue-anim";
import { FuncAction } from "../index/components";
import { apply } from "redux-saga/effects";

const { TextArea } = Input;

class Cb extends React.Component {
  apply = () => {
    if (this.props.discuss.chatBoxText.length < 2) {
      message.warn("多说点再回复吧~");
      return null;
    }
    this.props.dispatch({
      type: "discuss/apply",
      payload: {}
    });
  };
  mergeData = payload => {
    this.props.dispatch({
      type: "discuss/save",
      payload
    });
  };
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    const data = this.props.discuss;
    const typeOption = {
      1: "工作交流",
      2: "原型问题",
      3: "消息推送",
      4: "其他"
    };
    return (
      <div style={{ paddingTop: 15 }} className="main-div">
        <Row style={{ margin: "0 10%" }} gutter={16}>
          <Col span={16}>
            <Card
              className="chatbox-div"
              bodyStyle={{ padding: "0 !important", height: "90%" }}
              bordered={false}
            >
              <div className="chatbox-main-title">{data.duscussInfo.title}</div>
              <div className="chatbox-main-lv2-title">
                <a>{data.duscussInfo.realy_name}</a> /{" "}
                {moment(data.duscussInfo.show_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}{" "}
                / 浏览数 {data.duscussInfo.click}
                {"  "}
                <Tag>{typeOption[data.duscussInfo.type]}</Tag>
              </div>
              <Divider />
              <div
                className="chatbox-main-text"
                dangerouslySetInnerHTML={{ __html: data.duscussInfo.text }}
              />
            </Card>
            <Card
              className="chatbox-say"
              title="回复"
              bodyStyle={{ padding: "0 !important", height: "90%" }}
              bordered={false}
            >
              <List
                locale={{
                  emptyText: "动动手指，沙发就是你的了！"
                }}
                itemLayout="horizontal"
                dataSource={data.duscussChatBoxInfo}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a>{item.realy_name}</a>}
                      description={<>{item.text}</>}
                    />
                    <div className="time">
                      {moment(item.show_date).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </List.Item>
                )}
              />
            </Card>
            <Card
              className="chatbox-say"
              bodyStyle={{ padding: "0 !important", height: "90%" }}
              bordered={false}
            >
              <TextArea
                rows={4}
                value={data.chatBoxText}
                onChange={event =>
                  this.mergeData({ chatBoxText: event.target.value })
                }
              />
              <div class="chatbox-button">
                <Button onClick={() => this.apply()}>回复</Button>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <FuncAction
              data={data}
              action={this.props}
              loading={this.props.loading}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const discuss = state.discuss;
  return { discuss, loading: state.loading.models.discuss };
}
export default connect(mapStateToProps)(Cb);
