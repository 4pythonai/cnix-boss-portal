import React from 'react';
import { registerFormFields, connect } from '@uform/react'
import { Input } from 'antd'


export default class ComCabinet extends React.Component{
    render(){
        return (
            <Input.TextArea onChange={this.props.onChange} value={ props.value || '' } />
        )
    }
}