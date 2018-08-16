import React from "react";
import router from "umi/router";
import TweenOne from "rc-tween-one";
import Texty from 'rc-texty';
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
        duration: 4000
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
        <Texty><span>抱歉，页面找不到啦！</span></Texty>

        <br />
        <a onClick={() => router.push("/")}>返回主页</a>
      </div>
    );
  }
}
export default notFound;
