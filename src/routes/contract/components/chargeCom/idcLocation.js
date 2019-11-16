import React from "react";
import { Select } from 'antd';
import { observer, inject } from "mobx-react";
const { Option } = Select;

@inject("chargeStore")
@observer
export default class IdcLocation extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.chargeStore;
    }

    getOption() {

        return this.store.charge_cfg.loc.options_list.map(item => {
            return <Option key={item.value} value={item.text}>
                {item.text}
            </Option>
        })
    }

    render() {
        if (this.store.charge_cfg.loc == undefined) {
            return;
        }
        if (this.store.charge_cfg.loc.compoment_name == 'idc_wave') {
            return <div>
                <legend>所在机房</legend>
                <div className="charge_form">
                    <label className="charge_info">
                        <span className="requireIcon">*</span> 机房区间 </label>
                    <div className="charge_price_control">
                        <Select
                            style={{ width: '50%' }}
                            defaultValue={this.store.idcLocation.startIdcLocation || '请选择'}
                            onChange={(value) => this.store.setStartIdcLocation(value)}>
                            <Option key='请选择' value='请选择'>请选择</Option>
                            {this.getOption()}
                        </Select>
                        到
                        <Select
                            style={{ width: '50%' }}
                            defaultValue={this.store.idcLocation.endIdcLocation || '请选择'}
                            onChange={(value) => this.store.setEndIdcLocation(value)}>
                            <Option key='请选择' value='请选择'>请选择</Option>
                            {this.getOption()}
                        </Select>
                    </div>
                </div>

            </div>
        }
        return (
            <div className="charge_form">
                <div className="charge_info" >
                    <span className="requireIcon">*</span> 所在机房 </div>
                <div className="charge_control">
                    <Select
                        style={{ width: '100%' }}
                        defaultValue={this.store.chargeRowData.loc || '请选择'}
                        onChange={event => this.store.setNormalFiledsValue(event, 'loc')}>
                        <Option key='请选择' value='请选择'>请选择</Option>
                        {this.getOption()}
                    </Select>
                </div>
            </div>
        )
    }
}

