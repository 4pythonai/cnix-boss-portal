import React from "react"
import { Button, Divider, Card } from 'antd'
import { inject, observer } from 'mobx-react'

import ContractContainer from '@/routes/contract/components/contractContainer'
import ContractDepartmentMsg  from './contractDepartmentMsg'
import FlowHistory from '@/routes/flow/containers/flowHistory'

import Print from '@/utils/print'
@inject('IDC_cfg_store')
@observer
export default class ContractDepartmentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.IDC_cfg_store
        this.getParams()
    }
    getParams() {
        var afterUrl = window.location.href.split('?')[1];
        let query_params = {}
        afterUrl.split('&').forEach(item => {
            let query_arr = item.split('=')
            query_params[query_arr[0]] = query_arr[1]
        })

        console.log('查看参数', query_params)
        this.defaultProps = query_params
    }

    getFormTitle = () => {
        let defaultProps = this.defaultProps;;
        if (defaultProps.contract_action == 'IDCReceiveContract' && defaultProps.page_source == 'detail') {
            return 'IDC收款合同详情'
        }
        if (defaultProps.contract_action == 'IDCPaymentsContract' && defaultProps.page_source == 'detail') {
            return 'IDC付款合同详情'
        }
        return 'IDC终止协议详情'
    }

    printContract(e) {
        e.stopPropagation();
        setTimeout(() => {
            Print('.idc_wrapper', { 'no-print': '.no-print' });
        }, 1000)
    }


    render() {
        console.log(66666666666,this.store.contractManageData)
        return (
            <div className="idc_wrapper">
                <h2 className="idc_contract_title"> {this.getFormTitle()} </h2>

                <Divider />

                <ContractContainer readOnly={false} defaultProps={this.defaultProps}></ContractContainer>
                <ContractDepartmentMsg contractManageData = {this.store.contractManageData}/>
                <div style={{margin:'24px',fontWeight: 'bold' }}>流程记录</div>
                <FlowHistory uuid={this.defaultProps.uuid} process_key={this.defaultProps.process_key} />
                <div className="idc_form_group">
                    <Button className="no-print" type="primary" htmlType="button" onClick={event => this.printContract(event)}>打印</Button>
                </div>
            </div>
        );
    }
}
