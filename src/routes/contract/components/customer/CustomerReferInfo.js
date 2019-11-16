import React from "react";
import { observer, inject } from "mobx-react"
import { Input, Select } from 'antd'

export default class CustomerOtherInfo extends React.Component {

    render() {
        let customer = this.props.customerReferInfo
        if(!customer){
            customer =  {}
        }
        return (
            <div>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">户名：</label>
                    <div className="contractFormValue">
                        <label className="select">
                            <Input type="number" value={customer.account || ''} disabled />
                        </label>
                    </div>
                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">账号：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <Input type="number" value={customer.account || ''} disabled />
                        </label>
                    </div>
                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">开户行：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <Input type="text" value={customer.bank || ''} disabled />
                        </label>
                    </div>
                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">银行编号：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <Input type="number" value={customer.bank_number || ''} disabled />
                        </label>
                    </div>
                </section>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">税号：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <Input type="text" value={customer.payee_num || ''} disabled />
                        </label>
                    </div>

                </section>
            </div>
        );
    }
}
