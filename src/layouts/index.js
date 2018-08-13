import React from "react";
import router from "umi/router";
// import "babel-polyfill";
import { Layout, Menu, Icon, Breadcrumb, Button } from "antd";
import { connect } from "dva";
import withRouter from "umi/withRouter";
import Manual from "../components/conf/Manual";

const { Sider, Content, Header, Footer } = Layout;
const { SubMenu } = Menu;
const ButtonGroup = Button.Group;

class Layouts extends React.Component {
  state = {
    layout: "",
    breadCrumbLevelOne: "",
    breadCrumbLevelTwo: "辰森原型系统"
  };
  mergeData = payload => {
    this.props.dispatch({
      type: "conf/save",
      payload
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
  // 跳转三系列
  routerGo = type => {
    switch (type) {
      case "afterVersion":
        window.open("/propertyDir/oldversion.html");
        break;
      case "upload":
        router.push("/ctrl/common/upload");
        break;
      case "uploadFile":
        router.push("/ctrl/pro/add-type-file");
        break;
      case "ctrl":
        router.push("/ctrl/pro");
        break;
      default:
        break;
    }
  };
  render() {
    const layoutsType = ["/pro", "login", "conf"];
    let layout = "";
    layoutsType.map(item => {
      if (router.location.pathname.indexOf(item) > 0) {
        layout = item;
      }
      return null;
    });
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 215;
    return (
      <div>
        {layout !== "login" && (
          <Header className="header">
            <div class="pro_img" />
            {this.props.index.sessionUserInfo.checkUser === true &&
              this.props.index.sessionUserInfo.alterPass === true &&
              (layout === "" || layout === "/pro") && (
                <div className="head-button">
                  <ButtonGroup>
                    <Button onClick={() => this.routerGo("afterVersion")}>
                      往期版本
                    </Button>
                    {this.props.index.sessionUserInfo.power !== "view" && (
                      <>
                        <Button onClick={() => this.routerGo("upload")}>
                          上传原型
                        </Button>
                        <Button onClick={() => this.routerGo("uploadFile")}>
                          上传文档
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => this.routerGo("ctrl")}
                        >
                          产品管理
                        </Button>
                      </>
                    )}
                  </ButtonGroup>
                </div>
              )}
            {layout === "conf" && (
              <div className="head-button">
                <ButtonGroup>
                  <Button
                    onClick={() => this.mergeData({ manualVisable: true })}
                  >
                    会议室使用手册
                  </Button>
                </ButtonGroup>
                <Manual props={this.props} mergeData={this.mergeData} />
              </div>
            )}
            <Menu
              mode="horizontal"
              onClick={this.routerPath}
              defaultSelectedKeys={["/" + layout]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="/">产品原型</Menu.Item>
              <Menu.Item key="/conf">会议室</Menu.Item>
              {layout === "/pro" && (
                <Menu.Item key="/ctrl/pro/">系统管理</Menu.Item>
              )}
            </Menu>
          </Header>
        )}
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
                <Menu.Item key="/ctrl/pro">
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
                  <Menu.Item key="/ctrl/pro/add">增加原型种类</Menu.Item>
                  <Menu.Item key="/ctrl/pro/add-type-file">
                    上传原型文档
                  </Menu.Item>
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
                {this.props.index.sessionUserInfo.power === "admin" && (
                  <SubMenu
                    key="用户管理"
                    title={
                      <span>
                        <Icon type="user" />用户管理
                      </span>
                    }
                  >
                    <Menu.Item key="/ctrl/pro/admin/addUser">
                      增加用户
                    </Menu.Item>
                  </SubMenu>
                )}
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
                  minHeight: h
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )}

        {(layout === "" || layout === "login" || layout === "conf") &&
          this.props.children}
        {layout !== "" &&
          layout !== "login" && (
            <Footer style={{ textAlign: "center" }}>
              ©2018 北京辰森世纪科技股份有限公司
            </Footer>
          )}
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  const conf = state.conf;
  return { index, conf, loading: state.loading.models.index };
}
export default withRouter(connect(mapStateToProps)(Layouts));
