import React from 'react'
import { Table, Divider, Tag, Button } from 'antd';
import navigationStore from '@/store/navigationStore'

export default class custportal extends React.Component {
    render() {
        return (
            <div style={ { margin: '100px' } }>
                <h3>测试数据:</h3>
                <Divider />
                <table>
                    <tbody>
                        <tr><td>公司IBM</td><td>ID:164</td></tr>
                        <tr><td>合同IBM1</td><td>ID:184</td></tr>
                        <tr><td>合同IBM2</td><td>ID:216</td></tr>
                    </tbody>
                </table>

                <Divider />


                <a href="http://114.113.88.2:2200/#/login" target="_blank" rel="noopener noreferrer">客户portal</a>
                <br />  <br />

                <a href="http://114.113.88.2:8502/v2/log" target="_blank" rel="noopener noreferrer">系统日志</a>
                <br />  <br />
                <a href="http://114.113.88.2:3000/#/?contract=IBM1" target="_blank" rel="noopener noreferrer">IBM1调试界面</a>








            </div>
        )
    }
}