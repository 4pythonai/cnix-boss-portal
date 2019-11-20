

import React from "react";
import { Select } from 'antd';

export default class OurCompanySelect extends React.Component {
    constructor(props) {
        super(props);
    }


    customerChange = value => {
        this.props.getCurrentCustomer(value, this.props.customer_index)
    }




    getOptionList() {
        if (!this.props.customerList) {
            return null
        }
        if (this.props.customerList.length == 0) {
            return null
        }
        return this.props.customerList.map((company, idx) => (
            <Select.Option
                key={idx}
                value={company.id}
            >
                {company.customName}
            </Select.Option>
        ))
    }

    render() {


        return (
            <section className="contractFormGroup" style={customerStyle}>
                <label className="label contractFormInfo"><span className="requireIcon">*</span>签约方：</label>
                <div className="contractFormValue">
                    <label className="select">
                        {
                            (this.props.disabled || this.props.readOnly)
                                ?
                                this.props.customerName
                                :
                                <Select
                                    onChange={this.customerChange}
                                    value={this.props.customerId || '请选择'}  >
                                    <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                    {this.getOptionList()}
                                </Select>
                        }
                    </label>
                </div>
            </section>
        );
    }
}


const customerStyle = {
    padding: "5px 21px"
}
