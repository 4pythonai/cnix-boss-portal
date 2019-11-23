
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
                title: '起',
                dataIndex: 'periodstart',
                key: 'periodstart',
            },
            {
                title: '止',
                dataIndex: 'periodend',
                key: 'periodend',
            },
            {
                title: '满周期',
                dataIndex: 'fullcycle',
                key: 'fullcycle'
            },
            {
                title: 'Info:',
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

            }

            ,

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
                title: '资源名称',
                dataIndex: 'resname',
                key: 'resname',
            },
            {
                title: '周期',
                dataIndex: 'billing_cycle',
                key: 'billing_cycle',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount'
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
            destroyOnClose: true,
            ref: "billrpt",
            title: '账单',
            bodyStyle: {
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
                <div style={ { fontWeight: 'bold' } }>周期性费用合计:{ this.store.cycleFee_summary }元</div>
                <div style={ { fontWeight: 'bold' } }>一次性费用合计:{ this.store.onetimeFee_summary }元</div>
                <div style={ { fontWeight: 'bold' } }>费用合计:{ this.store.total_summary }元</div>
                <Divider orientation="left" >周期性费用详情</Divider>

                <Table
                    dataSource={ this.store.cycle_store }
                    columns={ this.getColumnsCycle() }
                    pagination={ false }
                    size="small"
                    expandedRowRender={ this.expandedRowRender }
                />

                <Divider orientation="left" >一次性费用详情</Divider>

                <Table
                    dataSource={ this.store.onetime_store }
                    pagination={ false }
                    size="small"
                    columns={ this.getColumnsOnetime() }
                />
            </div >
        </Modal >
    }
}
