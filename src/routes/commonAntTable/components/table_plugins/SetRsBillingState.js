import api from '@/api/api';
import { Modal, message } from 'antd';
const { confirm } = Modal;

var SetRsBillingState = {
    setbs: async function () {
        let params = {
            method: 'POST'
        };
        console.log(params);
        let json = await api.network.SetRsBillingState(params);
        message.info(json.message);
    },

    SetRsBillingState: function () {
        confirm({
            title: '将设置计费时间状态',
            content: "完成后,搜索 计费时间状态=>'n' ",
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.setbs();
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    }
};

export default SetRsBillingState;
