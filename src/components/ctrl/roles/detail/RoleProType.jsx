import React from "react";
import { Table, Popover, Modal, Button, Icon, Popconfirm, message } from "antd";

class RoleProType extends React.Component {
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
      message.warn("请选择原型组");
    }
  };
  handleDelete = role_pro_type_id => {
    this.props.props.dispatch({
      type: "roles/deleteRoleProType",
      payload: {
        id: role_pro_type_id
      }
    });
  };
  render() {
    const columns = [
      {
        title: "原型组名",
        dataIndex: "pro_type_name",
        key: "pro_type_name"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="你确定要删除这一角色对应的原型组关系么？"
              onConfirm={() => this.handleDelete(record.role_pro_type_id)}
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
    // 重复的不让选择
    function reDataCheck(record) {
      const roleProTypeList = __.roleProTypeList;
      let flag = false;
      roleProTypeList.map(item => {
        if (item.pro_type_id === record._id) {
          flag = true;
        }
        return null;
      });
      console.log(roleProTypeList, record);
      return flag;
    }
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.setState({
          selectedRows
        });
      },
      getCheckboxProps: record => ({
        disabled: reDataCheck(record), // Column configuration not to be checked
        name: record.name
      }),
      hideDefaultSelections: true,
    };
    const __ = this.props.props.roles;
    return (
      <div>
        <div className="top-right">
          <Button
            type="primary"
            onClick={() => this.ModalHandle(true)}
            icon="plus"
          >
            增加原型组
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={__.roleProTypeList}
          pagination={false}
          loading={this.props.props.loading}
        />
        <Modal
          title="添加原型组"
          width="60%"
          destroyOnClose={true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => this.ModalHandle(false)}
          confirmLoading={this.props.props.loading}
        >
          <Table
            rowSelection={rowSelection}
            columns={modalColumns}
            dataSource={__.proTypeList}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Modal>
      </div>
    );
  }
}
export default RoleProType;
