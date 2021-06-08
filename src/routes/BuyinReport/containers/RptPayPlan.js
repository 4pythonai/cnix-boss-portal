import React, { useEffect, useState } from 'react';
import { Table, Button, DatePicker } from 'antd';
import api from '@/api/api';

const { MonthPicker } = DatePicker;

export default function RptPayPlan(props) {
    const [period, setPeriod] = useState('');
    const [payplan, setPayplan] = useState([]);

    const getPayPlan = async () => {
        const params = { data: { period: period }, method: 'POST' };
        const httpobj = await api.billing.GetBuyInPayPlan(params);
        console.log('返回的结果', httpobj);
        setPayplan(httpobj.rows);
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

    return (
        <div style={{ margin: '10px' }}>
            <span style={{ marginRight: '10px' }}> 选择账单月</span>
            <MonthPicker onChange={(e, str) => setPeriod(str)} placeholder="选择月份" />
            <span style={{ marginLeft: '10px' }} />
            <Button onClick={(event) => getPayPlan(event)}>获取数据</Button>
            <br />
            <br />
            <Table columns={columns} rowKey="reactkey" dataSource={payplan} pagination={false} />
        </div>
    );
}
