import api from '@/api/api'
import React from 'react'

import { Modal, Popconfirm, message } from 'antd'
const { confirm } = Modal;


var syncactiviti = {

<<<<<<< HEAD
    deleteData: async function() {
=======
    syncnetwork: async function() {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let params = {
            method: 'POST'
        };
        console.log(params);
<<<<<<< HEAD


        let json = await api.processmanager.syncActivitiuser(params);

        // if (json.code == 200) {
        //     this.props.refreshTable()
        // }


=======
        let json = await api.bpm.syncNetworkStatus(params);
        message.info(json.message)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    },






<<<<<<< HEAD


=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    syncactiviti: function() {



        confirm({
<<<<<<< HEAD
            title: '你确定要同步吗?',
            content: '删除后将无法恢复',
=======
            title: '将使用本表同步网络资源状态',
            content: '时间稍长,请稍候',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
<<<<<<< HEAD
                this.deleteData()
=======
                this.syncnetwork()
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });


    }
}


export default syncactiviti
<<<<<<< HEAD
// module.exports = syncactiviti
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778







