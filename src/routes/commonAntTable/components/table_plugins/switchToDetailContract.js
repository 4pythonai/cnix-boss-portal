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
<<<<<<< HEAD
        let process_key = navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey
        let uuid=this.props.commonTableStore.selectedRows[0].uuid
        if(this.props.commonTableStore.action_code=='IDCReceiveContract'){
            if(this.props.commonTableStore.selectedRows[0].uuid_preset&&!this.props.commonTableStore.selectedRows[0].uuid_regular){
                process_key='idc_order_shadow'
                uuid=this.props.commonTableStore.selectedRows[0].uuid_preset
            }
            if(this.props.commonTableStore.selectedRows[0].uuid_regular){
                process_key='idc_order'
                uuid=this.props.commonTableStore.selectedRows[0].uuid_regular
            }
        }

        
        let data = {
            page_source: 'detail',
            uuid:uuid,
            process_key: process_key,
            contract_action: this.props.commonTableStore.action_code,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            readOnlyFirstSigner: false,
            ifvip: this.props.commonTableStore.selectedRows[0].ifvip,
        }
         
        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${key}=${data[key]}` : `${key}=${data[key]}&`
        })

        let new_url = `/#/contract/detailIDCContract?${params }`
        
        window.open(new_url,  '_blank')
=======
        let params = {
            page_source: 'detail',
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            contract_action: this.props.commonTableStore.action_code,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            readOnlyFirstSigner: false,
        }
         

         hashHistory.push({ pathname: 'contract/detailIDCContract', state: params });
         let flowUrl=window.location.href
        hashHistory.go(-1)
        window.open(flowUrl+'&&remark=FlowForm','_blank')
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return null
    }
}