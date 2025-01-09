import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, message } from 'antd';
import api from '@/api/api';
import Allselect from './DDOpenComponent/Allselect';
import DeliverSelector from './DDOpenComponent/DeliverSelector'

const DDOpen = ({ operated, processInstanceId, contractField, maincode, contractno }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div style={{ marginLeft: '15px', width: 850 }}>
            <div> 开通资源:业务编号:{maincode}/合同号:{contractno}     </div>
            <DeliverSelector bizcode={maincode} />
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    padding: '20px',
                    marginLeft: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px' // 添加间距
                }}>
                <Allselect maincode={maincode} contract={contractno} />
            </div>
        </div>
    );
};

export default DDOpen;
