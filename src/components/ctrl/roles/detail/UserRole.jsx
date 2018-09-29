import React from "react";
import {
  Table,
  Select,
  Modal,
  Button,
  Icon,
  Popconfirm,
  message,
  Spin
} from "antd";
const Option = Select.Option;

class UserRole extends React.Component {
  ModalHandle = flag => {
    this.props.props.dispatch({
      type: "roles/save",
      payload: {
        addUserValue: [],
        userData: []
      }
    });
    this.setState({
      visible: flag,
      selectedRows: []
    });
  };
  state = {
    visible: false,
  };
  handleOk = () => {
    const __ = this.props.props.roles;
    if (__.addUserValue.length > 0) {
      this.props.props.dispatch({
        type: "roles/addUserRole",
        payload: {}
      });
      this.setState({
        visible: false,
      });
    } else {
      message.warn("请选择用户！");
    }
  };
  handleChange = value => {
    this.props.props.dispatch({
      type: "roles/save",
      payload: {
        addUserValue: value,
        userData: []
      }
    });
  };
  fetchUser = value => {
    if (value) {
      this.props.props.dispatch({
        type: "roles/getUserByValue",
        payload: {
          value
        }
      });
      // console.log(value);
    }
  };
  handleDelete = user_role_id => {
    this.props.props.dispatch({
      type: "roles/deleteRoleUser",
      payload: {
        id: user_role_id
      }
    });
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
            <Popconfirm
              title="你确定要删除这一角色对应的用户关系么？"
              onConfirm={() => this.handleDelete(record.user_role_id)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
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
            notFoundContent={
              this.props.props.loading ? <Spin size="small" /> : null
            }
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: "100%" }}
          >
            {__.userData.map(d => (
              <Option key={d.userId}>
                {d.realyName} - {d.username}
              </Option>
            ))}
          </Select>
        </Modal>
      </div>
    );
  }
}
export default UserRole;
