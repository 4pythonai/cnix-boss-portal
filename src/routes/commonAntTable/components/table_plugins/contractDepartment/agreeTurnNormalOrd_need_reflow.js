import React from 'react'
import { message } from 'antd'
import api from '@/api/api'

// 转为正式合同,重新走流程

export default class AgreeTurnNormalOrderNeedReflow extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    init() {
        if(this.props.commonTableStore.selectedRows.length!=1){
            message.error('请选择一条数据')
            return
        }
       let params={
           data:{uuid:this.props.commonTableStore.selectedRows[0].uuid,needReflow:'y'},
           method:'POST'
       }
       let res=api.contract_api.trunToRegular(params)
       if(res.code==200){
            this.props.refreshTable()
       }
    }

    render() {
        return null
    }
}