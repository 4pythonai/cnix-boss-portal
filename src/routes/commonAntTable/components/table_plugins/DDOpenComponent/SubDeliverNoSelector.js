import React, { useState } from "react";
import { Input, Table, Button, message } from "antd";
import api from "@/api/api";

const SubDeliverNoSelector = ({ setRelatedDelivernos }) => {
	const [searchValue, setSearchValue] = useState("");
	const [deliveryData, setDeliveryData] = useState([]);
	const columns = [
		{ title: "客户名称", dataIndex: "custname", key: "custname" },
		{ title: "子业务编号", dataIndex: "deliveryno", key: "deliveryno" },
		{ title: "资源类型", dataIndex: "deliver_type", key: "deliver_type" },
		{ title: "子类别", dataIndex: "sub_category", key: "sub_category" },
		{ title: "产品名称", dataIndex: "product_name", key: "product_name" },
		{ title: "合同编号", dataIndex: "contract_no", key: "contract_no" },
		{ title: "网络文本", dataIndex: "network_text", key: "network_text" },
		{ title: "备注", dataIndex: "memo", key: "memo" },
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Button type="link" onClick={() => handleDelete(record.deliveryno)}>
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
				method: "POST",
			};
			const res = await api.dresource.searchDeliverInfo(params);
			if (res?.data) {
				// 检查新数据是否已存在
				const newData = res.data.filter(
					(newItem) =>
						!deliveryData.some(
							(existingItem) => existingItem.deliveryno === newItem.deliveryno,
						),
				);

				if (newData.length > 0) {
					// 追加新数据到现有数据中
					setDeliveryData((prevData) => [...prevData, ...newData]);
					// 更新关联的delivernos
					setRelatedDelivernos((prevNos) => [
						...prevNos,
						...newData.map((item) => item.deliveryno),
					]);
				} else {
					message.info("该送货单号已存在或未找到相关数据");
				}

				// 清空搜索框
				setSearchValue("");
			}
		} catch (error) {
			message.error("搜索失败");
		}
	};

	// Delete delivery number
	const handleDelete = (deliveryno) => {
		setDeliveryData((prev) =>
			prev.filter((item) => item.deliveryno !== deliveryno),
		);
		setRelatedDelivernos((prev) => prev.filter((no) => no !== deliveryno));
	};

	return (
		<div style={{ background: "#f3f2f2", padding: "10px" }}>
			<h2 style={{ fontSize: "14px" }}>选择关联子业务编号</h2>
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

export default SubDeliverNoSelector;
