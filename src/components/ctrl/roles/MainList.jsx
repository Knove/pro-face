import React from "react";
import { Table, Popover, Divider, Button, Icon, Popconfirm } from "antd";
import router from "umi/router";

class MainList extends React.Component {
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
  handleDelete = role_id => {
    this.props.props.dispatch({
      type: "roles/deleteRole",
      payload: {
        role_id: role_id
      }
    });
  };
  routerToDetail = role_id => {
    if (role_id) {
      this.props.props.dispatch({
        type: "roles/save",
        payload: {
          detailRoleId: role_id
        }
      });
      this.props.props.dispatch({
        type: "roles/getRolesProType",
        payload: {
          role_id
        }
      });
      router.push("/ctrl/pro/roles-detail");
    }
  };
  render() {
    const columns = [
      {
        title: "角色名",
        dataIndex: "role_name",
        key: "role_name",
        render: (text, record) => (
          <a onClick={() => this.routerToDetail(record.role_id)}>{text}</a>
        )
      },
      {
        title: (
          <span>
            角色模式
            <Popover
              content={
                <div>
                  角色类型1权限较高，拥有进入产品管理并操作的权限。<br />
                  角色类型2权限较低，只拥有查看权限。
                </div>
              }
              title="提示"
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <Icon type="question-circle" />
            </Popover>
          </span>
        ),
        dataIndex: "role_type",
        key: "role_type",
        render: text => <span>模式 {text}</span>
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a onClick={() => this.routerToDetail(record.role_id)}>详情</a>
            <Divider type="vertical" />
            <Popconfirm
              title="你确定要删除这一角色么？"
              onConfirm={() => this.handleDelete(record.role_id)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        )
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
            增加角色
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={__.roleList}
          pagination={false}
          loading={this.props.props.loading}
        />
      </div>
    );
  }
}
export default MainList;
