import React from "react";
import { connect } from "dva";
import { Tabs, Icon, Button } from "antd";
import router from "umi/router";
import RoleProType from "../../../components/ctrl/roles/detail/RoleProType";
import UserRole from "../../../components/ctrl/roles/detail/UserRole";

const TabPane = Tabs.TabPane;

class RolesDetail extends React.Component {
  render() {
    return (
      <div>
        角色名称: {this.props.roles.detailRoleName}
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="book" />原型组设置
              </span>
            }
            key="1"
          >
            <RoleProType props={this.props} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="user" />用户设置
              </span>
            }
            key="2"
          >
            <UserRole props={this.props} />
          </TabPane>
        </Tabs>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => router.push("/ctrl/pro/roles")}>返回</Button>
        </div>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const roles = state.roles;
  return { roles, loading: state.loading.models.roles };
}
export default connect(mapStateToProps)(RolesDetail);
