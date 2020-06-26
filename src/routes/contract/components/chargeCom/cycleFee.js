import React from "react";
import { observer, inject } from "mobx-react";
import { Select, Checkbox, Input, InputNumber, Divider, DatePicker } from 'antd';
import IdcLocation from './idcLocation'
import NumericInput from 'react-numeric-input';
import moment from 'moment';
import { toJS } from 'mobx';
const { TextArea } = Input;
const format = 'YYYY-MM-DD';
import { formatDate} from '@/utils/tools'

@inject("chargeStore")
@inject("IDC_cfg_store")
@observer
export default class CycleFee extends React.Component {
    constructor(props) {
        super(props);
        this.chargeStore = props.chargeStore;
        this.IDC_cfg_store = props.IDC_cfg_store
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
                            disabled={ this.chargeStore.chargeOption === 'edit' }
                            onChange={ value => this.chargeStore.setNormalFiledsValue(value, 'res_id') }
                            value={ this.chargeStore.chargeRowData.res_id || '请选择' }
                            style={ { width: '100%' } }
                        >
                            <Select.Option value="请选择">请选择收费项</Select.Option>
                            { this.chargeStore.fee_item_list.map(
                                proj => {

                                    if (this.IDC_cfg_store.saveContractData.rent_type == '整租' && proj.allow_in_wholesale_contract === 'n') {
                                        return ''
                                    }

                                    if (this.IDC_cfg_store.saveContractData.rent_type == '散租' && proj.allow_in_retail_contract === 'n') {
                                        return ''
                                    }
                                    if (this.IDC_cfg_store.saveContractData.contract_type == '固定合同' && proj.allow_in_fixed_contract == 'n') {
                                        return ''
                                    }

                                    return <Select.Option
                                        key={ proj.id }
                                        value={ proj.id }>
                                        { proj.resname }
                                    </Select.Option>
                                }

                            ) }
                        </Select>
                    </div>
                </div>
            </div>
        )
    }

    // 计费方式
    getBillingMethod() {
        if (this.chargeStore.charge_cfg.billing_methods == undefined) {
            return ''
        }

        // 只有，直接返回
        if (this.chargeStore.charge_cfg.billing_methods.length == 1 && this.chargeStore.charge_cfg.billing_methods[0].method == 'using_fee_common_without_step') {
            return null
        }

        return (
            <div className="charge_form">
                <label className="charge_info">
                    <span className="requireIcon">*</span>
                    计费方式 </label>
                <div className="charge_control">
                    <Select
                        style={ { width: '100%' } }
                        value={ this.chargeStore.chargeRowData['billing_methods'] || '请选择' }
                        onChange={ event => this.chargeStore.setNormalFiledsValue(event, 'billing_methods') }>
                        <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                        {
                            this.chargeStore.charge_cfg.billing_methods.map(item => {
                                if (this.IDC_cfg_store.saveContractData.contract_type == '固定合同' && item.method == 'using_fee_fixed_with_overflow') {
                                    return;
                                }
                                return <Select.Option key={ item.text } value={ item.method }>{ item.text }</Select.Option>
                            })
                        }
                    </Select>
                </div>
            </div>
        )
    }

    // 普通计费
    getFeeCommon() {
        if (this.chargeStore.charge_cfg.using_fee_common_without_step == undefined) {
            return;
        }
        return this.chargeStore.charge_cfg.using_fee_common_without_step.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }
    // 电费计费
    getUsingFeeCommonWithStep() {
        if (this.chargeStore.charge_cfg.using_fee_common_with_step == undefined) {
            return;
        }
        return this.chargeStore.charge_cfg.using_fee_common_with_step.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 固定计费
    getFixedFee() {
        if (this.chargeStore.charge_cfg.using_fee_fixed_without_overflow == undefined) {
            return;
        }
        return this.chargeStore.charge_cfg.using_fee_fixed_without_overflow.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }

        })
    }

    // 基础计费加超出计费
    getFeeBaseAndOverflow() {
        if (this.chargeStore.charge_cfg.using_fee_fixed_with_overflow == undefined) {
            return;
        }
        return this.chargeStore.charge_cfg.using_fee_fixed_with_overflow.map((item, index) => {
            if (item.using_compoment == 'y') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 资源规格
    getSpec() {
        if (this.chargeStore.charge_cfg.spec == undefined || this.chargeStore.charge_cfg.spec.length == 0) {
            return;
        }
        return this.chargeStore.charge_cfg.spec.map((item, index) => {
            let ignore_field = ['a_location', 'cabinet_electricity_count', 'z_location']
            if (item.using_compoment == 'y' && !ignore_field.includes(item.ui_id)) {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 带下拉单位的价格
    commonOverPriceRender = (item, index) => {
        return <div className="charge_form" key={ index }>
            <div className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </div>
            <div className="charge_price_control">
                <NumericInput
                    step={ 0.01 }
                    min={ 0 }
                    className='price_input'
                    readOnly={ item.readonly == 'y' ? true : false }
                    value={ this.chargeStore.chargeRowData[item.ui_id] }
                    onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) } />

                元 /
            <Select
                    style={ { width: '100px' } }
                    defaultValue={ this.chargeStore.chargeRowData[item.unit.ui_id] || '请选择' }
                    onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.unit.ui_id) }>
                    <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                    { item.unit.options_list.map(optionItem => {
                        return (
                            <Select.Option key={ optionItem.text } value={ optionItem.text }>
                                { optionItem.text }
                            </Select.Option>
                        );
                    }) }
                </Select>
                /
            {
                    item.cycle ?
                        <Select
                            className="charge_cycle"
                            value={ this.chargeStore.chargeRowData[item.cycle.ui_id] || "请选择" }
                            onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.cycle.ui_id) }
                        >
                            <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                            { item.cycle.options_list.map(cycleItem => {
                                return (
                                    <Select.Option key={ cycleItem.text } value={ cycleItem.text }>
                                        { cycleItem.text }
                                    </Select.Option>
                                );
                            }) }
                        </Select>
                        :
                        ''
                }
            </div>
        </div>
    }

    commonPriceRender = (item, index) => {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_price_control">
                    <NumericInput
                        step={ 0.01 }
                        min={ 0 }
                        className='price_input'
                        readOnly={ item.readonly == 'y' ? true : false }
                        value={ this.chargeStore.chargeRowData[item.ui_id] }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) } />

                    <div className="text_descript">元
                        { item.unit && item.unit.text ? '/' + item.unit.text : '' }
                        { item.cycle ? '/' : '' }
                    </div>
                    {
                        item.cycle ?
                            <Select
                                className="charge_cycle"
                                value={ this.chargeStore.chargeRowData[item.cycle.ui_id] || "请选择" }
                                onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.cycle.ui_id) }
                            >
                                <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                                { item.cycle.options_list.map(cycleItem => {
                                    return (
                                        <Select.Option key={ cycleItem.text } value={ cycleItem.text }>
                                            { cycleItem.text }
                                        </Select.Option>
                                    );
                                }) }
                            </Select>
                            :
                            ''
                    }
                </div>
            </div>
        )
    }



    textRender = (item, index) => {
        return <div className="charge_form" key={ index }>
            <div className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </div>
            <div className="charge_control">
                <Input
                    type="text"
                    placeholder={ item.ui_placeholder }
                    defaultValue={ this.chargeStore.chargeRowData[item.ui_id] || '' }
                    onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }
                />
            </div>
        </div>
    }

    specialNumberRender = (item, index) => {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_price_control">
                    <NumericInput
                        step={ 1 }
                        min={ 0 }
                        className='price_input'
                        value={ this.chargeStore.chargeRowData[item.ui_id] }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) } />

                </div>
            </div>
        )
    }

    numberRender = (item, index) => {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_control">
                    <InputNumber
                        min={ 0 }
                        step={ 0.1 }
                        type="text"
                        className="input_number"
                        placeholder={ item.ui_placeholder }
                        value={ this.chargeStore.chargeRowData[item.ui_id] || '' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }
                    />

                </div>
            </div>
        )
    }

    dateRender = (item, index) => {
        return <div className="charge_form" key={ index } >
            <div className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </div>
            <div className="charge_control">
                <DatePicker
                    disabledDate={ this.chargeStore.disabledDate[item.ui_id] }
                    onChange={ (mode, date) => this.chargeStore.setDateFiledsValue(mode, date, item.ui_id) }
                    placeholder={ item.ui_placeholder }
                    style={ { width: '100%' } }
                    value={ this.chargeStore.chargeRowData[item.ui_id]
                        ?
                        moment(this.chargeStore.chargeRowData[item.ui_id], format)
                        :
                        moment(this.IDC_cfg_store.saveContractData.contract_start_date, format)
                    }
                    format={ format }
                />
            </div>
        </div>
    }


    dateRenderStart = (item, index) => {
        console.log('设置计费项开始时间')
        console.log('this.chargeStore.chargeRowData')
        console.log(toJS(this.chargeStore.chargeRowData))

        if (!this.chargeStore.chargeRowData.hasOwnProperty(item.ui_id)) {
            this.chargeStore.chargeRowData[item.ui_id] = this.IDC_cfg_store.saveContractData.contract_start_date
        }
        
        console.log(    this.chargeStore.chargeRowData)
        
        return <div className="charge_form" key={ index } >
            <div className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </div>
            <div className="charge_control">
                <DatePicker

                    disabledDate={ this.chargeStore.disabledDate[item.ui_id] }
                    onChange={ (mode, date) => this.chargeStore.setDateFiledsValue(mode, date, item.ui_id) }
                    placeholder={ item.ui_placeholder }
                    style={ { width: '100%' } }
                    value={ moment(this.chargeStore.chargeRowData[item.ui_id], format) }

                    format={ format }
                />
            </div>
        </div>
    }

    dateRenderEnd = (item, index) => {

        if (!this.chargeStore.chargeRowData.hasOwnProperty(item.ui_id)) {
            this.chargeStore.chargeRowData[item.ui_id]  =this.IDC_cfg_store.saveContractData.contract_end_date
        }

        return <div className="charge_form" key={ index } >
            <div className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </div>
            <div className="charge_control">
                <DatePicker

                    disabledDate={ this.chargeStore.disabledDate[item.ui_id] }
                    onChange={ (mode, date) => this.chargeStore.setDateFiledsValue(mode, date, item.ui_id) }
                    placeholder={ item.ui_placeholder }
                    style={ { width: '100%' } }
                    value={ moment(this.chargeStore.chargeRowData[item.ui_id], format) }
                    format={ format }
                />
            </div>
        </div>
    }





    checkboxRender(item, index) {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_control">
                    <Checkbox.Group
                        name={ item.ui_id }
                        className="chargeDataCheckbox"
                        options={ item.options_list }
                        defaultValue={ this.chargeStore.chargeRowData[item.ui_id] ? this.chargeStore.chargeRowData[item.ui_id].split(',') : [] }
                        onChange={ event => this.chargeStore.selSelectCheckBox(event, item.ui_id) } >
                    </Checkbox.Group>
                </div>
            </div>
        )
    }

    dropDownRender(item, index) {
        // 带宽类型处理
        if (this.chargeStore.isShowWidthType == false && item.ui_id == 'bandwidth_type') {
            return null
        }

        return (
            <div className="charge_form" key={ index } >
                <label className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </label>
                <div className="charge_control">
                    <Select
                        style={ { width: '100%' } }
                        defaultValue={ this.chargeStore.chargeRowData[item.ui_id] || '请选择' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }>
                        <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                        {
                            item ?
                                item.options_list.map(optionItem => {
                                    return (
                                        <Select.Option key={ optionItem.text } value={ optionItem.text }>
                                            { optionItem.text }
                                        </Select.Option>
                                    );
                                })
                                :
                                console.log('编辑收费项时查看数据', item)
                        }
                    </Select>
                </div>
            </div>
        )
    }

    over_bandwidth_billing_method(item, index) {
        console.log(item);
        // return null
        return <div className="charge_form" key={ index }>
            <label className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </label>
            <div className="charge_control">
                <Select
                    style={ { width: '100%' } }
                    defaultValue={ this.chargeStore.chargeRowData[item.ui_id] || '请选择' }
                    onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }>
                    <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                    { item.options_list.map(optionItem => {
                        return (
                            <Select.Option key={ optionItem.text } value={ optionItem.text }>
                                { optionItem.text }
                            </Select.Option>
                        );
                    }) }
                </Select>
            </div>

            {
                this.chargeStore.isShowPeakValue
                &&
                <label className="charge_info">峰值</label>
            }
            {
                this.chargeStore.isShowPeakValue
                &&
                < div className="charge_control">
                    <Input
                        ref='peak_value'
                        placeholder='请输入峰值'
                        value={ this.chargeStore.chargeRowData[item.peak_value.ui_id] || '' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.peak_value.ui_id) } />
                </div>
            }


        </div>
    }


    // 机柜电量
    cabinet_electricity_render(item, index) {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_price_control">
                    <InputNumber
                        min={ 0 }
                        step={ 1 }
                        className="cabinate_electricity_count"
                        placeholder={ item.ui_placeholder }
                        type="text"
                        value={ this.chargeStore.chargeRowData[item.ui_id] || '' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }
                        name={ item.key }
                    />
                    <Select style={ { width: '100%' } }
                        value={ this.chargeStore.chargeRowData[item.unit.ui_id] || '请选择' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.unit.ui_id) }
                    >
                        { item.unit.options_list.map(optionItem => {
                            return (
                                <Select.Option key={ optionItem.text } value={ optionItem.text }>
                                    { optionItem.text }
                                </Select.Option>
                            );
                        }) }
                    </Select>
                </div>
            </div>
        );
    }

    // idc增值服务费的带宽数
    idcServiceFeeWidthCountRender(item, index) {
        return (
            <div className="charge_form" key={ index }>
                <div className="charge_info">
                    { this.requiredIconRender(item.is_required) }
                    { item.ui_title }
                </div>
                <div className="charge_price_control">
                    <InputNumber
                        min={ 0 }
                        step={ 1 }
                        className="cabinate_electricity_count"
                        placeholder={ item.ui_placeholder }
                        type="text"
                        value={ this.chargeStore.chargeRowData[item.ui_id] || '' }
                        onChange={ value => this.chargeStore.setNormalFiledsValue(value, item.ui_id) }
                        name={ item.key }
                    />
                    <span> M= </span>
                    <Input
                        type="text"
                        value={ this.chargeStore.idcServiceFeeWidthCount || '' }
                        readOnly
                        disabled
                    />G
                </div>
            </div>
        );
    }

    getMemo(item, index) {
        return <div className="charge_form" key={ index }>
            <label className="charge_info">
                { this.requiredIconRender(item.is_required) }
                { item.ui_title }
            </label>
            <div className="charge_control">
                <TextArea
                    rows={ 4 }
                    placeholder={ item.ui_placeholder }
                    type="text"
                    onChange={ event => this.chargeStore.setNormalFiledsValue(event, item.ui_id) }
                    defaultValue={ this.chargeStore.chargeRowData[item.ui_id] } />
            </div>
        </div>
    }

    requiredIconRender(is_required) {
        return is_required == 'y' ? <span className="price_require_icon">*</span> : ''
    }

    getSpecCabinetElectricity() {
        if (this.chargeStore.charge_cfg.spec == undefined || this.chargeStore.charge_cfg.spec.length == 0) {
            return;
        }
        return this.chargeStore.charge_cfg.spec.map((item, index) => {
            if (item.using_compoment == 'y' && item.ui_id === 'cabinet_electricity_count') {
                return this[item.compoment_name](item, index)
            }
        })
    }

    // 每个资源项的起止时间.
    getStartEnd() {

        console.log(toJS(this.chargeStore))
        console.log(toJS(this.IDC_cfg_store))
        

        return (
            <div className="charge_control">
                <Divider />
                <DatePicker format="YYYY-MM-DD" />
                <DatePicker format="YYYY-MM-DD" />
                <Divider />
            111</div>
        )
    }


    onChangeStartDate = function(e, newval, key) {
        console.log(e);
        console.log(newval);
        console.log(key);
        let that = this

        this.state.local_chargeShowListData.forEach(function(element, index) {
            if (element.key == key) {
                that.state.local_chargeShowListData[index].startdate = newval;
            }
        });
        console.log(this.state.local_chargeShowListData)
    }




    render() {
        return (
            <div className="cycleFeeWrapper">

                { this.getFeeItem() }
                {
                    this.chargeStore.charge_cfg.resname
                        ?
                        <div className="">



                            <IdcLocation />

                            { this.getBillingMethod() }

                            { this.getSpecCabinetElectricity() }
                            {

                                this.chargeStore.chargeRowData.billing_methods == 'using_fee_fixed_without_overflow'
                                && this.getFixedFee()
                            }

                            {
                                this.chargeStore.chargeRowData.billing_methods == 'using_fee_fixed_with_overflow'
                                && this.getFeeBaseAndOverflow()
                            }
                            
                            {
                                this.chargeStore.chargeRowData.billing_methods == 'using_fee_common_with_step'
                                && this.getUsingFeeCommonWithStep()
                            }

                            { this.getFeeCommon() }

                            { this.getSpec() }
                            { this.getMemo(this.chargeStore.charge_cfg.memo, 100) }
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}

