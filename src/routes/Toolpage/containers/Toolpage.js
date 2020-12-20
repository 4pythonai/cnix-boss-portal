import React from 'react';
import { Divider, Button, Table } from 'antd';
import api from '@/api/api';
 

export default class Toolpage extends React.Component {
 

    state = {
        errbills: [],
        dupreport: '',
    }

      sync_contractbillids_vs_paperbill_ids=async () => {
        this.setState({ visible: true, errbills: [] });
        const params = { method: 'POST' };
        const json = await api.tools.sync_contractbillids_vs_paperbill_ids(params);
        console.log(json.errbills);
        this.setState({ errbills: json.errbills });
    }
    
    
      check_dup_contractbillids_used= async () => {
        this.setState({ visible: true, errbills: [] });
        const params = { method: 'POST' };
        const json = await api.tools.check_dup_contractbillids_used(params);
        this.setState({ dupreport: json.dupreport });
    }


    render() {

        const cols = [
        {
            title: '客户账单ID',
            dataIndex: 'paperid',
            key: 'paperid'
        },
        {
            title: '合同账单IDs',
            dataIndex: 'billids_str',
            key: 'billids_str'
        }
        ];

        return (
            <div style={{ margin: '100px' }}>

                <Divider />
                <Button key="sync" onClick={this.sync_contractbillids_vs_paperbill_ids}>
                    同步合同账单与客户账单关系
                </Button>

                <Divider />
                错误报告:[客户账单引用到的不存在的合同账单] <br />
                <br />
                <Table
                    dataSource={this.state.errbills}
                    rowKey="paperid"
                    columns={cols}
                    pagination={false}
                    size="small"
                />

                <Divider style={{ color: "red" }}/>
                
                
                <Button key="checkdup" onClick={this.check_dup_contractbillids_used}>
                    检查重复使用的合同账单ID
                </Button>
                <br/>
                <br/>
                 
                <div>{this.state.dupreport }</div>
            
                <Divider />
                
                <h3>测试数据:</h3>
                <Divider />
                <table>
                    <tbody>
                        <tr key={1}><td>公司IBM</td><td>ID:164</td></tr>
                        <tr key={2}><td>合同IBM1</td><td>ID:184</td></tr>
                        <tr key={3}><td>合同IBM2</td><td>ID:216</td></tr>
                    </tbody>
                </table>

                <Divider />

                <a href="http://103.151.148.2:5500/" target="_blank" rel="noopener noreferrer">客户portal</a>
                <br />  <br />

                <a href="http://103.151.148.2:8502/v2/log" target="_blank" rel="noopener noreferrer">系统日志(server)</a>
                <br />  <br />

                <a href="http://127.0.0.1:8502/v2/log" target="_blank" rel="noopener noreferrer">系统日志(local)</a>
                <br />  <br />

                <a href="http://103.151.148.2:3000/#/?contract=IBM1" target="_blank" rel="noopener noreferrer">IBM1调试界面</a>

            </div>

        );
    }
}
