import React from 'react';
import { message } from 'antd'
import {
    hashHistory
} from 'react-router'



export default class SwitchToEditContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        if(this.props.commonTableStore.selectedRows.length != 1){
            message.warning('请选择一条数据')
            return;
        }
 
         // @需要做数据处理
         let params = {
            page_source: 'edit',
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            contract_action: this.props.commonTableStore.action_code,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            readOnlyFirstSigner: false,
         }
         
         hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
    }

    render() {
        return null
    }
}