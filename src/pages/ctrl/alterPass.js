import React from "react";
import { connect } from "dva";
import { Icon, Card, Form, Input, Button, Row, Col, message } from "antd";

const FormItem = Form.Item;

class AlterPass extends React.Component {
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
  renTime = i => {
    this.setState({
      buttonText: i
    });
    if (i > 0) setTimeout(() => this.renTime(--i), 1000);
    else {
      this.setState({
        buttonText: "获取验证码",
        buttonDisabled: false
      });
    }
  };
  sendCaptcha = () => {
    this.props.dispatch({
      type: "login/sendCaptchaOfAlterPass",
      payload: {}
    });
    this.setState({
      buttonDisabled: true
    });
    setTimeout(() => this.renTime(60), 1000);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.password !== values.password1) {
          message.error("两次密码不一致！请检查");
        } else {
          this.props.dispatch({
            type: "login/checkLoginOfAlterPass",
            payload: values
          });
        }

      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { sessionUserInfo } = this.props.login;
    const windowHeight = document.documentElement.clientHeight;
    return (
      <div class="login-bg" style={{ height: windowHeight - 66 - 77 }}>
        <Card className="login-card" title="更改密码" hoverable>
          <Form onSubmit={this.handleSubmit} className="login-form">
            系统检测到您的密码是原始密码<br />您需要更改密码才可以登陆
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入你要更改的密码!" },
                  { max: 16, message: "密码长度不可大于16位!" },
                  { min: 6, message: "密码长度不可小于6位!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入新密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password1", {
                rules: [
                  { required: true, message: "请再次输入新密码!" },
                  { max: 16, message: "密码长度不可大于16位!" },
                  { min: 6, message: "密码长度不可小于6位!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请再次输入密码"
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
                          type="hourglass"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
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
                更改密码
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
export default connect(mapStateToProps)(Form.create()(AlterPass));
