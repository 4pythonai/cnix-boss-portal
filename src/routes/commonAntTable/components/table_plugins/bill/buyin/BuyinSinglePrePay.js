import React from 'react';
import { Modal, message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';
import OneBuyInContractBillReportCom from './OneBuyInContractBillReportCom';
@inject('billingSummaryStore')
@observer
export default class BuyinSinglePrePay extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.billingSummaryStore;
        this.init = this.init.bind(this);
    }

    state = {
        checkpassed: false,
        visible: false,
        billjson: {},
        toal_check_errors: []
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个合同');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        if (current_row.billingoption !== '预付') {
            message.error('请选择一个后付合同');
            return;
        }

        let params = { method: 'POST', data: { contract_no: current_row.contract_no } };
        let json = await api.billingBuy.SingleContractBill(params);
        if (json.code == 200) {
            this.store.setBillingData(json);
            this.setState({ visible: true, checkpassed: true, billjson: json });
        } else {
            this.setState({ visible: true, checkpassed: false, toal_check_errors: [] });
        }
    }

    getModalProps() {
        return {
            width: 1450,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '采购手工出账单[预付]:',
            bodyStyle: {
                width: 1440,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: this.saveFormData,
            footer: [
                <Button key="back" onClick={this.onCancel}>
                    关闭
                </Button>
            ],
            onCancel: () => this.onCancel()
        };
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    render() {
        let modalProps = this.getModalProps();
        if (this.state.checkpassed) {
            return (
                <Modal {...modalProps}>
                    <OneBuyInContractBillReportCom onlyShowTimeLine="no" store={this.props.billingSummaryStore} showSaveBillBtn="yes" billjson={this.state.billjson} />
                </Modal>
            );
        } else {
            return (
                <Modal {...modalProps}>
                    <div>
                        <p>合同资源项目时间检查失败:涉及到合同数量:{this.state.toal_check_errors.length}:</p>
                        {this.state.toal_check_errors.map((one_contract_error) => one_contract_error.errors.map((error) => <li key={error.idx}>{error.text}</li>))}
                    </div>
                </Modal>
            );
        }
    }
}
