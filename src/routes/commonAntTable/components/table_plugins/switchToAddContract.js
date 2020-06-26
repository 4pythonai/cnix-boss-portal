import React from 'react';
import { message } from 'antd'
import {
    hashHistory
} from 'react-router'


<<<<<<< HEAD
//增加普通IDC合同
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

export default class SwitchToAddContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

<<<<<<< HEAD
    init() {
        let params = {}
        params.page_source = 'add'
        params.contract_action = this.props.commonTableStore.action_code
        params.readOnlyFirstSigner = false
        params.ifvip = '否'
        hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
=======
    init(){
        let params = {}
         params.page_source = 'add'
         params.contract_action = this.props.commonTableStore.action_code
         params.readOnlyFirstSigner = false,

         hashHistory.push({ pathname: 'contract/addIdcContract', state: params });
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return null
    }
}