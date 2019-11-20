import React from 'react';
import { Radio } from 'antd'
import api from '@/api/api'


export default class YesOrNo extends React.Component {
    constructor(props) {

        super(props)
        console.log(777,props)
    }


    onChange = e => {
        this.props.getComponentValue(e.target.value)
    };


    render() {

        return (
            <Radio.Group onChange={ this.onChange } value={ this.props.value }>
                <Radio value={ "y" }>是</Radio>
                <Radio value={ "n" }>否</Radio>
            </Radio.Group>
        );
    }
}