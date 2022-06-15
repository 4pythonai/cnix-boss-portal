import React from 'react';
import {Modal,message} from 'antd';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import PayBuyinInner from './PayBuyinInner';
@observer
export default class PayBuyin extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        loading: false,
        vendorid: -1,
        visible: false
    };

    async init() {
        if(this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个供应商');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(current_row);
        this.setState({visible: true,vendorid: current_row.id});
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '添加付款记录',
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

    onCancel = (e,f) => {
        this.setState({
            visible: false
        });
    };
    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <PayBuyinInner refresh={this.refresh} vendorid={this.state.vendorid} />
                </div>
            </Modal>
        );
    }
}
