import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, message } from 'antd';
import api from '@/api/api';

const DDShutdown = ({ processInstanceId, contractField }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let params = {
                    method: 'POST',
                    data: {
                        processInstanceId: processInstanceId
                    }
                };
                const response = await api.dd.GetIntanceRelatedResItems(params);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (contractField && contractField.value) {
            fetchProducts();
        }
    }, [contractField]);

    const handleCheckboxChange = (checkedValue) => {
        setSelectedProducts((prev) => (prev.includes(checkedValue) ? prev.filter((value) => value !== checkedValue) : [...prev, checkedValue]));
    };

    const ddCloseResources = async () => {
        try {
            const params = {
                method: 'POST',
                data: {
                    processInstanceId: processInstanceId,
                    selectedProducts: selectedProducts
                }
            };

            await api.dd.CloseResourceItems(params);
            message.success('Resources closed successfully');
            setSelectedProducts([]);
        } catch (err) {
            message.error('Failed to close resources');
            console.error(err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card title={`关闭资源/合同号:${contractField.value}`} style={{ width: 900 }}>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    padding: '20px',
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
                <Button type="primary" onClick={ddCloseResources} disabled={selectedProducts.length === 0} style={{ marginTop: '200px', width: '200px' }}>
                    关闭选中资源
                </Button>
            </div>
        </Card>
    );
};

export default DDShutdown;
