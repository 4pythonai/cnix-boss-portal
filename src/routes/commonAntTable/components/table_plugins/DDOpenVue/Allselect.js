import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api'; // 假设你的 api 配置在这里

const { Option } = Select;

const Allselect = observer(({ value, onChange, url, contract }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = { method: 'POST', data: { contract: contract } };
                const response = await api.dd.getGetContractProductName(params);
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url, contract]);

    const handleChange = (selectedValue) => {
        const selectedOption = options.find(option => option.value === selectedValue);
        if (selectedOption) {
            onChange(selectedOption.category);
        } else {
            onChange(selectedValue); // If category not found, pass the value
        }
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