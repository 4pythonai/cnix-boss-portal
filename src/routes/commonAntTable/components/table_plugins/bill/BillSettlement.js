import { Modal, message, Table, Button } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';
import React from 'react';
import UnSettledCustPaperBillCols from './columns/UnSettledCustPaperBillCols';

@observer
export default class BillSettlement extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        alreadyused: 0,
        custname: '',
        moneyleft: 0,
        moneyfrombank: 0,
        unsettledbills: [],
        selectedBills: [],
        bankitemid: 0
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        this.setState({ bankitemid: current_row.id });
        let params = { method: 'POST', data: { itemid: current_row.id } };
        let json = await api.billing.prepareBills(params);
        console.log(json);
        this.setState({ ...json });
        this.setState({ visible: true });
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    saveNewSettlement = async () => {
        if (this.state.moneyleft > 0) {
            console.log(this.state);
            let params = { method: 'POST', data: { itemid: this.state.bankitemid, bills: this.state.selectedBills } };
            let json = await api.billing.saveNewSettlement(params);
            console.log(json);
        } else {
            message.error('本条流水已经用尽');
        }
    };

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '销账',
            bodyStyle: {
                width: 1200,
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

    rowSelection = {
        onChange: (selectedRowKeys, items) => {
            console.log('选择的数据rows: ', items);
            this.setState({ selectedBills: items });
        },

        onSelectAll: (selected, selectedBills, changeRows) => {
            console.log(selected, selectedBills, changeRows);
        }
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    客户名称: {this.state.custname} <br />
                    流水金额: {this.state.moneyfrombank} <br />
                    已使用: {this.state.alreadyused}
                    <br />
                    剩余: {this.state.moneyleft}
                    <br />
                </div>
                <br />
                <br />
                未结清账单列表:
                <Button style={{ marginLeft: '1000px' }} type="danger" onClick={(event) => this.saveNewSettlement(event)}>
                    保存账单
                </Button>
                <br />
                <br />
                <Table rowSelection={this.rowSelection} dataSource={this.state.unsettledbills} columns={UnSettledCustPaperBillCols} pagination={false} size="small" />
            </Modal>
        );
    }
}
