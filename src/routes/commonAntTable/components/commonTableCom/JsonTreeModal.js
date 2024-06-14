import React from 'react';
import { Modal, Button } from 'antd';
import { JSONTree } from 'react-json-tree';
import { Table } from 'antd';

export default class JsonTreeModal extends React.Component {
    constructor(props) {
        // console.log('🚀 ~ file: JsonTreeModal.js ~ line 7 ~ JsonTreeModal ~ constructor ~ props', props);
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

        if (this.props.schema == 'billsjson') {
            bigjson = this.props.record.billsjson;
            // console.log('bigjson: ', bigjson);
            title = 'J包含的合同账单详情';
        }

        let rlog = JSON.parse(bigjson.replace(/\\/, ''));

        const _columns = [
            {
                title: '账单ID',
                dataIndex: 'id',
                key: 'id'
            },

            {
                title: '合同号',
                dataIndex: 'contract_no',
                key: 'contract_no'
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
                title: '实际费用',
                dataIndex: 'actual_money',
                key: 'actual_money'
            },
            {
                title: '调整费用',
                dataIndex: 'adjust_money',
                key: 'adjust_money'
            },

            {
                title: '账单类型',
                dataIndex: 'billtype',
                key: 'billtype'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            },
            {
                title: '产品名称',
                dataIndex: 'product_name',
                key: 'product_name'
            },
            {
                title: '账单编号',
                dataIndex: 'billpaperno',
                key: 'billpaperno'
            }
        ];

        // turn string to array

        return (
            <div>
                <Button onClick={this.showModal}>详情...</Button>
                <Modal visible={this.state.visible} title={title} onOk={this.hideModal} onCancel={this.hideModal} width={1320}>
                    <div>
                        <Table size={'small'} key={this.props.schema} className="commonTable" columns={_columns} dataSource={rlog} />
                    </div>
                </Modal>
            </div>
        );
    }
}
