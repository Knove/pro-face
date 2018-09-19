import React from "react";
import { Table, Modal, Form, Button, Icon, Input, Row, Popover, Radio } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class RolesModal extends React.Component {
  state = {
    visible: false,
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.props.dispatch({
          type: "roles/addRole",
          payload: values
        });
      }
    });
  };
  ModalHandle = flag => {
    this.props.props.dispatch({
      type: "roles/save",
      payload: {
        addModalVisible: flag
      }
    });
  };
  render() {
    const __ = this.props.props.roles;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Modal
          title="新增角色"
          visible={__.addModalVisible}
          footer={null}
          onCancel={() => this.ModalHandle(false)}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem {...formItemLayout} label="角色名称">
              {getFieldDecorator("role_name", {
                rules: [
                  { required: true, message: "请输入角色名称!" },
                  { max: 32, message: "角色名称过长!" },
                  { min: 3, message: "角色名称过短!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="pushpin-o" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入角色名称"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色类型">
              {getFieldDecorator("role_type", {
                rules: [{ required: true, message: "请选择角色类型！" }]
              })(
                <RadioGroup>
                  <Radio value="1">产品经理</Radio>
                  <Radio value="2">程序</Radio>
                </RadioGroup>
              )}
              <Popover
                content={<div>产品经理权限较高，拥有进入产品管理并操作的权限。<br />程序包含前后端、测试，只拥有查看权限。<br />HR权限，在程序权限的基础上可以增加用户。</div>}
                title="提示"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Icon type="question-circle" />
              </Popover>
            </FormItem>
            <div className="button-right">
              <Button type="primary" htmlType="submit" loading={this.props.props.loading}>
                新增
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(RolesModal);
