import React from 'react';
import { message } from 'antd'
import { hashHistory } from 'react-router'


export default class SwitchBigCustomerContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据');
            return;
        }

        if(this.props.commonTableStore.selectedRows[0].ifvip === "否"){
            message.error('请选择一条大客户预签合同');
            return;
        }

        if(this.props.commonTableStore.selectedRows[0].flowstatus != "归档"){
            message.error('合同还没有归档不能转为正式合同！');
            return;
        }

        if(this.props.commonTableStore.selectedRows[0].transfered == "是"){
            message.error('此合同不能重复转为大客户正式合同！');
            return;
        }


        let params = {}
        params.page_source = 'add'
        params.isFromBigContract = true
        params.contract_action = this.props.commonTableStore.action_code
        params.contract_no = this.props.commonTableStore.selectedRows[0].contract_no
        params.uuid = this.props.commonTableStore.selectedRows[0].uuid
        params.process_key = 'idc_order_vip'
        params.readOnlyFirstSigner = false
        params.ifvip = this.props.commonTableStore.selectedRows[0].ifvip;
        hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
    }

    render() {
        return null
    }
}