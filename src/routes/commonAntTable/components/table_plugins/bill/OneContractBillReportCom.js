// 账单组件
import React from 'react';
import {Table,Divider,Button} from 'antd';
import {observer,inject} from 'mobx-react';

import ResTimeColumns from './columns/ResTimeColumns'
import CycleItemColumns from './columns/CycleItemColumns'
import TimeLineColumns from './columns/TimeLineColumns'
import SubTimeLineColumns from './columns/SubTimeLineColumns'


import api from '@/api/api';

@inject('billingSummaryStore')
@observer
export default class OneContractBillReportCom extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.billingSummaryStore;
        this.billjson = props.billjson;
        this.showSaveBillBtn = props.showSaveBillBtn;
        this.onlyShowTimeLine = props.onlyShowTimeLine;
    }

    componentWillMount() {
        this.store.setBillingData(this.billjson);
        this.setState({visible: true});
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps',nextProps);
        if(nextProps.hasOwnProperty('billjson')) {
            this.store.setBillingData(nextProps.billjson);
        }
    }

    saveBill = async (e) => {
        console.log(this.store);
        let params = {data: this.store,method: 'POST'};
        let json = await api.billing.saveBill(params);
        console.log(json);
    };

    expandedTime = (record,index,indent,expanded) => {
        return <Table columns={SubTimeLineColumns} dataSource={record.timeline} rowKey="counter" pagination={false} />;
    };



    expandedLog = (record,index,indent,expanded) => {
        return <Table columns={ResTimeColumns} rowKey="key" dataSource={record.resource_logs} pagination={false} />;
    };

    render() {
        console.log(this.store);
        return (
            <div style={{padding: '2px'}}>
                <div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>客户名称:{this.store.cust.customer_name}</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>合同号:{this.store.contract.contract_no}</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>付款周期:{this.store.contract.paycycle}</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>合同月租金[非计费依据]:{this.store.contract.monthly_fee}元</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>合同起始:{this.store.contract.contract_start}</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>合同终止:{this.store.contract.contract_end}</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>周期性费用合计:{this.store.cyclefee_summary}元</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>一次性费用合计:{this.store.onetimefee_summary}元</div>
                    <div style={{marginBottom: '5px',fontWeight: 'bold'}}>费用合计:{this.store.total_summary}元</div>
                    {this.showSaveBillBtn == 'yes' ? (
                        <Button type="primary" icon="cloud-download" onClick={(event) => this.saveBill(event)}>
                            保存账单[已生成账单不会被覆盖]
                        </Button>
                    ) : (
                        ''
                    )}

                    {this.onlyShowTimeLine !== 'yes' ? (
                        <div>
                            <Divider orientation="left">周期性账单-按产品(cycle_store)</Divider>
                            <Table
                                dataSource={this.store.cycle_store}
                                rowKey="id"
                                columns={CycleItemColumns}
                                pagination={false}
                                size="small"
                                expandedRowRender={this.expandedTime}
                            />
                        </div>
                    ) : (
                        ''
                    )}

                    <Divider orientation="left">[合同账单数据]周期性账单-按账期(contract_timeline)</Divider>
                    <Table
                        dataSource={this.store.contract_timeline}
                        rowKey="counter"
                        columns={TimeLineColumns}
                        pagination={false}
                        size="small"
                        expandedRowRender={this.expandedLog}
                    />

                    <Divider orientation="left">一次性账单</Divider>
                    <Table dataSource={this.store.onetime_store} columns={TimeLineColumns} pagination={false} size="small" />
                </div>
            </div>
        );
    }
}
