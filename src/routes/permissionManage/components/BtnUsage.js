import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import api from '@/api/api';

export default function BtnUsage(props) {
    const [usageRows, setUsageRows] = useState([]);

    const getButtonInfo = async (e) => {
        let params = { method: 'POST', data: { button_code: props.button_code } };
        let json = await api.permission.getButtonInfo(params);
        setUsageRows(json.usageRows);
    };

    useEffect(() => {
        getButtonInfo();
    }, []);

    const cols = [
        {
            title: '菜单名称',
            dataIndex: 'text'
        },
        {
            title: 'action_code',
            dataIndex: 'action_code'
        },
        {
            title: '路由',
            dataIndex: 'router',
            key: 'router'
        }
    ];

    return (
        <div className="count-box">
            <Table columns={cols} rowKey="key" dataSource={usageRows} pagination={false} />
        </div>
    );
}
