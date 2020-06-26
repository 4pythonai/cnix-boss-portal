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
			value: this.props.defaultValue,
			fetching: false,
			customerList: []
		};
	}

	componentDidMount(){
		this.fetchCustomer(this.props.defaultValue.key)
	}

	

	fetchCustomer = async value => {
		console.log(value)
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

	handleChange = async customer_obj => {
		if(typeof customer_obj != 'object'){
			this.setState({
				value: customer_obj,
				data: [],
				fetching: false,
			});
			return;
		}

		await this.props.addressHandle(customer_obj.key)
		this.props.onChange(this.props.field_cfg, customer_obj.key)
		this.setState({
			value: customer_obj,
			data: [],
			fetching: false,
		});
	};

	render() {
		const { fetching, data, value } = this.state;
		console.log('查看客户名称',value);
		return (
			<Select
			
				// mode="multiple"
				showSearch
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
