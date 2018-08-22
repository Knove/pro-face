import React from "react";
import { Card, List, Divider, Button, Icon, Breadcrumb  } from "antd";
import router from "umi/router";
class FuncAction extends React.Component {
  handleClick = item => {
    console.log(item);
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
    const data = [
      {
        title: <><Icon type="edit" /> 创建新话题</>,
        action: ()=>{router.push("/create")}
      },
    ];
    return (
      <div style={{ paddingTop: 0 }}>
        <Card title="功能区" className="chatbox-updating" bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a onClick={()=> item.action()}>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
export default FuncAction;
