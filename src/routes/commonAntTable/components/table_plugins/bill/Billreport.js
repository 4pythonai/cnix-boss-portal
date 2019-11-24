
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import pmStore from '@/store/pmStore'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import billingSummaryStore from "./billingSummaryStore"
import DevicePort from './DevicePort'


@observer
export default class Billreport extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.store = billingSummaryStore
        this.init = this.init.bind(this)
        // this.onCancel = this.onCancel.bind(this)

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


        console.log(current_row)
        let params = { method: 'GET', data: { "contract_no": current_row.contract_no } }
        let json = await api.billing.billtest(params);
        console.log(json)
        this.store.setBillingData(json)

        this.setState({ visible: true })
    }




    componentDidMount() {
        console.log(toJS(this.props.commonTableStore.selectedRows[0]))

    }


    onCancel = (e, f) => {

        console.log(this.refs.billrpt)


        this.setState({
            visible: false
        })
    }



    expandedRowRender = (record, index, indent, expanded) => {
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

    getColumnsCycle() {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '资源名称',
                dataIndex: 'sub_category',
                key: 'sub_category',
            },
            {
                title: '资源详情',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '周期',
                dataIndex: 'paycycle',
                key: 'paycycle',
            },
            {
                title: '价格(月)',
                dataIndex: 'price',
                key: 'price',
            },

            {
                title: '费用合计',
                dataIndex: 'row_summary',
                key: 'row_summary'
            }

        ];
    }

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
                <Divider orientation="left">周期性费用详情</Divider>

                <Table
                    dataSource={ this.store.cycle_store }
                    columns={ this.getColumnsCycle() }
                    pagination={ false }
                    size="small"
                    expandedRowRender={ this.expandedRowRender }
                />

            </div >
        </Modal >
    }
}
