import React from "react";
import { connect } from "dva";
import {
  Card,
  Row,
  Col,
  Form,
  message,
  Breadcrumb,
  Input,
  Button,
  Select
} from "antd";
import router from "umi/router";
import moment from "moment";
import QueueAnim from "rc-queue-anim";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import { FuncAction } from "./index/components";

const Option = Select.Option;

class Create extends React.Component {
  // 富文本存储
  handleChange = html => {
    this.props.dispatch({
      type: "discuss/save",
      payload: {
        htmlData: html
      }
    });
  };
  mergeData = payload => {
    this.props.dispatch({
      type: "discuss/save",
      payload
    });
  };
  update = () => {
    if (!this.props.discuss.newTitle) {
      message.warn("请填写标题！");
      return null;
    }
    if (!this.props.discuss.newType) {
      message.warn("请选择类型！");
      return null;
    }
    this.props.dispatch({
      type: "cb/update",
      payload: {}
    });
  };
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    
    const data = this.props.discuss;
    const editorProps = {
      height: h - 320,
      contentFormat: "html",
      initialContent: "<p></p>",
      onChange: () => this.handleChange,
      media: {
        allowPasteImage: false, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: false, // 开启图片插入功能
        video: false, // 开启视频插入功能
        audio: false, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: null, // 指定上传函数，说明见下文
        removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
        onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        onInsert: null // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
      },
      excludeControls: ["media"]
    };
    return (
      <div style={{ paddingTop: 15, height: h }} className="main-div">
        <Row style={{ margin: "0 10%" }} gutter={16}>
          <Col span={24}>
            <Card>
              <Breadcrumb>
                <Breadcrumb.Item>辰森OFFICE</Breadcrumb.Item>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
                <Breadcrumb.Item>创建新话题</Breadcrumb.Item>
              </Breadcrumb>
              <br />
              <Input
                placeholder="能说清楚问题的标题，才是好标题"
                size="large"
                onChange={event =>
                  this.mergeData({ newTitle: event.target.value })
                }
                value={data && data.newTitle}
              />
              <div className="edidor">
                <BraftEditor {...editorProps} />
              </div>

              <div className="chatbox-button">
                <Select
                  value={data ? data.newType : ""}
                  style={{ width: 220, marginRight: 10 }}
                  onChange={value => this.mergeData({ newType: value })}
                >
                  <Option value="">选择一个分类吧（必选）</Option>
                  <Option value="1">工作交流</Option>
                  <Option value="2">原型问题</Option>
                  <Option value="3">消息推送</Option>
                  <Option value="4">其他</Option>
                </Select>
                {/* <Button onClick={() => this.update()}>匿名发布</Button> */}
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  onClick={() => this.update()}
                >
                  发布话题
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={0}>
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
  console.log(state);
  
  const discuss = state.discuss;
  return { discuss, loading: state.loading.models.discuss };
}
export default connect(mapStateToProps)(Create);
