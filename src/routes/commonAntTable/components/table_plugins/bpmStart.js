import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import {
    hashHistory
} from 'react-router'



export default class BpmStart extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }


        let _tmprec = this.props.commonTableStore.selectedRows[0]
        console.log(_tmprec)

        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {

            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                canstart = true;
            }

            if (_tmprec.flowstatus == '未启动') {
                canstart = true;
            }
        }

        if (!canstart) {
            message.error('流程已经启动,不能重复启动');
            return;
        }


        console.log('BpmStart',navigationStore.currentMenu.process_key, this.props.commonTableStore.selectedRows[0].processDefinitionKey)
        
        let data = {
            process_key: navigationStore.currentMenu.process_key,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            page_source: 'detail', // IDC合同专用
            readonly: false,
            init_node: 'y'
        }
        FlowApprovalStore.setInitNode('y');
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });
    }

    render() {
        return null
    }
}