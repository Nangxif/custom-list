import React from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

// import 'antd/dist/antd.css';
export default class Customlist extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      list: []
    };
  }
  handleChange(key, value) {
    this.props.onChange(this.props.name, {
      ...this.props.value,
      [key]: value
    });
  }
  keyChange(index,value){
    let arr = this.state.list;
    arr[index][0] = value;
    this.setState({
      list: arr
    });
  }
  addItem() {
    let arr = this.state.list;
    arr.push(['新键', '新值', true, 'new']);
    this.setState({
      list: arr
    });
  }
  removeItem(index) {
    let arr = this.state.list;
    let target = this.props.value;
    Reflect.deleteProperty(target,arr[index][0]);
    this.props.onChange(this.props.name, target);
    arr.splice(index, 1);
    this.setState({
      list: arr
    });
  }
  changeStatus(index) {
    let arr = this.state.list;
    arr[index][2] = !arr[index][2];
    this.setState({
      list: arr
    });
  }
  componentDidMount() {
    this.setState({
      list: Object.entries(this.props.schema.properties).map(item => [
        ...item,
        false
      ])
    });
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        {this.state.list.map((item, index) =>
          item[3] ? (
            <div style={{ marginBottom: '5px' }} key={index}>
              <Input.Group compact={true}>
                <Input
                  disabled={!item[2]}
                  style={{ width: '40%' }}
                  value={item[0]}
                  defaultValue={item[0]}
                  onChange={e => this.keyChange(index, e.target.value)}
                />
                <Input
                  disabled={!item[2]}
                  style={{ width: '40%' }}
                  value={this.props.value[item[0]]}
                  defaultValue={item[1]}
                  onChange={e => this.handleChange(item[0], e.target.value)}
                />
                <Button
                  style={{ width: '10%' }}
                  onClick={() => this.changeStatus(index)}
                >
                  {item[2] ? <CheckOutlined /> : <EditOutlined />}
                </Button>
                <Button
                  style={{ width: '10%' }}
                  onClick={() => this.removeItem(index)}
                >
                  <DeleteOutlined />
                </Button>
              </Input.Group>
            </div>
          ) : (
            <div style={{ marginBottom: '5px' }} key={index}>
              <Input.Group compact={true}>
                <Input
                  addonBefore={item[2] ? item[0] : ''}
                  disabled={!item[2]}
                  style={{ width: '90%' }}
                  value={this.props.value[item[0]]}
                  onChange={e => this.handleChange(item[0], e.target.value)}
                />
                <Button
                  style={{ width: '10%' }}
                  onClick={() => this.changeStatus(index)}
                >
                  {item[2] ? <CheckOutlined /> : <EditOutlined />}
                </Button>
              </Input.Group>
            </div>
          )
        )}

        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={() => this.addItem()}
        >
          添加一项
        </Button>
      </div>
    );
  }
}
