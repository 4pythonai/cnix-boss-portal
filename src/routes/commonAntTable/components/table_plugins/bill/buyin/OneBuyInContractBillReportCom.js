// 账单组件
import React from 'react';
import { Table, Divider, Button } from 'antd';
import { observer } from 'mobx-react';
import ResTimeColumns from '../columns/ResTimeColumns';
import CycleItemColumns from '../columns/CycleItemColumns';
import TimeLineColumns from '../columns/TimeLineColumns';
import SubTimeLineColumns from '../columns/SubTimeLineColumns';

import api from '@/api/api';

@observer
export default class OneContractBillReportCom extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.billjson = props.billjson;
        this.showSaveBillBtn = props.showSaveBillBtn;
        this.onlyShowTimeLine = props.onlyShowTimeLine;
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
    }

    saveBuyBill = async (e) => {
        console.log(this.props.store);
        let params = { data: this.props.store, method: 'POST' };
        let json = await api.billingBuy.saveBuyBill(params);
        console.log(json);
    };

    expandedTime = (record, index, indent, expanded) => {
        return <Table columns={SubTimeLineColumns} dataSource={record.timeline} rowKey="counter" pagination={false} />;
    };

    expandedLog = (record, index, indent, expanded) => {
        return <Table columns={ResTimeColumns} rowKey="key" dataSource={record.resource_logs} pagination={false} />;
    };

    render() {
        return (
            <div style={{ padding: '2px' }}>
                <div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>供应商名称:{this.billjson.vendorname}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同号:{this.billjson.contract.contract_no}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>付款周期:{this.billjson.contract.paycycle}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同起始:{this.billjson.contract.contract_start}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同终止:{this.billjson.contract.contract_end}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>周期性费用合计:{this.billjson.cyclefee_summary}元</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>费用合计:{this.billjson.total_summary}元</div>
                    {this.showSaveBillBtn == 'yes' ? (
                        <Button type="primary" icon="cloud-download" onClick={(event) => this.saveBuyBill(event)}>
                            保存账单[已生成账单不会被覆盖]
                        </Button>
                    ) : (
                        ''
                    )}

                    {this.onlyShowTimeLine !== 'yes' ? (
                        <div>
                            <Divider orientation="left">周期性账单-按产品(cycle_store)</Divider>
                            <Table
                                dataSource={this.billjson.cycle_store}
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
                        dataSource={this.billjson.contract_timeline}
                        rowKey="counter"
                        columns={TimeLineColumns}
                        pagination={false}
                        size="small"
                        expandedRowRender={this.expandedLog}
                    />
                </div>
            </div>
        );
    }
}
