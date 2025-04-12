import React, { useState, useEffect } from "react";
import { Input, Radio, Button, Form } from "antd";
import api from "@/api/api";

const { TextArea } = Input;

const Bandwidth = ({ appendrows, catid, product_name, bizCode }) => {
	const [site1Value, setSite1Value] = useState("");
	const [site1Text, setSite1Text] = useState("");
	const [bandwidth, setBandwidth] = useState("");
	const [sites, setSites] = useState([]);
	const [retobj, setRetobj] = useState({});

	// Equivalent to Vue's created lifecycle hook
	useEffect(() => {
		const fetchSites = async () => {
			try {
				const params = {
					data: {},
					method: "POST",
				};
				const res = await api.dresource.SelectBandwidth(params);
				if (res.code === 0) {
					setSites(res.data);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchSites();
	}, []);

	const siteHandler = (e) => {
		const selectedSite = sites.find((site) => site.value === e.target.value);
		setSite1Value(selectedSite.value);
		setSite1Text(selectedSite.text);
		setRetobj({
			name: site1Text,
			bw: bandwidth,
			site: site1Value,
		});
	};

	const saveData = () => {
		const RowObject = {};
		RowObject.operation = "删除";
		RowObject.bizcode = bizCode;
		RowObject.catid = catid;
		RowObject.product_name = product_name;
		RowObject.deliverType = "业务";
		RowObject.memo = "";
		RowObject.restext = JSON.stringify({
			name: site1Text,
			bw: bandwidth,
			site: site1Value,
		});
		appendrows(RowObject);
	};

	return (
		<div className="dad">
			<div className="row">
				<Button
					style={{ marginTop: "10px" }}
					className="left"
					size="small"
					onClick={saveData}
				>
					保存带宽
				</Button>
			</div>
			<br />

			<TextArea readOnly value={site1Text} placeholder="选择的带宽" />

			<div className="card">
				<div style={{ padding: "10px" }}>
					<Radio.Group value={site1Value} onChange={siteHandler}>
						{sites.map((site, index) => (
							<Radio style={{ width: "220px" }} key={index} value={site.value}>
								{site.text}
							</Radio>
						))}
					</Radio.Group>
				</div>

				<hr />
				<br />

				<div className="network-dev-selector">
					<Form>
						<Form.Item>
							<Input
								value={bandwidth}
								onChange={(e) => setBandwidth(e.target.value)}
								placeholder="请输入带宽"
								allowClear
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Bandwidth;
