import React from "react"
import { Button, Divider, Card,Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import DetailWrapper from '../components/detailCom/detailWrapper'

import Print from '@/utils/print'
import '../contract.scss'
import '../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class DetailIDCContract extends React.Component {
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

        this.query_params = query_params
    }

    getFormTitle = () => {
        let defaultProps = this.query_params;

        console.log(decodeURI(defaultProps.ifvip))

        if (defaultProps.page_source == 'detail') {
            if(defaultProps.contract_action == 'IDCReceiveContract'){
                return 'IDC收款合同详情'
            }
            if(defaultProps.contract_action == 'IDCPaymentsContract'){
                return 'IDC付款合同详情'
            }
            if(defaultProps.contract_action == 'vipContract'){
                return <span>
                            <Icon type='star' style={{color:'red'}}></Icon>
                            <Icon type='star' style={{color:'red'}}></Icon>                   
                            <Icon type='star' style={{color:'red'}}></Icon>
                            大客户IDC收款合同详情
                        </span>               
            }
            
        }
    }
    printContract(e) {
        e.stopPropagation();
        setTimeout(() => {
            Print('.idc_wrapper', { 'no-print': '.no-print' });
        }, 1000)
    }

    renderPrintBtn = () => {
        let role_code = sessionStorage.getItem('role_code')
        
        console.log( role_code )
        
        // idc_onepart_archiving 
        // idc_twopart_archiving
        //business_archiving
        // big_customer_archiving
        //isp_archiving
        if(
            role_code === 'idc_onepart_archiving'|| 
            role_code === 'idc_twopart_archiving'|| 
            role_code === 'business_archiving'|| 
            role_code === 'big_customer_archiving'|| 
            role_code === 'isp_archiving'

           )
        {
            return <div className="idc_form_group">
            <Button className="no-print" style={ { backgroundColor: '#304156' } } type="primary" htmlType="button" onClick={ event => this.printContract(event) }>打印</Button>
        </div>
        }
    }

    render() {
        return (
            <div className="idc_wrapper">
                <h2 className="idc_contract_title"> { this.getFormTitle() }（{ this.store.saveContractData.contract_no }） </h2>

                <Divider />

                <DetailWrapper canprinter={true} isShowFlowHistory={ true } defaultProps={ this.query_params }></DetailWrapper>

                {this.renderPrintBtn()}
                
            </div>
        );
    }
}
