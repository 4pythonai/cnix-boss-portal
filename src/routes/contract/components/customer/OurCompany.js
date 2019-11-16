import React from "react"

import { Collapse, Button, Icon, Input } from 'antd';
import { observer, inject } from "mobx-react"
import CustomerReferInfo from './CustomerReferInfo'
import CustomerSelecte from './CustomerSelecte'
import api from '@/api/api'
const { Panel } = Collapse;

@inject("IDC_cfg_store")
@inject("FlowApprovalStore")
@observer
export default class OurCompany extends React.Component {
    constructor(props) {
        super();
        this.store = props.IDC_cfg_store
        this.approvalStore = props.FlowApprovalStore
        this.state = {
            signerList: [],
            customerName: ''
        }
    }

    componentDidMount() {
        this.getSignerList()
    }

    getSignerList = async () => {
        let params = { method: 'POST' };
        let res = await api.contract_api.getSignerList(params);

        res.code == 200 && this.setState({ signerList: res.data })
    }

    getCurrentCustomer = (customerId, customer_index) => {
        let customerReferInfo = customerId == '请选择' ? {} : this.state.signerList.find(item => item.id == customerId);
        this.store.setOurCompany(customerId)
        this.store.setShorthand(customerReferInfo.shorthand)
        this.store.setSingerReferInfo(customerReferInfo)
    }

    render() {
        let { singerReferInfo } = this.store.saveContractData

        console.log('singerReferInfo我的', singerReferInfo)
        return (
            <div style={wrapperStyle}>

                <CustomerSelecte
                    customerId={this.store.saveContractData.singer_our_company_id}
                    readOnly={false}
                    disabled={this.store.disabled}
                    customer_index={10}
                    customerName={this.store.signerCustomer}
                    getCurrentCustomer={this.getCurrentCustomer}
                    customerList={this.state.signerList}
                />
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="查看客户详细信息" key="1">

                        <CustomerReferInfo customerReferInfo={singerReferInfo} />
                    </Panel>

                </Collapse>
            </div >
        );
    }
}



const wrapperStyle = {
    borderRadius: '3px',
    marginBottom: '20px'
}