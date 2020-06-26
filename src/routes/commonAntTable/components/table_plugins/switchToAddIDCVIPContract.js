import React from 'react';
import { message } from 'antd'
import {
    hashHistory
} from 'react-router'


//增加IDC大客户合同  

export default class SwitchToAddIDCVIPContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init() {
        let params = {}
        params.page_source = 'add'
        params.contract_action = this.props.commonTableStore.action_code
        params.readOnlyFirstSigner = false
        params.ifvip = '是'
        hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
    }

    render() {
        return null
    }
}