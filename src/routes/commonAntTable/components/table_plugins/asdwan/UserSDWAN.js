import { Modal, message } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import TabToken from './TabToken';
import TabListPOP from './TabListPOP';
import TabListCPEs from './TabListCPEs';
const { TabPane } = Tabs;

export default class UserSDWAN extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        alreadyused: 0,
        jsonstr: {},
        pops: []
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        this.setState({ visible: true });
    }

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: 'SD-WAN',
            bodyStyle: {
                width: 1200,
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

    callback = (key) => {
        console.log(key);
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    客户名称: {this.state.custname} <br />
                    CPE数量: {this.state.moneyfrombank} <br />
                    关联PoP点: {this.state.alreadyused}
                    <br />
                    <br />
                </div>
                <br />
                <br />
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Token" key="1">
                        <TabToken />
                    </TabPane>
                    <TabPane tab="List PoP" key="2">
                        <TabListPOP />
                    </TabPane>
                    <TabPane tab="List CPEs" key="3">
                        <TabListCPEs />
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}
