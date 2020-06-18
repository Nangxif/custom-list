import React from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Col, Row, Input, Button } from 'antd';

import 'antd/dist/antd.css';
import CustomlistCSS from './Customlist.module.css';
export default class Customlist extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      list: []
    };
  }
  // 初始键值修改值的时候调用的方法，将数值传回给上一级
  handleChange(key, value) {
    this.props.onChange(this.props.name, {
      ...this.props.value,
      [key]: value
    });
  }
  // 添加的项修改键的时候，这时候要同步修改上一级数据原来的键，将原来的值赋予新的键
  keyChange(index, value) {
    let arr = this.state.list;
    let target = this.props.value;
    target[value] = this.props.value[arr[index][0]];
    Reflect.deleteProperty(target, arr[index][0]);
    arr[index].splice(0, 1, value);
    this.setState({ list: arr });
    this.props.onChange(this.props.name, target);
  }
  // 添加一项
  addItem() {
    let arr = this.state.list;
    // 先判断当前符合默认键的索引的最大值
    let max = arr
      .filter(item => /^defaultKey(\d+)$/.test(item[0]))
      .map(i => Number(i[0].slice(10)))
      .reduce((num1, num2) => {
        return num1 > num2 ? num1 : num2;
      }, 0);
    arr.push([`defaultKey${max + 1}`, '', true, 'new']);
    this.setState({
      list: arr
    });
  }
  // 移除项
  removeItem(index) {
    let arr = this.state.list;
    let target = this.props.value;
    Reflect.deleteProperty(target, arr[index][0]);
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
              <Input.Group>
                <Row>
                  <Col span={9}>
                    <Input
                      disabled={!item[2]}
                      value={item[0]}
                      placeholder="新键"
                      onChange={e => this.keyChange(index, e.target.value)}
                    />
                  </Col>
                  <Col span={9}>
                    <Input
                      disabled={!item[2]}
                      value={this.props.value[item[0]]}
                      placeholder="新值"
                      onChange={e => this.handleChange(item[0], e.target.value)}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.changeStatus(index)}
                      style={{ width: '100%' }}
                      className={CustomlistCSS['ant-btn-self']}
                    >
                      {item[2] ? <CheckOutlined /> : <EditOutlined />}
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.removeItem(index)}
                      style={{ width: '100%' }}
                      className={CustomlistCSS['ant-btn-self']}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>
              </Input.Group>
            </div>
          ) : (
            <div style={{ marginBottom: '5px' }} key={index}>
              <Input.Group>
                <Row>
                  <Col span={20}>
                    <Input
                      addonBefore={item[2] ? item[0] : ''}
                      disabled={!item[2]}
                      // style={{ width: '100%' }}
                      value={this.props.value[item[0]]}
                      onChange={e => this.handleChange(item[0], e.target.value)}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{ width: '100%' }}
                      onClick={() => this.changeStatus(index)}
                      className={CustomlistCSS['ant-btn-self']}
                    >
                      {item[2] ? <CheckOutlined /> : <EditOutlined />}
                    </Button>
                  </Col>
                </Row>
              </Input.Group>

              {/* <Input.Group compact={true}>
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
              </Input.Group> */}
            </div>
          )
        )}
        <Row>
          <Col span={22}>
            <Button
              type="primary"
              style={{ width: '100%' }}
              onClick={() => this.addItem()}
            >
              添加一项
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
