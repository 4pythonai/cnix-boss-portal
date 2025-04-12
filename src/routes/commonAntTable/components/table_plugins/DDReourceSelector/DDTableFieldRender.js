import React from 'react';
import { Table } from 'antd';


// [{ "rowValue": [{ "label": "业务类型", "extendValue": { "label": "整柜", "key": "option_0" }, "value": "整柜", "key": "DDSelectField_UPWYALQC7K74" }, { "label": "机柜数量", "value": "3", "key": "TextField_20PVGKJEAJ1FK" }, { "label": "机柜类型", "extendValue": { "label": "托管机柜", "key": "option_1" }, "value": "托管机柜", "key": "DDSelectField_17J8Z36M2JGG0" }, { "label": "机柜电流", "value": "13", "key": "TextField_1UC754MYSQ3GG" }], "rowNumber": "TableField_WP4NR8GPZ2F4_WUVQ9P9J5DC0" }]

const DDTableFieldRender = ({ value }) => {
    try {
        const data = JSON.parse(value);
        if (!Array.isArray(data) || data.length === 0) return null;

        // Get the first row to determine columns
        const firstRow = data[0].rowValue;
        const columns = firstRow.map(item => ({
            title: item.label,
            dataIndex: item.key,
            key: item.key,
            render: (text, record) => {
                const cell = record.rowValue.find(c => c.key === item.key);
                return cell?.value || '';
            }
        }));

        // Transform data for the table
        const tableData = data.map((row, index) => ({
            ...row,
            key: index
        }));

        return (
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                size="small"
            />
        );
    } catch (error) {
        console.error('Error parsing TableField value:', error);
        return <div>Invalid Table Data</div>;
    }
};

export default DDTableFieldRender; 