import React from 'react';
import { Modal } from 'antd';
import SwitchPortSelector from './SwitchPortSelector';

export default class SwitchPortEditor extends React.Component {
    constructor(props) {
        console.log('props--------------------: ', props);

        super(props);
        this.init = this.init.bind(this);
        this.state = {
            visible: false,
            current_swportid: null,
            target_swportid: null,
            resitemid: null
        };
    }

    init() {
        console.log('init CALLED!');
        if (this.props.commonTableStore.selectedRows.length !== 1) {
            message.error('请选择一条数据！');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec.network_inner_value);
        let network_value_obj = JSON.parse(_tmprec.network_inner_value);
        console.log('network_value_obj: ', network_value_obj);

        if (!network_value_obj.hasOwnProperty('swports')) {
            console.log('无法获取交换机端口信息');
            return;
        }

        console.log('network_value_obj: ', network_value_obj);
        let swportid = network_value_obj.swports[0];
        let tmp_swportid = parseInt(swportid);

        if (tmp_swportid > 0) {
            this.setState({ current_swportid: tmp_swportid, resitemid: _tmprec.id });
            this.showModal();
        }
    }

    onCancelHandle = () => {
        this.setState({
            visible: false
        });
    };

    showModal() {
        this.setState({
            visible: true
        });
    }

    saveFormData = () => {
        this.refs.searchFormContainerRef.getFormValue();
    };

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '交换机端口替换',
            bodyStyle: {
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: this.saveFormData,
            onCancel: () => this.onCancelHandle()
        };
    }

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal width={800} {...modalProps}>
                {this.state.current_swportid && <div>原交换机端口ID: {this.state.current_swportid}</div>}
                <br />
                <SwitchPortSelector
                    operation_version="Manual"
                    refreshTable={this.props.refreshTable}
                    resitemid={this.state.resitemid}
                    current_swportid={this.state.current_swportid}
                />
            </Modal>
        );
    }
}
