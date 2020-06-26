import React from "react";
import { observer, inject } from "mobx-react"
import { Input, Select } from 'antd'

import CustomerAddr from './CustomerAddr'
import CustomerReferInfo from './CustomerReferInfo'
import CustomerSelecte from './CustomerSelecte' 
import api from '@/api/api'

@inject("IDC_cfg_store")
@observer
export default class CustomerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.IDC_cfg_store
    }

    render() {
        return (
            <div>
                <CustomerAddr {...this.props} readOnly={false}/>
                <CustomerReferInfo {...this.props}/>
            </div>
        );
    }
}
