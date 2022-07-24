import React from 'react';
import { Modal, message } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

@observer
export default class ResellerBillCreater extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条资源计费信息');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(current_row);

        this.setState({ visible: true });
        this.setState(current_row);
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,

            title: '生成客户的账单',
            bodyStyle: {
                width: 1200,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,

            onCancel: () => this.onCancel()
        };
    }

    render() {
        console.log('will render.....');
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <div style={{ margin: '10px' }}>
                        费用明细:
                        <br />
                    </div>
                </div>
            </Modal>
        );
    }
}
