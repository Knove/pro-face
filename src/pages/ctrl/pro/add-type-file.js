import React from "react";
import {
  Form,
  Select,
  Card,
  Button,
  Upload,
  Icon,
  message,
  Alert,
  Input
} from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
const Option = Select.Option;
class AddTypeFile extends React.Component {
  handleUpload = () => {
    if (this.props.upload.uploadType) {
      const { fileList } = this.props.upload;
      console.log(fileList);
      const formData = new FormData();
      formData.append("fileUpload", fileList[0]);
      formData.append("fileType", this.props.upload.uploadType);
      formData.append("fileText", this.props.upload.fileText);
      formData.append("connectPro", this.props.upload.connectPro);
      this.props.dispatch({
        type: "upload/uploadFileToType",
        payload: formData
      });
      this.props.dispatch({
        type: "upload/save",
        payload: {
          fileList: []
        }
      });
    } else {
      message.error("请选择原型类型！");
    }
  };
  // 选择原型类型 触发的操作
  handleChange = value => {
    this.props.dispatch({
      type: "upload/save",
      payload: {
        uploadType: value,
        connectPro: ""
      }
    });
    this.props.dispatch({
      type: "upload/queryPrototype",
      payload: {
        typeId: value
      }
    });
  };
  // 选择原型类型 触发的操作
  handleChangeType = value => {
    this.props.dispatch({
      type: "upload/save",
      payload: {
        connectPro: value
      }
    });
  };
  textChange = value => {
    if (value.target.value.length <= 15) {
      this.props.dispatch({
        type: "upload/save",
        payload: {
          fileText: value.target.value
        }
      });
    } else {
      message.warn("简介字数请不要超过15个字符！");
    }
  };
  render() {
    const __ = this.props.upload;
    const props = {
      action: "",
      onRemove: file => {
        console.log(file);
        this.props.dispatch({
          type: "upload/save",
          payload: {
            fileList: []
          }
        });
      },
      beforeUpload: file => {
        console.log(file);
        this.props.dispatch({
          type: "upload/save",
          payload: {
            fileList: [file]
          }
        });
        return false;
      },
      fileList: __.fileList
    };
    const typeOption =
      __.PrototypeTypeList &&
      __.PrototypeTypeList.map(item => {
        return <Option value={item.typeId}>{item.name}</Option>;
      });
    const proOption =
      __.PrototypeList &&
      __.PrototypeList.map(item => {
        return <Option value={item._id}>{item.name + " V" + item.version}</Option>;
      });
    return (
      <div>
        <Alert
          message="上传须知："
          description={
            <span>
              1.在这里上传的文件，根据原型类型在主页可以进行下载等操作。<br />
              2.必须是doc,docx,ppt,pptx,xls,xlsx,txt,pdf,jpg,jpeg,png,gif,zip其中之一的格式。<br />
              3.文件名请先起好。<br />
            </span>
          }
          type="info"
        />
        <Card bodyStyle={{ textAlign: "center" }}>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 请选择相关文档
            </Button>
          </Upload>
          文档介绍：
          <Input
            style={{ width: "40%", marginTop: 10 }}
            placeholder="选填。请写此文档的相关介绍。不多于15字！"
            onChange={this.textChange}
          />
          <br />
          原型类型：
          <Select
            style={{ width: "40%", marginTop: 10 }}
            onChange={this.handleChange}
            placeholder="请选择原型类型"
          >
            {typeOption}
          </Select>
          <br />
          关联原型：
          <Select
            style={{ width: "40%", marginTop: 10 }}
            onChange={this.handleChangeType}
            value={__.connectPro}
            allowClear={true}
          >
            <Option value="">选填，关联到某个原型</Option>
            {proOption}
          </Select>
          <br />
          <Button
            className="upload-demo-start"
            type="primary"
            onClick={this.handleUpload}
            disabled={__.fileList.length === 0}
            loading={this.props.loading}
          >
            {this.props.loading ? "上传中……" : "开始上传"}
          </Button>
        </Card>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const upload = state.upload;
  return { upload, loading: state.loading.models.upload };
}
export default connect(mapStateToProps)(AddTypeFile);
