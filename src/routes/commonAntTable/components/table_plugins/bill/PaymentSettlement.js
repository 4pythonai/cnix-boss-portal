import { Modal, message, Table, Button } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';
import React from 'react';

@observer
export default class PaymentSettlement extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        unsettledbills: [],
        vendor: '',
        paymentid: -1,
        crmoney: 0,
        selectedRowKeys: [] // Check here to configure the default column
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);

        if (current_row.allused == 'y') {
            message.error('此条已经使用,无法再次销账');
            return;
        }

        console.log(current_row);
        this.setState({ crmoney: current_row.crmoney, vendor: current_row.vendor, paymentid: current_row.id });
        let params = { method: 'POST', data: { filename: current_row.filename, vendor: current_row.partnername, itemid: current_row.id } };
        let json = await api.billingBuy.prepareBuyInBills(params);
        console.log(json);
        this.setState({ ...json });
        this.setState({ visible: true });
    }

    componentDidMount() {}

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    saveBuyinPayment = async () => {
        console.log(this.state);
        let params = { method: 'POST', data: { paymentid: this.state.paymentid, buyinBillIds: this.state.selectedRowKeys } };
        console.log(params);
        let json = await api.billingBuy.saveBuyinPayment(params);
        console.log(json);
    };

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '应付账单销账',
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

    getColumns() {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },

            {
                title: '合同编号',
                dataIndex: 'contract_no',
                key: 'contract_no'
            },

            {
                title: '采购账单编号',
                dataIndex: 'billpaperno',
                key: 'billpaperno'
            },

            {
                title: '账单金额',
                dataIndex: 'period_money',
                key: 'period_money'
            },
            {
                title: '账期起始日',
                dataIndex: 'periodstart',
                key: 'periodstart'
            },
            {
                title: '账期终止日',
                dataIndex: 'periodend',
                key: 'periodend'
            }
        ];
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        let modalProps = this.getModalProps();
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true
        };

        return (
            <Modal {...modalProps}>
                <div>
                    供应商名称: {this.state.vendor}
                    <br />
                    发票金额:{this.state.crmoney}
                </div>
                <br />
                <br />
                未结清账单列表:
                <Button style={{ marginLeft: '1000px' }} type="danger" onClick={(event) => this.saveBuyinPayment(event)}>
                    保存账单
                </Button>
                <br />
                <br />
                <Table rowKey="id" rowSelection={rowSelection} dataSource={this.state.unsettledbills} columns={this.getColumns()} pagination={false} size="small" />
            </Modal>
        );
    }
}
