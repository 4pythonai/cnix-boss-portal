import { Modal } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import ProdTreeComponent from './ProdTreeComponent';

@observer
export default class ProdTree extends React.Component {
    state = {
        visible: false,
        odfusage: [],
        devname: ''
    };

    init() {
        this.showModal();
        this.setState({ visible: true });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };
    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    render() {
        return (
            <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} width={1320}>
                <ProdTreeComponent />
            </Modal>
        );
    }
}
