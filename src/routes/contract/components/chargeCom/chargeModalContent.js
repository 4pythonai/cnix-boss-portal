import React from "react";
import { observer, inject } from "mobx-react";
import { Radio } from 'antd';
import CycleFee from './cycleFee';
import OnceFee from './onceFee';
const RadioGroup = Radio.Group;

@inject("chargeStore")
@observer
export default class ChargeModalContent extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.chargeStore;
    }
    componentDidMount() {
        this.store.getFeeItemList();
    }

    getFeeBox() {

        if (this.store.chargeRowData.charge_fee_type === '周期性费用')
            return <CycleFee />

        if (this.store.chargeRowData.charge_fee_type === '一次性费用')
            return <OnceFee />
    }



    render() {
        return (
            <div>
                <fieldset>
                    {/* <legend>费用配置</legend> */}
                    <div className="charge_form">
                        <div className="charge_info">
                            <span className="requireIcon">*</span>收费类型
                            </div>
                        <div className="charge_control"> { this.store.chargeRowData.charge_fee_type } </div>
                    </div>
                </fieldset>

                {this.getFeeBox()}
                
            </div>
        );
    }
}
