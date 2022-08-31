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
export default class OneKeyContractBill extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.oneKeyContractBill = this.oneKeyContractBill.bind(this);
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
        this.setState({ percent: 0.0 });
        if (this.state.percentEventSource) {
            this.state.percentEventSource.close();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ percent: 0.0 });
    }

    getReportPercent(uuid) {
        //
        const ssurl = api_root + '/BillingSale/sse?uuid=' + uuid;
        const token_from_userStore = userStore.getToken();
        const EventSource = EventSourcePolyfill;
        const percentEventSource = new EventSource(ssurl, {
            headers: {
                Authorization: token_from_userStore
            },
            heartbeatTimeout: 30000
        });

        percentEventSource.onmessage = (result) => {
            const serverobj = JSON.parse(result.data);
            console.log(serverobj);
            if (serverobj) {
                this.setState({
                    percent: serverobj.percent
                });
            }

            if (serverobj.shouldStop === 'yes') {
                percentEventSource.close();
            }
        };

        percentEventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            percentEventSource.close();
        };

        return percentEventSource;
    }

    async oneKeyContractBill() {
        this.setState({ visible: true });
        const uuid = uuidv4();
        const sse = this.getReportPercent(uuid);
        this.setState({ uuid: uuid, percentEventSource: sse });
        const params = {
            method: 'POST',
            data: {
                uuid: uuid,
                type: 'normal' //- 正常方式一键出合同账单
            }
        };
        const json = await api.billingSale.OneKeyContractBill(params);
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
            title: '一键出合同账单',
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
                    <Button key="back" onClick={this.oneKeyContractBill}>
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
