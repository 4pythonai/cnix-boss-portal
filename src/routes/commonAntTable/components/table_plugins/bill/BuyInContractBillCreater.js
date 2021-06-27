import React from 'react';
import { Modal, Button, Progress } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import userStore from '@/store/userStore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { v4 as uuidv4 } from 'uuid';

import { root_url, port, version_2 } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/${version_2}`;
export { api_root };

@observer
export default class BuyInContractBillCreater extends React.Component {
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
        percentEventSource: null
    };

    init() {
        this.setState({ visible: true });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        if (this.state.percentEventSource) {
            this.state.percentEventSource.close();
        }
    }

    getReportPercent(uuid) {
        const ssurl = api_root + '/Billing/sse?uuid=' + uuid;
        const token_from_userStore = userStore.getToken();
        const EventSource = EventSourcePolyfill;
        const percentEventSource = new EventSource(ssurl, {
            headers: {
                Authorization: token_from_userStore
            },
            heartbeatTimeout: 300000
        });

        percentEventSource.onmessage = (result) => {
            console.log(result.data);
            const serverobj = JSON.parse(result.data);
            if (serverobj.row) {
                const per = 100 * (parseInt(serverobj.row.done, 10) / parseInt(serverobj.row.total, 10)).toFixed(2);

                this.setState({
                    percent: per
                });
            }

            if (serverobj.break === 'yes') {
                percentEventSource.close();
            }
        };

        percentEventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            percentEventSource.close();
        };

        return percentEventSource;
    }

    async onekeyfunction() {
        this.setState({ visible: true });
        const uuid = uuidv4();
        // const sse = this.getReportPercent(uuid);
        // this.setState({uuid: uuid,percentEventSource: sse});
        this.setState({ uuid: uuid });

        const params = {
            method: 'POST',
            data: {
                uuid: uuid
            }
        };
        const json = await api.billing.OneKeyBuyInContractBill(params);
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
            title: '一键出采购合同账单',
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
