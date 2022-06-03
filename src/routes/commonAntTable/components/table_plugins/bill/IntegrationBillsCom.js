// 账单组件
import React from 'react';
import {message,Table,Divider,Button} from 'antd';
import {observer} from "mobx-react";
import api from '@/api/api';
import ResTimeColumns from './columns/ResTimeColumns'
import ContractBillColumns from './columns/ContractBillColumns'

@observer
export default class IntegrationBillsCom extends React.Component {
    constructor(props) {
        super(props);
        this.bills = props.bills;
        this.custid = props.custid;
    }


    state = {
        selectedRows: [],

    }


    saveCombinedBill = async (e) => {

        const dataSend = {custid: this.custid,selectedRows: this.state.selectedRows};
        const params = {data: dataSend,method: 'POST'};
        const json = await api.billing.saveCombinedBill(params);
        console.log(json);
        if(json.code === 200) {
            message.success(json.msg);
        } else {
            message.error(json.msg);
        }
        this.props.updateParentVisible(false);
    }



    expandedLog = (record,index,indent,expanded) => {
        return (
            <Table
                columns={ResTimeColumns}
                rowKey="key"
                dataSource={record.resource_logs}
                pagination={false}

            />
        );
    };


    rowSelection = {
        onChange: (selectedRowKeys,selectedRows) => {
            console.log('选择的数据rows: ',selectedRows);
            this.setState({selectedRows: selectedRows});
        },


        onSelectAll: (selected,selectedRows,changeRows) => {
            console.log(selected,selectedRows,changeRows);
        },
    }


    render() {

        return (
            <div>
                <div>

                    <Button onClick={(event) => this.saveCombinedBill(event)}>保存合并账单</Button>
                    <Divider orientation="left">未付款账单</Divider>
                    <Table
                        dataSource={this.bills}
                        rowKey="id"
                        columns={ContractBillColumns}
                        pagination={false}
                        size="small"
                        expandedRowRender={this.expandedLog}
                        rowSelection={this.rowSelection}
                    />
                </div >
            </div >
        )
    }
}
