import React from 'react';
import { Modal, message } from 'antd'
import api from '@/api/api'
const { confirm } = Modal;



export default class flowWithDraw extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }




    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }





        confirm({
            title: '你确定要撤回这个流程?',
            content: '如果此流程已经被下一步骤处理,撤回将失败',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {


                this.withDrawProcess()
            },
            onCancel: () => {
                console.log(this.props)

            },
        });

    }



    async withDrawProcess() {

        let _tmprec = this.props.commonTableStore.selectedRows[0]
        console.log(_tmprec)








        let params = {
            data: {
                processDefinitionKey: _tmprec.processDefinitionKey,
                starter: sessionStorage.getItem("user"),
                uuid: _tmprec.uuid,
            },
            method: 'POST'
        };

        let json = await api.bpm.withDraw(params);

        if (json.code == 200) {
            this.props.refreshTable()
        }
    }


    render() {
        return null
    }
}