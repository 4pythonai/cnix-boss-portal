import React from 'react';
import { Table } from 'antd';

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
				const cell = firstRow.find(c => c.key === record.key);
				return cell?.value || '';
			}
		}));

		// Transform data for the table
		const tableData = data.map((row, index) => {
			const rowData = {};
			row.rowValue.forEach(item => {
				rowData[item.key] = item.value;
			});
			return {
				...rowData,
				key: index
			};
		});

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