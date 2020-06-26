import React from 'react';
import { message } from 'antd'
import { hashHistory } from 'react-router'


export default class ChanceToContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据');
            return;
<<<<<<< HEAD
        }

        let IDC_proWorkTypeArr = ['IDC新签业务', 'IDC续签业务'];
        let ISP_proWorkTypeArr = ['ISP新签业务', 'ISP续签业务'];
        let contract_action = ''
        let pathname = ''
        if (IDC_proWorkTypeArr.includes(this.props.commonTableStore.selectedRows[0].proWorkType)) {
            contract_action = 'IDCReceiveContract'
            pathname = '/contract/addIdcContract'
        }

        if (ISP_proWorkTypeArr.includes(this.props.commonTableStore.selectedRows[0].proWorkType)) {
            contract_action = 'boss_ISP_contract'
            pathname= '/ISP_contract/addISPContract'
        }

        if(contract_action === ''){
            message.warning('目前只支持IDC业务和ISP业务')
            return 
=======


            let _tmprec = this.props.commonTableStore.selectedRows[0]

            let canstart = false;
            if (_tmprec.hasOwnProperty('flowstatus')) {

                if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                    canstart = true;
                }

                if (_tmprec.flowstatus == '未启动') {
                    canstart = true;
                }
            } else {
                canstart = true;

            }

            if (!canstart) {
                message.error('流程已经启动,不能转换.');
                return;
            }





        }

        let proWorkTypeArr = ['IDC新签业务', 'IDC续签业务']
        if (!proWorkTypeArr.includes(this.props.commonTableStore.selectedRows[0].proWorkType)) {
            message.error('所选机会的业务类型必须是 IDC新签业务 或 IDC续签业务')
            return;
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }

        let { id, ghost_customId, ghost_addressId, oppName, proWorkType } = { ...this.props.commonTableStore.selectedRows[0] };
        let data = {
            addressId: ghost_addressId,
            oppId: id,
            customId: ghost_customId,
<<<<<<< HEAD
            contract_action: contract_action,
=======
            contract_action: "IDCReceiveContract",//"IDCPaymentsContract",
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            readOnlyFirstSigner: true,
            isFromChance: true,
            page_source: 'add',
            proWorkType,
            oppName
        }
<<<<<<< HEAD
        hashHistory.push({ pathname: pathname, state: data })
=======
        hashHistory.push({
            pathname: '/contract/addIdcContract',
            state: data
        })
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return null
    }
}