import React from 'react';
import { DatePicker } from 'antd'
import moment from 'moment';
import api from '@/api/api'


export default class SelectLimitData extends React.Component {
    constructor(props) {

        super(props)
        
    }
    disabledDate(current) {
        if(this.props.datalimit!=""&&this.props.datalimit!=null){
            let data=this.props.datalimit
            let arr=data.split(',')
            // Can not select days before today and today
            return current && current > moment().month(moment().month() + parseFloat(arr[1])).startOf('month').valueOf() || current < moment().month(moment().month() + parseFloat(arr[0])).startOf('month').valueOf()
        }

    }
    onChange(a,b) { 
        this.props.onChange(b)
    }
    render() {
        console.log(543,this.props.value)
        return (
            <DatePicker
                disabledDate={this.disabledDate.bind(this)}
                format="YYYY-MM-DD"
                value={this.props.value!=""?moment(this.props.value,'YYYY-MM-DD'):null}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}