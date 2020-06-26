import React from 'react';
import { DatePicker } from 'antd'
import moment from 'moment';
import api from '@/api/api'


export default class SelectLimitDate extends React.Component {
    constructor(props) {
        super(props)        
    }
    disabledDate(current) {
        if (this.props.uform_para != "" && this.props.uform_para != null) {
            let data = this.props.uform_para
            let arr = data.split(',')
            arr[1]=parseFloat(arr[1])*30
            arr[0]=parseFloat(arr[0])*30
            // Can not select days before today and today
            return current && current > moment().day(moment().day() + parseFloat(arr[1])).endOf('day').valueOf() || current < moment().day(moment().day() + parseFloat(arr[0])).startOf('day').valueOf()
        }

    }
    onChange(a, b) {
        this.props.onChange(b)
    }
    render() {
        console.log(543, this.props.value)
        return (
            <DatePicker
                style={{width:'100%'}}
                disabledDate={ this.disabledDate.bind(this) }
                format="YYYY-MM-DD"
                value={ this.props.value != "" ? moment(this.props.value, 'YYYY-MM-DD') : null }
                onChange={ this.onChange.bind(this) }
            />
        );
    }
}