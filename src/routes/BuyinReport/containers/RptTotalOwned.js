import React, { useState } from 'react';
import { Table, Button } from 'antd';
import api from '@/api/api';

export default function RptTotalOwned(props) {
    const [payplan, setPayplan] = useState([]);
    const [total, setTotal] = useState(0);

    const getPayPlan = async () => {
        setPayplan([]);
        setTotal(0);
        const params = { data: {}, method: 'POST' };
        const httpobj = await api.billing.GetBuyOwned(params);
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

    return (
        <div style={{ margin: '10px' }}>
            <span style={{ marginLeft: '10px' }} />
            <Button onClick={(event) => getPayPlan(event)}>获取数据</Button>
            <br />
            <br />
            <div>账单表格中payed字段为空则计为欠费</div>
            <span>总未付款(人民币): {total}元 </span>
            <br />
            <Table columns={columns} rowKey="reactkey" dataSource={payplan} pagination={false} />
        </div>
    );
}
