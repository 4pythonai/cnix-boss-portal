import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, Space, message } from 'antd';
import api from '@/api/api';

const DDShutdown = ({ contractField }) => {
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
                        contract: contractField.value
                    }
                };
                const response = await api.dd.GetContractProductName(params);
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

    const handleSubmit = async () => {
        try {
            await api.dd.CloseResource(selectedProducts);
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
        <Card title={`关闭资源/合同号:${contractField.value}`} style={{ width: 300 }}>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px' // 添加间距
                }}>
                {products.map((product) => (
                    <div key={product.value} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(product.value)}
                            checked={selectedProducts.includes(product.value)}
                            style={{ flexShrink: 0 }} // 防止 Checkbox 被压缩
                        />
                        <span style={{ marginLeft: '8px', lineHeight: '1.2' }}>
                            {' '}
                            {/* 调整文本样式 */}
                            {product.label} ({product.category})
                        </span>
                    </div>
                ))}
                <Button type="primary" onClick={handleSubmit} disabled={selectedProducts.length === 0} style={{ marginTop: '10px', width: '100%' }}>
                    关闭选中资源
                </Button>
            </div>
        </Card>
    );
};

export default DDShutdown;
