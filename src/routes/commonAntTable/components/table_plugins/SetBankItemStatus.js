import api from '@/api/api';

import { Modal, message } from 'antd';
const { confirm } = Modal;

var SetBankItemStatus = {
    BatchSetBankItemStatus: async function () {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.billingSale.BatchSetBankItemStatus(params);
        message.info(json.message);
    },

    SetBankItemStatus: function () {
        confirm({
            title: '将设置所有银行流水状态',
            content: "查询->是否完成使用 ='n' ",
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.BatchSetBankItemStatus();
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    }
};

export default SetBankItemStatus;
