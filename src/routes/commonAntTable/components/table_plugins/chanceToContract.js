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
        }

        let { id, ghost_customId, ghost_addressId, oppName, proWorkType } = { ...this.props.commonTableStore.selectedRows[0] };
        let data = {
            addressId: ghost_addressId,
            oppId: id,
            customId: ghost_customId,
            contract_action: contract_action,
            readOnlyFirstSigner: true,
            isFromChance: true,
            page_source: 'add',
            proWorkType,
            oppName
        }
        hashHistory.push({ pathname: pathname, state: data })
    }

    render() {
        return null
    }
}