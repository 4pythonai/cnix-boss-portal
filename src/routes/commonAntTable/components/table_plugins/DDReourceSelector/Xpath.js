import React, { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { Button, Input, Radio, AutoComplete, message, Row, Col } from "antd";
import api from "@/api/api";

const { Option } = AutoComplete;

const Xpath = ({ appendrows, catid, product_name, bizCode }) => {
	const [lines, setLines] = useState([]); // ODF端口数组
	const [switchs, setSwitchs] = useState([]); // 交换机端口数组
	const [selectedOdfPorts, setSelectedOdfPorts] = useState([]);
	const [selectedSwPorts, setSelectedSwPorts] = useState([]);
	const [totalStr, setTotalStr] = useState("");
	const [odfOptions, setOdfOptions] = useState([]);
	const [switchOptions, setSwitchOptions] = useState([]);

	// 添加ODF端口行
	const addLine = () => {
		setLines([
			...lines,
			{
				odfid: "",
				portid: "",
				ports: [],
				IDX: lines.length,
				text: "",
			},
		]);
	};

	// 添加交换机端口
	const addSwitchport = () => {
		if (switchs.length >= 1) {
			message.warning("只能有一个交换机端口");
			return;
		}
		setSwitchs([...switchs, { switchid: "", portid: "", ports: [], text: "" }]);
	};

	// 创建防抖的搜索函数
	const debouncedSearchOdf = useMemo(
		() =>
			debounce(async (value) => {
				if (!value) {
					setOdfOptions([]);
					return;
				}
				try {
					const params = { data: { query: value }, method: "POST" };
					const res = await api.dresource.SearchOdf(params);
					const formattedData = res.data.map((item) => ({
						value: item.value,
						label: item.value,
						id: item.id,
					}));
					setOdfOptions(formattedData);
				} catch (err) {
					console.error(err);
					setOdfOptions([]);
				}
			}, 500),
		[],
	);

	const debouncedSearchSwitch = useMemo(
		() =>
			debounce(async (value) => {
				if (!value) {
					setSwitchOptions([]);
					return;
				}
				try {
					const params = { data: { query: value }, method: "POST" };
					const res = await api.dresource.SearchSwitch(params);
					const formattedData = res.data.map((item) => ({
						value: item.value,
						label: item.value,
						id: item.id,
					}));
					setSwitchOptions(formattedData);
				} catch (err) {
					console.error(err);
					setSwitchOptions([]);
				}
			}, 500),
		[],
	);

	// 清理防抖
	useEffect(() => {
		return () => {
			debouncedSearchOdf.cancel();
			debouncedSearchSwitch.cancel();
		};
	}, [debouncedSearchOdf, debouncedSearchSwitch]);

	// 修改搜索处理函数
	const handleSearchOdf = (value) => {
		debouncedSearchOdf(value);
	};

	const handleSearchSwitch = (value) => {
		debouncedSearchSwitch(value);
	};

	// 选择ODF后获取端口
	const handleSelectOdf = async (value, option, index) => {
		try {
			const params = { data: { odfid: option.key, catid }, method: "GET" };
			const res = await api.dresource.ListOdrport(params);
			const newLines = [...lines];
			newLines[index].ports = res.data;
			newLines[index].odfid = value;
			setLines(newLines);
		} catch (err) {
			console.error(err);
		}
	};

	// 选择交换机后获取端口
	const handleSelectSwitch = async (value, option) => {
		console.log(option);
		console.log(value);
		try {
			const params = { data: { switchid: option.key }, method: "GET" };
			const res = await api.dresource.ListSwitchport(params);
			const newSwitchs = [...switchs];
			newSwitchs[0].ports = res.data;
			newSwitchs[0].switchid = value;
			setSwitchs(newSwitchs);
		} catch (err) {
			console.error(err);
		}
	};

	// 删除ODF端口行
	const delOdfPortLine = (index) => {
		const newSelectedOdfPorts = [...selectedOdfPorts];
		lines[index].ports.forEach((port) => {
			const portIndex = newSelectedOdfPorts.indexOf(port.value);
			if (portIndex > -1) {
				newSelectedOdfPorts.splice(portIndex, 1);
			}
		});
		setSelectedOdfPorts(newSelectedOdfPorts);

		const newLines = [...lines];
		newLines.splice(index, 1);
		setLines(newLines);
	};

	// 删除交换机端口
	const delSwitch = (index) => {
		const newSelectedSwPorts = [...selectedSwPorts];
		switchs[index].ports.forEach((port) => {
			const portIndex = newSelectedSwPorts.indexOf(port.value);
			if (portIndex > -1) {
				newSelectedSwPorts.splice(portIndex, 1);
			}
		});
		setSelectedSwPorts(newSelectedSwPorts);

		const newSwitchs = [...switchs];
		newSwitchs.splice(index, 1);
		setSwitchs(newSwitchs);
	};

	// 处理ODF端口选择
	const handleOdfPortSelect = (portValue, portText, index) => {
		const newLines = [...lines];
		const newSelectedOdfPorts = [...selectedOdfPorts];

		// Clear previous selection for this ODF
		newLines[index].ports.forEach((port) => {
			const portIndex = newSelectedOdfPorts.indexOf(port.value);
			if (portIndex > -1) {
				newSelectedOdfPorts.splice(portIndex, 1);
			}
		});

		newSelectedOdfPorts.push(portValue);
		newLines[index].text = portText;
		newLines[index].portid = portValue;

		setSelectedOdfPorts(newSelectedOdfPorts);
		setLines(newLines);
		const result = calculateTotal();
		setTotalStr(result.text);
	};

	// 处理交换机端口选择
	const handleSwitchPortSelect = (portValue, portText, index) => {
		const newSwitchs = [...switchs];
		const newSelectedSwPorts = [...selectedSwPorts];

		// Clear previous selection
		newSwitchs[index].ports.forEach((port) => {
			const portIndex = newSelectedSwPorts.indexOf(port.value);
			if (portIndex > -1) {
				newSelectedSwPorts.splice(portIndex, 1);
			}
		});

		newSelectedSwPorts.push(portValue);
		newSwitchs[index].text = portText;
		newSwitchs[index].portid = portValue;

		setSelectedSwPorts(newSelectedSwPorts);
		setSwitchs(newSwitchs);
		const result = calculateTotal();
		setTotalStr(result.text);
	};

	// 计算总的选择结果
	const calculateTotal = () => {
		let str = "";
		lines.forEach((element) => {
			if (element.text) {
				str += `[${element.odfid}:${element.text}]`;
			}
		});
		switchs.forEach((element) => {
			if (element.text) {
				str += `[${element.switchid}:${element.text}]`;
			}
		});

		const retobj = {
			text: str,
			value: {
				odfports: selectedOdfPorts,
				swports: selectedSwPorts,
			},
		};

		setTotalStr(str);
		return retobj;
	};

	// 保存数据
	const saveData = () => {
		// "text":"[M1A07-1:6][BJ1_P7_DZSWZX:XE/0/0/21]",'value":{odfports":"150"],swports":["2675"]}}
		// const retobj = calculateTotal();

		// console.log("lines", lines);
		// console.log("switchs", switchs);
		// console.log("selectedOdfPorts", selectedOdfPorts);
		// console.log("selectedSwPorts", selectedSwPorts);
		// console.log("totalStr", totalStr);
		// console.log("odfOptions", odfOptions);
		// console.log("switchOptions", switchOptions);

		const RowObject = {};
		RowObject.operation = "删除";
		RowObject.bizcode = bizCode;
		RowObject.catid = catid;
		RowObject.deliverType = "业务";
		RowObject.memo = "";
		RowObject.product_name = product_name;
		RowObject.restext = JSON.stringify({
			text: totalStr,
			value: {
				odfports: selectedOdfPorts,
				swports: selectedSwPorts,
			},
		});
		console.log("🌸🌸🌸🌸🌸 RowObject", RowObject);
		appendrows(RowObject);
	};

	// 添加一个 useEffect 来处理状态变化
	useEffect(() => {
		const result = calculateTotal();
		setTotalStr(result.text);
	}, [lines, switchs, selectedOdfPorts, selectedSwPorts]); // 监听这些状态的变化

	return (
		<div className="dad">
			<div className="row" style={{ marginTop: "10px" }}>
				<Button onClick={saveData}>保存端口</Button>
			</div>

			<Input.TextArea
				style={{ marginTop: "10px" }}
				value={totalStr}
				placeholder="选择的端口"
				readOnly
			/>

			<div style={{ marginTop: "10px" }} className="row">
				<Button onClick={addLine}>增加ODF的端口</Button>
			</div>

			{/* ODF端口列表 */}
			{lines.map((item, index) => (
				<div
					style={{ marginTop: "10px", marginLeft: "10px" }}
					key={`odf-${index}`}
				>
					<Row align="middle" style={{ marginBottom: "8px" }}>
						<Col span={4}>
							<Button
								danger
								onClick={() => {
									delOdfPortLine(index);
								}}
							>
								删除
							</Button>
						</Col>
						<Col span={20}>
							<AutoComplete
								value={item.odfid}
								style={{ width: "100%" }}
								placeholder="请输入ODF名称"
								onSearch={handleSearchOdf}
								onSelect={(value, option) =>
									handleSelectOdf(value, option, index)
								}
							>
								{odfOptions.map((opt) => (
									<Option key={opt.id} value={opt.value}>
										{opt.label}
									</Option>
								))}
							</AutoComplete>
						</Col>
					</Row>

					<div className="oneport odfports">
						<Radio.Group
							value={item.portid}
							onChange={(e) => {
								const selectedPort = item.ports.find(
									(p) => p.value === e.target.value,
								);
								handleOdfPortSelect(
									selectedPort.value,
									selectedPort.port,
									index,
								);
							}}
						>
							{item.ports.map((port, idx) => (
								<Radio style={{ width: "300px" }} key={idx} value={port.value}>
									{port.port}
								</Radio>
							))}
						</Radio.Group>
					</div>
				</div>
			))}

			{/* 添加增加交换机端口按钮 */}
			<div style={{ marginTop: "10px" }}>
				<Button onClick={addSwitchport}>增加交换机端口(Xpath)</Button>
			</div>

			<div style={{ marginLeft: "10px" }}>
				{switchs.map((item, index) => (
					<div style={{ marginTop: "10px" }} key={`switch-${index}`}>
						<Row align="middle" style={{ marginBottom: "8px" }}>
							<Col span={4}>
								<Button
									onClick={() => {
										delSwitch(index);
									}}
								>
									删除
								</Button>
							</Col>
							<Col span={20}>
								<AutoComplete
									value={item.switchid}
									style={{ width: "100%" }}
									placeholder="请输入交换机名称"
									onSearch={handleSearchSwitch}
									onSelect={(value, option) =>
										handleSelectSwitch(value, option)
									}
								>
									{switchOptions.map((opt) => (
										<Option key={opt.id} value={opt.value}>
											{opt.label}
										</Option>
									))}
								</AutoComplete>
							</Col>
						</Row>

						<div className="oneport switchports">
							<Radio.Group
								value={item.portid}
								onChange={(e) => {
									const selectedPort = item.ports.find(
										(p) => p.value === e.target.value,
									);
									handleSwitchPortSelect(
										selectedPort.value,
										selectedPort.port,
										index,
									);
								}}
							>
								{item.ports.map((port, idx) => (
									<Radio
										style={{ width: "300px" }}
										key={idx}
										value={port.value}
									>
										{port.port}
									</Radio>
								))}
							</Radio.Group>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Xpath;
