import React, { useState, useEffect } from 'react';
import { Input, Button, AutoComplete } from 'antd';
import api from '@/api/api';

const { TextArea } = Input;
const { Option } = AutoComplete;

const Ip = ({ appendrows, catid, product_name, bizCode }) => {
    const [ipAddresses, setIpAddresses] = useState([{ ipaddress: '', idx: 0 }]);
    const [options, setOptions] = useState([]);
    const [IPAddrStr, setIPAddrStr] = useState('');
    const [rowObject, setRowObject] = useState({});

    // 处理IP输入变化
    const handleSearch = async (searchText) => {
        if (!searchText) {
            setOptions([]);
            return;
        }

        try {
            const params = {
                data: { query: searchText },
                method: 'POST'
            };
            const response = await api.dresource.SearchIPaddr(params);
            console.log("🌸🌸🌸🌸🌸 response", response);

            if (response.code === 0 && response.data) {
                // 确保数据格式正确
                const formattedData = response.data.map(item => ({
                    id: item.id || '',
                    ipaddress: item.ipaddress || ''
                }));
                setOptions(formattedData);
            }
        } catch (error) {
            console.error('Failed to search IP:', error);
        }
    };

    // 处理选择
    const handleSelect = (value, index) => {
        const newIpAddresses = [...ipAddresses];
        newIpAddresses[index].ipaddress = value;
        setIpAddresses(newIpAddresses);
        updateTotalStr(newIpAddresses);
    };

    // 修改handleChange只更新输入框的值，不更新TextArea
    const handleChange = (value, index) => {
        const newIpAddresses = [...ipAddresses];
        newIpAddresses[index].ipaddress = value;
        setIpAddresses(newIpAddresses);
    };

    // 测试用的静态选项
    useEffect(() => {
        // 设置一些测试数据
        setOptions([
            { value: '192.168.1.1', label: '192.168.1.1' },
            { value: '192.168.1.2', label: '192.168.1.2' },
        ]);
    }, []);

    // 添加IP输入框
    const addIP = () => {
        setIpAddresses([
            ...ipAddresses,
            { ipaddress: '', idx: ipAddresses.length }
        ]);
    };

    // 删除IP输入框
    const delIP = (index) => {
        const newIpAddresses = ipAddresses.filter((_, idx) => idx !== index);
        setIpAddresses(newIpAddresses);
        updateTotalStr(newIpAddresses);
    };

    // 更新总字符串
    const updateTotalStr = (addresses) => {
        const str = addresses
            .map(item => item.ipaddress)
            .filter(ip => ip)
            .join(',');
        setIPAddrStr(str);
    };

    // 确认选择
    const callAppendrows = () => {
        const RowObject = {
            operation: "删除",
            bizcode: bizCode,
            catid: catid,
            product_name: product_name,
            restext: JSON.stringify({
                text: IPAddrStr,
                nodes: ipAddresses.map(item => item.ipaddress).filter(ip => ip)
            })
        };
        setRowObject(RowObject);
        appendrows(RowObject);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ margin: 0 }}>选择IP:</h3>
                <Button onClick={callAppendrows}>确定</Button>
            </div>

            <TextArea
                style={{ marginTop: '4px', marginBottom: '16px' }}
                value={IPAddrStr}
                placeholder="选中的IP"
                readOnly
            />

            <Button
                type="primary"
                onClick={addIP}
                style={{ marginBottom: '16px' }}
            >
                增加IP
            </Button>

            {ipAddresses.map((item, index) => (
                <div
                    key={item.idx}
                    style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '8px',
                        backgroundColor: '#f5f5f5',
                        padding: '8px',
                        borderRadius: '4px'
                    }}
                >
                    <Button
                        type="primary"
                        danger
                        onClick={() => delIP(index)}
                    >
                        删除
                    </Button>
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={item.ipaddress}
                        onChange={(value) => handleChange(value, index)}
                        onSearch={handleSearch}
                        onSelect={(value) => handleSelect(value, index)}
                        placeholder="请输入IP地址搜索"
                    >
                        {options.map(opt => (
                            <Option key={opt.id} value={opt.ipaddress || ''}>
                                {opt.ipaddress || ''}
                            </Option>
                        ))}
                    </AutoComplete>
                </div>
            ))}
        </div>
    );
};

export default Ip;