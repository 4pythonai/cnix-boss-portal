import React from 'react'
import { Modal ,message} from 'antd';
import { inject, observer } from 'mobx-react'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

@inject('IDC_cfg_store')
@observer
export default class SelectBackToBackContract extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.IDC_cfg_store;
    }

    okHandle() {
        if (this.refs.commonTableRef.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一个合同');
            return;
        }
        let selectRow = this.refs.commonTableRef.commonTableStore.selectedRows[0];
        this.store.setBackToBackContract(selectRow.contract_no)
        this.store.hideBTBContractModal()
    }

    render() {
        let disable = false;

        return (
            <Modal
                closable={disable}
                keyboard={disable}
                maskClosable={disable}
                width={1200}
                title="选择背靠背合同"
                centered
                cancelText="取消"
                okText="确认"
                onCancel={this.store.hideBTBContractModal}
                onOk={() => this.okHandle()}
                visible={this.store.visibleBTBContractModal}
            >
                <CommonTable ref="commonTableRef" action_code={this.props.action_code == "renew_IDCPaymentsContract" ? 'IDCReceiveContract' : 'IDCPaymentsContract'} />
            </Modal>
        )
    }

}
