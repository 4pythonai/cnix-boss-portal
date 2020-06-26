import React from 'react'
import { Modal} from 'antd';
import { inject, observer } from 'mobx-react'
import ChargeModalContent from './chargeModalContent'

@inject('chargeStore')
@observer
export default class ChargeModal extends React.Component {
    constructor(props) {
        super()
        this.store = props.chargeStore
    }

    render() {
        return (
            <div>
                <Modal
                    title='IDC合同收费项'
                    width={610}
                    bodyStyle={
                        {
                            height: '600px'
                        }
                    }
                    cancelText='取消'
                    okText="保存"
                    visible={this.store.chargeModalVisible}
                    onOk={this.store.saveChargeItem}
                    onCancel={this.store.hideChargeModal}
                    zIndex={1050}
                >
                    <ChargeModalContent />
                </Modal>
            </div>
        );
    }
}
