import React, { useState, useEffect, useMemo } from 'react';
import { Input, Button, AutoComplete } from 'antd';
import { debounce } from 'lodash';
import api from '@/api/api';

const { TextArea } = Input;
const { Option } = AutoComplete;

const Ip = ({ appendrows, catid, product_name, bizCode }) => {
    const [ipAddresses, setIpAddresses] = useState([{ ipaddress: '', idx: 0 }]);
    const [options, setOptions] = useState([]);
    const [IPAddrStr, setIPAddrStr] = useState('');
    const [rowObject, setRowObject] = useState({});

    // 使用useMemo来创建防抖的搜索函数
    const debouncedSearch = useMemo(
        () =>
            debounce(async (searchText) => {
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

                    if (response.code === 0 && response.data) {
                        const formattedData = response.data.map(item => ({
                            id: item.id || '',
                            ipaddress: item.ipaddress || ''
                        }));
                        setOptions(formattedData);
                    }
                } catch (error) {
                    console.error('Failed to search IP:', error);
                }
            }, 500), // 500ms 的防抖延迟
        []
    );

    // 处理搜索
    const handleSearch = (searchText) => {
        debouncedSearch(searchText);
    };

    // 在组件卸载时清除防抖
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

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
        // 使用 Set 去重
        const uniqueIps = [...new Set(
            addresses
                .map(item => item.ipaddress)
                .filter(ip => ip)
        )];
        const str = uniqueIps.join(',');
        setIPAddrStr(str);
    };

    // 确认选择
    const callAppendrows = () => {
        // 同样在这里也要确保使用去重后的IP列表
        const uniqueIps = [...new Set(
            ipAddresses
                .map(item => item.ipaddress)
                .filter(ip => ip)
        )];

        const RowObject = {
            operation: "删除",
            bizcode: bizCode,
            catid: catid,
            product_name: product_name,
            restext: JSON.stringify({
                text: IPAddrStr,
                nodes: uniqueIps  // 使用去重后的IP数组
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