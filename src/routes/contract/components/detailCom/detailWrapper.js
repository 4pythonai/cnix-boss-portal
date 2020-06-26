import React from "react"
import { inject, observer } from 'mobx-react'
import ContractMsgDetail from './contractMsgDetail'
import FlowHistory from '@/routes/flow/containers/flowHistory'
import { Card } from 'antd'
import '../../contract.scss'
import '../../chargeData.scss'

@inject('IDC_cfg_store')
@observer
export default class DetailWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.IDC_cfg_store = this.props.IDC_cfg_store
    }


    async componentDidMount() {
        let { defaultProps } = this.props
        this.IDC_cfg_store.setPageSource(defaultProps.page_source);
        this.IDC_cfg_store.setContactAction(defaultProps.contract_action)
        this.IDC_cfg_store.getIDC_contract_global_cfg();  // 获取配置
        this.getDetail(defaultProps)
    }



    async getDetail(defaultProps) {
        await this.IDC_cfg_store.setUuid(defaultProps.uuid);
        await this.IDC_cfg_store.setProcessKey(defaultProps.process_key)
        await this.IDC_cfg_store.setDetailContractNo(defaultProps.contract_no)
        await this.IDC_cfg_store.getContractByUUID();
    }


    componentWillUnmount() {
        this.IDC_cfg_store.clearContractState()
    }

    getFlowHistory = () => {
        
        if (this.props.isShowFlowHistory === false) {
            return null
        }

        return <Card title="审批历史">
            <FlowHistory uuid={this.props.defaultProps.uuid} process_key={this.props.defaultProps.process_key} />
        </Card>
    }

    render() {

        let { saveContractData } = this.IDC_cfg_store
        return (
            <div className="idc_detail_wrapper">
                <ContractMsgDetail
                    disabled={this.IDC_cfg_store.disabled}
                    fileList={this.IDC_cfg_store.fileList}
                    canprinter={this.props.canprinter}
                    processkey={this.IDC_cfg_store.process_key}
                    signerCustomer={this.IDC_cfg_store.signerCustomer}
                    setChargeDataOption={this.IDC_cfg_store.setChargeDataOption}
                    detailData={{...saveContractData, chinese_shorthand: this.IDC_cfg_store.chinese_shorthand}} />

                {this.getFlowHistory()}
            </div>
        );
    }
}
