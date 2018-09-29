import React from "react";
import { Form, Select, Input, Button, Popconfirm, Alert } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
const Option = Select.Option;
class Add extends React.Component {
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props.dispatch({
            type: "user/addUser",
            payload: values,
          })
        }
      });
    }

  render() {
    const __ = this.props.user;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 }
    };
    return (
      <div>
        <Alert
          message="注意"
          description="在此增加的用户为普通用户权限。"
          type="info"
          className="normal-alert"
          showIcon
        />
        <Form onSubmit={this.handleSubmit} >
          <FormItem label="用户名" {...formItemLayout}>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input placeholder="登陆时用，推荐：******@choicesoft.com.cn" />
            )}
          </FormItem>
          <FormItem label="姓名" {...formItemLayout}>
            {getFieldDecorator("realyName", {
              rules: [{ required: true, message: "请输入真实姓名!" }]
            })(<Input placeholder="真实姓名" />)}
          </FormItem>
          <FormItem label="公司邮箱" {...formItemLayout}>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入邮箱!" }]
            })(<Input placeholder="形如：******@choicesoft.com.cn" />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 5 }}>
            <Popconfirm
              title="你确定要增加这一用户么?"
              onConfirm={this.handleSubmit}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" loading={this.props.loading}>
                增加
              </Button>
            </Popconfirm>
          </FormItem>
        </Form>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const user = state.user;
  return { user, loading: state.loading.models.user };
}
export default connect(mapStateToProps)(Form.create()(Add));
