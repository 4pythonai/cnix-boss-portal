import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Select } from 'antd';
import NumericInput from 'react-numeric-input';

const { TextArea } = Input;
@inject("chargeStore")
@observer
export default class OnceFee extends React.Component {
	constructor(props) {
		super(props);
		this.store = props.chargeStore
	}



	getOneceLoc = () => {
		if (this.store.isShowOneceLoc === false) {
			return null
		}
		return <div className="charge_form">
			<div className="charge_info"><span className="requireIcon">*</span>所在机房</div>
			<div className="charge_control">
				<Select
					onChange={value => this.store.setNormalFiledsValue(value, 'loc')}
					value={this.store.chargeRowData.loc || '请选择'}
					style={{ width: '100%' }}
				>
					<Select.Option value="请选择">请选择</Select.Option>
					<Select.Option value="东直门IDC">东直门IDC</Select.Option>
					<Select.Option value="酒仙桥IDC">酒仙桥IDC</Select.Option>
					<Select.Option value="燕郊IDC">燕郊IDC</Select.Option>
					<Select.Option value="太和桥IDC">太和桥IDC</Select.Option>
					<Select.Option value="房山IDC">房山IDC</Select.Option>
					<Select.Option value="国富瑞IDC">国富瑞IDC</Select.Option>
					<Select.Option value="上海嘉定IDC">上海嘉定IDC</Select.Option>
					<Select.Option value="廊坊IDC">廊坊IDC</Select.Option>
				</Select>
			</div>
		</div>
	}
	render() {
		return (
			<div>
				<div className="charge_form">
					<div className="charge_info"><span className="requireIcon">*</span>收费项</div>
					<div className="charge_control">
						<Select
							onChange={value => this.store.setNormalFiledsValue(value, 'once_charge_type')}
							value={this.store.chargeRowData.once_charge_type || '请选择'}
							style={{ width: '100%' }}
						>
							<Select.Option key='请选择' value="请选择">请选择收费项</Select.Option>
							<Select.Option key='机柜一次性费用' value="机柜一次性费用">机柜一次性费用</Select.Option>
							<Select.Option key='网络一次性费用' value="网络一次性费用">网络一次性费用</Select.Option>
							<Select.Option key='线路一次性费用' value="线路一次性费用">线路一次性费用</Select.Option>
						</Select>
					</div>
				</div>

				{this.getOneceLoc()}




				<div className="charge_form">
					<div className="charge_info"><span className="requireIcon">*</span>费用名称</div>
					<div className="charge_control">
						<Input
							onChange={value => this.store.setNormalFiledsValue(value, 'costName')}
							defaultValue={this.store.chargeRowData.costName || ''}
						/>
					</div>
				</div>
				<div className="charge_form">
					<div className="charge_info"><span className="requireIcon">*</span>金额</div>
					<div className="charge_price_control">
						<NumericInput
							className='price_input'
							min={0.00}
							step={0.01}
							onChange={value => this.store.setNormalFiledsValue(value, 'price')}
							value={this.store.chargeRowData.price}
						/>
						<span>元</span>
					</div>
				</div>

				<div className="charge_form">
					<div className="charge_info">备注</div>
					<div className="charge_control">
						<TextArea
							rows={4}
							placeholder="备注"
							type="text"
							name="remarks"
							onChange={event => this.store.setNormalFiledsValue(event, 'memo')}
							defaultValue={this.store.chargeRowData.memo || ''} />
					</div>
				</div>
			</div>
		);
	}
}
