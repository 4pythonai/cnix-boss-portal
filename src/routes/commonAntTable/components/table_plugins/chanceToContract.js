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
        }

        let { id, ghost_customId, ghost_addressId, oppName, proWorkType } = { ...this.props.commonTableStore.selectedRows[0] };
        let data = {
            addressId: ghost_addressId,
            oppId: id,
            customId: ghost_customId,
            contract_action: "IDCReceiveContract",//"IDCPaymentsContract",
            readOnlyFirstSigner: true,
            isFromChance: true,
            page_source: 'add',
            proWorkType,
            oppName
        }
        hashHistory.push({
            pathname: '/contract/addIdcContract',
            state: data
        })
    }

    render() {
        return null
    }
}