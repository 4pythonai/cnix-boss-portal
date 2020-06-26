import React from 'react'
import { Table, Tabs, Icon } from 'antd';
import Activity from '@/routes/commonAntTable/components/table_plugins/activityRecord/activity'
import TeamMembers from '@/routes/commonAntTable/components/table_plugins/activityRecord/teamMembers'
import api from '@/api/api'
const { TabPane } = Tabs
export default class ActivityRecordsWrapper extends React.Component {

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span> <Icon type="flag" />活动</span>
                        }
                        key="1"
                    >
                        <Activity
                            action_code={this.props.action_code}
                            selectedRow={{ ...this.props.recordData }} />
                    </TabPane>

                    <TabPane
                        disabled={false}
                        tab={
                            <span> <Icon type="user" />团队成员</span>
                        }
                        key="2"
                    >
                        <TeamMembers selectedRow={{ ...this.props.recordData }} />
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

