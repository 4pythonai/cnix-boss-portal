import React from "react";
import { observer } from "mobx-react";
import { Modal, Card, Row, Col, Table } from "antd";
import api from "@/api/api";


import ResTimeColumns from '@/routes/commonAntTable/components/table_plugins/bill/columns/ResTimeColumns';
@observer
export default class MainCodeExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.init = this.init.bind(this);
	}

	state = {
		visible: false,
		title: '',
		openRow: {},
		resRows: [],
		subRows: [],
		maincode: "",
	};

	async init() {
		const _tmprec = this.props.commonTableStore.selectedRows[0];

		const params = {
			method: "POST",
			data: { maincode: _tmprec.bizcode },
		};

		const mainInfo = await api.dd.getMainCodeRelation(params);
		console.log(mainInfo);
		this.setState({
			openRow: mainInfo.openRow,
			resRows: mainInfo.resRows,
			subRows: mainInfo.subRows,
		})
		this.showModal()

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
				title="业务编号详情"
				visible={this.state.visible}
				onOk={this.hideModal}
				onCancel={this.hideModal}
				width={1320}
				footer={null}
			>

				<Row gutter={24} align="middle">
					<Col span={24}>
						<div>
							<strong>主业务编号: {this.state.openRow.maincode} </strong>
						</div>
						<div>
							<strong>合同号/客户名称:</strong> {this.state.openRow.contractno}/{this.state.openRow.custName}
						</div>
						<div>
							<strong>区域:</strong>
							{this.state.openRow.area}
						</div>
						<div>
							<strong>流程创建时间:</strong>
							{this.state.openRow.createTime}
						</div>
					</Col>

				</Row>
				<div style={{ paddingTop: "10px" }}>
					<Table size="small" columns={ResTimeColumns} dataSource={this.state.resRows} />
					<Table size="small" columns={ResTimeColumns} dataSource={this.state.subRows} />
				</div>
			</Modal >
		);
	}
}
