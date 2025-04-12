import React from 'react';
import { Select } from 'antd';

const { Option } = Select;


const DDUserSelector = ({ onSelect }) => {
    const userList = [
        { label: "刘超", value: "0611284435687725" },
        { label: "唐永进", value: "286600532521822387" },
        { label: "陈欣", value: "16551695175697348" },
        { label: "徐佳乐", value: "230756251324160461" },
        { label: "刘劲松", value: "16376478670235400" }
    ];

    return (
        <div style={{ margin: '18px' }}>
            发起人: &nbsp;
            <Select
                style={{ width: 200 }}
                placeholder="Select a person"
                onChange={onSelect}
            >
                {userList.map(option => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
};


export default DDUserSelector;