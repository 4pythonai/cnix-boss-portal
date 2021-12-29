import React from 'react';
import { Tabs, Select } from 'antd';
import RptTotalOwned from './RptTotalOwned';

import RptPayPlanSummary from './RptPayPlanSummary';
import RptPayPlanDetail from './RptPayPlanDetail';

const { TabPane } = Tabs;
const { Option } = Select;
function callback(key) {
    console.log(key);
}

export default class BuyinRptView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: '所有'
        };
    }

    onChangeregion = async (value) => {
        console.log(value);
        this.setState({
            region: value
        });
    };

    render() {
        return (
            <div>
                <div style={{ margin: '10px' }}>
                    <Select showSearch style={{ width: 200 }} placeholder="选择地区" optionFilterProp="children" onChange={this.onChangeregion}>
                        <Option value="北京">北京</Option>
                        <Option value="广州">广州</Option>
                        <Option value="上海">上海</Option>
                        <Option value="所有">所有</Option>
                        <Option value="测试">测试</Option>
                        <Option value="DEBUG">DEBUG</Option>
                    </Select>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="总欠费" key="1">
                            <RptTotalOwned region={this.state.region} />
                        </TabPane>
                        <TabPane tab="本月付款计划(汇总)" key="2">
                            <RptPayPlanSummary region={this.state.region} />
                        </TabPane>
                        <TabPane tab="本月付款计划(明细)" key="3">
                            <RptPayPlanDetail region={this.state.region} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
