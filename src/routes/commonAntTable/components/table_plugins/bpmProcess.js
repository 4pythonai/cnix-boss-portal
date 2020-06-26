import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import {
    hashHistory
} from 'react-router'



export default class BpmProcess extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }
<<<<<<< HEAD
        console.log('BpmProcess', navigationStore.currentMenu.process_kek, this.props.commonTableStore.selectedRows[0].processDefinitionKey)

        let data = {
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            transactid: this.props.commonTableStore.selectedRows[0].transactid,
=======
        console.log('BpmProcess',navigationStore.currentMenu.process_kek, this.props.commonTableStore.selectedRows[0].processDefinitionKey)
        
        let data = {
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            init_node: 'n',
            page_source: 'detail', // IDC合同专用
            readonly: false,
            action_code: this.props.commonTableStore.action_code
        }

        FlowApprovalStore.setInitNode('n');
<<<<<<< HEAD
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });
=======
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });       
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return null
    }
}