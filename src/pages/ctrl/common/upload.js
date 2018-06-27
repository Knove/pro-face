import React from "react";
import { Upload, Button, Icon, message } from "antd";
import { connect } from "dva";

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

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 请选择Zip包
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={__.fileList.length === 0}
          loading={this.props.loading}
        >
          {this.props.loading ? "上传中……" : "开始上传"}
        </Button>
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
