import React from "react";
import { connect } from "dva";
import { Menu, Icon, Breadcrumb } from "antd";
import router from "umi/router";
import QueueAnim from "rc-queue-anim";
import MenuLeft from "../components/main/MenuLeft";
import ListRight from "../components/main/ListRight";

class Index extends React.Component {
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 66;
    return (
      <div style={{ minHeight: h }} className="main-div">
        <QueueAnim className="queue-simple">
          <MenuLeft key="a" props={this.props} />
          <ListRight key="b" props={this.props} />
        </QueueAnim>
      </div>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const index = state.index;
  return { index, loading: state.loading.models.index };
}
export default connect(mapStateToProps)(Index);
