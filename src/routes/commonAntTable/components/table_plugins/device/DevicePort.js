

import React from 'react'
import { Descriptions, Checkbox, Badge } from 'antd';

import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
const CheckboxGroup = Checkbox.Group;

@observer
export default class DevicePort extends React.Component {
    render() {
        return (
            <div style={ devport } className={ this.props.className }>
                {
                    this.props.port.selected
                        ?
                        <Badge status="processing" offset={ [40, -10] } dot={ false } />
                        :
                        <Badge status="default" offset={ [40, -10] } dot={ false } />
                }
                <div>{ '  ' }</div>
                <div>{ this.props.port.portmedia }</div>
                <div>{ this.props.port.portspeed }</div>
                <div>{ this.props.port.portname }</div>
            </div >
        )
    }
}


const devport = {
    border: '1px solid red',
    padding: '1px',
    borderRadius: '1px',
    background: '#fafafa',
    color: 'black',
    fontSize: '12px',
    cursor: 'pointer',
    width: '54px',
    height: '100px',
    margin: '1px',
    transition: '.3s background',
    '&:hover': {
        background: '#40a9ff'
    }
};
