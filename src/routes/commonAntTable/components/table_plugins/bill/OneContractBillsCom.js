// 账单组件
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import OneContractBillingStore from "./OneContractBillingStore"



@observer
export default class OneContractBillsCom extends React.Component {
    constructor(props) {
        super(props)
        this.bills = props.bills
    }
    state = {
        visible: false,
    }

    componentWillMount() {
        this.setState({ visible: true })
    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }



    getColumnsCycleByContractTimelime() {
        return [

            {
                title: '账单ID',
                dataIndex: 'id',
                key: 'id'
            },

            {
                title: '账期',
                dataIndex: 'counter',
                key: 'counter'
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
                title: '调整费用',
                dataIndex: 'adjust_money',
                key: 'adjust_money'
            },

            {
                title: '实际费用',
                dataIndex: 'actual_money',
                key: 'actual_money'
            },
            {
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
                rowKey="reactkey"
                dataSource={ record.resource_logs }
                pagination={ false }

            />
        );
    };

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


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${ selectedRowKeys }`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(toJS(record));
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    }




    render() {
        console.log('will render.....')
        return <div>
            <div>


                <Divider orientation="left">未付款账单</Divider>
                <Table

                    dataSource={ this.bills }
                    rowKey="counter"
                    columns={ this.getColumnsCycleByContractTimelime() }
                    pagination={ false }
                    size="small"
                    expandedRowRender={ this.expandedLog }
                    rowSelection={ this.rowSelection }

                />



            </div >
        </div >
    }
}
