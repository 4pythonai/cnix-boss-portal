import React from 'react'
import DatePickerCustom from './DatePickerCustom'
import { inject, observer } from 'mobx-react'
import moment from 'moment';
import { InputNumber, Input, Select } from 'antd';
import NumericInput from 'react-numeric-input';
const dateFormat = 'YYYY/MM/DD';


@inject('IDC_cfg_store')
@observer
export default class Outpay extends React.Component {
    constructor(props) {
        super();
        this.store = props.IDC_cfg_store;
    }

    render() {
        let {disabled} = this.store
        return (

            <article className="idc_block">
                <section className="contractFormGroup">
                    <label className="label contractFormInfo" ><span className="requireIcon">*</span>结算方式：</label>
                    <div className="contractFormValue ">
                        <label className="select">
                            <Select
                                disabled={disabled}
                                onChange={this.store.payment_method}
                                value={this.store.saveContractData.payment_method || ''}>
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                <Select.Option value="网银">网银</Select.Option>
                                <Select.Option value="现金">现金</Select.Option>
                                <Select.Option value="支票">支票</Select.Option>
                                <Select.Option value="其他">其他</Select.Option>
                            </Select>
                            <i />
                        </label>
                    </div>
                </section>
                <section className="contractFormGroup" >
                    <label className="contractFormInfo">
                        {
                            this.store.RequireOther ?
                                <span className="requireIcon">*</span>
                                :
                                ''
                        }
                        {
                            this.store.RequireOther ? '其他：' : ''
                        }
                    </label>
                    <div className="contractFormValue col-sm-5">
                        {
                            this.store.RequireOther ?

                                <label className="input" >
                                    <Input

                                        disabled={disabled}
                                        type="text"
                                        value={this.store.saveContractData.otherValue || ''}
                                        onChange={this.store.changeOther}

                                    />
                                </label>
                                :
                                ''
                        }
                    </div>
                </section>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>收费周期：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <Select
                                disabled={disabled} className="form-control" value={this.store.saveContractData.billing_cycle || ''} onChange={this.store.setBillingCycle} id="fee_item" name="billing_cycle">
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                {this.props.IDC_cfg_store.periord_list.map(proj => (
                                    <Select.Option key={proj.periord_id} value={proj.periord_name}>
                                        {proj.periord_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>支付类型：</label>
                    <div className="contractFormValue">
                        <label className="select" >
                            <Select
                                disabled={disabled} value={this.store.saveContractData.pay_type || '请选择'} onChange={this.store.setPayType}>
                                <Select.Option value="请选择">请选择</Select.Option>
                                <Select.Option value="先付">先付</Select.Option>
                                <Select.Option value="后付">后付</Select.Option>
                            </Select>
                            <i />
                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>首付款：</label>
                    <div className="contractFormValue">
                        <NumericInput
                            className="firstPayment"
                            step={0.01}

                            disabled={disabled}
                            min={0}
                            style={{ paddingLeft: '10px' }}
                            value={this.store.saveContractData.contract_first_payment}
                            onChange={this.store.setFirstPayment}
                        />
                    </div>

                </section>

                <DatePickerCustom
                    require={true}
                    startText='合同签定日期'
                    endText='合同结束日期'
                    onStartChange={this.store.changeContractStartDate}
                    onEndChange={this.store.changeContractEndDate}
                    sumValue={this.store.saveContractData.contract_days}
                    disabled={disabled}
                    startValue={this.store.saveContractData.contract_start_date
                        ?
                        moment(this.store.saveContractData.contract_start_date, dateFormat)
                        :
                        null}
                    endValue={this.store.saveContractData.contract_end_date
                        ?
                        moment(this.store.saveContractData.contract_end_date, dateFormat)
                        :
                        null} />
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">赠送时间：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={disabled} type="text" placeholder="输入赠送时间" value={this.store.saveContractData.give_day || ''} onChange={this.store.setGiveDay} />

                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">赠送说明：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={disabled} pleaceholder="输入赠送说明" type="text" value={this.store.saveContractData.give_explain || ''} onChange={this.store.setGiveExplain} />

                        </label>
                    </div>

                </section>
            </article>
        )
    }
}



