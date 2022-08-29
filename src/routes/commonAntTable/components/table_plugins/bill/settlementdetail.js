import { Modal, Descriptions, message, InputNumber, Table, Icon, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';
import React, { useState } from 'react';
import { registerFormField, connect } from '@uform/antd';
import reqwest from 'reqwest';

@observer
export default class Settlementdetail extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        logs: [],
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
        let json = await api.billingSale.settlementdetail(params);
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

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '销账明细',
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
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: '客户账单编号',
                dataIndex: 'paperno',
                key: 'paperno'
            },
            {
                title: '账单费用',
                dataIndex: 'total_money',
                key: 'total_money'
            },
            {
                title: '已销账',
                dataIndex: 'payment_amount',
                key: 'payment_amount'
            }
        ];
    }

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <br />
                <br />
                <Table dataSource={this.state.logs} columns={this.getColumns()} pagination={false} size="small" />
            </Modal>
        );
    }
}
