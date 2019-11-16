import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import {
    hashHistory
} from 'react-router'
import ContractContainer from '@/routes/contract/components/contractContainer'


export default class BpmFormDetail extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }

        console.log('BpmFormDetail',navigationStore.currentMenu.process_kek, this.props.commonTableStore.selectedRows[0].processDefinitionKey)
        
        //nodeKey 为当时填写时候的节点ID
        let data = {
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            nodeKey: this.props.commonTableStore.selectedRows[0].nodeKey,
            readonly: true,
            init_node: 'n',
            action_code: this.props.commonTableStore.action_code,
            page_source: 'detail', // IDC合同专用开关

        }
        FlowApprovalStore.setInitNode('n');  // ???
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });
        let flowUrl=window.location.href
        hashHistory.go(-1)
        window.open(flowUrl,'_blank')
    }

    render() {
        return null
    }
}