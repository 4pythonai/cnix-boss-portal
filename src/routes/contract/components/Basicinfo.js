import React from "react";
import { observer, inject } from "mobx-react";
import { Radio, AutoComplete, Card, Button, Icon, Input, InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment';
import UpLoad from './UpLoad'
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';

@inject("IDC_cfg_store")
@inject("FlowApprovalStore")
@observer
export default class Basicinfo extends React.Component {
    constructor(props) {
        super();
        this.store = props.IDC_cfg_store
        this.approvalStore = props.FlowApprovalStore
    }

    renderProjectOptions(item) {
        return (
            <AutoComplete.Option key={item.id} value={item.project_name}> {item.project_name} </AutoComplete.Option>
        );
    }

    render() {
        let { disabled } = this.store
        return (
            <article className="idc_block">
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        签约类型：
                </label>
                    <div className="contractFormValue" >
                        <RadioGroup
                            disabled={disabled}
                            name="radiogroup" onChange={this.store.changeSignType} value={this.store.saveContractData.sign_type}>
                            <Radio value='新签' >新签</Radio>
                            <Radio value='续签' >续签</Radio>
                        </RadioGroup>

                        {/* disabled={this.store.disabledSignType == 'disableNewSign'}
                            disabled={this.store.disabledSignType == 'disableRenewSign'} */}
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>合同编号：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={disabled}
                                pleaceholder='输入合同编号' type="text" value={this.store.saveContractData.contract_no || ''} readOnly />

                        </label>
                    </div>
                </section>


                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        合同名称：
                    </label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input disabled={disabled} placeholder='输入合同名称' type="text" value={this.store.saveContractData.contract_name || ''} onChange={event => this.store.setContractName(event.target.value)} />

                        </label>
                    </div>

                </section>

                {/* 背靠背合同 */}
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">选择背靠背合同：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={this.store.disabled}
                                type="text"
                                onClick={this.store.showBTBContractModal}
                                value={this.store.saveContractData.back_to_back_contract_no || '请选择'}
                                readOnly />

                        </label>
                    </div>
                </section>



                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        合同份数：
                    </label>
                    <div className="contractFormValue">
                        <label className="input">
                            <InputNumber
                                disabled={disabled}
                                className="contract_count"
                                min={0}
                                step={1}
                                placeholder='输入合同份数'
                                value={this.store.saveContractData.contractNumber || ''}
                                onChange={this.store.setContractNumber} />
                        </label>
                    </div>
                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>合同类型：</label>
                    <div className="contractFormValue">
                        <label className="select">
                            <Select disabled={disabled} onChange={this.store.toggleIsFixedContract} value={this.store.saveContractData.contract_type || '请选择'}>
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                <Select.Option value="敞口合同">敞口合同</Select.Option>
                                <Select.Option value="固定合同">固定合同</Select.Option>
                            </Select>
                        </label>
                    </div>
                </section>

                {
                    (this.store.isFixedContract || this.store.saveContractData.contract_type == '固定合同')
                        ?
                        <section className="contractFormGroup">
                            <label className="label contractFormInfo"><span className="requireIcon">*</span>固定合同额：</label>
                            <div className="contractFormValue">
                                <label className="input">
                                    <InputNumber disabled={disabled} placeholder='输入固定合同额' className="number_input" style={{ width: '100%' }} min={0} step={1} value={this.store.saveContractData.contract_money} onChange={this.store.setContractMoney} />

                                </label>
                            </div>
                        </section>
                        :
                        null
                }



                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        整租/散租：
                  </label>
                    <div className="contractFormValue">
                        <RadioGroup disabled={disabled} name="radiogroup" onChange={this.store.changeRentType} value={this.store.saveContractData.rent_type}>
                            <Radio value='整租'>整租</Radio>
                            <Radio value='散租'>散租</Radio>
                        </RadioGroup>
                    </div>
                </section>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        要求完工日期：
                    </label>
                    <div className="contractFormValue">
                        <DatePicker
                            disabled={disabled}
                            placeholder='请选择合同完工日期'
                            onChange={this.store.setOndemandEnddate}
                            value={
                                this.store.saveContractData.enddate_ondemand
                                    ?
                                    moment(this.store.saveContractData.enddate_ondemand, dateFormat)
                                    :
                                    null
                            }
                        />
                    </div>
                </section>

                <section >
                    <label className="label ">附件 <span style={{ fontSize: '12px', color: '#e4393c' }}>(允许上传类型docs,docx, text/plain, doc, xlsx, xls, txt)</span></label>
                    <UpLoad disabled={disabled} />
                </section>
            </article >
        );
    }
}
