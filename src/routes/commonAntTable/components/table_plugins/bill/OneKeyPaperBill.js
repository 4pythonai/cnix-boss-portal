import React from 'react';
import { Modal, Table, Radio, Button } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';

import { root_url, port, version_2 } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/${version_2}`;
export { api_root };

@observer
export default class OneKeyPaperBill extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.onekeyfunction = this.onekeyfunction.bind(this);
        this.onChangeContractBillrange = this.onChangeContractBillrange.bind(this);

        this.delete_onekeybills = this.delete_onekeybills.bind(this);
    }

    state = {
        checkpassed: false,
        visible: false,
        execute_report: [],
        contractbillrange: ''
    };

    init() {
        this.setState({ visible: true });
    }

    async onekeyfunction() {
        this.setState({
            visible: true,
            execute_report: []
        });

        const params = {
            method: 'POST',
            data: {
                contractbillrange: this.state.contractbillrange
            }
        };
        const json = await api.billing.OneKeyPaperBill(params);
        this.setState({ execute_report: json.execute_report });
    }

    async delete_onekeybills() {
        this.setState({
            visible: true,
            execute_report: []
        });

        const params = {
            method: 'POST',
            data: {
                contractbillrange: this.state.contractbillrange
            }
        };
        const json = await api.billing.delete_onekeybills(params);
        this.setState({ execute_report: json.execute_report });
    }

    getModalProps() {
        return {
            width: 700,
            destroyOnClose: true,
            title: '一键生成客户账单',
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

    onChangeContractBillrange = (e) => {
        console.log(e);
        this.setState({ contractbillrange: e.target.value });
    };

    getReportColumn() {
        return [
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name'
            },
            {
                title: '地区',
                dataIndex: 'zone',
                key: 'zone'
            },
            {
                title: '结果',
                dataIndex: 'success',
                key: 'success'
            },
            {
                title: '错误信息',
                dataIndex: 'message',
                key: 'message'
            }
        ];
    }

    onCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div stye={{ display: 'flex' }}>
                    <Radio.Group onChange={this.onChangeContractBillrange} value={this.state.contractbillrange}>
                        <Radio value={'北京_预付_月付'}>北京预付(月付)</Radio>
                        <Radio value={'北京_预付_季付'}>北京预付(季付)</Radio>
                        <Radio value={'北京_预付_半年付'}>北京预付(半年付)</Radio>
                        <Radio value={'北京_预付_年付'}>北京预付(年付)</Radio>
                        <br />
                        <br />

                        <Radio value={'北京_后付_月付'}>北京后付(月付)</Radio>
                        <Radio value={'北京_后付_季付'}>北京后付(季付)</Radio>
                        <Radio value={'北京_后付_半年付'}>北京后付(半年付)</Radio>
                        <br />
                        <br />
                        <Radio value={'广州_预付_月付'}>广州预付(月付)</Radio>
                        <Radio value={'广州_预付_季付'}>广州预付(季付)</Radio>
                        <Radio value={'广州_预付_半年付'}>广州预付(半年付)</Radio>
                        <Radio value={'广州_预付_年付'}>广州预付(年付)</Radio>
                        <br />
                        <br />

                        <Radio value={'广州_后付_月付'}>广州后付(月付)</Radio>
                        <Radio value={'广州_后付_季付'}>广州后付(季付)</Radio>
                        <Radio value={'广州_后付_半年付'}>广州后付(半年付)</Radio>
                    </Radio.Group>

                    <br />
                    <br />
                    <Button key="back" onClick={this.onekeyfunction}>
                        一键生成客户账单
                    </Button>

                    <br />
                    <br />

                    <Table dataSource={this.state.execute_report} rowKey="uuid" columns={this.getReportColumn()} pagination={false} size="small" />
                </div>
            </Modal>
        );
    }
}
