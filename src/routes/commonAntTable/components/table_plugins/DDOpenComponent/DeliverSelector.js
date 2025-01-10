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



    return (
        <div style={{ background: "#f3f2f2", padding: "10px" }}>
            <div style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="搜索相关子业务编号"
                    onSearch={handleSearch}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: 300 }}
                />

            </div>
            <div style={{ background: "#f3f2f2" }}>
                <Table
                    size="small"
                    columns={columns}
                    dataSource={deliveryData}
                    rowKey="deliveryno"
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default DeliverSelector;
