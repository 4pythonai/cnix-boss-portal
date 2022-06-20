import { Table } from 'antd';
import React from 'react';
import '../paper_bill_style.scss';

export default function ContractBillWrapper(props) {
    const expandedLog = (record, index, indent, expanded) => {
        const cols = [
            {
                title: '产品',
                className: 'small_table',
                dataIndex: 'product_name',
                key: 'product_name',
                width: '100px'
            },

            {
                title: '资源明细',
                className: 'small_table',
                dataIndex: 'network_text',
                key: 'network_text',
                width: '340px'
            },
            {
                title: '起',
                className: 'small_table',
                dataIndex: '_begin',
                key: '_begin',
                width: '80px'
            },
            {
                title: '止',
                className: 'small_table',
                dataIndex: '_end',
                key: '_end',
                width: '80px'
            },
            {
                title: '价格',
                className: 'small_table',
                dataIndex: 'price',
                key: 'price',
                width: '70px'
            },

            {
                title: '费用',
                className: 'small_table',
                dataIndex: 'shouldpay',
                key: 'shouldpay',
                width: '70px'
            },
            {
                title: '备注',
                className: 'small_table',
                dataIndex: 'memo',
                key: 'memo',
                width: '200px'
            }
        ];

        return <Table columns={cols} defaultExpandAllRows={true} rowKey="reactkey" rowClassName={'small_table'} dataSource={record.resource_logs} pagination={false} />;
    };

    const cols = [
        {
            title: '合同号',
            dataIndex: 'contract_no',
            key: 'contract_no',
            width: '140px'
        },
        {
            title: '账期开始',
            dataIndex: 'periodstart',
            key: 'periodstart',
            width: '150px'
        },
        {
            title: '账期结束',
            dataIndex: 'periodend',
            key: 'periodend',
            width: '150px'
        },

        {
            title: '账期金额',
            dataIndex: 'period_money',
            key: 'period_money',
            width: '156px'
        },
        {
            title: '调整金额',
            dataIndex: 'adjust_money',
            key: 'adjust_money'
        },
        {
            title: '调整事项',
            dataIndex: 'memo',
            key: 'memo'
        },

        {
            title: '实际金额',
            dataIndex: 'actual_money',
            key: 'actual_money'
        },

        {
            title: '账单类型',
            dataIndex: 'billtype',
            key: 'billtype'
        }
    ];

    return (
        <div>
            <Table
                dataSource={props.billrows}
                columns={cols}
                size="small"
                rowClassName={'big_table'}
                defaultExpandAllRows={true}
                pagination={false}
                expandedRowRender={expandedLog}
                style={{ marginBottom: '20px', marginLeft: '10px' }}
            />
        </div>
    );
}
