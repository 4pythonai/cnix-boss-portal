import React from 'react';
import { Modal, Button } from 'antd';
import { Table } from 'antd';

export default class JsonTableModal extends React.Component {
    constructor(props) {
        console.log('🚀 ~ file: JsonTableModal.js ~ line 7 ~ JsonTableModal ~ constructor ~ props', props);
        super(props);
    }
    state = {
        visible: this.props.visible
    };

    showModal = (e) => {
        console.log(this.props);
        this.setState({
            visible: true
        });
    };

    hideModal = (e) => {
        this.setState({
            visible: false
        });
    };

    render() {
        let bigjson = '{}';
        let title = '';
        if (this.props.schema == 'resource_logs') {
            bigjson = this.props.record.resource_logs;
            title = '资源详情Table';
        }
        if (this.props.schema == 'billsjson') {
            bigjson = this.props.record.billsjson;
            title = 'T包含的合同账单详情';
        }

        let rlog = JSON.parse(bigjson.replace(/\\/, ''));

        const _columns = [
            {
                title: '账单ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '起始日期',
                dataIndex: 'periodstart',
                key: 'periodstart'
            },
            {
                title: '结束日期',
                dataIndex: 'periodend',
                key: 'periodend'
            },
            {
                title: '周期',
                dataIndex: 'cycle',
                key: 'cycle'
            },
            {
                title: '是否满周期',
                dataIndex: 'fullcycle',
                key: 'fullcycle'
            },
            {
                title: '是否整月',
                dataIndex: 'fullmonth',
                key: 'fullmonth'
            },
            {
                title: '金额',
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            },
            {
                title: '信息',
                dataIndex: 'info',
                key: 'info'
            },
            {
                title: '资源信息',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '产品名称',
                dataIndex: 'product_name',
                key: 'product_name'
            },
            {
                title: '子类别名称',
                dataIndex: 'sub_category_name',
                key: 'sub_category_name'
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];

        return (
            <div>
                <Button onClick={this.showModal}>详情...</Button>
                <Modal visible={this.state.visible} title={title} onOk={this.hideModal} onCancel={this.hideModal} width={1320}>
                    <div>
                        <Table size={'small'} key={this.props.schema} className="commonTable" dataSource={rlog} columns={_columns} />
                    </div>
                </Modal>
            </div>
        );
    }
}
