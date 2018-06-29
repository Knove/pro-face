import React from "react";
import { Table, Card, Popover, Button, Icon, Spin } from "antd";
import router from "umi/router";
import moment from "moment";
const { Meta } = Card;
class ListRight extends React.Component {
  render() {
    const __ = this.props.props.index;
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    const columns = [
      {
        title: "原型名称",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (text, record) => (
          <a
            href={"/propertyDir/" + text + "V" + record.version + "/index.html"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
      },
      {
        title: "版本",
        dataIndex: "version",
        key: "version",
        width: "15%"
      },
      {
        title: "上传者",
        dataIndex: "uploader",
        key: "uploader",
        width: "15%"
      },
      {
        title: "日期",
        dataIndex: "date",
        key: "date",
        width: "20%",
        render: text => <span>{moment(text).format("YY/MM/DD HH:mm")}</span>
      },
      {
        title: "备注",
        dataIndex: "text",
        key: "text"
      }
    ];
    const cardListShare =
      this.props.props.index.DocList &&
      this.props.props.index.DocList.map(item => {
        const index1 = item.file_name.lastIndexOf(".");
        const index2 = item.file_name.length;
        const postf = item.file_name.substring(index1, index2); //后缀名
        let image = "";
        if (postf === ".pptx" || postf === ".ppt") {
          image = require("../../assets/file-logo/ppt-c.jpg");
        } else if (postf === ".doc" || postf === ".docx") {
          image = require("../../assets/file-logo/word-c.jpg");
        } else if (postf === ".xlsx" || postf === ".xls") {
          image = require("../../assets/file-logo/excel-c.jpg");
        } else if (postf === ".txt") {
          image = require("../../assets/file-logo/txt-c.jpg");
        } else {
          image = require("../../assets/file-logo/word-c.jpg");
        }
        return (
          <Card
            className="file-card"
            cover={<img className="icon-img" alt="example" src={image} />}
            actions={[
              <a href={"/doc-file/" + item._id + "/" + item.file_name} target="_blank" rel="noopener noreferrer" >
                <Icon type="arrow-down" />
              </a>,
              <Popover
                content=<div>
                  <p><b>文件名：</b>{item.file_name}</p>
                  <p><b>文件简介：</b>{item.file_text}</p>
                  <p><b>上传者：</b>{item.upload_user}</p>
                  <p><b>上传日期：</b>{moment(item.upload_date).format("YY/MM/DD HH:mm")}</p>
                </div>
                title="详细信息"
                trigger="click"
              >
                <Icon type="ellipsis" />
              </Popover>
            ]}
          >
            <Meta title={item.file_name} description={item.file_text} />
          </Card>
        );
      });
    const data = this.props.props.index.PrototypeList;
    const loading = this.props.props.loading;
    return (
      <div>
        <Table
          className="right-list"
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ minHeight: h / 2.2 }}
          scroll={{ y: h / 3 }}
          loading={loading}
          locale={{
            emptyText: "这里还未上传任何原型哦！"
          }}
        />

        <Card className="right-card" loading={loading} style={{ height: h / 2 }}>
          {cardListShare.length ? cardListShare : <div className="null-doc-card">这里还未上传任何文档哦！</div>}
        </Card>
      </div>
    );
  }
}
export default ListRight;
