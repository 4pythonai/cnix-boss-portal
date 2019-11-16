import React from "react"
import { Button, Divider, Card } from 'antd'
import { inject, observer } from 'mobx-react'

import ContractContainer from '../components/contractContainer'

import Print from '@/utils/print'
import '../contract.scss'
import '../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class detailIDContract extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.IDC_cfg_store
    }

    getFormTitle = () => {
        let defaultProps = this.props.location.state;
        if (defaultProps.contract_action == 'IDCReceiveContract' && defaultProps.page_source == 'detail') {
            return 'IDC收款合同详情'
        }
        if (defaultProps.contract_action == 'IDCPaymentsContract' && defaultProps.page_source == 'detail') {
            return 'IDC付款合同详情'
        }
    }

    printContract(e) {
        e.stopPropagation();
        setTimeout(() => {
            Print('.idc_wrapper', { 'no-print': '.no-print' });
        }, 1000)
    }
    render() {
        return (
            <div className="idc_wrapper">
                <h2 className="idc_contract_title"> {this.getFormTitle()} </h2>

                <Divider />

                <ContractContainer readOnly={false} defaultProps={this.props.location.state}></ContractContainer>

                <div className="idc_form_group">
                    <Button className="no-print" type="primary" htmlType="button" onClick={event => this.printContract(event)}>打印</Button>
                </div>
            </div>
        );
    }
}
