import React from 'react';
import { Input } from 'antd'


export default class GetLander extends React.Component {
    constructor(props) {

        super(props)
        console.log(props)
    }
    componentWillMount(){
<<<<<<< HEAD
        console.log(1234,JSON.parse(sessionStorage.getItem('userInfo')).staff_name)
        this.props.onChange(JSON.parse(sessionStorage.getItem('userInfo')).staff_name)
=======
        this.props.onChange(localStorage.getItem('staff_name'))
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
    render() {

        return (
<<<<<<< HEAD
            <Input disabled placeholder="" defaultValue={JSON.parse(sessionStorage.getItem('userInfo')).staff_name}  value={this.props.value!=''?this.props.value:JSON.parse(sessionStorage.getItem('userInfo')).staff_name}/>
=======
            <Input disabled placeholder="" defaultValue={localStorage.getItem('staff_name')}  value={this.props.value!=''?this.props.value:localStorage.getItem('staff_name')}/>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        );
    }
}