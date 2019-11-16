import React from 'react'
import { message, DatePicker } from 'antd'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { RangePicker } = DatePicker;

export default class RangeDatePicker extends React.Component {

  render() {

    return (
      <RangePicker
        onChange={this.props.onChange }
        className="rangeDatePicker"
        placeholder={this.props.pleaceholder}
        value={[this.props.editValue[0],this.props.editValue[1]]}
        separator='~'
      />
    )
  }
}



