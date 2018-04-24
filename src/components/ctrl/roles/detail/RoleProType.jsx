import React from "react";
import { Table, Popover, Divider, Button, Icon, Popconfirm } from "antd";

class RoleProType extends React.Component {
  ModalHandle = flag => {
    this.props.props.dispatch({
      type: "roles/save",
      payload: {
        addModalVisible: flag
      }
    });
  };
  state = {
    visible: false
  };
  hide = () => {
    this.setState({
      visible: false
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  handleDelete = (role_id) => {
    this.props.props.dispatch({
      type: "roles/deleteRole",
      payload: {
        role_id: role_id
      }
    });
  };
  render() {
    const columns = [
      {
        title: "原型名",
        dataIndex: "pro_type_name",
        key: "pro_type_name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">删除</a>
          </span>
        )
      }
    ];
    const __ = this.props.props.roles;
    const func = this.props.func;
    return (
      <div>
        角色名称: SCM供应链 (技术)
        <div className="top-right">
          <Button
            type="primary"
            onClick={() => this.ModalHandle(true)}
            icon="plus"
          >
            增加原型
          </Button>
        </div>
        <Table columns={columns} dataSource={__.roleProTypeList} pagination={false} loading={this.props.props.loading} />
      </div>
    );
  }
}
export default RoleProType;
