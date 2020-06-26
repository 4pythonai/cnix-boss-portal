import React from 'react';
import { message } from 'antd'
import {
    hashHistory
} from 'react-router'



export default class SwitchToAddContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        let params = {}
         params.page_source = 'add'
         params.contract_action = this.props.commonTableStore.action_code
         params.readOnlyFirstSigner = false,

         hashHistory.push({ pathname: 'ISP_contract/addISPContract', state: params });
    }

    render() {
        return null
    }
}