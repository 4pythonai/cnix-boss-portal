import React from 'react';
import { message } from 'antd'
import api from '@/api/api'


export default class SendBackContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length < 1) {
            message.error('请至少选择一条数据');
            return;
        }
        let dataarr=[]
        for(var i=0;i<this.props.commonTableStore.selectedRows.length;i++){
            let obj={}
            obj.ctype=this.props.commonTableStore.selectedRows[i].maincontent
            obj.contract_no=this.props.commonTableStore.selectedRows[i].contract_no
            dataarr.push(obj)
        }
        let params = { 
            data: dataarr, 
            method: 'POST' 
        }
        api.notify.sendSmsForContractDept(params)
    }

    render() {
        return null
    }
}