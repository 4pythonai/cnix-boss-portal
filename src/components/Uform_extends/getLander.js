import React from 'react';
import { Input } from 'antd'


export default class GetLander extends React.Component {
    constructor(props) {

        super(props)
        console.log(props)
    }
    componentWillMount(){
        this.props.onChange(localStorage.getItem('staff_name'))
    }
    render() {

        return (
            <Input disabled placeholder="" defaultValue={localStorage.getItem('staff_name')} />
        );
    }
}