import React from 'react';
import { Button } from 'antd';
import api from '@/api/api';

const SystemTool = () => {
    const queryCallBack = async () => {
        const params = { data: {}, method: 'POST' };

        await api.bpm.queryCallBack();
    };

    return (
        <div style={{ margin: '30px' }}>
            <Button type="primary" onClick={queryCallBack}>
                查询回调
            </Button>
        </div>
    );
};

export default SystemTool;
