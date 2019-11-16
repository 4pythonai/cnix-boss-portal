import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'


export default class ViewProcess extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }

        console.log('ViewProcess',navigationStore.currentMenu.process_key, this.props.commonTableStore.selectedRows[0].processDefinitionKey)
        let params = {
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
        }

        console.log(params)

        FlowApprovalStore.FlowProgress(event, params);
    }

    render() {
        return null
    }
}