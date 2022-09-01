import React, { useState } from 'react';
import { Table, Button, DatePicker } from 'antd';
import api from '@/api/api';

const { MonthPicker } = DatePicker;

export default function RptPayPlanDetail(props) {
    const [period, setPeriod] = useState('');
    const [payplan, setPayplan] = useState([]);
    const [total, setTotal] = useState(0);

    const getPayPlanDetail = async () => {
        const params = { data: { period: period, region: props.region }, method: 'POST' };
        const httpobj = await api.billingBuy.GetBuyInPayPlanDetail(params);
        console.log('返回的结果', httpobj);
        setPayplan(httpobj.rows);
        setTotal(httpobj.total);
    };

    const columns = [
        {
            title: '供应商名称',
            dataIndex: 'vendorname',
            key: 'vendorname'
        },
        {
            title: '费用',
            dataIndex: 'subtotal',
            key: 'subtotal'
        }
    ];

    // 采购详情
    const expandedLog = (record, index, indent, expanded) => {
        console.log(record);

        const detailRecords = JSON.parse(record.resource_logs);
        const cols = [
            {
                title: '产品',
                className: 'small_table',
                dataIndex: 'product_name',
                key: 'product_name',
                width: '100px'
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
            }
        ];

        return <Table columns={cols} rowKey="reactkey" rowClassName={'small_table'} dataSource={detailRecords} pagination={false} />;
    };

    return (
        <div style={{ margin: '10px' }}>
            <span style={{ marginRight: '10px' }}> 选择账单月</span>
            <MonthPicker onChange={(e, str) => setPeriod(str)} placeholder="选择月份" />

            <span style={{ marginLeft: '10px' }} />
            <Button onClick={(event) => getPayPlanDetail(event)}>获取明细数据</Button>
            <br />
            <br />
            <span>付款计划(人民币): {total}元 </span>
            <br />
            <Table columns={columns} rowKey="key" expandedRowRender={expandedLog} dataSource={payplan} pagination={false} />
        </div>
    );
}
