import React from "react"
import { observer, inject } from "mobx-react";
import { Icon, message } from 'antd'
import SignCustomer from './SignCustomer'
import api from '@/api/api'

@inject("IDC_cfg_store")
@observer
export default class SignCustomerWrapper extends React.Component {
    constructor(props) {
        super();
        this.store = props.IDC_cfg_store
        this.state = {
            customerList: []
        }

    }

    componentDidMount() {
        this.getCustomerList()
    }

    getCustomerList = async () => {
        let params = { method: 'POST' };

        let res = await api.customer.getCustomerDetailByUserPhone(params);
        res.code == 200 && this.setState({ customerList: res.data.customerList })
    }


    getCustomerReferInfo = async customerId => {
        let params = { data: { customerId: customerId }, method: 'POST' };

        let res = await api.customer.getCustomerDetailByUserPhone(params);
        if (res.code == 200) {
            return {
                customerReferInfo: res.data.customerReferInfo,
                customerName: res.data.customerName
            }
        }
        return { customerReferInfo: {}, customerName: '' }
    }




    addCustomerHandle = () => {
        if (this.store.saveContractData.singers_customers.length >= 3) {
            message.warning('最多能够添加四个客户！')
            return;
        }

        let singers_customers = [...this.store.saveContractData.singers_customers, {
            customerId: '',
            addressId: '',
            customerReferInfo: {
                account: '',
                bank: '',
                bank_number: '',
                payee_num: ''
            },
            addressList: [],
            isRenderButton: this.store.saveContractData.singers_customers.length == 0 ? false : true,
            readOnly: (this.props.contract_action == 'IDCReceiveContract' && this.store.saveContractData.singers_customers.length == 0)
                ?
                true
                :
                false
        }]

        this.store.setSingersCustomers(singers_customers)

    }

    destroyCustomer = (index) => {
        let singers_customers = [...this.store.saveContractData.singers_customers];
        singers_customers.splice(index, 1)
        this.store.setSingersCustomers(singers_customers)
    }

    getAddressList = async customerId => {
        // @@ 远程获取客户地址列表
        let params = { data: { customer_id: customerId }, method: 'POST' };
        let res = await api.contract_api.getAddressList(params);
        return res.data
    }

    getCurrentCustomer = async (customerId, customer_index) => {
        let customerMsg = await this.getCustomerReferInfo(customerId);

        let addressMsg = customerId == '请选择' ? {
            addressList: [],
            addressName: ''
        } : await this.getAddressList(customerId);
        let singers_customers = [...this.store.saveContractData.singers_customers]

        // 设置关联属性
        singers_customers[customer_index] = {
            ...singers_customers[customer_index],
            customerReferInfo: customerId == '请选择'
                ?
                {
                    account: '',
                    bank: '',
                    bank_number: '',
                    payee_num: ''
                }
                :
                customerMsg.customerReferInfo,
            customerName: customerMsg.customerName,
            customerId: customerId == '请选择' ? '' : customerId,
            addressList: addressMsg.addressList,
            addressId: ''
        }

        this.store.setSingersCustomers(singers_customers)
    }

    getCurrentCustomerAddr = (addressId, customer_index) => {
        let singers_customers = [...this.store.saveContractData.singers_customers]

        // 设置选中的地址属性
        singers_customers[customer_index] = {
            ...singers_customers[customer_index],
            addressId: addressId == '请选择' ? '' : addressId
        }

        this.store.setSingersCustomers(singers_customers)
    }


    render() {
        let { saveContractData, disabled } = this.store
        return <div>
            {saveContractData.singers_customers.map((item, index) => (
                <SignCustomer
                    customer_target={{ ...item }}
                    customer_index={index}
                    key={index}
                    disabled={disabled}
                    destroyCustomer={this.destroyCustomer}
                    getCurrentCustomer={this.getCurrentCustomer}
                    getCurrentCustomerAddr={this.getCurrentCustomerAddr}
                    customerList={this.state.customerList}
                    {...this.props}
                />
            ))}
            <div className="" style={{ textAlign: 'center' }}>
                {
                    disabled ? null :
                        <Icon
                            onClick={this.addCustomerHandle}
                            type="folder-add" theme="filled"
                            style={{ fontSize: '24px', color: '#08c' }} />
                }

            </div>
        </div >
    }
}

