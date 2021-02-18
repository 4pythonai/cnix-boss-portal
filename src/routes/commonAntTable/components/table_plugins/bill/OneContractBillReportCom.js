// 账单组件
import React from 'react';
import { Table, Divider, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';

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
        this.setState({ visible: true });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        if (nextProps.hasOwnProperty('billjson')) {
            this.store.setBillingData(nextProps.billjson);
        }
    }

    saveBill = async (e) => {
        console.log(this.store);
        let params = { data: this.store, method: 'POST' };
        let json = await api.billing.saveBill(params);
        console.log(json);
    };

    expandedTime = (record, index, indent, expanded) => {
        const cols = [
            {
                title: '账期',
                dataIndex: 'counter',
                key: 'counter'
            },
            {
                title: '起',
                dataIndex: '_begin',
                key: '_begin'
            },
            {
                title: '止',
                dataIndex: '_end',
                key: '_end'
            },
            {
                title: '满周期',
                dataIndex: 'fullcycle',
                key: 'fullcycle'
            },
            {
                title: '计算方法',
                dataIndex: 'info',
                key: 'info',
                render: (text, record) => {
                    let snArray = [];
                    snArray = text.split(';');

                    let br = <br></br>;
                    let result = null;
                    if (snArray.length < 2) {
                        return text;
                    }

                    for (let i = 0; i < snArray.length; i++) {
                        if (i == 0) {
                            result = snArray[i];
                        } else {
                            result = (
                                <span>
                                    {result}
                                    {br}
                                    {snArray[i]}
                                </span>
                            );
                        }
                    }
                    return <div>{result}</div>;
                }
            },
            {
                title: '费用',
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            }
        ];

        return <Table columns={cols} dataSource={record.timeline} rowKey="counter" pagination={false} />;
    };

    getColumnsCycleByResourceitem() {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '产品子类',
                dataIndex: 'sub_category_name',
                key: 'sub_category_name'
            },
            {
                title: '资源详情',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '周期',
                dataIndex: 'payCycle',
                key: 'payCycle'
            },
            {
                title: '价格(月)',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '资源费用合计',
                dataIndex: 'item_total_fee',
                key: 'item_total_fee'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];
    }

    getColumnsCycleByContractTimelime() {
        return [
            {
                title: '账期',
                dataIndex: 'counter',
                key: 'counter'
            },
            {
                title: '是否满周期周期',
                dataIndex: 'fullcycle',
                key: 'fullcycle'
            },
            {
                title: '账期开始时间',
                dataIndex: 'periodstart',
                key: 'periodstart'
            },
            {
                title: '账期结束时间',
                dataIndex: 'periodend',
                key: 'periodend'
            },
            {
                title: '账期费用',
                dataIndex: 'period_money',
                key: 'period_money'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];
    }

    expandedLog = (record, index, indent, expanded) => {
        let resource_logs = record.resource_logs; //该参数是从父表格带过来的key
        const cols = [
            {
                title: '起',
                dataIndex: '_begin',
                key: '_begin'
            },
            {
                title: '止',
                dataIndex: '_end',
                key: '_end'
            },
            {
                title: '产品子类',
                dataIndex: 'sub_category_name',
                key: 'sub_category_name'
            },

            {
                title: '资源明细',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price'
            },

            {
                title: '费用',
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            },

            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];

        return <Table columns={cols} rowKey="reactkey" dataSource={record.resource_logs} pagination={false} />;
    };

    getColumnsOnetime() {
        return [
            {
                title: '费用名称',
                dataIndex: 'costName',
                key: 'costName'
            },
            {
                title: '费用',
                dataIndex: 'price',
                key: 'price'
            }
        ];
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(toJS(record));
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    };

    render() {
        console.log(this.store);
        return (
            <div>
                <div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>客户名称:{this.store.cust.customer_name}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同号:{this.store.contract.contract_no}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>付款周期:{this.store.contract.paycycle}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同月租金[非计费依据]:{this.store.contract.monthly_fee}元</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同起始:{this.store.contract.contract_start}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>合同终止:{this.store.contract.contract_end}</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>周期性费用合计:{this.store.cyclefee_summary}元</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>一次性费用合计:{this.store.onetimefee_summary}元</div>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>费用合计:{this.store.total_summary}元</div>
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
                                columns={this.getColumnsCycleByResourceitem()}
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
                        columns={this.getColumnsCycleByContractTimelime()}
                        pagination={false}
                        size="small"
                        expandedRowRender={this.expandedLog}
                    />

                    <Divider orientation="left">一次性账单</Divider>
                    <Table dataSource={this.store.onetime_store} columns={this.getColumnsCycleByContractTimelime()} pagination={false} size="small" />
                </div>
            </div>
        );
    }
}
