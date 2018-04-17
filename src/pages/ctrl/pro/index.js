import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import router from "umi/router";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
class Pro extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    console.log(router);
    return (
      <div></div>
    );
  }
}
export default Pro
