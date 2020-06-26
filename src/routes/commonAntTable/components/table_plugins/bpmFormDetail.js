import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
<<<<<<< HEAD
import {
    hashHistory
} from 'react-router'
=======
import FlowApprovalStore from '@/store/FlowApprovalStore'
import {
    hashHistory
} from 'react-router'
import ContractContainer from '@/routes/contract/components/contractContainer'
import FlowForm from '../../../flow/containers/flowForm';
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


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

<<<<<<< HEAD
        console.log('BpmFormDetail', navigationStore.currentMenu.process_kek, this.props.commonTableStore.selectedRows[0].processDefinitionKey)

        console.log(this.props.commonTableStore.selectedRows)

=======
        console.log('BpmFormDetail',navigationStore.currentMenu.process_kek, this.props.commonTableStore.selectedRows[0].processDefinitionKey)
        
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        //nodeKey 为当时填写时候的节点ID
        let data = {
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
<<<<<<< HEAD
            nodeKey: this.props.commonTableStore.selectedRows[0].nodeKey?this.props.commonTableStore.selectedRows[0].nodeKey:null,
=======
            nodeKey: this.props.commonTableStore.selectedRows[0].nodeKey,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            readonly: true,
            init_node: 'n',
            action_code: this.props.commonTableStore.action_code,
            page_source: 'detail', // IDC合同专用开关

        }
<<<<<<< HEAD

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')
=======
        FlowApprovalStore.setInitNode('n');  // ???
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });
        let flowUrl=window.location.href
        hashHistory.go(-1)
        window.open(flowUrl+'&&remark=FlowForm','_blank')
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return null
    }
}