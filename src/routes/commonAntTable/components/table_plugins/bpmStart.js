import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import api from '@/api/api'
import {
    hashHistory
} from 'react-router'


//发起审批 按钮
export default class BpmStart extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0]

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


        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {

            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                canstart = true;
            }

            if (_tmprec.flowstatus == '未提交') {
                canstart = true;
            }

            if (_tmprec.flowstatus == '已退回') {
                canstart = true;
            }
            if (_tmprec.flowstatus == '撤回') {
                canstart = true
            } else {
                let fmdata = {}
                fmdata.uuid = uuid
                fmdata.processkey = process_key
                let params = { data: fmdata, method: 'POST' };
                let json = await api.bpm.checkCanStartFlow(params);
                if (json.code == 200) {
                     if (json.data == 'n') {
                        canstart = false
                        if (!canstart) {
                            message.error(json.reason);
                            return;
                        }

                    }else{
                        canstart = true
                    }
                }
            }
        }

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能发起');
            return;
        }



        let data = {
            process_key: process_key,
            uuid: uuid,
            transactid: this.props.commonTableStore.selectedRows[0].transactid,
            page_source: 'detail', // IDC合同专用 ISP合同专用
            readonly: false,
            init_node: 'y',
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no || this.props.commonTableStore.selectedRows[0].contractno,
            ifvip: _tmprec.ifvip
        }
        FlowApprovalStore.setInitNode('y');
        hashHistory.push({ pathname: `flow/FlowForm`, state: data });
    }

    render() {
        return null
    }
}