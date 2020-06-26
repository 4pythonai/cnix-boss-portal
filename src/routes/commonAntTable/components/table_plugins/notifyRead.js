import React from 'react'
import { message } from 'antd'
import api from '@/api/api'

export default class NotifyRead extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    async init() {
        if (this.props.commonTableStore.selectedRows.length < 1) {
            message.error("请至少选择1条数据！")
            return;
        }

        console.log(this.props.commonTableStore)
        let params = {
            data: {
                selectedRowKeys: this.props.commonTableStore.selectedRowKeys
            },
            method: 'POST'
        }
        let res = await api.notify.saveReadNotify(params)
        if(res.code == 200){
            this.props.refreshTable();
        }
    }

    render() {
        return null
    }
}