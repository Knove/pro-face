import React from "react";
import {
  Upload,
  Button,
  Icon,
  Card,
  Alert,
  Select,
  message,
  Input
} from "antd";
import { connect } from "dva";

const Option = Select.Option;

class UploadFile extends React.Component {
  handleUpload = () => {
    if (this.props.upload.uploadType && this.props.upload.fileText) {
      const { fileList } = this.props.upload;
      console.log(fileList);
      const formData = new FormData();
      formData.append("fileUpload", fileList[0]);
      formData.append("fileType", this.props.upload.uploadType);
      formData.append("fileText", this.props.upload.fileText);

      this.props.dispatch({
        type: "upload/uploadFile",
        payload: formData
      });
      this.props.dispatch({
        type: "upload/save",
        payload: {
          fileList: []
        }
      });
    } else {
      message.error("请填写备注和选择原型类型！");
    }
  };
  handleChange = value => {
    this.props.dispatch({
      type: "upload/save",
      payload: {
        uploadType: value
      }
    });
  };
  textChange = value => {
    if (value.target.value.length <= 30) {
      this.props.dispatch({
        type: "upload/save",
        payload: {
          fileText: value.target.value
        }
      });
    } else {
      message.warn("简介字数请不要超过30个字符！");
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
    return (
      <div className="main-card" style={{ marginTop: 15 }}>
        <Alert
          message="上传须知："
          description={
            <span>
              1.上传的压缩包必须是<span style={{ color: "red" }}>Zip</span>格式，推荐导出文件夹后使用Winrar压缩，尽量不要使用直接导出的zip包。<br />
              2.根目录必须有<span style={{ color: "red" }}>index.html</span>文件，否则上传上去会无法访问！<br />
              3.上传前请在本地打开index.html尝试是否有界面。<br />
              4.上传时候的压缩包文件名没有意义，上传后将直接成为该原型类型的最新版本。<br />
              {/* 5.在这里上传原型后，将会邮件通知有查看该原型权限的用户。<br /> */}
            </span>
          }
          type="info"
        />
        <Card bodyStyle={{ textAlign: "center" }}>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 请选择Zip包
            </Button>
          </Upload>
          原型备注：
          <Input
            style={{ width: "30%", marginTop: 10 }}
            placeholder="必填，原型备注"
            onChange={this.textChange}
          />
          <br />
          原型类型：
          <Select
            style={{ width: "30%", marginTop: 10 }}
            onChange={this.handleChange}
            placeholder="请选择原型类型"
          >
            {typeOption}
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
export default connect(mapStateToProps)(UploadFile);
