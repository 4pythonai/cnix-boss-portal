import React from "react";
import { observer } from "mobx-react";
import { Modal, Card, Row, Col } from "antd";
import ReactJson from "react-json-view";
import DDTasks from "./DDOpenComponent/DDTasks";
import api from "@/api/api";
import DDFormValueRender from "./DDOpenComponent/DDFormValueRender";
import DDUserSelector from "./DDOpenComponent/DDUserSelector";
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
		fetchSuccess: true,
		ddUser: "",
	};

	async init() {
		const _tmprec = this.props.commonTableStore.selectedRows[0];
		const area = _tmprec.area;
		this.setState({ processInstanceId: _tmprec.processInstanceId });
		this.setState({ area: area });
		this.setState({ custName: _tmprec.custName });

		const params = {
			method: "POST",
			data: { area: area, processInstanceId: _tmprec.processInstanceId },
		};

		const flowResponse = await api.dd.getOpenFlowDetail(params);

		let flowObj = {};
		try {
			flowObj = flowResponse.data.result;
			this.setState({ detailJson: flowObj });
			this.setState({ tasks: flowObj.tasks });
			this.setState({ operationRecords: flowObj.operationRecords });
			this.setState({ maincode: _tmprec.maincode });
			this.setState({ contractno: _tmprec.contractno });
			this.setState({ title: flowObj.title });
			if (flowResponse.code === 200) {
				this.setState({ fetchSuccess: true });
				this.showModal();
			} else {
				this.setState({ fetchSuccess: false });
			}

		} catch (error) {
			flowObj = { aa: "解析失败" };
			this.setState({ detailJson: flowObj });
		}

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

	refreshTasks = async () => {
		const params = {
			method: "POST",
			data: { area: this.state.area, processInstanceId: this.state.processInstanceId },
		};
		const flowResponse = await api.dd.getOpenFlowDetail(params);
		try {
			const flowObj = flowResponse.data.result;
			this.setState({
				tasks: flowObj.tasks,
				operationRecords: flowObj.operationRecords
			});
		} catch (error) {
			console.error("刷新任务列表失败:", error);
		}
	};

	renderBusinessId() {
		return this.state.fetchSuccess ? (
			<div>
				<strong>钉钉流水号:</strong> {this.state.detailJson.businessId}
			</div>
		) : (
			<div>
				<strong>钉钉流水号:</strong> 获取失败
			</div>
		);
	}

	renderFormValueRender() {
		return this.state.fetchSuccess ? (
			<DDFormValueRender formComponentValues={this.state.detailJson.formComponentValues} />
		) : (
			<>
			</>
		);
	}

	renderTasks() {
		return this.state.fetchSuccess ? (
			<DDTasks
				actionerUserId={this.state.ddUser}
				maincode={this.state.maincode}
				contractno={this.state.contractno}
				area={this.state.area}
				operationRecords={this.state.operationRecords}
				processInstanceId={this.state.processInstanceId}
				tasks={this.state.tasks}
				hideModal={this.hideModal}
				refreshTasks={this.refreshTasks}
			/>
		) : (
			<>
			</>
		);
	}

	// Define a function to handle user selection
	handleUserSelect = (value) => {
		this.setState({ ddUser: value });
	}

	render() {
		return (
			<Modal
				destroyOnClose
				title={`DDOpenInstanceDetail:${this.state.title}`}
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
								{this.renderBusinessId()}
							</Col>
						</Row>
					</Card>
					<DDUserSelector onSelect={this.handleUserSelect} />
					{/* <div id="left1" style={{ width: "100%" }}>
						<ReactJson
							collapsed={true}
							src={this.state.detailJson}
							theme="monokai"
						/>
					</div> */}
					{this.renderFormValueRender()}
					{this.renderTasks()}
				</div>
			</Modal>
		);
	}
}
