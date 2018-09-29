import React from "react";
import { Card, Menu, Divider, Button, Icon, Popconfirm } from "antd";
import router from "umi/router";
class Updating extends React.Component {
  handleClick = item => {
    // console.log(item);
    this.props.action.dispatch({
      type: "index/queryPrototype",
      payload: {
        typeId: item.key,
        webPage: {
          nowPage: 1,
          pageSize: 10000
        }
      }
    });
    this.props.action.dispatch({
      type: "index/queryDoc",
      payload: {
        pro_id: item.key
      }
    });
  };
  render() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 548;
    return (
      <div style={{ paddingTop: 15, height: h }}>
        <Card title="动态" className="chatbox-updating" bordered={false}>Card content</Card>
      </div>
    );
  }
}
export default Updating;
