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


        
        let rowData =this.props.commonTableStore.selectedRows[0]
        // let process_key = navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey
        let process_key = navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey
        let uuid = this.props.commonTableStore.selectedRows[0].uuid
        if (this.props.commonTableStore.action_code == 'IDCReceiveContract') {
            if (this.props.commonTableStore.selectedRows[0].uuid_preset && !this.props.commonTableStore.selectedRows[0].uuid_regular) {
                process_key = 'idc_order_shadow'
                uuid = this.props.commonTableStore.selectedRows[0].uuid_preset
            }
            if (this.props.commonTableStore.selectedRows[0].uuid_regular) {
                process_key = 'idc_order'
                uuid = this.props.commonTableStore.selectedRows[0].uuid_regular
            }
        }
        
        // IDC合同, 是否大客户流程单独处理 .
        if((rowData.hasOwnProperty('ifvip') && rowData.ifvip === '是') || rowData.processDefinitionKey == 'idc_order_vip'){
            process_key = 'idc_order_vip'
        }

        let params = {
            process_key: process_key,
            uuid: uuid,
        }

        FlowApprovalStore.FlowProgress(event, params);
    }

    render() {
        return null
    }
}