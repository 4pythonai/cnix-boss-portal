import api from '@/api/api'
import React from 'react'

import { Modal, Popconfirm, message } from 'antd'
const { confirm } = Modal;


var clearIBM = {

    clear_ibm_net_usage: async function() {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.bpm.clear_ibm_net_usage(params);
        message.info(json.message)
    },

    clearIBM: function() {
        confirm({
            title: '将清除测试数据(IBM1,IBM2)合同占用',
            content: '时间稍长,请稍候',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.clear_ibm_net_usage()
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }
}


export default clearIBM








