import api from '@/api/api';
import { Collapse, Divider, message, Modal, Timeline } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import OneContractBillReportCom from './OneContractBillReportCom';
const { Panel } = Collapse;

@observer
export default class CustContractsBillAndPaymentSummary extends React.Component {
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
        payment_timeline: []
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个客户');
            return;
        }
        const current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        const params = { method: 'POST', data: { custid: current_row.id } };
        const json = await api.billingSale.getCustAllContractsBillingSummaryAndPayment(params);
        console.log(json);
        console.log(json.cust);

        this.setState({
            visible: true,
            payment_timeline: json.payment_timeline,
            big_total_summary: json.big_total_summary,
            cust: json.cust,
            IntegrationStore: json,
            united_results: json.united_results
        });
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1450,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '查看账期数据',
            bodyStyle: {
                width: 1440,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        };
    }

    generateTimeline() {
        const { payment_timeline } = this.state;
        const panels = [];

        for (let index = 0; index < payment_timeline.length; index++) {
            const one = payment_timeline[index];
            let color;
            if (one.total_money === one.payment_amount) {
                color = 'green';
            } else {
                color = 'red';
            }

            if (one.payment_amount === null) {
                one.payment_amount = 0;
            }

            const owed = (parseFloat(one.total_money) - parseFloat(one.payment_amount)).toFixed(2);
            panels.push(
                <Timeline.Item key={index} color={color}>
                    <p style={{ fontWeight: 'bold' }}> {one.paperno}</p>
                    <p style={{ fontSize: '13px' }}>账单费用: {one.total_money}</p>
                    <p style={{ fontSize: '13px' }}>已结费用: {one.payment_amount}</p>
                    <p style={{ fontSize: '13px' }}>欠费: {owed}</p>

                    <Divider />
                </Timeline.Item>
            );
        }

        return <Timeline>{panels}</Timeline>;
    }

    generatePanel() {
        const { united_results } = this.state;
        const panels = [];

        for (let index = 0; index < united_results.length; index++) {
            const one = united_results[index];
            panels.push(
                <Panel key={index} header={'合同号:' + one.contract_no + '费用:' + one.total_summary}>
                    <OneContractBillReportCom key={index} onlyShowTimeLine="yes" howSaveBillBtn="no" billjson={one} />
                </Panel>
            );
        }

        return panels;
    }

    render() {
        console.log('  客户集成账单.....');
        const modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <div style={{ marginBottom: '5px', marginLeft: '5px' }}>
                        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>客户名称:{this.state.cust.customer_name}</div>
                        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>费用合计:{this.state.big_total_summary}</div>
                    </div>
                    <Collapse style={{ width: '1400px' }} destroyInactivePanel={true}>
                        {this.generatePanel()}
                    </Collapse>
                </div>
                <br />
                <Divider style={{ color: 'red' }} />
                <div style={{ height: '100%' }}>{this.generateTimeline()}</div>
            </Modal>
        );
    }
}
