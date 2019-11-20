import api from '@/api/api'
import React from 'react'

import { Modal, Popconfirm, message } from 'antd'
const { confirm } = Modal;


var syncactiviti = {

    syncnetwork: async function() {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.bpm.syncNetworkStatus(params);
    },






    syncactiviti: function() {



        confirm({
            title: '将使用本表同步网络资源状态',
            content: '时间稍长,请稍候',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.syncnetwork()
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });


    }
}


export default syncactiviti








