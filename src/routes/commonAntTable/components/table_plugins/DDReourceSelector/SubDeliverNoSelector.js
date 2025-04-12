import React, { useState } from "react";
import { Input, Table, Button, message } from "antd";
import api from "@/api/api";

const SubDeliverNoSelector = ({ onSelect }) => {
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const columns = [
		{ title: "客户名称", dataIndex: "custname", key: "custname" },
		{ title: "子业务编号", dataIndex: "deliveryno", key: "deliveryno" },
		{ title: "产品名称", dataIndex: "product_name", key: "product_name" },
		{
			title: "操作",
			key: "action",
			width: 60,
			render: (_, record) => (
				<Button type="link" size="small" onClick={() => handleSelect(record.deliveryno)}>
					选择
				</Button>
			),
		},
	];

	const handleSearch = async (value) => {
		if (!value) {
			message.info("请输入要搜索的子业务编号");
			setSearchResults([]);
			return;
		}
		setLoading(true);
		setSearchResults([]);
		try {
			const params = {
				data: { deliveryno: value },
				method: "POST",
			};
			const res = await api.dresource.searchDeliverInfo(params);
			if (res?.data && res.data.length > 0) {
				setSearchResults(res.data);
			} else {
				setSearchResults([]);
				message.info("未找到相关数据");
			}
		} catch (error) {
			message.error("搜索失败");
			setSearchResults([]);
		} finally {
			setLoading(false);
		}
	};

	const handleSelect = (deliveryno) => {
		if (onSelect) {
			onSelect(deliveryno);
		}
	};

	return (
		<div style={{ maxHeight: '300px', overflowY: 'auto' }}>
			<div style={{ marginBottom: 8, paddingRight: '10px' }}>
				<Input.Search
					placeholder="搜索相关子业务编号"
					onSearch={handleSearch}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					style={{ width: '100%' }}
					loading={loading}
					enterButton
					size="small"
				/>
			</div>
			<Table
				size="small"
				columns={columns}
				dataSource={searchResults}
				rowKey="deliveryno"
				pagination={false}
				loading={loading}
			/>
		</div>
	);
};

export default SubDeliverNoSelector;
