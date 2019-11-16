import api from '@/api/api'
import React from 'react'

import { Modal, Popconfirm, message } from 'antd'
const { confirm } = Modal;


var syncactiviti = {

    deleteData: async function() {
        let params = {
            method: 'POST'
        };
        console.log(params);


        let json = await api.bpm.syncActivitiuser(params);

        // if (json.code == 200) {
        //     this.props.refreshTable()
        // }


    },








    syncactiviti: function() {



        confirm({
            title: '你确定要同步吗?',
            content: '删除后将无法恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.deleteData()
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });


    }
}


export default syncactiviti
// module.exports = syncactiviti







