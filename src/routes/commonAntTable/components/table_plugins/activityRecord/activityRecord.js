import React from 'react';
import { message, Modal, Tabs, List, Icon, Button, Popconfirm } from 'antd'
import Activity from './activity'
import TeamMembers from './teamMembers'
import api from '@/api/api'
const { TabPane } = Tabs

export default class ActivityRecord extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
            addressList: []
        }
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.warning('请选择一条数据');
            return;
        }

        this.setState({
            visible: true
        })
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    async saveActivityFormData(data) {
        data = {
            customer_id: this.props.commonTableStore.selectedRows[0].id,
            ...data,
        }
        let params = { data: data, method: 'POST' };

        await api.customer.pendingAddress(params)

        this.hideModal()
    }




    render() {
        let { selectedRows } = this.props.commonTableStore
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            style={{ width: '400px' }}
            onCancel={() => this.hideModal()}
            title="活动记录" >
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span> <Icon type="flag" />活动</span>
                    }
                    key="1"
                >
                    <Activity
                        action_code={this.props.commonTableStore.action_code}
                        selectedRow={{ ...selectedRows[0] }} />
                </TabPane>

                <TabPane
                    disabled={this.props.commonTableStore.action_code == 'IDC_sales_chance' ? false : true}
                    tab={
                        <span> <Icon type="user" />团队成员</span>
                    }
                    key="2"
                >
                    <TeamMembers selectedRow={{ ...selectedRows[0] }} />
                </TabPane>
            </Tabs>

        </Modal >
    }
}