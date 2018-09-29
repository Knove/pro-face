import React from "react";
import { Form, Select, Input, Button, Popconfirm } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
const Option = Select.Option;
class Add extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleSubmit = () => {
    this.props.dispatch({
      type: "prototype/addPrototypeTypeName"
    });
  };
  handleSelectChange = value => {
    // // console.log(value);
  };
  inputChange = value => {
    this.props.dispatch({
      type: "prototype/fetch",
      payload: {
        prototypeTypeName: value
      }
    });
  };
  render() {
    const __ = this.props.prototype;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="原型名称"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          <Input
            onChange={event => this.inputChange(event.target.value)}
            value={__.prototypeTypeName}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }}>
          <Popconfirm
            title="你确定要增加这一条原型类型么?"
            onConfirm={this.handleSubmit}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" loading={this.props.loading}>
              增加
            </Button>
          </Popconfirm>
        </FormItem>
      </Form>
    );
  }
}
// mapStateToProps内的参数需与model里的namespace一致
function mapStateToProps(state) {
  const prototype = state.prototype;
  return { prototype, loading: state.loading.models.prototype };
}
export default connect(mapStateToProps)(Add);
