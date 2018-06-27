import React from "react";
import { Table, Card, Divider, Button, Icon, Avatar } from "antd";
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
        render: (text,record) => <a href={"/propertyDir/"+ text + "V" + record.version + "/index.html"} target="_blank" rel="noopener noreferrer">{text}</a>
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
        render: text => <span>{moment(text).format('YY/MM/DD HH:mm')}</span>
      },
      {
        title: "备注",
        dataIndex: "text",
        key: "text"
      }
    ];

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
        <Card className="right-card" style={{ height: h / 2 }}>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/word-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/ppt-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/word-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/ppt-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/ppt-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
          <Card
            className="file-card"
            cover={
              <img
                className="icon-img"
                alt="example"
                src={require("../../assets/file-logo/excel-c.jpg")}
              />
            }
            actions={[<Icon type="arrow-down" />, <Icon type="ellipsis" />]}
          >
            <Meta title="核心文档" description="此文档是技术文档" />
          </Card>
        </Card>
      </div>
    );
  }
}
export default ListRight;
