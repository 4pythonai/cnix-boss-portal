// 客户在用资源
import api from '@/api/api';
import { message, Modal, Table } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ResTimeColumns from './columns/ResTimeColumns';

import React from 'react';

@observer
export default class ResourceUsage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.init = this.init.bind(this);
    }

    state = {
        resUsages: [],
        visible: false
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个客户');
            return;
        }
        const current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        const params = { method: 'POST', data: { custid: current_row.id } };
        const json = await api.billing.getUsages(params);
        console.log(json);

        this.setState({
            visible: true,
            resUsages: json.usages
        });
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1450,
            destroyOnClose: true,
            title: '在用资源',
            bodyStyle: {
                width: 1440,
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
        const modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <Table dataSource={this.state.resUsages} columns={ResTimeColumns} size="small" style={{ marginBottom: '20px', marginLeft: '10px' }} />
            </Modal>
        );
    }
}
