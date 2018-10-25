import React from "react";
import { Card, List, Divider, Button, Icon, Breadcrumb } from "antd";
import router from "umi/router";
class QuickSrc extends React.Component {
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
  SrcDirect = src => {
    window.open(src);
  }
  render() {
    return (
      <div style={{ paddingTop: 15 }}>
        <Card title="快捷访问" className="chatbox-updating" bordered={false}>
          <div className="quick-div">
            <div onClick={() => this.SrcDirect('http://www.sys.choicesoft.com.cn:66/choicepms/www/')}>
              <Icon className="quick-src src-chandao" /> 禅道
            </div>
            <div onClick={() => this.SrcDirect('http://pickpost.choicesaas.cn/')}>
              <Icon className="quick-src src-pickpost" /> PickPost
            </div>
            <div onClick={() => this.SrcDirect('http://wiki.choicesaas.cn')}>
              <Icon className="quick-src src-wiki" /> WIKI
            </div>
            <div onClick={() => this.SrcDirect('http://gitlab.choicesoft.com.cn/')}>
              <Icon className="quick-src src-gitlab" /> GitLab
            </div>
            <div onClick={() => this.SrcDirect('https://ant-design.gitee.io')}>
              <Icon className="quick-src src-antd" /> Antd
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
export default QuickSrc;
