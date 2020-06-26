import React from 'react';
import { message } from 'antd'
import api from '@/api/api'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import {
    hashHistory
} from 'react-router'


 
export default class SwitchFormalContract extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            processkey:'',
            uuid:''
        }
        this.init = this.init.bind(this)
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.warning('请选择一条数据')
            return;
        }
        if (this.props.commonTableStore.selectedRows[0].hasContract == '是') {
            message.warning('本条记录已有合同.')
            return;
        }
        let paramsjson={
            data:{
                uuid:this.props.commonTableStore.selectedRows[0].uuid
            },
            method:'POST'
        }
        let resp=await api.contract_api.transferredFormalContract(paramsjson)
        if(resp.code==200){
            this.props.refreshTable()
            // this.setState({
            //     processkey:resp.data.processkey,
            //     uuid:resp.data.uuid
            // })
        }
        if(resp.code==400){
            return
        }


        // let data = {
        //     process_key: this.state.processkey,
        //     uuid: this.state.uuid,
        //     transactid: this.props.commonTableStore.selectedRows[0].transactid,
        //     page_source: 'detail', // IDC合同专用 ISP合同专用
        //     readonly: false,
        //     init_node: 'y',
        //     contract_no: this.props.commonTableStore.selectedRows[0].contract_no || this.props.commonTableStore.selectedRows[0].contractno,
        //     ifvip:this.props.commonTableStore.selectedRows[0].ifvip
        // }
        // FlowApprovalStore.setInitNode('y');
        // hashHistory.push({ pathname: `flow/FlowForm`, state: data });




        // let params = {}
        // params.page_source = 'add'
        // params.contract_action = this.props.commonTableStore.action_code
        // params.readOnlyFirstSigner = false
        // params.isFormal = '是'
        // params.contract_no = this.props.commonTableStore.selectedRows[0].contract_no
        // params.uuid = this.props.commonTableStore.selectedRows[0].uuid
        // params.process_key = navigationStore.currentMenu.process_key
        // params.readOnlyFirstSigner = false
        // hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
    }

    render() {
        return null
    }
}