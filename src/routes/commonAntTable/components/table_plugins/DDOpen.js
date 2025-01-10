import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, message } from 'antd';
import api from '@/api/api';
import Allselect from './DDOpenComponent/Allselect';
import DeliverSelector from './DDOpenComponent/DeliverSelector'

const DDOpen = ({ maincode, contractno }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div style={{ marginLeft: '15px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}> 开通资源:业务编号:{maincode}/合同号:{contractno} </div>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    marginTop: '10px',
                    flexDirection: 'column',
                    gap: '10px' // 添加间距
                }}>
                <Allselect maincode={maincode} contract={contractno} />
                <DeliverSelector bizcode={maincode} />

            </div>
        </div>
    );
};

export default DDOpen;
