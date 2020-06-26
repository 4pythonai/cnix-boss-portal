import React from 'react';
import { message } from 'antd'
import { hashHistory } from 'react-router'
import navigationStore from '@/store/navigationStore'
<<<<<<< HEAD
import api from '@/api/api'
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


export default class EditIdcContract extends React.Component {
    constructor(props) {
        super(props)
<<<<<<< HEAD
    }

    init = async () => {
=======
        this.init = this.init.bind(this)
    }

    init() {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据');
            return;
        }


<<<<<<< HEAD
        
        let _tmprec = this.props.commonTableStore.selectedRows[0]
        let process_key = navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey
        let uuid = this.props.commonTableStore.selectedRows[0].uuid
        if (this.props.commonTableStore.action_code == 'IDCReceiveContract') {
            if (this.props.commonTableStore.selectedRows[0].uuid_preset && !this.props.commonTableStore.selectedRows[0].uuid_regular) {
                process_key = 'idc_order_shadow'
                uuid = this.props.commonTableStore.selectedRows[0].uuid_preset
            }
            if (this.props.commonTableStore.selectedRows[0].uuid_regular) {
                process_key = 'idc_order'
                uuid = this.props.commonTableStore.selectedRows[0].uuid_regular
            }
        }
=======

        let _tmprec = this.props.commonTableStore.selectedRows[0]

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {

            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                canstart = true;
            }

<<<<<<< HEAD

            if (_tmprec.flowstatus == '未提交' || _tmprec.flowstatus == '撤回' || _tmprec.flowstatus == '已退回') {
                canstart = true;
            } else {
                let fmdata = {}
                fmdata.uuid = uuid
                fmdata.processkey = process_key
                let params = { data: fmdata, method: 'POST' };
                let json = await api.bpm.checkCanEdit(params);
                if (json.code == 200) {
                    json.data == 'y' ? canstart = true : canstart = false
                }
            }
        }

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能编辑');
            return;
        }

=======
            if (_tmprec.flowstatus == '未启动') {
                canstart = true;
            }
        }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (!canstart) {
            message.error('流程已经启动,不能编辑');
            return;
        }






        // @需要做数据处理
        let params = {
<<<<<<< HEAD
            uuid: uuid,
            oaflag: this.props.commonTableStore.selectedRows[0].oaflag,
            process_key:process_key,
=======
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: navigationStore.currentMenu.process_key || this.props.commonTableStore.selectedRows[0].processDefinitionKey,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            contract_no: this.props.commonTableStore.selectedRows[0].contract_no,
            page_source: 'edit',
            contract_action: this.props.commonTableStore.action_code,
            readOnlyFirstSigner: false,
<<<<<<< HEAD
            ifvip: this.props.commonTableStore.selectedRows[0].ifvip
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }

        hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
    }

    render() {
        return null
    }
}