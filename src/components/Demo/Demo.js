import React from 'react';
// 使用 Ant Design 体系
import FormRender from 'form-render/lib/antd';
import SCHEMA from '../../schema.json';
import Customlist from '../Customlist/Customlist.js';
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      valid: [],
      uiSchema: {}
    };
  }
  onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    if (this.state.valid.length > 0) {
      alert(`校验未通过字段：${this.state.valid.toString()}`);
    } else {
      alert(JSON.stringify(this.state.formData, null, 2));
    }
  };
  render() {
    return (
      <div>
        <FormRender
          {...SCHEMA}
          uiSchema={this.state.uiSchema}
          formData={this.state.formData}
          onChange={val => {
            this.setState({
              formData: val
            });
          }}
          onValidate={val => {
            this.setState({
              valid: val
            });
          }}
          widgets={{ customlist: Customlist }}
        />
        <button onClick={this.onSubmit}>提交</button>
      </div>
    );
  }
}
