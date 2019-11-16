import React from 'react';
import { Select, Spin, message } from 'antd';
import debounce from 'lodash/debounce'
import api from '@/api/api'

const { Option } = Select;

export default class CustomerRemoteSelect extends React.Component {
	constructor(props) {
		super(props);
		this.fetchCustomer = debounce(this.fetchCustomer, 800);
		this.state = {
			data: [],
			value: [],
			fetching: false,
			customerList: []
		};
	}

	

	fetchCustomer = async value => {
		if(!value){
			return;
		}
		
		this.setState({ data: [], fetching: true });
		let params = {
            data: { companyKey: value },
            method: 'POST'
        }
		let res = await api.customer.inquiryCompanyList(params);
		const data = res.data.data.items.map(customer => ({
			text: customer.name,
			value: customer.name,
		}));
		this.setState({ data, fetching: false });
	};

	handleChange = async value => {
		console.log(value)
		if(value.length == 0){
			this.setState({
				value,
				data: [],
				fetching: false,
			});
			return;
		}
		if(value.length >1 ){
			message.error('只能选择一条数据')
			return;
		}

		await this.props.addressHandle(value[0].key)
		this.props.onChange(this.props.field_cfg, value[0].key)
		this.setState({
			value,
			data: [],
			fetching: false,
		});
	};

	render() {
		const { fetching, data, value } = this.state;
		return (
			<Select
			
				mode="multiple"
				labelInValue
				value={value}
				placeholder="请输入客户名称"
				notFoundContent={fetching ? <Spin size="small" /> : null}
				filterOption={false}
				onSearch={this.fetchCustomer}
				onChange={this.handleChange}
				style={{ width: '100%' }}
			>
				{data.map(option => (
					<Option key={option.value}>{option.text}</Option>
				))}
			</Select>
		);
	}
}
