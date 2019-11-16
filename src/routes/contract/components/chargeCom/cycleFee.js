import React from "react";
import { observer, inject } from "mobx-react";
import { Select, Checkbox, Input, InputNumber, DatePicker } from 'antd';
import IdcLocation from './idcLocation'
import NumericInput from 'react-numeric-input';
import moment from 'moment';
const { TextArea } = Input;
const format = 'YYYY-MM-DD';

@inject("chargeStore")
@inject("IDC_cfg_store")
@observer
export default class CycleFee extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.chargeStore;
        this.idcStore = props.IDC_cfg_store
    }
    // 资源项
    getFeeItem() {
        return (
            <div>
                <legend>选择收费项</legend>
                <div className="charge_form">
                    <div className="charge_info" >
                        <span className="requireIcon">*</span> 收费项</div>
                    <div className="charge_control">
                        <Select
                            disabled={this.store.chargeOption === 'edit'}
                            onChange={value => this.store.setNormalFiledsValue(value, 'res_id')}
                            value={this.store.chargeRowData.res_id || '请选择'}
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="请选择">请选择收费项</Select.Option>
                            {this.store.fee_item_list.map(
                                proj => {

                                    if (this.idcStore.saveContractData.rent_type == '整租' && proj.allow_in_wholesale_contract === 'n') {
                                        return ''
                                    }

                                    if (this.idcStore.saveContractData.rent_type == '散租' && proj.allow_in_retail_contract === 'n') {
                                        return ''
                                    }
                                    if (this.idcStore.saveContractData.contract_type == '固定合同' && proj.allow_in_fixed_contract == 'n') {
                                        return ''
                                    }

                                    return <Select.Option
                                        key={proj.id}
                                        value={proj.id}>
                                        {proj.resname}
                                    </Select.Option>
                                }

                            )}
                        </Select>
                    </div>
                </div>
            </div>
        )
    }

    // 计费方式
    getBillingMethod() {
        if (this.store.charge_cfg.billing_methods == undefined || this.store.charge_cfg.billing_methods.length == 1) {
            return ''
        }

        return (
            <div className="charge_form">
                <label className="charge_info">
                    <span className="requireIcon">*</span>
                    计费方式 </label>
                <div className="charge_control">
                    <Select
                        style={{ width: '100%' }}
                        value={this.store.chargeRowData['billing_methods'] || '请选择'}
                        onChange={event => this.store.setNormalFiledsValue(event, 'billing_methods')}>
                        <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                        {
                            this.store.charge_cfg.billing_methods.map(item => {
                                if (this.idcStore.saveContractData.contract_type == '固定合同' && item.method == 'using_fee_fixed_with_overflow') {
                                    return;
                                }
                                return <Select.Option key={item.text} value={item.method}>{item.text}</Select.Option>
                            })
                        }
                    </Select>
                </div>
            </div>
        )
    }

    // 普通计费
    getFeeCommon() {
        if (this.store.charge_cfg.using_fee_common_without_step == undefined) {
            return;
        }
        return this.store.charge_cfg.using_fee_common_without_step.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }
    // 电费计费
    getUsingFeeCommonWithStep() {
        if (this.store.charge_cfg.using_fee_common_with_step == undefined) {
            return;
        }
        return this.store.charge_cfg.using_fee_common_with_step.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 固定计费
    getFixedFee() {
        if (this.store.charge_cfg.using_fee_fixed_without_overflow == undefined) {
            return;
        }
        return this.store.charge_cfg.using_fee_fixed_without_overflow.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }

        })
    }

    // 基础计费加超出计费
    getFeeBaseAndOverflow() {
        if (this.store.charge_cfg.using_fee_fixed_with_overflow == undefined) {
            return;
        }
        return this.store.charge_cfg.using_fee_fixed_with_overflow.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 资源规格
    getSpec() {
        if (this.store.charge_cfg.spec == undefined || this.store.charge_cfg.spec.length == 0) {
            return;
        }
        return this.store.charge_cfg.spec.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    commonPriceRender = (item, index) => {
        return (
            <div className="charge_form" key={index}>
                <div className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </div>
                <div className="charge_price_control">
                    <NumericInput
                        step={0.01}
                        min={0}
                        className='price_input'
                        readOnly={item.readonly == 'y' ? true : false}
                        value={this.store.chargeRowData[item.ui_id]}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)} />

                    <div className="text_descript">元
                        {item.unit && item.unit.text ? '/' + item.unit.text : ''}
                        {item.cycle ? '/' : ''}
                    </div>
                    {
                        item.cycle ?
                            <Select
                                className="charge_cycle"
                                value={this.store.chargeRowData[item.cycle.ui_id] || "请选择"}
                                onChange={value => this.store.setNormalFiledsValue(value, item.cycle.ui_id)}
                            >
                                <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                                {item.cycle.options_list.map(cycleItem => {
                                    return (
                                        <Select.Option key={cycleItem.text} value={cycleItem.text}>
                                            {cycleItem.text}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                            :
                            ''
                    }
                </div>
            </div>
        )
    }



    textRender = (item, index) => {
        return <div className="charge_form" key={index}>
            <div className="charge_info">
                {this.requiredIconRender(item.is_required)}
                {item.ui_title}
            </div>
            <div className="charge_control">
                <Input
                    type="text"
                    placeholder={item.ui_placeholder}
                    defaultValue={this.store.chargeRowData[item.ui_id] || ''}
                    onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}
                />
            </div>
        </div>
    }

    numberRender = (item, index) => {
        return (
            <div className="charge_form" key={index}>
                <div className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </div>
                <div className="charge_control">
                    <InputNumber
                        min={0}
                        step={1}
                        type="text"
                        className="input_number"
                        placeholder={item.ui_placeholder}
                        value={this.store.chargeRowData[item.ui_id] || ''}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}
                    />

                </div>
            </div>
        )
    }

    dateRender = (item, index) => {
        return <div className="charge_form" key={index} >
            <div className="charge_info">
                {this.requiredIconRender(item.is_required)}
                {item.ui_title}
            </div>
            <div className="charge_control">
                <DatePicker
                    disabledDate={this.store.disabledDate[item.ui_id]}
                    onChange={(mode, date) => this.store.setDateFiledsValue(mode, date, item.ui_id)}
                    placeholder={item.ui_placeholder}
                    style={{ width: '100%' }}
                    value={this.store.chargeRowData[item.ui_id]
                        ?
                        moment(this.store.chargeRowData[item.ui_id], format)
                        :
                        null}
                    format={format}
                />
            </div>
        </div>
    }

    checkboxRender(item, index) {
        return (
            <div className="charge_form" key={index}>
                <div className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </div>
                <div className="charge_control">
                    <Checkbox.Group
                        name={item.ui_id}
                        className="chargeDataCheckbox"
                        options={item.options_list}
                        defaultValue={this.store.chargeRowData[item.ui_id] ? this.store.chargeRowData[item.ui_id].split(',') : []}
                        onChange={event => this.store.selSelectCheckBox(event, item.ui_id)} >
                    </Checkbox.Group>
                </div>
            </div>
        )
    }

    dropDownRender(item, index) {
        // 带宽类型处理
        if (this.store.isShowWidthType == false && item.ui_id == 'bandwidth_type') {
            return null
        }

        return (
            <div className="charge_form" key={index} >
                <label className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </label>
                <div className="charge_control">
                    <Select
                        style={{ width: '100%' }}
                        defaultValue={this.store.chargeRowData[item.ui_id] || '请选择'}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}>
                        <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                        {item.options_list.map(optionItem => {
                            return (
                                <Select.Option key={optionItem.text} value={optionItem.text}>
                                    {optionItem.text}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
            </div>
        )
    }

    over_bandwidth_billing_method(item, index) {
        console.log(item);
        // return null
        return <div className="charge_form" key={index}>
            <label className="charge_info">
                {this.requiredIconRender(item.is_required)}
                {item.ui_title}
            </label>
            <div className="charge_control">
                <Select
                    style={{ width: '100%' }}
                    defaultValue={this.store.chargeRowData[item.ui_id] || '请选择'}
                    onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}>
                    <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                    {item.options_list.map(optionItem => {
                        return (
                            <Select.Option key={optionItem.text} value={optionItem.text}>
                                {optionItem.text}
                            </Select.Option>
                        );
                    })}
                </Select>
            </div>

            {
                this.store.isShowPeakValue
                &&
                <label className="charge_info">峰值</label>
            }
            {
                this.store.isShowPeakValue
                &&
                < div className="charge_control">
                    <Input
                        ref='peak_value'
                        placeholder='请输入峰值'
                        value={this.store.chargeRowData[item.peak_value.ui_id] || ''}
                        onChange={value => this.store.setNormalFiledsValue(value, item.peak_value.ui_id)} />
                </div>
            }


        </div>
    }


    // 机柜电量
    cabinet_electricity_render(item, index) {
        return (
            <div className="charge_form" key={index}>
                <div className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </div>
                <div className="charge_price_control">
                    <InputNumber
                        min={0}
                        step={1}
                        className="cabinate_electricity_count"
                        placeholder={item.ui_placeholder}
                        type="text"
                        value={this.store.chargeRowData[item.ui_id] || ''}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}
                        name={item.key}
                    />
                    &nbsp;/&nbsp;
                    <Select style={{ width: '100%' }}
                        value={this.store.chargeRowData[item.unit.ui_id] || '请选择'}
                        onChange={value => this.store.setNormalFiledsValue(value, item.unit.ui_id)}
                    >
                        {item.unit.options_list.map(optionItem => {
                            return (
                                <Select.Option key={optionItem.text} value={optionItem.text}>
                                    {optionItem.text}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
            </div>
        );
    }

    // idc增值服务费的带宽数
    idcServiceFeeWidthCountRender(item, index) {
        return (
            <div className="charge_form" key={index}>
                <div className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </div>
                <div className="charge_price_control">
                    <InputNumber
                        min={0}
                        step={1}
                        className="cabinate_electricity_count"
                        placeholder={item.ui_placeholder}
                        type="text"
                        value={this.store.chargeRowData[item.ui_id] || ''}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}
                        name={item.key}
                    />
                    <span> M= </span>
                    <Input
                        type="text"
                        value={this.store.idcServiceFeeWidthCount || ''}
                        readOnly
                        disabled
                    />G
                </div>
            </div>
        );
    }

    getMemo() {
        let item = this.store.charge_cfg.memo;
        return <div className="charge_form" >
            <label className="charge_info">
                {this.requiredIconRender(item.is_required)}
                {item.ui_title}
            </label>
            <div className="charge_control">
                <TextArea
                    rows={4}
                    placeholder={item.ui_placeholder}
                    type="text"
                    onChange={event => this.store.setNormalFiledsValue(event, item.ui_id)}
                    defaultValue={this.store.chargeRowData[item.ui_id]} />
            </div>
        </div>
    }

    requiredIconRender(is_required) {
        return is_required == 'y' ? <span className="price_require_icon">*</span> : ''
    }


    render() {

        return (
            <div className="cycleFeeWrapper">

                {this.getFeeItem()}
                {
                    this.store.charge_cfg.resname
                        ?
                        <div className="">
                            <IdcLocation />

                            {this.getBillingMethod()}

                            {

                                this.store.chargeRowData.billing_methods == 'using_fee_fixed_without_overflow'
                                && this.getFixedFee()
                            }

                            {
                                this.store.chargeRowData.billing_methods == 'using_fee_fixed_with_overflow'
                                && this.getFeeBaseAndOverflow()
                            }
                            {
                                this.store.chargeRowData.billing_methods == 'using_fee_common_with_step'
                                && this.getUsingFeeCommonWithStep()
                            }

                            {this.getFeeCommon()}

                            {this.getSpec()}
                            {this.getMemo()}
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}

