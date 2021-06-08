import api from '@/api/api';

import { Modal, message } from 'antd';
const { confirm } = Modal;

var ContractWarn = {
    setWarn: async function () {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.contract.setWarn(params);
        message.info(json.message);
    },

    ContractWarn: function () {
        confirm({
            title: '设置合同预警状态',
            content: "完成后,搜索 预警=>'y' ",
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.setWarn();
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    }
};

export default ContractWarn;
