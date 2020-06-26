import React from "react"
import ModalContractList from '../components/ModalContractList'
import SelectBackToBackContract from '../components/selectBackToBackContract'
import { Button, Divider, Card } from 'antd'
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
        if (defaultProps.contract_action == 'IDCReceiveContract' && defaultProps.page_source == 'add') {
            return defaultProps.isFromChance ? '机会转为IDC收款合同' : '新增IDC收款合同'
        }
        if (defaultProps.contract_action == 'IDCReceiveContract' && defaultProps.page_source == 'edit') {
            return '编辑IDC收款合同'
        }
        if (defaultProps.contract_action == 'IDCPaymentsContract' && defaultProps.page_source == 'add') {
            return '新增IDC付款合同'
        }
        if (defaultProps.contract_action == 'IDCPaymentsContract' && defaultProps.page_source == 'edit') {
            return '编辑IDC付款合同'
        }
    }
    render() {
        return (
            <div className="idc_wrapper">
                <h2 className="idc_contract_title"> {this.getFormTitle()} </h2>

                <Divider />

                <ContractContainer
                    defaultProps={this.props.location.state}></ContractContainer>

                <div className="idc_form_group">
                    <Button type="primary" htmlType="button" onClick={event => this.store.submitContractHandle({ isStart: false })}>保存</Button>
                </div>

                <ModalContractList
                    action_code={'renew_' + this.props.location.state.contract_action}
                    okHandle={this.store.makeReNewContractno}
                    page_source={this.props.location.state.page_source}
                />

                <SelectBackToBackContract
                    action_code={'renew_' + this.props.location.state.contract_action}
                ></SelectBackToBackContract>
            </div>
        );
    }
}
