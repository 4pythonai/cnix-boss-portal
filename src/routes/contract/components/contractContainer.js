import React from "react"
import Basicinfo from "../components/Basicinfo"
import Outpay from "../components/Outpay"
import ResItem from "../components/chargeCom/ResItem"
import { Card, Radio } from 'antd'
import { inject, observer } from 'mobx-react'

const RadioGroup = Radio.Group;

import OurCompany from '../components/customer/OurCompany'
import SignCustomerWrapper from '../components/customer/SignCustomerWrapper'
import ArticleInformation from './articleInformation'

import '../contract.scss'
import '../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class ContractContainer extends React.Component {

    constructor(props) {
        super(props);
        this.IDC_cfg_store = this.props.IDC_cfg_store
    }


    async componentDidMount() {
        let { defaultProps } = this.props
        this.IDC_cfg_store.setPageSource(defaultProps.page_source);
        this.IDC_cfg_store.setContactAction(defaultProps.contract_action)
        this.IDC_cfg_store.getIDC_contract_global_cfg();  
        // this.IDC_cfg_store.saveBillingoption('later');  

        // 签约类型默认为新签
        if (defaultProps.page_source == 'add') {
            this.IDC_cfg_store.changeSignType('新签')
            this.IDC_cfg_store.setStampName('合同章')
        }

        // 详情页
        if (defaultProps.page_source == 'detail' || defaultProps.isFromBigContract || defaultProps.isFormal) {
            this.getDetail(defaultProps)
            return;
        }

        // 收款合同,大客户合同 处理路由传参
        if (defaultProps.contract_action == 'IDCReceiveContract' || defaultProps.contract_action == 'vipContract') {
            this.receiveOrVipHandle(defaultProps)
            return;
        }
        // 付款合同 处理路由传参
        if (defaultProps.contract_action == 'IDCPaymentsContract') {
            this.paymentsHandle(defaultProps)
            return;
        }
    }

    // 付款合同编辑处理
    paymentsHandle = async defaultProps => {
        if (defaultProps.page_source == 'add') {

            // 设置一个默认的客户签约方，不能删除
            this.IDC_cfg_store.setDefaultSignCustomer()
            return;
        }
        defaultProps.page_source == 'edit' && this.getDetail(defaultProps)
    }

    receiveOrVipHandle = async (defaultProps) => {

        if (defaultProps.page_source == 'add') {
            // 设置一个默认的客户签约方，不能删除
            await this.IDC_cfg_store.setDefaultSignCustomer(defaultProps.customId, defaultProps.addressId)
            // 转合同处理
            defaultProps.isFromChance && this.dealWithOppMsg(defaultProps)
            return;
        }

        defaultProps.page_source == 'edit' && this.getDetail(defaultProps)
    }

    async getDetail(defaultProps) {
        console.log('查看defaultProps.isFormal ', defaultProps.isFormal)
        this.IDC_cfg_store.setUuid(defaultProps.uuid);
        this.IDC_cfg_store.setIsFromBigContract(defaultProps.isFromBigContract === true ? true : false)
        this.IDC_cfg_store.setIsFormal(defaultProps.isFormal ? defaultProps.isFormal : '')
        this.IDC_cfg_store.setProcessKey(defaultProps.process_key)
        this.IDC_cfg_store.setDetailContractNo(defaultProps.contract_no)
        await this.IDC_cfg_store.getContractByUUID();
    }

    async dealWithOppMsg(defaultProps) {
        await this.IDC_cfg_store.setOppid(defaultProps.oppId);

        if (defaultProps.proWorkType === 'IDC新签业务') {
            this.IDC_cfg_store.changeSignType('新签', defaultProps.isFromChance);
        }

        this.IDC_cfg_store.setContractName(defaultProps.oppName);
    }

    componentWillUnmount() {
        this.IDC_cfg_store.clearContractState()
    }

    render() {
        console.log(this.props)
        let { defaultProps } = this.props
        let { saveContractData } = this.IDC_cfg_store

        return (
            <div className="idc_wrapper">
                <div className="idc_card">
                    <Card title="签约信息" className="singer_msg_card" bodyStyle={ { padding: 0 } } style={ { overflowX: 'scroll' } }>
                        <OurCompany readOnly={ this.props.readOnly } />
                        <SignCustomerWrapper
                            contract_action={ defaultProps.contract_action }
                            page_source={ defaultProps.page_source }
                            readOnly={ this.props.readOnly }
                        />
                    </Card>
                    <Card title={ "合同信息" + (defaultProps.oaflag == 'y' ? '(来源OA)' : '') } className="basic_msg_card" bodyStyle={ { padding: 0 } }>
                        <div style={ { display: 'flex' } }>
                            <Basicinfo defaultProps={ this.props.defaultProps } readOnly={ this.props.readOnly } />
                            <Outpay readOnly={ this.props.readOnly } />
                        </div>
                    </Card>

                </div>

                <ResItem
                    
                    
                    defaultProps={ this.props.defaultProps }
                    contract_no={ saveContractData.contract_no }
                    contract_type={ saveContractData.contract_type }
                    disabled={ this.IDC_cfg_store.disabled }
                    setChargeDataOption={ this.IDC_cfg_store.setChargeDataOption } />

                <ArticleInformation
                    disabled={ this.IDC_cfg_store.disabled }
                    formData={ { ...this.IDC_cfg_store.saveContractData } }
                    setFieldsValue={ this.IDC_cfg_store.setFieldsValue }
                />
            </div>
        );
    }
}
