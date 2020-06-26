import React from 'react';
import { message, Modal } from 'antd'
import { hashHistory } from 'react-router'
import api from '@/api/api'
import { toJS } from 'mobx'

const { confirm } = Modal;

//收合同

export default class ReceiveContractPaper extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length <= 0) {
            message.warning('请选择一条合同数据')
            return;
        }
        let selectedRows = this.props.commonTableStore.selectedRows

        console.log(this.props.commonTableStore.selectedRows[0].hasContract)
        if (this.props.commonTableStore.selectedRows[0].hasContract == '是') {
            message.warning('这条数据已经有合同')
            return;
        }

        let selectedRow = this.props.commonTableStore.selectedRows[0]

        confirm({
            title: '你确定拿到预签合同了吗?',
            content: '收到合同后,请选择转正式或者重新走审批流程',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.ReceiveContractPaper(selectedRow)
            },
            onCancel: () => {
                console.log(this.props)

            },
        });


    }

    ReceiveContractPaper = async selectedRow => {
        let params = {
            data: selectedRow,
            method: 'POST'
        };
        let json = await api.contract_api.ReceiveContractPaper(params);
        if (json.code == 200) {
            await this.props.refreshTable()
        }
    }

    render() {
        return null
    }
}