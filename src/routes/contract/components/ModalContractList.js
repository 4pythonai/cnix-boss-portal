import React from 'react'
import { Modal ,message} from 'antd';
import { inject, observer } from 'mobx-react'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

@inject('IDC_cfg_store')
@observer
export default class ModalContractList extends React.Component {
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
        this.store.setUuid(selectRow.uuid)
        this.store.setDetailContractNo(selectRow.contract_no)
        if (this.props.page_source == 'add' || this.props.page_source == 'edit') {

            this.store.setProcessKey(this.props.action_code == "renew_IDCPaymentsContract" ? 'idc_order_payment': 'idc_order')
        }

        this.props.okHandle()
    }

    render() {
        let disable = false;

        return (
            <Modal
                closable={disable}
                keyboard={disable}
                maskClosable={disable}
                width={1200}
                destroyOnClose={true}
                title="选择合同"
                centered
                cancelText="取消"
                okText="确认"
                onCancel={this.store._hideContractListModle}
                onOk={() => this.okHandle()}
                visible={this.store.showContractListModle}
            >
                <CommonTable ref="commonTableRef" action_code={this.props.action_code} />
            </Modal>
        )
    }

}
