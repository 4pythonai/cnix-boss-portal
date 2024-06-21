import React, { createRef } from 'react';
import { observer } from 'mobx-react';
import { Divider, Select, message, Modal, Button } from 'antd';
import moment from 'moment';
import api from '@/api/api';
import { Progress } from 'antd';
const { Option } = Select;

@observer
export default class CustTransfer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.commonTableStore.selectedRows);

        this.state = {
            visible: false,
            sales: [],
            custID: null,
            custName: null,
            targetSales: null
        };
    }

    handleSalesChange = (value) => {
        console.log('value: ', value);
        this.setState({ targetSales: value });
    };

    batchTransfer = async () => {
        const fmdata = { sourceSales: sessionStorage.getItem('user'), targetSales: this.state.targetSales };
        console.log('fmdata: ', fmdata);
        let params = { data: fmdata, method: 'POST' };
        let json = await api.user.batchTransfer(params);
        console.log(json.paperids);
    };

    singleTransfer = async () => {
        const fmdata = { custID: this.state.custID, sourceSales: sessionStorage.getItem('user'), targetSales: this.state.targetSales };
        console.log('fmdata: ', fmdata);
        let params = { data: fmdata, method: 'POST' };
        let json = await api.user.singleTransfer(params);
        console.log(json.paperids);

        this.setState({ percent: 0, currentPaperId: null, total: json.total, sales: json.paperids, visible: true }, () => {
            this.downloadNext();
        });
    };

    async init() {
        console.log('init');

        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
        } else {
            let _tmprec = this.props.commonTableStore.selectedRows[0];
            this.setState({ custID: _tmprec.id, custName: _tmprec.customer_name });
            console.log(_tmprec);
        }

        this.setState({ visible: true });
        let params = { method: 'POST' };
        let json = await api.user.getAllSales(params);
        console.log(json);
        this.setState({ sales: json.sales });
    }

    onCancel = () => {
        this.setState({
            visible: false,
            custID: null,
            sales: []
        });
    };

    getModalProps() {
        return {
            width: 1400,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '客户迁移',
            bodyStyle: {
                width: 1400,
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        };
    }

    render() {
        const modalProps = this.getModalProps();
        const { total, currentPaperIdIndex, sales } = this.state;

        let singleEnabled = this.state.custID == null;

        return (
            <Modal {...modalProps}>
                <div>
                    <div id="query">
                        <div style={{ fontSize: '20px' }}>{this.state.custName}</div>
                        <span style={{ fontWeight: 'bold' }}> 当前创建人: {sessionStorage.getItem('staff_name')} </span>
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}> 迁移到: </span>
                        <Select disabled={singleEnabled} defaultValue="" style={{ width: 120 }} id="sales" onChange={this.handleSalesChange}>
                            {this.state.sales.map((sale) => (
                                <Option key={sale.id} value={sale.user}>
                                    {sale.staff_name}
                                </Option>
                            ))}
                        </Select>
                        <Button disabled={singleEnabled} style={{ marginLeft: '10px', marginRight: '4px' }} type="primary" onClick={this.singleTransfer} size={'large'}>
                            单客户迁移 {this.state.total}
                        </Button>
                    </div>

                    <Divider />

                    <div id="query">
                        <span style={{ fontWeight: 'bold' }}> 当前创建人: {localStorage.getItem('staff_name')} </span>
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}> 全部迁移到: </span>
                        <Select defaultValue="" style={{ width: 120 }} id="sales" onChange={this.handleSalesChange}>
                            {this.state.sales.map((sale) => (
                                <Option key={sale.id} value={sale.user}>
                                    {sale.staff_name}
                                </Option>
                            ))}
                        </Select>

                        <Button style={{ marginLeft: '10px', marginRight: '4px' }} type="primary" onClick={this.batchTransfer} size={'large'}>
                            批量迁移 {this.state.total}
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}
