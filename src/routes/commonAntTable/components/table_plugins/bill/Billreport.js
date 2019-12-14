
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import billingSummaryStore from "./billingSummaryStore"
import DevicePort from './DevicePort'


@observer
export default class Billreport extends React.Component {
    constructor(props) {
        super(props)
        this.store = billingSummaryStore
        this.init = this.init.bind(this)

    }


    state = {
        visible: false,
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        let params = { method: 'GET', data: { "contract_no": current_row.contract_no } }
        let json = await api.billing.billtest(params);
        this.store.setBillingData(json)
        this.setState({ visible: true })
    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }


    saveBill = async (e) => {
        console.log(this.store)
        let params = { data: this.store, method: 'POST' };
        let json = await api.billing.saveBill(params);
        console.log(json)
    }






    expandedTime = (record, index, indent, expanded) => {
        let timeline = record.timeline //该参数是从父表格带过来的key
        const cols = [
            {
                title: '账期',
                dataIndex: 'counter',
                key: 'counter',
            },
            {
                title: '起',
                dataIndex: '_begin',
                key: '_begin',
            },
            {
                title: '止',
                dataIndex: '_end',
                key: '_end',
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
                    snArray = text.split(";");

                    let br = <br></br>;
                    let result = null;
                    if (snArray.length < 2) {
                        return text;
                    }

                    for (let i = 0; i < snArray.length; i++) {
                        if (i == 0) {
                            result = snArray[i];
                        } else {
                            result = <span>{ result }{ br }{ snArray[i] }</span>;
                        }
                    }
                    return <div>{ result }</div>;
                }

            },
            {
                title: '费用',
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            }
        ]

        return (
            <Table
                columns={ cols }
                dataSource={ record.timeline }
                pagination={ false }

            />
        );
    };

    getColumnsCycleByResourceitem() {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '资源名称',
                dataIndex: 'sub_category',
                key: 'sub_category'
            },
            {
                title: '资源详情',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '周期',
                dataIndex: 'paycycle',
                key: 'paycycle'
            },
            {
                title: '价格(月)',
                dataIndex: 'price',
                key: 'price'
            },

            {
                title: '费用合计',
                dataIndex: 'row_summary',
                key: 'row_summary'
            }, {
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
            }, {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }

        ];
    }




    expandedLog = (record, index, indent, expanded) => {
        let resource_logs = record.resource_logs //该参数是从父表格带过来的key
        const cols = [

            {
                title: '起',
                dataIndex: '_begin',
                key: '_begin',
            },
            {
                title: '止',
                dataIndex: '_end',
                key: '_end',
            },
            {
                title: '产品分类',
                dataIndex: 'sub_category',
                key: 'sub_category',
            },

            {
                title: '资源明细',
                dataIndex: 'network_text',
                key: 'network_text',
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
        ]

        return (
            <Table
                columns={ cols }
                dataSource={ record.resource_logs }
                pagination={ false }

            />
        );
    };






    getColumnsOnetime() {
        return [
            {
                title: '费用名称',
                dataIndex: 'costName',
                key: 'costName',
            },
            {
                title: '费用',
                dataIndex: 'price',
                key: 'price',
            }

        ];
    }


    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: "billrpt",
            title: '账单',
            bodyStyle: {
                width: 1200,
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,
            onOk: this.saveFormData,
            onCancel: () => this.onCancel()
        }
    }


    render() {
        console.log('will render.....')
        let modalProps = this.getModalProps();
        return <Modal { ...modalProps }>
            <div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客户名称:{ this.store.cust.customer_name }</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>合同号:{ this.store.contract.contract_no }</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>付款周期:{ this.store.contract.paycycle }</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>月租金:{ this.store.contract.monthly_fee }元</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>合同起始:{ this.store.contract.contract_start }</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>合同终止:{ this.store.contract.contract_end }</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>周期性费用合计:{ this.store.cycleFee_summary }元</div>
                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>费用合计:{ this.store.total_summary }元</div>


                <Button onClick={ event => this.saveBill(event) }>保存账单</Button>

                <Divider orientation="left">周期性费用详情</Divider>

                <Table
                    dataSource={ this.store.cycle_store }
                    columns={ this.getColumnsCycleByResourceitem() }
                    pagination={ false }
                    size="small"
                    expandedRowRender={ this.expandedTime }
                />


                <Divider orientation="left">周期账单</Divider>

                <Table
                    dataSource={ this.store.contract_timeline }
                    columns={ this.getColumnsCycleByContractTimelime() }
                    pagination={ false }
                    size="small"
                    expandedRowRender={ this.expandedLog }
                />

                <Divider orientation="left">一次性账单</Divider>

                <Table
                    dataSource={ this.store.onetime_store }
                    columns={ this.getColumnsCycleByContractTimelime() }
                    pagination={ false }
                    size="small"

                />

            </div >
        </Modal >
    }
}
