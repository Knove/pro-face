import React from "react";
import { connect } from "dva";
import { Menu, Icon, Breadcrumb } from "antd";
import router from "umi/router";

class Login extends React.Component {
  saveData = payload => {
    this.props.dispatch({
      type: "login/save",
      payload
    });
  };
  login = () => {
    this.props.dispatch({
      type: "login/login",
      payload: {}
    });
  };
  render() {
    const data = this.props.login;
    const h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    return (
      <div style={{ height: h }} className="login-dev">
        <div className="login-dev-left">
          <div className="login-logo" />
          <div className="login-title">Office for Choice Soft</div>
          <input
            value={data.username}
            placeholder="Email or Username"
            onChange={value => this.saveData({ username: value.target.value })}
          />
          <input
            value={data.password}
            type="password"
            placeholder="Password"
            onChange={value => this.saveData({ password: value.target.value })}
          />
          <button onClick={() => this.login()}>Log in</button>
        </div>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const login = state.login;
  return { login, loading: state.loading.models.login };
}
export default connect(mapStateToProps)(Login);
