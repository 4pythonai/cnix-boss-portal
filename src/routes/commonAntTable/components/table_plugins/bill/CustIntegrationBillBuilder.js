// 客户集成账单.
import React from 'react'
import { Modal, Collapse, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
const { Panel } = Collapse;
import IntegrationBillsCom from "./IntegrationBillsCom"


@observer
export default class CustIntegrationBillBuilder extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.init = this.init.bind(this)

    }


    state = {
        all_bills: [],
        visible: false,
        cust: {},
        custid: -1,
        big_total_summary: 0,
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个客户');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        this.setState({ custid: current_row.id })
        let params = { method: 'GET', data: { "custid": current_row.id } }
        let json = await api.billing.getUnUsedBills(params);
        console.log(json)

        this.setState({
            visible: true,

            all_bills: json.all_bills,
            big_total_summary: json.big_total_summary, cust: json.cust,
        })

    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: "billrpt",
            title: '生成合并账单',
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


    updateParentVisible(someValue) {
        console.log(someValue);//在这里就可以取到子组件传来的值
        this.setState({
            visible: someValue
        })

    }

    generatePanel() {
        let divs = []
        divs.push(
            <div key={ "AAA" }>
                <IntegrationBillsCom key={ 1 } updateParentVisible={ this.updateParentVisible.bind(this) } custid={ this.state.custid } onlyShowTimeLine="yes" howSaveBillBtn="no" bills={ this.state.all_bills } />
            </div>
        )
        return divs;
    }


    render() {
        let modalProps = this.getModalProps();
        return <Modal { ...modalProps }>
            <div>
                <div style={ { marginBottom: '5px', marginLeft: '5px' } }>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客户名称:{ this.state.cust.customer_name }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>地址:{ this.state.cust.address }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>开户行:{ this.state.cust.open_bank }元</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>银行帐号:{ this.state.cust.bank_account }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>费用合计:{ this.state.big_total_summary }</div>
                </div>
                { this.generatePanel() }
            </div >
        </Modal >
    }
}