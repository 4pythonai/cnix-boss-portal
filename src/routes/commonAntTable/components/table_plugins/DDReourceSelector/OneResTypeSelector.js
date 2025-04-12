import React, { useState, useEffect, Suspense, lazy } from "react";
import { Select, Button, Table, message, Input } from "antd";
import { observer } from "mobx-react";
import api from "@/api/api";

const { Option } = Select;

// 使用 lazy 和 Suspense 动态导入组件
// const Cabinet = lazy(() => import('./Cabinet'));
const Xpath = lazy(() => import("./Xpath"));
const Optical = lazy(() => import("./Optical"));
const Bandwidth = lazy(() => import("./Bandwidth"));
const Transfer = lazy(() => import("./Transfer"));
const Ip = lazy(() => import('./Ip'));
const Ethernet = lazy(() => import('./Ethernet'));
const Uloc = lazy(() => import('./Uloc'));
const Cabinet = lazy(() => import("./Cabinet"));
const Nothing = lazy(() => import("./Nothing"));

const OneResTypeSelector = observer(
	({ maincode, contract, resRows, setResRows }) => {
		const [options, setOptions] = useState([]);
		const [loading, setLoading] = useState(false);
		const [value, setValue] = useState("");
		const [SelectedComponent, setSelectedComponent] = useState(null);
		const [category, setCategory] = useState("");
		const [catid, setCatid] = useState("");

		useEffect(() => {
			const fetchData = async () => {
				setLoading(true);
				try {
					const params = { method: "POST", data: { contract: contract } };
					const response = await api.dd.getGetContractProductName(params);
					setOptions(response.data);
				} catch (error) {
					console.error("Error fetching data:", error);
				} finally {
					setLoading(false);
				}
			};

			if (contract) {
				fetchData();
			}
		}, [contract]);

		const handleChange = (selectedValue) => {
			console.log("置要渲染的组件", selectedValue);
			setValue(selectedValue);

			const selectedOption = options.find(
				(option) => option.value === selectedValue,
			);
			setCategory(selectedOption.label);
			setCatid(selectedOption.catid);
			// 根据选择的值动态设置要渲染的组件
			switch (selectedOption.category) {
				case "cabinet":
					setSelectedComponent(Cabinet);
					break;
				case "xpath":
					setSelectedComponent(Xpath);
					break;
				case "optical":
					setSelectedComponent(Optical);
					break;
				case "bandwidth":
					setSelectedComponent(Bandwidth);
					break;
				case "transfer":
					setSelectedComponent(Transfer);
					break;
				case "ip":
					setSelectedComponent(Ip);
					break;
				case "ethernet":
					setSelectedComponent(Ethernet);
					break;
				case "uloc":
					setSelectedComponent(Uloc);
					break;
				default:
					setSelectedComponent(Nothing);
					break;
			}
		};

		const deleteRow = (index) => {
			const newRows = [...resRows];
			newRows.splice(index, 1);
			setResRows(newRows);
		};

		const handleDeliverTypeChange = (value, record) => {
			const newRows = resRows.map((row) => {
				if (row.key === record.key) {
					return { ...row, deliverType: value };
				}
				return row;
			});
			setResRows(newRows);
		};

		const handleMemoChange = (value, record) => {
			const newRows = resRows.map((row) => {
				if (row.key === record.key) {
					return { ...row, memo: value };
				}
				return row;
			});
			setResRows(newRows);
		};

		const columns = [
			{
				title: "操作",
				width: 50,
				dataIndex: "operation",
				render: (text, record) => (
					<Button
						type="primary"
						size="small"
						onClick={() => deleteRow(record.key)}
					>
						删除
					</Button>
				),
			},
			{
				title: "主业务编号",
				dataIndex: "bizcode",
			},
			{
				title: "产品名称",
				dataIndex: "product_name",
			},
			{
				title: "资源详情",
				width: 400,
				dataIndex: "restext",
			},
			{
				title: "备注",
				width: 200,
				dataIndex: "memo",
				render: (text, record) => (
					<Input
						style={{ width: "200px" }}
						value={text || ""}
						onChange={(e) => handleMemoChange(e.target.value, record)}
					/>
				),
			},
			{
				title: "资源类型",
				width: 60,
				dataIndex: "deliverType",
				render: (text, record) => (
					<Select
						value={text || "业务"}
						style={{ width: 100 }}
						onChange={(value) => handleDeliverTypeChange(value, record)}
					>
						<Option value="业务">业务</Option>
						<Option value="配套">配套</Option>
						<Option value="自用">自用</Option>
					</Select>
				),
			},
		];

		const appendrows = (rowObject) => {
			setResRows([...resRows, rowObject]);
		};

		return (
			<div>
				<div style={{ padding: "0 10px 10px 10px", background: "#554e4e" }}>
					<div style={{ color: "white", padding: "10px 0" }}>
						预备开通的资源:
					</div>
					<div style={{ background: "white" }}>
						<Table
							columns={columns}
							rowKey="reactkey"
							dataSource={resRows}
							pagination={false}
						/>
					</div>
				</div>
				<br />
				<div style={{ padding: "10px 10px 10px 10px", background: "#f3f2f2" }}>
					选择资源类型:
					<Select
						value={value}
						onChange={handleChange}
						loading={loading}
						style={{ width: "100%", marginTop: "4px" }}
					>
						{options.map((option) => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
					{/* 使用 Suspense 包裹动态组件 */}
					<Suspense fallback={<div>Loading...</div>}>
						{SelectedComponent && (
							<div style={{ marginTop: "4px" }}>
								<SelectedComponent
									appendrows={appendrows}
									catid={catid}
									product_name={category}
									bizCode={maincode}
								/>
							</div>
						)}
					</Suspense>
				</div>
			</div>
		);
	},
);

export default OneResTypeSelector;
