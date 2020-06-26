import React from 'react';
import { Radio } from 'antd'
import api from '@/api/api'


export default class YesOrNo extends React.Component {
    constructor(props) {

        super(props)
<<<<<<< HEAD
=======
        console.log(777,props)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }


    onChange = e => {
        this.props.getComponentValue(e.target.value)
    };


    render() {

        return (
<<<<<<< HEAD
            <Radio.Group disabled={ this.props.editable?!(this.props.editable):false } onChange={ this.onChange } value={ this.props.value == '是' ? 'y' : this.props.value == '否' ? 'n' : this.props.value }>
=======
            <Radio.Group onChange={ this.onChange } value={ this.props.value }>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                <Radio value={ "y" }>是</Radio>
                <Radio value={ "n" }>否</Radio>
            </Radio.Group>
        );
    }
}