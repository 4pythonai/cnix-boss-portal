import React from 'react';
import { Modal, Button, message, Progress } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { v4 as uuidv4 } from 'uuid';

import { root_url, port, version_2 } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/${version_2}`;
export { api_root };

//- 单合同采购账单
@observer
export default class OneBuyInContractBillCreater extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.onekeyfunction = this.onekeyfunction.bind(this);
    }

    state = {
        checkpassed: false,
        visible: false,
        percent: 0.0,
        uuid: '',
        percentEventSource: null,
        contractNo: ''
    };

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个采购合同');
            return;
        }
        console.log(this.props.commonTableStore.selectedRows[0].cno);
        this.setState({ visible: true, contractNo: this.props.commonTableStore.selectedRows[0].cno });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        if (this.state.percentEventSource) {
            this.state.percentEventSource.close();
        }
    }
    async onekeyfunction() {
        this.setState({ visible: true });
        const uuid = uuidv4();
        this.setState({ uuid: uuid });

        const params = {
            method: 'POST',
            data: {
                cno: this.state.contractNo,
                uuid: uuid
            }
        };
        const json = await api.billingBuy.OneKeyBuyInContractBill(params);
        if (json.success === 'no') {
            this.setState({
                visible: true,
                checkpassed: false,
                toal_check_errors: json.toal_check_errors
            });
        } else {
            this.setState({
                visible: true,
                checkpassed: true,
                billjson: json
            });
        }
    }

    getModalProps() {
        return {
            width: 700,
            destroyOnClose: true,
            title: '单采购合同账单',
            bodyStyle: {
                width: 700,
                height: 500,
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: () => this.onCancel(),
            footer: [
                <Button key="back" onClick={this.onCancel}>
                    关闭
                </Button>
            ],
            onCancel: () => this.onCancel()
        };
    }

    onCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <Button key="back" onClick={this.onekeyfunction}>
                        点击开始执行
                    </Button>

                    <div>
                        <Progress strokeLinecap="square" percent={this.state.percent} />
                    </div>
                </div>
            </Modal>
        );
    }
}
