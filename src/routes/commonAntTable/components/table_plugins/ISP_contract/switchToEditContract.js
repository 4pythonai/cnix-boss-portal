import React from 'react';
import { message } from 'antd'
import { hashHistory } from 'react-router'
import navigationStore from '@/store/navigationStore'


export default class SwitchToEditContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {

        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据');
            return;
        }



        let _tmprec = this.props.commonTableStore.selectedRows[0]

        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {

            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                canstart = true;
            }

            if (_tmprec.flowstatus == '未提交') {
                canstart = true;
            }
        }

        if (!canstart) {
            message.error('流程已经启动,不能编辑');
            return;
        }






        // @需要做数据处理
        let params = {
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            page_source: 'edit',
            contract_action: this.props.commonTableStore.action_code,
            readOnlyFirstSigner: false,
        }

        hashHistory.push({ pathname: 'ISP_contract/addISPContract', state: params });
    }

    render() {
        return null
    }
}