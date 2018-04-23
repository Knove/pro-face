import React from "react";
import router from "umi/router";
import "babel-polyfill";
import { Layout, Menu, Icon, Breadcrumb, Button } from "antd";
import { connect } from "dva";
import withRouter from "umi/withRouter";

const { Sider, Content, Header, Footer } = Layout;
const { SubMenu } = Menu;
class Layouts extends React.Component {
  state = {
    layout: "",
    breadCrumbLevelOne: "",
    breadCrumbLevelTwo: "辰森原型系统"
  };
  componentDidMount() {}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  // 选择左侧Menu 发起行为
  routerPath = item => {
    // 改变面包屑
    this.setState({
      breadCrumbLevelOne: item.keyPath[1],
      breadCrumbLevelTwo: item.item.props.children
    });
    // 路由跳转
    router.push(item.keyPath[0]);
  };
  render() {
    console.log(router.location.pathname);
    const layoutsType = ["/pro"];
    let layout = "";
    layoutsType.map(item => {
      if (router.location.pathname.indexOf(item) > 0) {
        layout = item;
      }
      return null;
    });
    console.log(layout);
    return (
      <div>
        <Header className="header">
          <div class="pro_img" />
          <Menu
            mode="horizontal"
            onClick={this.routerPath}
            defaultSelectedKeys={["/ctrl"]}
            style={{ lineHeight: "64px" }}
          >
            {/* <Menu.Item key="#">论坛</Menu.Item> */}
            <Menu.Item>
              <a
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                原型系统
              </a>
            </Menu.Item>
            {layout === "/pro" && (
              <Menu.Item key="/ctrl/pro/">系统管理</Menu.Item>
            )}
          </Menu>
        </Header>
        {/*
                 管理页面布局 pro
        */}
        {layout === "/pro" && (
          <Layout style={{ minHeight: "77vh" }}>
            <Sider
              width={200}
              style={{
                background: "#fff",
                marginLeft: "10%",
                marginTop: 12
              }}
            >
              <Menu
                mode="inline"
                onClick={this.routerPath}
                defaultSelectedKeys={["0"]}
                style={{
                  height: "100%",
                  borderRight: 0
                }}
              >
                <Menu.Item key="/ctrl/">
                  <Icon type="home" />首页
                </Menu.Item>
                <SubMenu
                  key="原型管理"
                  title={
                    <span>
                      <Icon type="laptop" />原型管理
                    </span>
                  }
                >
                  {/* <Menu.Item key="/ctrl/pro/edit">编辑原型</Menu.Item> */}
                  <Menu.Item key="/ctrl/pro/add">增加原型种类</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="角色管理"
                  title={
                    <span>
                      <Icon type="key" />角色管理
                    </span>
                  }
                >
                  <Menu.Item key="/ctrl/pro/roles">角色基础设置</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: "0 24px 24px"
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0"
                }}
              >
                <Breadcrumb.Item>
                  {this.state.breadCrumbLevelOne}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.state.breadCrumbLevelTwo}
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )}
        {layout === "" && this.props.children}
        <Footer style={{ textAlign: "center" }}>
          ©2018 北京辰森世纪科技股份有限公司
        </Footer>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.prototype };
}
export default withRouter(connect(mapStateToProps)(Layouts));
