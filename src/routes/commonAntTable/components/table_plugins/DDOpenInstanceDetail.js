import React from "react";
import { observer } from "mobx-react";
import { Modal } from "antd";
import ReactJson from "react-json-view";
import DDOpen from "./DDOpen";
import DDTasks from "./DDTasks";
import api from "@/api/api";
import JsonTableModal from "../commonTableCom/JsonTableModal";

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
		formComponentValues: [],
		operationRecords:[],
		tasks: [],
		title:'',
		contractItem: {},
		operated: "n",
		maincode: "",
		contractno: "",
		area: "",
		ddUserid: "",
	};

	async init() {
		const _tmprec = this.props.commonTableStore.selectedRows[0];

		const area = _tmprec.area;
		const processCode = _tmprec.processCode;
		const processInstanceId = _tmprec.processInstanceId;
		this.setState({ area: area });

		const params = {
			method: "POST",
			data: { area: area, processInstanceId: processInstanceId },
		};
		const flowResponse = await api.dd.getOpenFlowDetail(params);

		let jsonObj = {};
		try {
			// jsonObj = JSON.parse(_tmprec.detailJson);
			console.log("🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️🅰️");
			console.log(flowResponse.data.result);
			console.log("钉钉Userid", JSON.parse(sessionStorage.getItem("userInfo")).ddUserid);
			this.setState({ ddUserid: JSON.parse(sessionStorage.getItem("userInfo")).ddUserid });
			jsonObj = flowResponse.data.result;
			this.setState({ detailJson: jsonObj });
			this.setState({ processInstanceId: processInstanceId });
			this.setState({ formComponentValues: jsonObj.formComponentValues });
			this.setState({ tasks: jsonObj.tasks });
			this.setState({ operationRecords: jsonObj.operationRecords });
			const _contractItem = jsonObj.formComponentValues.find(
				(item) =>
					item.componentType === "TextField" &&
					item.name === "合同/补充协议编号",
			);
			this.setState({ contractItem: _contractItem });
			this.setState({ operated: _tmprec.operated });
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

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = (e) => {
		console.log(e);
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
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				width={1320}
				footer={null}
			>
				<div style={{ paddingTop: "10px" }}>
					<div id="left1" style={{ width: "100%" }}>
						<ReactJson
							collapsed={true}
							src={this.state.detailJson}
							theme="monokai"
						/>
					</div>
					<DDOpen
						maincode={this.state.maincode}
						contractno={this.state.contractno}
					/>
					<DDTasks
						ddUserid={this.state.ddUserid}
						area={this.state.area}
						operationRecords={this.state.operationRecords}
						processInstanceId={this.state.processInstanceId}
						tasks={this.state.tasks}
					/>
				</div>
			</Modal>
		);
	}
}
