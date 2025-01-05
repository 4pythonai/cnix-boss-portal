import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api'; // 假设你的 api 配置在这里

const { Option } = Select;

const Allselect = observer(({ contract }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = { method: 'POST', data: { contract: contract } };
                const response = await api.dd.getGetContractProductName(params); // 使用 api.get 发送请求
                setOptions(response.data); // 假设返回的数据是 { data: [{value: '', label: ''}, ...]}

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (contract) {
            fetchData();
        }
    }, [contract]);

    const handleChange = (selectedValue) => {
        setValue(selectedValue);
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            loading={loading}
            style={{ width: '100%' }}
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
});

export default Allselect;
