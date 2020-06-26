import React from "react";
import { InputNumber } from "antd";

import api from "@/api/api";

export default class DeviceNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(props);
  }

componentDidMount() {
   console.log(77777777,this.props)
  }

  onChange = (e) => {
      console.log(876,e)
    this.props.onChange(e);
  };

  render() {

    return (
      <div>
        <InputNumber defaultValue={this.props.value!=''?this.props.value:''} min={1} onChange={this.onChange} />
      </div>
    );
  }
}
