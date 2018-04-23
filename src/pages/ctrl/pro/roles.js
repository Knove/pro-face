import React from "react";
import { connect } from "dva";
import MainList from '../../../components/ctrl/roles/MainList'

class Roles extends React.Component {
  render() {
    const __ = this.props.roles;
    console.log(__);
    return (
      <div>
        <MainList props={this.props} />
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
