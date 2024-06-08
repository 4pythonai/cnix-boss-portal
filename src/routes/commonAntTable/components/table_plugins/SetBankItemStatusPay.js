import api from '@/api/api';

import { Modal, message } from 'antd';
const { confirm } = Modal;

var SetBankItemStatusPay = {
    BatchSetBankItemStatusPay: async function () {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.billingBuy.BatchSetPayItemStatus(params);
        message.info(json.message);
    },

    SetBankItemStatusPay: function () {
        confirm({
            title: '采购付款记录:将设置所有银行流水状态',
            content: "查询->是否完成使用 ='n' ",
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.BatchSetBankItemStatusPay();
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    }
};

export default SetBankItemStatusPay;
