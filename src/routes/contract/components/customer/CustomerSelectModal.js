import React from 'react'
import { Modal ,message} from 'antd';
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

export default class CustomerSelectModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    okHandle() {
        if (this.refs.commonTableRef.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一个合同');
            return;
        }
        let selectRow = this.refs.commonTableRef.commonTableStore.selectedRows[0];

        this.props.getCurrentCustomer(selectRow.id, this.props.customer_index, selectRow)

        this.hideCustomerModal()
    }

    hideCustomerModal = () => {
        this.setState({
            visible: false
        })
    }

    showCustomerModal = () => {
        if(this.props.disabled){
            return;
        }
        this.setState({
            visible: true
        })
    }

    render() {
        let disable = false;

        return (
            <Modal
                closable={disable}
                keyboard={disable}
                maskClosable={disable}
                width={1200}
                title="选择签约方客户"
                centered
                cancelText="取消"
                okText="确认"
                onCancel={this.hideCustomerModal}
                onOk={() => this.okHandle()}
                visible={this.state.visible}
            >
                
                <CommonTable ref="commonTableRef" action_code='signer_customer' />
            </Modal>
        )
    }

}
