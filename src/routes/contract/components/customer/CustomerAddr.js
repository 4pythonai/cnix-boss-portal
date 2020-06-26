import React from "react";
import { Select } from 'antd'

export default class CustomerAddr extends React.Component {
    constructor(props) {
        super(props)
    }

    addressHandle = addressId => {
        this.props.getCurrentCustomerAddr(addressId, this.props.customer_index)
    }


    getAddressOptionList = () => {
        if (!this.props.addressList) {
            return null
        }
        return this.props.addressList.map((addr, idx) => (
            <Select.Option
                key={idx}
                value={addr.id}
            >
                {addr.address}
            </Select.Option>
        ))
    }
    render() {

        return (
            <section className="contractFormGroup">
                <label className="label contractFormInfo">
                    <span className="requireIcon">*</span>客户地址：</label>
                <div className="contractFormValue">
                    {
                        this.props.disabled 
                        ?
                        this.props.addressName
                            :
                            <Select
                                onChange={this.addressHandle}
                                value={this.props.addressId || '请选择'}  >
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                {this.getAddressOptionList()}
                            </Select>
                    }
                </div>

            </section>
        )
    }
}
