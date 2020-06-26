import React from 'react'
import api from '@/api/api'
import {message} from 'antd'

export default class BackToSales extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择1条数据！")
            return;
        }
        let params={
            data:{uuid:this.props.commonTableStore.selectedRows[0].uuid}, method: 'POST'
        }
        let res=await api.contract_api.returnSalesContract(params)
        if(res.code==200){
            this.props.refreshTable()
        }
        
    }

    render() {
        return null
    }
}