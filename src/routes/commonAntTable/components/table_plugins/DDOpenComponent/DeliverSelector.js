import React, { useState } from 'react';
import { Input, Table, Button, message } from 'antd';
import api from '@/api/api';

const DeliverSelector = ({ bizcode }) => {
    const [searchValue, setSearchValue] = useState('');
    const [deliveryData, setDeliveryData] = useState([]);
    const [relatedDelivernos, setRelatedDelivernos] = useState([]);

    // Table columns definition
    const columns = [
        { title: '客户名称', dataIndex: 'custname', key: 'custname' },
        { title: '送货单号', dataIndex: 'deliveryno', key: 'deliveryno' },
        { title: '业务属性', dataIndex: 'deliver_type', key: 'deliver_type' },
        { title: '子类别', dataIndex: 'sub_category', key: 'sub_category' },
        { title: '产品名称', dataIndex: 'product_name', key: 'product_name' },
        { title: '合同编号', dataIndex: 'contract_no', key: 'contract_no' },
        { title: '网络文本', dataIndex: 'network_text', key: 'network_text' },
        { title: '备注', dataIndex: 'memo', key: 'memo' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => handleDelete(record.deliveryno)}
                >
                    删除
                </Button>
            ),
        },
    ];

    // Search delivery data
    const handleSearch = async (value) => {
        try {
            const params = {
                data: { deliveryno: value },
                method: 'POST'
            };
            const res = await api.dresource.searchDeliverInfo(params);
            if (res?.data) {
                setDeliveryData(res.data);
                setRelatedDelivernos(res.data.map(item => item.deliveryno));
            }
        } catch (error) {
            message.error('搜索失败');
        }
    };

    // Delete delivery number
    const handleDelete = (deliveryno) => {
        setDeliveryData(prev => prev.filter(item => item.deliveryno !== deliveryno));
        setRelatedDelivernos(prev => prev.filter(no => no !== deliveryno));
    };

    // Submit related delivery numbers
    const handleSubmit = async () => {
        try {
            const params = {
                data: {
                    bizcode,
                    relatedDelivernos
                },
                method: 'POST'
            };
            const res = await api.DeliveryController.submit(params);
            if (res?.success) {
                message.success('提交成功');
            }
        } catch (error) {
            message.error('提交失败');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="请输入搜索关键词"
                    onSearch={handleSearch}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ marginLeft: 16 }}
                >
                    提交
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={deliveryData}
                rowKey="deliveryno"
                pagination={false}
            />
        </div>
    );
};

export default DeliverSelector;
