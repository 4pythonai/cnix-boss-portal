import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import ContractWarnInner from './ContractWarnInner';
@observer
export default class ContractWarn extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        loading: false,
        visible: false
    };

    async init() {
        this.setState({ visible: true });
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '预警合同列表',
            bodyStyle: {
                width: 1200,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            visible: this.state.visible,
            onOk: this.refresh,
            onCancel: () => this.onCancel()
        };
    }

    refresh = async () => {
        this.props.refreshTable();
    };

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };
    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <ContractWarnInner refresh={this.refresh} />
                </div>
            </Modal>
        );
    }
}
