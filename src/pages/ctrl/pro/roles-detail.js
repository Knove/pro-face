import React from "react";
import { connect } from "dva";
import RoleProType from "../../../components/ctrl/roles/detail/RoleProType";

class RolesDetail extends React.Component {
  render() {
    return (
      <div>
        <RoleProType props={this.props} />
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
