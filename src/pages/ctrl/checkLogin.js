import React from "react";
import { connect } from "dva";
import { Icon, Card, Form, Input, Button, Row, Col } from "antd";

const FormItem = Form.Item;

class CheckLogin extends React.Component {
  state = {
    collapsed: false,
    buttonDisabled: false,
    buttonText: "获取验证码"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  renTime = (i) => {
    this.setState({
      buttonText: i
    });
    if (i>0)
    setTimeout(()=>this.renTime(--i),1000);
    else {
      this.setState({
        buttonText: "获取验证码",
        buttonDisabled: false
      });
    }
  };
  sendCaptcha = () => {
    this.props.dispatch({
      type: "login/sendCaptcha",
      payload: {}
    });
    this.setState({
      buttonDisabled: true
    });
      setTimeout(()=>this.renTime(60),1000);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "login/checkLogin",
          payload: values
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { sessionUserInfo } = this.props.login;
    const windowHeight = document.documentElement.clientHeight;
    return (
      <div class="login-bg" style={{ height: windowHeight - 66 - 77 }}>
        <Card className="login-card" title="身份验证" hoverable>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ],
                initialValue: sessionUserInfo.username
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  disabled
                />
              )}
            </FormItem>
            <FormItem>
              <Row>
                <Col span={16}>
                  {getFieldDecorator("captcha", {
                    rules: [{ required: true, message: "请输入验证码！" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="请输入验证码"
                    />
                  )}
                </Col>
                <Col span={1} />
                <Col span={5}>
                  <Button
                    onClick={this.sendCaptcha}
                    disabled={this.state.buttonDisabled}
                  >
                    {this.state.buttonText}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!this.state.buttonDisabled}
              >
                验证登陆
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const login = state.login;
  return { login, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Form.create()(CheckLogin));
