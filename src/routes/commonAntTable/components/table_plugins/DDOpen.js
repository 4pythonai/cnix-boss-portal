import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, message } from 'antd';
import api from '@/api/api';

const DDOpen = ({ operated, processInstanceId, contractField, maincode, contractno }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);





    return (
        <Card title={`开通资源:${maincode}/${contractno}`} style={{
            marginLeft: '15px',
            width: 850
        }}>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    padding: '20px',
                    marginLeft: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px' // 添加间距
                }}>
                {products.map((product) => (
                    <div key={product.value} style={{ display: 'flex', width: '840px', alignItems: 'flex-start' }}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(product.value)}
                            checked={selectedProducts.includes(product.value)}
                            style={{ flexShrink: 0 }} // 防止 Checkbox 被压缩
                        />
                        <span style={{ width: '840px', marginLeft: '8px', lineHeight: '1.2' }}>
                            {' '}
                            {/* 调整文本样式 */}
                            {product.name}
                        </span>
                    </div>
                ))}


            </div>
        </Card>
    );
};

export default DDOpen;
