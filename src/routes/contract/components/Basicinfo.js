import React from "react";
import { observer, inject } from "mobx-react";
import { Radio, AutoComplete, Card, Button, Icon, Input, InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment';
import UpLoad from './UpLoad'
import '../contract.scss'
import chargeStore from '@/store/chargeStore'
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

@inject("IDC_cfg_store")
@inject("FlowApprovalStore")
@observer
export default class Basicinfo extends React.Component {
    constructor(props) {
        super();
        this.IDC_cfg_store = props.IDC_cfg_store
        this.approvalStore = props.FlowApprovalStore
    }

    renderProjectOptions(item) {
        return (
            <AutoComplete.Option key={ item.id } value={ item.project_name }> { item.project_name } </AutoComplete.Option>
        );
    }
    componentDidMount() {
        if (this.props.defaultProps.contract_action == 'vipContract') {
            this.IDC_cfg_store.setFieldsValue('hasContract', '否')
        }
        if (this.props.defaultProps.contract_action == 'IDCPaymentsContract') {
            this.IDC_cfg_store.setFieldsValue('hasContract', '是')
        }
    }
    getSignList = () => {
        let signList = [
            '请选择',
            '新签',
            '续签',
            '补充协议'
        ];
        if (this.props.defaultProps.contract_action == 'vipContract') {
            signList = ['请选择', '新签'];
        }
        if (this.props.defaultProps.contract_action == 'IDCReceiveContract') {
            signList = [
                '请选择',
                '新签',
                '续签',
                '顺延',
                '补充协议'
            ];;
        }


        return signList.map((item, index) => <Select.Option key={ index } value={ item }>{ item }</Select.Option>)
    }
    getContractcount() {
        if (this.IDC_cfg_store.saveContractData.contractNumber) {
            return this.IDC_cfg_store.saveContractData.contractNumber
        } else {
            if (this.IDC_cfg_store.saveContractData.sign_type == '新签') {
                this.IDC_cfg_store.setContractNumber('1')
            } else if (this.IDC_cfg_store.saveContractData.sign_type == '续签') {
                this.IDC_cfg_store.setContractNumber('0')
            } else {
                return ''
            }
        }

    }

    render() {
        let { disabled, disabledSigners } = this.IDC_cfg_store
        let disabledSign = false;
        if (disabledSigners) {
            disabledSign = disabledSigners
        }

        if (this.IDC_cfg_store.page_source == 'edit') {
            disabledSign = true
        }
        return (
            <article className="idc_block" className='read'>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        业务员：
                  </label>
                    <div className="contractFormValue">
                        <Input
                            disabled={ true }
                            type="text"
                            value={ this.IDC_cfg_store.saveContractData.staffname ? this.IDC_cfg_store.saveContractData.staffname : sessionStorage.getItem('staff_name') }
                            readOnly />
                    </div>
                </section>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        签约类型：
                </label>
                    <div className="contractFormValue" >

                        <Select
                            style={ { backgruond: '#fff !important' } }
                            disabled={ disabledSign }
                            onSelect={ this.IDC_cfg_store.changeSignType }
                            value={ this.IDC_cfg_store.saveContractData.sign_type || '请选择' }>
                            { this.getSignList() }
                        </Select>
                    </div>

                </section>
                {
                    this.props.defaultProps.contract_action != 'vipContract' && this.props.defaultProps.contract_action != 'IDCPaymentsContract' ?
                        <section className="contractFormGroup">
                            <label style={ { color: 'red' } } className="label contractFormInfo">
                                <span className="requireIcon">*</span>
                        是否是预签：
                    </label>
                            <div className="contractFormValue">
                                <label className="input">
                                    <i className="icon-prepend fa fa-question-circle" />
                                    <Select disabled={ disabled } onChange={ event => this.IDC_cfg_store.setFieldsValue('hasContract', event) } value={ this.IDC_cfg_store.saveContractData.hasContract || '请选择' }>
                                        <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                        {/* 是预签, 则没有合同,否则是有合同. */ }
                                        <Select.Option value="否">是</Select.Option>
                                        <Select.Option value="是">否</Select.Option>

                                    </Select>

                                </label>
                            </div>

                        </section> : null
                }

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>合同编号：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={ disabled }
                                pleaceholder='输入合同编号' type="text" value={ this.IDC_cfg_store.saveContractData.contract_no || '' } readOnly />

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
                            <Input disabled={ disabled } placeholder='输入合同名称' type="text" value={ this.IDC_cfg_store.saveContractData.contract_name || '' } onChange={ event => this.IDC_cfg_store.setContractName(event.target.value) } />

                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        印章名称：
                    </label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Select disabled={ disabled } onChange={ this.IDC_cfg_store.setStampName } value={ this.IDC_cfg_store.saveContractData.stamp_name || '请选择' }>
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                <Select.Option value="公章">公章</Select.Option>
                                <Select.Option value="合同章">合同章</Select.Option>
                            </Select>

                        </label>
                    </div>

                </section>
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        用章简称：
                    </label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={ this.IDC_cfg_store.disabled }
                                type="text"
                                value={ this.IDC_cfg_store.chinese_shorthand }
                                readOnly />
                        </label>
                    </div>

                </section>

                {/* 背靠背合同 */ }
                <section className="contractFormGroup">
                    <label className="label contractFormInfo">选择背靠背合同：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input
                                disabled={ this.IDC_cfg_store.disabled }
                                type="text"
                                onClick={ this.IDC_cfg_store.showBTBContractModal }
                                value={ this.IDC_cfg_store.saveContractData.back_to_back_contract_no || '请选择' }
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
                                disabled={ disabled }
                                className="contract_count"
                                min={ this.IDC_cfg_store.saveContractData.sign_type == '新签' ? 1 : 0 }
                                step={ 1 }
                                placeholder='输入合同份数'
                                value={ this.getContractcount() }
                                onChange={ this.IDC_cfg_store.setContractNumber }
                            />
                        </label>
                    </div>
                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo"><span className="requireIcon">*</span>合同类型：</label>
                    <div className="contractFormValue">
                        <label className="select">
                            <Select disabled={ disabled } onChange={ this.IDC_cfg_store.toggleIsFixedContract } value={ this.IDC_cfg_store.saveContractData.contract_type || '请选择' }>
                                <Select.Option key='请选择' value='请选择'>请选择</Select.Option>
                                <Select.Option value="敞口合同">敞口合同</Select.Option>
                                <Select.Option value="固定合同">固定合同</Select.Option>
                            </Select>
                        </label>
                    </div>
                </section>



                {
                    (this.IDC_cfg_store.isFixedContract || this.IDC_cfg_store.saveContractData.contract_type == '固定合同')
                        ?
                        <div>
                            <section className="contractFormGroup">
                                <label className="label contractFormInfo"><span className="requireIcon">*</span>固定合同总额：</label>
                                <div className="contractFormValue">
                                    <label className="input">
                                        <InputNumber disabled={ true } placeholder='输入固定合同额' className="number_input" style={ { width: '100%' } } min={ 0 } value={ parseFloat(this.IDC_cfg_store.saveContractData.contract_money).toFixed(2) } onChange={ this.IDC_cfg_store.setContractMoney } />
                                    </label>
                                </div>
                            </section>

                            <section className="contractFormGroup">
                                <label className="label contractFormInfo"><span className="requireIcon">*</span>费用预估</label>
                                <div className="contractFormValue">
                                    <label className="input">
                                        <InputNumber disabled={ true } className="number_input" style={ { width: '100%' } } min={ 0 } value={ chargeStore.chargeSumPrice } />
                                    </label>
                                </div>
                            </section>


                            <section className="contractFormGroup">
                                <label style={ { color: 'red' } } className="label contractFormInfo">差额：</label>
                                <div  style={ { color: 'red' } }  className="contractFormValue">
                                    { this.IDC_cfg_store.saveContractData.contract_money != undefined && chargeStore.chargeSumPrice != undefined ? (this.IDC_cfg_store.saveContractData.contract_money - chargeStore.chargeSumPrice).toFixed(2) : '' }
                                </div>
                            </section>
                        </div>

                        :
                        null
                }



                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        整租/散租：
                  </label>
                    <div className="contractFormValue">
                        <RadioGroup disabled={ disabled } name="radiogroup" onChange={ this.IDC_cfg_store.changeRentType } value={ this.IDC_cfg_store.saveContractData.rent_type }>
                            <Radio value='整租'>整租</Radio>
                            <Radio value='散租'>散租</Radio>
                        </RadioGroup>
                    </div>
                </section>


                <section className="contractFormGroup">
                    <label className="label contractFormInfo">
                        <span className="requireIcon">*</span>
                        当前部门：
                  </label>
                    <div className="contractFormValue">
                        <Input
                            disabled={ true }
                            type="text"
                            value={ this.IDC_cfg_store.saveContractData.department ? this.IDC_cfg_store.saveContractData.department : JSON.parse(sessionStorage.getItem('userInfo')).department }
                            readOnly />
                    </div>
                </section>
                <section >
                    <label className="label ">附件 <span style={ { fontSize: '12px', color: '#e4393c' } }>(允许上传类型docs,docx, text/plain, doc, xlsx, xls, txt, pdf)</span></label>
                    <UpLoad disabled={ disabled } />
                </section>
            </article >
        );
    }
}
