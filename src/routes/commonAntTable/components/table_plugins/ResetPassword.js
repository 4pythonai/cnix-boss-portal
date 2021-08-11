import React from 'react'
import { message } from 'antd'
import api from '@/api/api'

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一个用户！")
            return;
        }


        let params = {
            method: 'POST', data: {
                mobile: this.props.commonTableStore.selectedRows[0].mobile
            }
        }
        let res = await api.user.resetPassword(params)
    }

    render() {
        return null
    }
}