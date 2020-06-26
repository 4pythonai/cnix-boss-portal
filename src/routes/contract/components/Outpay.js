import React from 'react'
import DatePickerCustom from './DatePickerCustom'
import ContractDescription from './contractDescription'
import { inject, observer } from 'mobx-react'
import moment from 'moment';
import '../contract.scss'
import { InputNumber, Input, Select } from 'antd';
import NumericInput from 'react-numeric-input';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';


@inject('IDC_cfg_store')
@observer
export default class Outpay extends React.Component {
    constructor(props) {
        super();
        this.IDC_cfg_store = props.IDC_cfg_store;
    }

    render() {
        let { disabled } = this.IDC_cfg_store
        return (

            <article className="idc_block read">
                <section className="contractFormGroup">
                    <label className="label contractFormInfo" ><span className="requireIcon">*</span>结算方式：</label>
                    <div className="contractFormValue ">
                        <label className="select">
                            <Select
                                disabled={disabled}
                                onChange={this.IDC_cfg_store.payment_method}
                                value={this.IDC_cfg_store.saveContractData.payment_method || ''}>
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
                            this.IDC_cfg_store.RequireOther ?
                                <span className="requireIcon">*</span>
                                :
                                ''
                        }
                        {
                            this.IDC_cfg_store.RequireOther ? '其他：' : ''
                        }
                    </label>
                    <div className="contractFormValue col-sm-5">
                        {
                            this.IDC_cfg_store.RequireOther ?

                                <label className="input" >
                                    <Input

                                        disabled={disabled}
                                        type="text"
                                        value={this.IDC_cfg_store.saveContractData.otherValue || ''}
                                        onChange={this.IDC_cfg_store.changeOther}

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
                                disabled={disabled} className="form-control" value={this.IDC_cfg_store.saveContractData.billing_cycle || ''} onChange={this.IDC_cfg_store.setBillingCycle} id="fee_item" name="billing_cycle">
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                {this.IDC_cfg_store.periord_list.map(proj => (
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
                                disabled={disabled} value={this.IDC_cfg_store.saveContractData.pay_type || '请选择'} onChange={this.IDC_cfg_store.setPayType}>
                                <Select.Option value="请选择">请选择</Select.Option>
                                <Select.Option value="先付">先付</Select.Option>
                                <Select.Option value="后付">后付</Select.Option>
                            </Select>
                            <i />
                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>首付款（元）：</label>
                    <div className="contractFormValue">
                        <NumericInput
                            className="firstPayment"
                            step={0.01}

                            disabled={disabled}
                            min={0}
                            style={{ paddingLeft: '10px' }}
                            value={this.IDC_cfg_store.saveContractData.contract_first_payment}
                            onChange={this.IDC_cfg_store.setFirstPayment}
                        />
                    </div>

                </section>

                <DatePickerCustom
                    require={true}
                    startText='合同签定日期'
                    endText='合同结束日期'
                    onStartChange={this.IDC_cfg_store.changeContractStartDate}
                    onEndChange={this.IDC_cfg_store.changeContractEndDate}
                    sumValue={this.IDC_cfg_store.saveContractData.contract_days}
                    disabled={disabled}
                    startValue={this.IDC_cfg_store.saveContractData.contract_start_date
                        ?
                        moment(this.IDC_cfg_store.saveContractData.contract_start_date, dateFormat)
                        :
                        null}
                    endValue={this.IDC_cfg_store.saveContractData.contract_end_date
                        ?
                        moment(this.IDC_cfg_store.saveContractData.contract_end_date, dateFormat)
                        :
                        null} />
                
                    <section className="contractFormGroup">
                    <label className="label contractFormInfo">描述：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input.TextArea
                                disabled={disabled} pleaceholder="输入描述" type="text" value={this.IDC_cfg_store.saveContractData.description || ''} onChange={this.IDC_cfg_store.setDescription} />

                        </label>
                    </div>

                </section>

                <ContractDescription
                    disabled={this.IDC_cfg_store.disabled}
                    formData={{ ...this.IDC_cfg_store.saveContractData }}
                    setFieldsValue={this.IDC_cfg_store.setFieldsValue}
                />
                
            </article>
        )
    }
}



