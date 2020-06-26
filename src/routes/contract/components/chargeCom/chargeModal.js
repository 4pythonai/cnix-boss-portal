import React from 'react'
import { Modal} from 'antd';
import { inject, observer } from 'mobx-react'
import ChargeModalContent from './chargeModalContent'

@inject('chargeStore')
@observer
export default class ChargeModal extends React.Component {
    constructor(props) {
        super()
        this.chargeStore = props.chargeStore
    }

    render() {
        return (
            <div>
                <Modal
                    title='IDC合同收费项'
                    width={630}
                    bodyStyle={
                        {
                            minHeight: '650px'
                        }
                    }
                    cancelText='取消'
                    okText="保存收费项"
                    maskClosable={false}
                    visible={this.chargeStore.chargeModalVisible}
                    onOk={this.chargeStore.saveChargeItem}
                    onCancel={this.chargeStore.hideChargeModal}
                    zIndex={1050}
                >
                    <ChargeModalContent />
                </Modal>
            </div>
        );
    }
}
