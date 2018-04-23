import React from "react";
import { Table, Tabs, Divider, Avatar, Icon } from "antd";
const TabPane = Tabs.TabPane;

class MainList extends React.Component {
  render() {
    const columns = [
      {
        title: "角色名",
        dataIndex: "role_name",
        key: "role_name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "角色模式",
        dataIndex: "role_type",
        key: "role_type"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">修改</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        )
      }
    ];
    const __ = this.props.props.roles;
    return <div>
      <Table columns={columns} dataSource={__.roleList} />
    </div>;
  }
}
export default MainList;
