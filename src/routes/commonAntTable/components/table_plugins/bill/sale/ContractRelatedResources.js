import React from 'react';
import { Modal, message, Table } from 'antd';
import api from '@/api/api';
import { toJS } from 'mobx';
import ResTimeColumns from '../columns/ResTimeColumns';
export default class ContractRelatedResources extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length === 0) {
            message.error('请选择一个合同');
            return;
        }

        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        let params = { method: 'POST', data: { contract_no: current_row.contract_no } };
        let json = await api.billingSale.getContractRelatedResourcesAll(params);
        if (json.code === 200) {
            this.setState({ visible: true, resources: json.resources });
        } else {
            this.setState({ visible: true, resources: [] });
        }
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    };

    createTableByRows = () => {
        if (!this.state.visible) {
            return;
        }

        return (
            <div>
                <Table rowKey="id" dataSource={this.state.resources} columns={ResTimeColumns} size="small" style={{ marginBottom: '20px', marginLeft: '10px' }} />
            </div>
        );
    };

    getModalProps() {
        return {
            width: 1800,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '资源价格情况',
            bodyStyle: {
                width: 1800,
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
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <div style={{ margin: '10px' }}>
                        占用资源情况列表:
                        <br />
                    </div>
                    {this.createTableByRows()}
                </div>
            </Modal>
        );
    }
}
