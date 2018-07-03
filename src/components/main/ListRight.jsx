import React from "react";
import { Table, Card, Popover, Icon, Spin } from "antd";
import router from "umi/router";
import moment from "moment";
import iconExport from "../../utils/iconExport";
const { Meta } = Card;
class ListRight extends React.Component {
  FileList = fileList => {
    console.log(fileList);
    return fileList.map(item => {
      const index1 = item.file_name.lastIndexOf(".");
      const index2 = item.file_name.length;
      const postf = item.file_name.substring(index1, index2); //后缀名
      return (
        <Popover
          content={
            <div>
              <p>
                <b>文件名：</b>
                <a
                  href={"/doc-file/" + item._id + "/" + item.file_name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.file_name}
                </a>
              </p>
              <p>
                <b>文件简介：</b>
                {item.file_text}
              </p>
              <p>
                <b>上传者：</b>
                {item.upload_user}
              </p>
              <p>
                <b>上传日期：</b>
                {moment(item.upload_date).format("YY/MM/DD HH:mm")}
              </p>
            </div>
          }
          title="详细信息"
          trigger="click"
        >
          <img
            className="table-icon-img"
            alt="example"
            src={iconExport(postf)}
          />
        </Popover>
      );
    });
  };
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
        width: "10%"
      },
      {
        title: "上传者",
        dataIndex: "uploader",
        key: "uploader",
        width: "10%"
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
        dataIndex: "file_text",
        key: "file_text",
        width: "10%",
        render: text =>
          !text ? (
            text
          ) : (
            <Popover content={text} title="备注" trigger="hover">
              <a>查看</a>
            </Popover>
          )
      },
      {
        title: "关联文档",
        dataIndex: "file_list",
        key: "file_list",
        render: text => <div className="table-icon">{this.FileList(text)}</div>
      }
    ];
    const cardListShare =
      this.props.props.index.DocList &&
      this.props.props.index.DocList.map(item => {
        const index1 = item.file_name.lastIndexOf(".");
        const index2 = item.file_name.length;
        const postf = item.file_name.substring(index1, index2); //后缀名
        const shareText =
          item.file_text &&
          (item.file_text.length > 7
            ? item.file_text.substr(0, 7) + "..."
            : item.file_text);
        return (
          <Card
            className="file-card"
            cover={
              <div className="file-icon">
                <img
                  className="icon-img"
                  alt="example"
                  src={iconExport(postf)}
                />
              </div>
            }
            actions={[
              <a
                href={"/doc-file/" + item._id + "/" + item.file_name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="arrow-down" />
              </a>,
              <Popover
                content=<div>
                  <p>
                    <b>文件名：</b>
                    {item.file_name}
                  </p>
                  <p>
                    <b>文件简介：</b>
                    {item.file_text}
                  </p>
                  <p>
                    <b>上传者：</b>
                    {item.upload_user}
                  </p>
                  <p>
                    <b>上传日期：</b>
                    {moment(item.upload_date).format("YY/MM/DD HH:mm")}
                  </p>
                </div>
                title="详细信息"
                trigger="click"
              >
                <Icon type="ellipsis" />
              </Popover>
            ]}
          >
            <Meta title={item.file_name} description={shareText} />
          </Card>
        );
      });
    const data = this.props.props.index.PrototypeList.sort(sequence);
    const loading = this.props.props.loading;
    function sequence(a,b){
        if (parseFloat(a.version, 10)> parseFloat(b.version, 10)) {
            return -1;
        }else if(parseFloat(a.version, 10) < parseFloat(b.version, 10)){
            return 1
        }else{
            return 0;
        }
    }
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

        <Card
          className="right-card"
          title=<span>
            <Icon type="paper-clip" /> 原型相关文档
          </span>
          loading={loading}
          style={{ height: h / 2 }}
        >
          {cardListShare.length ? (
            cardListShare
          ) : (
            <div className="null-doc-card">这里还未上传任何文档哦！</div>
          )}
        </Card>
      </div>
    );
  }
}
export default ListRight;
