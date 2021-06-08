import React from 'react';
import { Tabs } from 'antd';
import RptTotalOwned from './RptTotalOwned';

import RptPayPlan from './RptPayPlan';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default class BuyinRptView extends React.Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="总欠费" key="1">
                        <RptTotalOwned />
                    </TabPane>
                    <TabPane tab="本月付款计划" key="2">
                        <RptPayPlan />
                    </TabPane>
                    <TabPane tab="DX" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
