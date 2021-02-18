// 账单组件
import React from 'react';
import { Table, Divider, Button } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

@observer
export default class IntegrationBillsCom extends React.Component {
    constructor(props) {
        super(props);
        this.bills = props.bills;
    }

    componentWillMount() {
        this.setState({ visible: true });
    }

    saveCombinedBill = async (e) => {
        // let params = { data: this.store, method: 'POST' };
        // let json = await api.billing.saveCombinedBill(params);
        // console.log(json)
    };

    getColumnsCycleByContractTimelime() {
        return [
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
                title: '账期',
                dataIndex: 'counter',
                key: 'counter'
            },
            {
                title: '账单类型',
                dataIndex: 'billtype',
                key: 'billtype'
            },
            {
                title: '账期开始时间',
                dataIndex: 'periodstart',
                key: 'periodstart'
            },
            {
                title: '账期结束时间',
                dataIndex: 'periodend',
                key: 'periodend'
            },
            {
                title: '账期费用',
                dataIndex: 'period_money',
                key: 'period_money'
            },
            {
                title: '调整费用',
                dataIndex: 'adjust_money',
                key: 'adjust_money'
            },

            {
                title: '实际费用',
                dataIndex: 'actual_money',
                key: 'actual_money'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];
    }

    expandedLog = (record, index, indent, expanded) => {
        const cols = [
            {
                title: '起',
                dataIndex: '_begin',
                key: '_begin'
            },
            {
                title: '止',
                dataIndex: '_end',
                key: '_end'
            },
            {
                title: '产品子类',
                dataIndex: 'sub_category_name',
                key: 'sub_category_name'
            },

            {
                title: '资源明细',
                dataIndex: 'network_text',
                key: 'network_text'
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price'
            },

            {
                title: '费用',
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            },

            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ];

        return <Table columns={cols} rowKey="reactkey" dataSource={record.resource_logs} pagination={false} />;
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`选择的数据Keys: ${selectedRowKeys}`);
            console.log('选择的数据rows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(toJS(record));
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    };

    render() {
        console.log('will render.....');
        return (
            <div>
                <div>
                    <Button onClick={(event) => this.saveCombinedBill(event)}>保存合并账单</Button>

                    <Divider orientation="left">未付款账单</Divider>
                    <Table
                        dataSource={this.bills}
                        rowKey="id"
                        columns={this.getColumnsCycleByContractTimelime()}
                        pagination={false}
                        size="small"
                        expandedRowRender={this.expandedLog}
                        rowSelection={this.rowSelection}
                    />
                </div>
            </div>
        );
    }
}
