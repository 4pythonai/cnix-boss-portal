import React from "react"
import Basicinfo from "../components/Basicinfo"
import Outpay from "../components/Outpay"
import ResItem from "../components/chargeCom/ResItem"
import { Card } from 'antd'
import { inject, observer } from 'mobx-react'

import OurCompany from '../components/customer/OurCompany'
import SignCustomerWrapper from '../components/customer/SignCustomerWrapper'

import '../contract.scss'
import '../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class ContractContainer extends React.Component {

    // defaultProps = {
    //     readOnly: true,   // 详情： true， 编辑/新增： false
    // }

    constructor(props) {
        super(props);
        this.store = this.props.IDC_cfg_store
    }
    

    async componentDidMount() {
        let { defaultProps } = this.props
        this.store.setPageSource(defaultProps.page_source);
        this.store.setContactAction(defaultProps.contract_action)
        this.store.getIDC_contract_global_cfg();  // 获取配置

        // 详情页
        if (defaultProps.page_source == 'detail') {
            this.getDetail(defaultProps)
            // this.setEditData()
            return;
        }

        // 收款合同 处理路由传参
        if (defaultProps.contract_action == 'IDCReceiveContract') {
            this.receiveHandle(defaultProps)
            return;
        }
        // 付款合同 处理路由传参
        if (defaultProps.contract_action == 'IDCPaymentsContract') {
            this.paymentsHandle(defaultProps)
            return;
        }
    }

    receiveHandle = async (defaultProps) => {

        if (defaultProps.page_source == 'add') {
            // 设置一个默认的客户签约方，不能删除
            this.store.setDefaultSignCustomer(defaultProps.customId, defaultProps.addressId, defaultProps.readOnlyFirstSigner)
            // 转合同处理
            defaultProps.readOnlyFirstSigner && this.dealWithOppMsg(defaultProps)
            return;
        }


        defaultProps.page_source == 'edit' && this.getDetail(defaultProps)
    }

    async getDetail(defaultProps) {
        this.store.setUuid(defaultProps.uuid);
        this.store.setProcessKey(defaultProps.process_key)
        this.store.setDetailContractNo(defaultProps.contract_no)
        await this.store.getContractDetail();
    }

    async dealWithOppMsg(defaultProps) {
        await this.store.setOppid(defaultProps.oppId);

        if (defaultProps.proWorkType === 'IDC新签业务') {
            this.store.changeSignType('新签');
            this.store.setDisabledSignType('disableRenewSign');
        }
        if (defaultProps.proWorkType === 'IDC续签业务') {
            this.store.setDisabledSignType('disableNewSign');
        }

        this.store.setContractName(defaultProps.oppName);
    }

    // 付款合同编辑处理
    paymentsHandle = async defaultProps => {
        if (defaultProps.page_source == 'add') {

            // 设置一个默认的客户签约方，不能删除
            this.store.setDefaultSignCustomer()
            return;
        }
        defaultProps.page_source == 'edit' && this.getDetail(defaultProps)
    }

    componentWillUnmount() {
        this.store.clearContractState()
    }

    render() {
    let {defaultProps} = this.props
    let {saveContractData}  = this.store
        return (
            <div className="idc_wrapper">
                <div className="idc_card">
                    <Card title="签约信息" className="singer_msg_card" bodyStyle={{ padding: 0 }} style={{ overflowX: 'scroll' }}>

                        <OurCompany readOnly = {this.props.readOnly}/>
                        <SignCustomerWrapper
                            contract_action={defaultProps.contract_action}
                            page_source={defaultProps.page_source}
                            readOnly = {this.props.readOnly}
                        />

                    </Card>
                    <Card title="合同信息" className="basic_msg_card" bodyStyle={{ padding: 0 }}>
                        <div style={{ display: 'flex' }}>
                            <Basicinfo readOnly = {this.props.readOnly}/>
                            <Outpay readOnly = {this.props.readOnly}/>
                        </div>
                    </Card>

                </div>

                <ResItem 
                contract_type = {saveContractData.contract_type}
                disabled = {this.store.disabled} 
                setChargeDataOption={this.store.setChargeDataOption} />
            </div>
        );
    }
}
