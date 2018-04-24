import React from "react";
import { connect } from "dva";
import MainList from "../../../components/ctrl/roles/MainList";
import RolesModal from "../../../components/ctrl/roles/RolesModal";

class Roles extends React.Component {
  render() {
    const __ = this.props.roles;
    return (
      <div>
        <MainList props={this.props} />
        <RolesModal props={this.props} />
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const roles = state.roles;
  return { roles, loading: state.loading.models.roles };
}
export default connect(mapStateToProps)(Roles);
