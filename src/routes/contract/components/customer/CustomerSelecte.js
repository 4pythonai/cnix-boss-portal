

import React from "react";
import { Select, Input } from 'antd';
import CustomerSelectModal from './CustomerSelectModal';

export default class CustomerSelecte extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className=''>
                <CustomerSelectModal ref="customerSelectModalRef"
                    {...this.props}
                />
                <section className="contractFormGroup" style={customerStyle}>
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>签约方：</label>
                    <div className="contractFormValue">
                        <Input
                            readOnly
                            style={{cursor: 'pointer'}}
                            onClick={event => this.refs.customerSelectModalRef.showCustomerModal()}
                            value={this.props.customerName || '请选择'}
                        />
                    </div>
                </section>
            </div>

        );
    }
}


const customerStyle = {
    padding: "5px 21px"
}
