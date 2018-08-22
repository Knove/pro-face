import React from "react";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import router from "umi/router";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
class Ctrl extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentDidMount() {
    const targetRouter = router.location.query.path || "404";
    const routerRule = {
      checkLogin: "ctrl/checkLogin", // 校验 验证码页面
      alterPass: "ctrl/alterPass", // 强制更改密码页面
      upload: "ctrl/common/upload", // 上传原型 页面
      pro: "ctrl/pro", // 系统管理页
      _prod: "prod", // 原型页
      _login: "login", // 跳转登录页
      _conf: "conf", // 跳转会议室页
      404: "404" // 404页
    };
    router.push(
      routerRule[targetRouter] || router.location.query.path.replace(/_/g, "/")
    );
  }
  render() {
    return <div>loading...</div>;
  }
}
export default Ctrl;
