import React from "react";
import router from "umi/router";
import TweenOne from "rc-tween-one";
import QueueAnim from 'rc-queue-anim';
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";

TweenOne.plugins.push(Children);

class notFound extends React.Component {
  state = {
    animation: null
  };

  componentDidMount() {
    this.setState({
      animation: {
        Children: { value: 404, floatLength: 0 },
        duration: 2000
      }
    });
  }
  render() {
    const data = this.props.login;
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 135;

    return (
      <div style={{ height: h }} className="not-found-div">
        <TweenOne animation={this.state.animation} style={{ fontSize: 156 }}>
          0
        </TweenOne>
        <QueueAnim delay={2000} className="queue-simple">
    <div key="a"><span>抱歉，页面找不到啦！</span></div>
    <div key="b"><a onClick={() => router.push("/")}>返回主页</a></div>

  </QueueAnim>


      </div>
    );
  }
}
export default notFound;
