import React from "react";
import { observer } from "mobx-react";
import { Modal, Card, Row, Col } from "antd";
import ReactJson from "react-json-view";
import DDTasks from "./DDTasks";
import api from "@/api/api";

@observer
export default class DDOpenInstanceDetail extends React.Component {
	constructor(props) {
		super(props);
		this.init = this.init.bind(this);
	}

	state = {
		visible: false,
		detailJson: {},
		processInstanceId: null,
		operationRecords: [],
		tasks: [],
		title: '',
		maincode: "",
		contractno: "",
		area: "",
		custName: "",
	};

	async init() {
		const _tmprec = this.props.commonTableStore.selectedRows[0];
		const area = _tmprec.area;
		const processInstanceId = _tmprec.processInstanceId;
		this.setState({ area: area });
		this.setState({ custName: _tmprec.custName });
		const params = {
			method: "POST",
			data: { area: area, processInstanceId: processInstanceId },
		};
		const flowResponse = await api.dd.getOpenFlowDetail(params);

		let jsonObj = {};
		try {
			jsonObj = flowResponse.data.result;
			this.setState({ detailJson: jsonObj });
			this.setState({ processInstanceId: processInstanceId });
			this.setState({ tasks: jsonObj.tasks });
			this.setState({ operationRecords: jsonObj.operationRecords });
			this.setState({ maincode: _tmprec.maincode });
			this.setState({ contractno: _tmprec.contractno });
			this.setState({ title: jsonObj.title });
		} catch (error) {
			jsonObj = { aa: "解析失败" };
			this.setState({ detailJson: jsonObj });
		}

		this.showModal();
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	hideModal = () => {
		this.setState({
			visible: false,
		});
	};


	render() {
		return (
			<Modal
				destroyOnClose
				title={"DDOpenInstanceDetail:" + this.state.title}
				visible={this.state.visible}
				onOk={this.hideModal}
				onCancel={this.hideModal}
				width={1320}
				footer={null}
			>
				<div style={{ paddingTop: "10px" }}>
					<Card
						style={{
							border: "1px solid #f0f0f0",
							marginTop: "10px",
						}}
					>
						<Row gutter={16} align="middle">
							<Col span={16}>
								<div>
									<strong>合同号:</strong> {this.state.contractno}
								</div>
							</Col>
							<Col span={16}>
								<div>
									<strong>客户名称:</strong> {this.state.custName}
								</div>
							</Col>
							<Col span={16}>
								<div>
									<strong>钉钉流水号:</strong> {this.state.detailJson.businessId}
								</div>
							</Col>
						</Row>
					</Card>
					<div id="left1" style={{ width: "100%" }}>
						<ReactJson
							collapsed={true}
							src={this.state.detailJson}
							theme="monokai"
						/>
					</div>
					<DDTasks
						maincode={this.state.maincode}
						contractno={this.state.contractno}
						area={this.state.area}
						operationRecords={this.state.operationRecords}
						processInstanceId={this.state.processInstanceId}
						tasks={this.state.tasks}
						hideModal={this.hideModal}
					/>
				</div>
			</Modal>
		);
	}
}
