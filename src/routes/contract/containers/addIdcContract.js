import React from "react"
import ModalContractList from '../components/ModalContractList'
import SelectBackToBackContract from '../components/selectBackToBackContract'
import { Button, Divider, Card, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import ContractContainer from '../components/contractContainer'

import '../contract.scss'
import '../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class addIdcContract extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.IDC_cfg_store
    }

    getFormTitle = () => {
        let defaultProps = this.props.location.state;
        let reserveremark=this.store.saveContractData.hasContract
        if ( defaultProps.page_source == 'add') {
            if (defaultProps.isFromChance) {
                return '机会转为IDC收款合同'
            }

            if (defaultProps.isFromBigContract) {
                return <span>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        大客户正式合同
                        </span>
            }
            if(defaultProps.contract_action == 'vipContract'){
                return  <span>
                            <Icon type='star' style={{color:'red'}}></Icon>
                            <Icon type='star' style={{color:'red'}}></Icon>
                            <Icon type='star' style={{color:'red'}}></Icon>
                            新增IDC大客户预签合同
                            </span>
            }
            if(defaultProps.contract_action == 'IDCReceiveContract'){
            return <span>新增IDC普通收款合同<span style={{color:'red'}}>{reserveremark&&reserveremark=='否'?'(预签)':''}</span></span>
            }

            if (defaultProps.page_source == 'add') {

                return <span>新增IDC普通付款合同<span style={{color:'red'}}>{reserveremark&&reserveremark=='否'?'(预签)':''}</span></span>
            }
            
        }


        if (defaultProps.page_source == 'edit') {
            
            if (defaultProps.contract_action == 'IDCReceiveContract') {
                return <span>编辑IDC普通收款合同<span style={{color:'red'}}>{reserveremark&&reserveremark=='否'?'(预签)':''}</span></span>
            }
            if (defaultProps.contract_action == 'vipContract') {
           
                return <span>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        <Icon type='star' style={{color:'red'}}></Icon>
                        编辑IDC大客户预签合同
                        </span>
            }
            if (defaultProps.contract_action == 'IDCPaymentsContract') {
                return <span>编辑IDC普通付款合同<span style={{color:'red'}}>{reserveremark&&reserveremark=='否'?'(预签)':''}</span></span>
            }
        }
    }



    getContractModal = () => {
        let action_code = ''

        
        if (this.store.saveContractData.sign_type == '续签') {
            action_code = 'renew_' + this.props.location.state.contract_action
        } else {
            action_code = 'configure_IDCReceiveContract'
        }

        return <ModalContractList
            action_code={action_code}
            okHandle={this.store.makeReNewContractno}
            page_source={this.props.location.state.page_source}
        />
    }
    render() {

        //是否是大客户合同
        const ifvipValue = this.props.location.state.ifvip

        return (
            <div className="idc_wrapper">
                <h2 className="idc_contract_title"> {this.getFormTitle()} </h2>
                <Divider />
                <ContractContainer
                    defaultProps={this.props.location.state}></ContractContainer>

                <div className="idc_form_group">
                    <Button type="primary" htmlType="button" onClick={event => this.store.submitContractHandle({ isStart: false, ifvip: ifvipValue })}>保存合同</Button>
                </div>


                {this.getContractModal()}
                <SelectBackToBackContract
                    action_code={'renew_' + this.props.location.state.contract_action}
                ></SelectBackToBackContract>
            </div>
        );
    }
}
