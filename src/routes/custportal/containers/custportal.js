import React from 'react'
import { Table, Divider, Tag, Button } from 'antd';
import navigationStore from '@/store/navigationStore'

export default class custportal extends React.Component {
    render() {
        return (
            <div style={ { margin: '200px' } }>
                <a href="http://114.113.88.2:2200/#/login" target="_blank" rel="noopener noreferrer">客户portal</a>
            </div>
        )
    }
}