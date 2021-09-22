import React from 'react';
import { Tabs } from 'antd';
import RptTotalOwned from './RptTotalOwned';

import RptPayPlanSummary from './RptPayPlanSummary';
import RptPayPlanDetail from './RptPayPlanDetail';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

//TODO-明细渲染 json 到产品明细

export default class BuyinRptView extends React.Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="总欠费" key="1">
                        <RptTotalOwned />
                    </TabPane>
                    <TabPane tab="本月付款计划(汇总)" key="2">
                        <RptPayPlanSummary />
                    </TabPane>
                    <TabPane tab="本月付款计划(明细)" key="3">
                        <RptPayPlanDetail />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
