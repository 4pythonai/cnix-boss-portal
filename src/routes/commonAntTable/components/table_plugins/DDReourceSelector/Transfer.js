import React, { useState, useEffect } from "react";
import { Input, Radio, Button, Form } from "antd";
import api from "@/api/api";

const { TextArea } = Input;

const Transfer = ({ appendrows, catid, product_name, bizCode }) => {
	const [site1Value, setSite1Value] = useState("");
	const [site2Value, setSite2Value] = useState("");
	const [site1Text, setSite1Text] = useState("");
	const [site2Text, setSite2Text] = useState("");
	const [bandwidth, setBandwidth] = useState("");
	const [sites, setSites] = useState([]);
	const [retobj, setRetobj] = useState({});

	// 获取站点数据
	useEffect(() => {
		const fetchSites = async () => {
			try {
				const params = {
					data: {},
					method: "POST",
				};
				const res = await api.dresource.SelectTransfer(params);
				if (res.code === 0) {
					setSites(res.data);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchSites();
	}, []);

	// 处理站点选择
	const siteHandler = (value, siteNumber) => {
		const selectedSite = sites.find((site) => site.value === value);
		if (siteNumber === 1) {
			setSite1Value(selectedSite.value);
			setSite1Text(selectedSite.text);
		} else {
			setSite2Value(selectedSite.value);
			setSite2Text(selectedSite.text);
		}

		setRetobj({
			t1: site1Text,
			t2: site2Text,
			bw: bandwidth,
			s1: site1Value,
			s2: site2Value,
		});
	};

	// 保存数据
	const saveData = () => {
		const RowObject = {
			operation: "删除",
			bizcode: bizCode,
			catid: catid,
			product_name: product_name,
			deliverType: "业务",
			memo: "",
			restext: JSON.stringify({
				t1: site1Text,
				t2: site2Text,
				bw: bandwidth,
				s1: site1Value,
				s2: site2Value,
			}),
		};
		appendrows(RowObject);
	};

	return (
		<div className="dad">
			<div style={{ paddingTop: "10px" }} className="row">
				<Button onClick={saveData}>保存传输</Button>
			</div>
			<br />

			<TextArea
				readOnly
				value={`${site1Text} - ${site2Text}`}
				placeholder="选择的传输"
			/>

			<div style={{ marginTop: "20px" }}>
				<Form>
					<Form.Item label="带宽(m)">
						<Input
							value={bandwidth}
							onChange={(e) => setBandwidth(e.target.value)}
							placeholder="请输入带宽"
							allowClear
						/>
					</Form.Item>
				</Form>
			</div>

			<div style={{ paddingTop: "10px" }}>
				<div style={{ display: "flex", gap: "20px" }}>
					<div style={{ flex: 1 }}>
						<h4>资源提供商1</h4>
						<Radio.Group
							value={site1Value}
							onChange={(e) => siteHandler(e.target.value, 1)}
						>
							{sites.map((site, index) => (
								<Radio
									style={{ display: "block", marginBottom: "8px" }}
									key={index}
									value={site.value}
								>
									{site.text}
								</Radio>
							))}
						</Radio.Group>
					</div>

					<div style={{ flex: 1 }}>
						<h4>资源提供商2</h4>
						<Radio.Group
							value={site2Value}
							onChange={(e) => siteHandler(e.target.value, 2)}
						>
							{sites.map((site, index) => (
								<Radio
									style={{ display: "block", marginBottom: "8px" }}
									key={index}
									value={site.value}
								>
									{site.text}
								</Radio>
							))}
						</Radio.Group>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transfer;
