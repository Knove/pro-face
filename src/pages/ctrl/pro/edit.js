import React from "react";

class Edit extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>Edit</div>
    );
  }
}
export default Edit
