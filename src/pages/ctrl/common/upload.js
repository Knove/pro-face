import React from "react";
import { Upload, Button, Icon, Card, Alert, Select } from "antd";
import { connect } from "dva";

const Option = Select.Option;

class UploadFile extends React.Component {
  handleUpload = () => {
    const { fileList } = this.props.upload;
    console.log(fileList);
    const formData = new FormData();
    formData.append("fileUpload", fileList[0]);
    formData.append("fileType", "4");

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
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <div className="main-card" style={{ marginTop: 15 }}>
        <Alert
          message="上传须知："
          description={
            <span>
              1.必须是zip包<br />
              2.根目录必须有index.html文件
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
          原型类型：
          <Select
            style={{ width: "20%" }}
            onChange={handleChange}
            placeholder="请选择原型类型"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled">Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
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
