import React, { useState, useEffect, } from 'react';
import { Input, Tree, Button } from 'antd';
import api from '@/api/api'

const { TextArea } = Input;

const Ip = ({ appendrows, catid, product_name, bizCode }) => {


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ margin: 0 }}>选择IP:</h3>
                <Button onClick={callAppendrows} >确定</Button>
            </div>
            {/* 选中的资源 */}
            <TextArea
                style={{ marginTop: '4px' }}
                value={cabinetStr}
                placeholder="选中的IP"
                readOnly
            />
        </div>
    );
};

export default Ip;