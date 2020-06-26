import React from 'react';
import { message } from 'antd'
import {
    hashHistory
} from 'react-router'



export default class SwitchDetail extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        if(this.props.commonTableStore.selectedRows.length != 1){
            message.warning('请选择一条数据')
            return;
        }
        let contract_action = this.props.commonTableStore.selectedRows[0].concat.indexOf('receive') != -1||this.props.commonTableStore.selectedRows[0].concat.indexOf('shadow') != -1 ? "IDCReceiveContract" :this.props.commonTableStore.selectedRows[0].concat.indexOf('pay') != -1 ?'IDCPaymentsContract': "boss_idc_termination_agreement"
        let process_key = this.props.commonTableStore.selectedRows[0].concat.indexOf('receive') != -1 ? "idc_order" :this.props.commonTableStore.selectedRows[0].concat.indexOf('pay') != -1 ?'idc_order_payment':this.props.commonTableStore.selectedRows[0].concat.indexOf('shadow') != -1 ?'idc_order_shadow': 'idc_order_stop'


        let params = {
            page_source: 'detail',
            contract_action: contract_action,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: process_key,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            remark:'FlowForm'
        }
         

        //  hashHistory.push({ pathname: 'contract/contractDepartmentDetail', state: params });
        //  let flowUrl=window.location.href
        // hashHistory.go(-1)
        // window.open(flowUrl+'&&remark=FlowForm','_blank')
        let params1 = ''
        let keys = Object.keys(params)
        keys.map((key, index) => {
            params1 += index + 1 === keys.length ? `${ key }=${ params[key] }` : `${ key }=${ params[key] }&`
        })
        //  hashHistory.push({ pathname: 'contract/contractDepartmentDetail', state: params });
         let new_url = `/#/contract/contractDepartmentDetail?${ params1 }`
         window.open(new_url,'_blank')
        //  let flowUrl=window.location.href
        // hashHistory.go(-1)
        // window.open(flowUrl+'&&remark=FlowForm','_blank')

    }

    render() {
        return null
    }
}