import React, { useState } from "react";
import { Table } from "antd";
import api from "@/api/api";
import ResCategorySelector from "./DDOpenComponent/ResCategorySelector";
import DeliverSelector from "./DDOpenComponent/DeliverSelector";
import DDTableFieldRender from "./DDOpenComponent/DDTableFieldRender";

const DDFormValueRender = ({ formComponentValues }) => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			width: "200px",
			key: 'name',
		},
		{
			title: 'Value',
			dataIndex: 'value',
			width: "800px",
			key: 'value',
			render: (text, record) => {
				if (record.componentType === 'TableField') {
					return <DDTableFieldRender value={text} />;
				}
				return text;
			}
		}
	];

	return (
		<div style={{ marginLeft: "15px", border: "2px solid black", padding: "10px" }}>
			<Table
				columns={columns}
				dataSource={formComponentValues}
				pagination={false}
				size="small"
				rowKey={(record, index) => index}
			/>
		</div>
	);
};

export default DDFormValueRender;
