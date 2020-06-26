import React from 'react';
import { message } from 'antd'

import navigationStore from '@/store/navigationStore'
import {
    hashHistory
} from 'react-router'



export default class SwitchToDetailContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        if(this.props.commonTableStore.selectedRows.length != 1){
            message.warning('请选择一条数据')
            return;
        }
        let params = {
            page_source: 'detail',
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            contract_action: this.props.commonTableStore.action_code,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            readOnlyFirstSigner: false,
        }
         

         hashHistory.push({ pathname: 'ISP_contract/detailISPContract', state: params });
         let flowUrl=window.location.href
        hashHistory.go(-1)
        window.open(flowUrl+'&&remark=FlowForm','_blank')
    }

    render() {
        return null
    }
}