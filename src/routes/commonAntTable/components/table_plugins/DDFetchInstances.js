import React from 'react';
import { Modal, Button } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';

@observer
export default class DDFetchInstances extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.fetchDDInstanceForBizTermianate = this.fetchDDInstanceForBizTermianate.bind(this);
    }

    state = {
        visible: false
    };

    init() {
        this.setState({ visible: true });
    }

    async fetchDDInstanceForBizTermianate() {
        this.setState({ visible: true });
        const params = { method: 'POST', data: {} };
        const response = await api.dd.fetchDDInstanceForBizTermianate(params);
        console.log('response: ', response);
    }

    getModalProps() {
        return {
            width: 700,
            destroyOnClose: true,
            title: '获取运行中的流程(业务终止工单)',
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
                    <Button key="back" onClick={this.fetchDDInstanceForBizTermianate}>
                        获取运行中的流程(业务终止工单)
                    </Button>
                </div>
            </Modal>
        );
    }
}
