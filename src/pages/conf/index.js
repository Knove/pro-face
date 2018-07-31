import React from "react";
import { connect } from "dva";
import { Menu, Icon, Table } from "antd";
import router from "umi/router";

class Index extends React.Component {
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    const columns = [
      {
        title: "日期",
        dataIndex: "date",
        width: "10%",
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {}
          };
          if (
            index === 0 ||
            index === 6 ||
            index === 12 ||
            index === 18 ||
            index === 24 ||
            index === 30 ||
            index === 36
          ) {
            obj.props.rowSpan = 6;
          }
          if (
            (index > 0 && index < 6) ||
            (index > 6 && index < 12) ||
            (index > 12 && index < 18) ||
            (index > 18 && index < 24) ||
            (index > 24 && index < 30) ||
            (index > 30 && index < 36) ||
            (index > 36 && index < 42)
          ) {
            obj.props.rowSpan = 0;
          }
          return obj;
        }
      },
      {
        title: "会议室",
        dataIndex: "conf"
      }
    ];
    for (let i = 1; i <= 48; i++) {
      columns.push({
        title: "会议室",
        dataIndex: "time" + i,

      });
    }

    const data = [];
    for (let i = 1; i <= 42; i++) {
      data.push({
        key: i,
        date: "2018年5月8日 星期五"
      });
    }
    return (
      <div style={{ minHeight: h }} className="main-div">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const conf = state.conf;
  return { conf, loading: state.loading.models.conf };
}
export default connect(mapStateToProps)(Index);
