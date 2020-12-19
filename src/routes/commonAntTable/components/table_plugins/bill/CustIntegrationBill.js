// 客户集成账单.
import React from 'react';
import { Modal, Collapse, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api';
import { toJS } from 'mobx';
import { randomString } from '@/utils/tools';
const { Panel } = Collapse;
import OneContractBillReportCom from "./OneContractBillReportCom";


@observer
export default class CustIntegrationBill extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.init = this.init.bind(this);

    }


    state = {
        IntegrationStore: {},
        united_results: [],
        visible: false,
        cust: {},
        big_total_summary: 0,
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个客户');
            return;
        }
        const current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        const params = { method: 'GET', data: { "custid": current_row.id } };
        const json = await api.billing.billByCust(params);
        console.log(json);

        this.setState({ visible: true, big_total_summary: json.big_total_summary, cust: json.cust, IntegrationStore: json, united_results: json.united_results });

    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: "billrpt",
            title: '查看账期数据',
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
        };
    }

    generatePanel() {


        const { united_results } = this.state;
        const panels = [];

        for (let index = 0; index < united_results.length; index++) {

            const one = united_results[index];
            panels.push(

                <Panel key={ index } header={ '合同号:' + one.contract_no + '费用:' + one.total_summary } >
                    <OneContractBillReportCom key={ index } onlyShowTimeLine="yes" howSaveBillBtn="no" billjson={ one } />
                </Panel >
            );
        }

        return panels;


    }


    render() {
        console.log('  客户集成账单.....');
        const modalProps = this.getModalProps();
        return <Modal { ...modalProps }>
            <div>

                <div style={ { marginBottom: '5px', marginLeft: '5px' } }>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客户名称:{ this.state.cust.customer_name }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>地址:{ this.state.cust.address }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>开户行:{ this.state.cust.open_bank }元</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>银行帐号:{ this.state.cust.bank_account }</div>
                    <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>费用合计:{ this.state.big_total_summary }</div>
                </div>


                <Collapse destroyInactivePanel={ true } >
                    {
                        this.generatePanel()
                    }

                </Collapse>

            </div >
        </Modal >;
    }
}
