import React from 'react';
import { Tabs, Select } from 'antd';
import RptTotalOwned from './RptTotalOwned';
import RptPayPlanSummary from './RptPayPlanSummary';
import RptPayPlanDetail from './RptPayPlanDetail';
import api from '@/api/api';
const { TabPane } = Tabs;
const { Option } = Select;
function callback(key) {
    console.log(key);
}

export default class BuyinRptView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: '所有',
            regions: []
        };
    }

    async componentWillMount() {
        const params = {
            method: 'POST',
            data: {}
        };
        const json = await api.contract.getRegions(params);
        this.setState({ regions: json.regions.map((item) => item.region) });
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
                        {this.state.regions.map(function (region, index) {
                            return (
                                <Option key={index} value={region}>
                                    {region}
                                </Option>
                            );
                        })}
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
