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
<<<<<<< HEAD
			value: this.props.defaultValue,
=======
			value: [],
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
			fetching: false,
			customerList: []
		};
	}

<<<<<<< HEAD
	componentDidMount(){
		this.fetchCustomer(this.props.defaultValue.key)
	}

	

	fetchCustomer = async value => {
		console.log(value)
=======
	

	fetchCustomer = async value => {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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

<<<<<<< HEAD
	handleChange = async customer_obj => {
		if(typeof customer_obj != 'object'){
			this.setState({
				value: customer_obj,
=======
	handleChange = async value => {
		console.log(value)
		if(value.length == 0){
			this.setState({
				value,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
				data: [],
				fetching: false,
			});
			return;
		}
<<<<<<< HEAD

		await this.props.addressHandle(customer_obj.key)
		this.props.onChange(this.props.field_cfg, customer_obj.key)
		this.setState({
			value: customer_obj,
=======
		if(value.length >1 ){
			message.error('只能选择一条数据')
			return;
		}

		await this.props.addressHandle(value[0].key)
		this.props.onChange(this.props.field_cfg, value[0].key)
		this.setState({
			value,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
			data: [],
			fetching: false,
		});
	};

	render() {
		const { fetching, data, value } = this.state;
<<<<<<< HEAD
		console.log('查看客户名称',value);
		return (
			<Select
			
				// mode="multiple"
				showSearch
=======
		return (
			<Select
			
				mode="multiple"
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
