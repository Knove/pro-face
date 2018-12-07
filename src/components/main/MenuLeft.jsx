import React from "react";
import { Table, Menu, Divider, Button, Icon, Popconfirm } from "antd";
import router from "umi/router";
class MainList extends React.Component {
  handleClick = item => {
    // console.log(item);
    this.props.props.dispatch({
      type: "index/queryPrototype",
      payload: {
        typeId: item.key,
        webPage: {
          nowPage: 1,
          pageSize: 10000,
        }
      }
    });
    this.props.props.dispatch({
      type: "index/queryDoc",
      payload: {
        pro_id: item.key,
      }
    });

  };
  render() {
    const __ = this.props.props.index;
    // console.log(this.props.props);
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 88;
    const menuItem =
      __.PrototypeTypeList &&
      __.PrototypeTypeList.map(item => {
        return <Menu.Item key={item.typeId}>{item.name}</Menu.Item>;
      });
    return (
      <div style={{ paddingTop: 15 }} className="left-div">
        <Menu
          onClick={this.handleClick}
          className="main-list"
          style={{ height: h }}
          mode="inline"
        >
          {menuItem}
        </Menu>
      </div>
    );
  }
}
export default MainList;
