import React from 'react';
import { message } from 'antd'

import navigationStore from '@/store/navigationStore'
import {
    hashHistory
} from 'react-router'



export default class FlowPrintContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        if(this.props.commonTableStore.selectedRows.length != 1){
            message.warning('请选择一条数据')
            return;
        }
        let data = {
            page_source: 'detail',
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            contract_action: this.props.commonTableStore.action_code,
            readonly: true,
        }
        
         
        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${key}=${data[key]}` : `${key}=${data[key]}&`
        })

        let new_url = `/#/contract/detailIDCContract?${params }`
        
        window.open(new_url,  '_blank')
    }

    render() {
        return null
    }
}