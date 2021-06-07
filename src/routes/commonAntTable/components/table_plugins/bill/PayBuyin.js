import React from 'react';
import { Modal, message, Button, DatePicker, Input } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';

@observer
export default class PayBuyin extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        paperbillid: -1,
        visible: false,
        invoice_date: '',
        invoice_no: '',
        paymoney: 0
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个采购合同账单');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(current_row);
        this.setState({ visible: true, paperbillid: current_row.id });
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '添加付款记录',
            bodyStyle: {
                width: 1200,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            visible: this.state.visible,
            onOk: this.saveLocateYearMonth,
            onCancel: () => this.onCancel()
        };
    }

    saveLocateYearMonth = async () => {
        this.props.refreshTable();
    };

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    onChangeInvoiceDate = (xdate, datestring) => {
        this.setState({
            invoice_date: datestring
        });
    };

    handleChangeInvoiceno = (e) => {
        e.persist();
        this.setState({ invoice_no: e.target.value });
    };

    handleChangeMoney = (e) => {
        e.persist();
        this.setState({ paymoney: e.target.value });
    };

    savePayBuyIn = async (e) => {
        console.log(this.state);
        let params = { method: 'POST', data: this.state };
        await api.billing.SaveBuyInBillPayment(params);
        this.props.refreshTable();
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    采购合同账单ID={this.state.paperbillid}
                    <br />
                    <br />
                    <DatePicker onChange={this.onChangeInvoiceDate} placeholder="开票日期" />
                    <br /> <br />
                    <Input onChange={this.handleChangeInvoiceno} style={{ width: '200px' }} placeholder="发票号码" />
                    <br /> <br />
                    <Input onChange={this.handleChangeMoney} style={{ width: '200px' }} placeholder="发票金额" />
                    <br /> <br />
                    <Button onClick={(event) => this.savePayBuyIn(event)}>保存</Button>
                </div>
            </Modal>
        );
    }
}
