import { Modal, Descriptions, message, InputNumber, Table, Icon, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import React, { useState } from 'react';
import { registerFormField, connect } from '@uform/antd';
import reqwest from 'reqwest';



@observer
export default class BillSettlement extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
        alreadyused: 0,
        custname: '',
        moneyleft: 0,
        moneyfrombank: 0,
        unsettledbills: [],
        bankitemid: 0,
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        this.setState({ bankitemid: current_row.id })
        let params = { method: 'POST', data: { "itemid": current_row.id } }
        let json = await api.billing.prepareBills(params);
        console.log(json)
        this.setState({ ...json })
        this.setState({ visible: true })
    }


    componentDidMount() {
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }


    saveSettlement = async () => {


        if (this.state.moneyleft > 0) {
            console.log(this.state)
            let params = { method: 'POST', data: { itemid: this.state.bankitemid, bills: this.state.unsettledbills } }
            let json = await api.billing.saveSettlement(params);
            console.log(json)

        } else {

            message.error('本条流水已经用尽')
        }




    }






    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '销账',
            bodyStyle: {
                width: 1200,
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        }
    }



    getColumns() {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '合同号',
                dataIndex: 'contract_no',
                key: 'contract_no',
            },
            {
                title: '账期',
                dataIndex: 'counter',
                key: 'counter'
            },

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
                title: '账单费用',
                dataIndex: 'period_money',
                key: 'period_money'
            },

            {
                title: '已结',
                dataIndex: 'payed',
                key: 'payed'
            },

            {
                title: '未结',
                dataIndex: 'unsettled',
                key: 'unsettled'
            },
            {
                title: '本次结',
                dataIndex: 'newsettled',
                key: 'newsettled'
            }
        ];
    }

    render() {
        let modalProps = this.getModalProps();
        return <Modal { ...modalProps }>
            <div>
                客户名称: { this.state.custname } <br />
                流水金额: { this.state.moneyfrombank } <br />
                已使用: { this.state.alreadyused }<br />
                剩余: { this.state.moneyleft }<br />
            </div >
            <br /><br />
            未结清账单:    <Button style={ { marginLeft: '1000px' } } type="danger" onClick={ event => this.saveSettlement(event) }>保存账单</Button>

            <br /><br />
            <Table
                dataSource={ this.state.unsettledbills }
                columns={ this.getColumns() }
                pagination={ false }
                size="small"
            />
        </Modal >
    }
}
