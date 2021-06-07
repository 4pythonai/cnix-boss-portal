import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

export default class SelectExactDate extends React.Component {
    onChange(a, b) {
        this.props.onChange(b);
    }
    render() {
        console.log(543, this.props.value);
        return (
            <DatePicker
                style={{ width: '100%' }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={this.props.value != '' ? moment(this.props.value, 'YYYY-MM-DD HH:mm:ss') : null}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}
