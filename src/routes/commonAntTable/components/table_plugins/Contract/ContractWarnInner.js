import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import api from '@/api/api';

export default function ContractWarnInner(props) {
    const [warn, setWarn] = useState([]);

    const getWarndata = async (e) => {
        let params = { method: 'POST' };
        let json = await api.contract.getWarn(params);
        setWarn(json.warn);
    };

    useEffect(() => {
        getWarndata();
    }, []);

    const cols = [
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
            dataIndex: 'actual_money',
            key: 'actual_money'
        },

        {
            title: '账期开始',
            dataIndex: 'periodstart',
            key: 'periodstart'
        },
        {
            title: '账期结束',
            dataIndex: 'periodend',
            key: 'periodend'
        },

        {
            title: '备注',
            dataIndex: 'memo',
            key: 'memo'
        }
    ];

    return (
        <div className="count-box">
            <br />
            <Table columns={cols} rowKey="reactkey" dataSource={warn} pagination={false} />
            <br />
            <br />
        </div>
    );
}
