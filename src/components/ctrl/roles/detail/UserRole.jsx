import React from "react";
import { Table, Select, Modal, Button, Icon, Popconfirm, message, Spin } from "antd";
const Option = Select.Option;

class UserRole extends React.Component {
  ModalHandle = flag => {
    this.setState({
      visible: flag,
      selectedRows: []
    });
  };
  state = {
    visible: false,
    selectedRows: [] // 选择的行
  };
  handleOk = () => {
    const selectedRows = this.state.selectedRows;
    if (selectedRows.length > 0) {
      this.props.props.dispatch({
        type: "roles/addProTypeForRole",
        payload: { selectedRows }
      });
      this.setState({
        visible: false,
        selectedRows: []
      });
    } else {
      message.warn("请选择用户");
    }
  };
  handleChange = (value) => {
  this.props.props.dispatch({
    type: "roles/save",
    payload: {
      addUserValue: value,
      userData: [],
    }
  });
};
fetchUser = (value) => {
   console.log('fetching user', value);
 };
  render() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "姓名",
        dataIndex: "realyName",
        key: "realyName"
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
    const modalColumns = [
      {
        title: "原型组名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "创建时间",
        dataIndex: "date",
        key: "date"
      }
    ];
    const __ = this.props.props.roles;
    return (
      <div>
        <div className="top-right">
          <Button
            type="primary"
            onClick={() => this.ModalHandle(true)}
            icon="plus"
          >
            增加用户
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={__.userRoleList}
          pagination={false}
          loading={this.props.props.loading}
        />
        <Modal
          title="增加用户"
          width="60%"
          destroyOnClose={true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => this.ModalHandle(false)}
          confirmLoading={this.props.props.loading}
        >
          <Select
            mode="multiple"
            labelInValue
            value={__.addUserValue}
            placeholder="输入用户名或真实姓名模糊搜索"
            notFoundContent={this.props.props.loading ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: "100%" }}
          >
            {__.userData.map(d => <Option key={d.value}>{d.text}</Option>)}
          </Select>
        </Modal>
      </div>
    );
  }
}
export default UserRole;
