import React from 'react'
import { Steps, Popover, Divider, Icon, Descriptions, Tabs, Card, Empty } from 'antd';
import api from '@/api/api'
const { Step } = Steps;
const { TabPane } = Tabs
import {
    hashHistory
} from 'react-router'
import UpdateSalesProgessForm from '../components/chanceDetailComs/updateSalesProgessForm'
import ActivityRecordsWrapper from '../components/chanceDetailComs/activityRecordsWrapper'

export default class ChanceDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: null,
            stepData: [],
            rowData: [],
            resourceList: []
        }
    }
    componentWillMount() {
        this.setState({
            rowData: this.props.location.state.chanceRowData
        })
    }
    async componentDidMount() {
        this.getStepList()
        this.getResourceList()
    }


    getStepList = async () => {
        let params = { data: { id: this.state.rowData.id }, method: 'POST' };
        let json = await api.activityRecord.getWechatSalesChanceChanceProgessById(params);
        if (json.code == 200) {
            this.setState({
                step: json.data.length - 1,
                stepData: json.data
            })
        }
    }

    getResourceList = async () => {
        let params = {
            data: {
                customerid: this.state.rowData.ghost_customId
            },
            method: 'POST'
        }

        let json = await api.activityRecord.getResourceList(params)
        this.setState({
            resourceList: json.data
        })
    }


    customDot = (dot, { status, index }) => {
        return <Popover
            content={
                <div>
                    <span>状态 : {status}</span>
                    {this.getRemake(index)}
                </div>
            }
        >
            {dot}
        </Popover>
    }

    getRemake = (index) => {
        if (this.state.stepData.length === 0) {
            return;
        }
        if (!this.state.stepData[index]) {
            return;
        }
        return <div>备注：{this.state.stepData[index].remark}</div>
    }


    getStepsStatus(stepData) {
        if (!stepData[4]) {
            return null;
        }
        if (stepData[4].salesStep == '赢单') {
            return 'finish'
        }
        if (stepData[4].salesStep == '输单') {
            return 'error'
        }
    }

    getStepsTitle(stepData) {
        if (!stepData[4]) {
            return "赢单/输单"
        }
        if (stepData[4].salesStep) {
            return stepData[4].salesStep
        }
    }

    navigatorResourceDetail = async (event, resourceData) => {
        let params = {
            data: {
                paperno: resourceData.paperNo
            },
            method: 'POST'
        }
        let json = await api.api_resource.getResourceSurvey(params);
        if (json.code == 200) {
            console.log(json.data)
            let data = {
                process_key: 'resource_survey_sheet',
                rowData: json.data,
                title: '资源调查单详情'
            }
            hashHistory.push({ pathname: `saleschancemnt/resourceSurveyDetail`, state: data });
        }
    }


    render() {

        if (!this.state.rowData.id) {
            return null;
        }

        const stepData = this.state.stepData
        return (
            <div>
                <h3 style={titleWrapperStyle}>

                </h3>
                <div style={detailWrapperStyle}>
                    <div style={baseMsgStyle}>
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span style={{ fontSize: '16px' }}> <Icon type="sliders" />机会详情</span>
                                }
                                key="1"
                            >
                                <Divider orientation="left" style={{ fontSize: '16px' }}>基本信息</Divider>
                                <BaseChanceMsg rowData={this.state.rowData} />
                                
                                <Divider orientation="left" style={{ fontSize: '16px' }}>销售阶段</Divider>
                                <Steps current={this.state.step} progressDot={this.customDot}>
                                    <Step title="初步洽谈" description={stepData[0] ? stepData[0].adddate : null} />
                                    <Step title="需求确认" description={stepData[1] ? stepData[1].adddate : null} />
                                    <Step title="方案/报价" description={stepData[2] ? stepData[2].adddate : null} />
                                    <Step title="谈判审核" description={stepData[3] ? stepData[3].adddate : null} />
                                    <Step title={this.getStepsTitle(stepData)}
                                        status={this.getStepsStatus(stepData)}
                                        description={stepData[4] ? stepData[4].adddate : null} />
                                </Steps>
                                
                                <Divider orientation="left" style={{ fontSize: '16px' }}>进度跟踪</Divider>
                                <UpdateSalesProgessForm getStepList={this.getStepList} step={this.state.step} id={this.state.rowData.id} />
                            </TabPane>

                            <TabPane
                                tab={
                                    <span style={{ fontSize: '16px' }}> <Icon type="table" />相关资源调查单</span>
                                }
                                key="2"
                            >
                                <ResourcesOrderList
                                    list={this.state.resourceList}
                                    navigatorResourceDetail={this.navigatorResourceDetail}
                                />
                            </TabPane>
                        </Tabs>

                    </div>
                    <div style={activityWrapperStyle}>
                        <ActivityRecordsWrapper
                            action_code="IDC_sales_chance"
                            recordData={this.state.rowData}
                        />
                    </div>
                </div>

            </div>
        )
    }
}



const ResourcesOrderList = props => {
    if (props.list.length === 0) {
        return <Empty description="暂无数据" />
    }
    return props.list.map((item, index) => {
        return <Card
            title={item.name}
            onClick={event => props.navigatorResourceDetail(event, item)}
            style={
                {
                    width: 270,
                    float: 'left',
                    marginLeft: "10px",
                    marginBottom: "10px",
                    borderRadius: '5px',
                    cursor: 'pointer'
                }
            }
            key={index}>
            <p>单据号：{item.paperNo}</p>
            <p>状态：{item.status}</p>
            <p>创建人：{item.createPerson}</p>
            <p>创建人部门：{item.dept}</p>
            <p>创建时间：{item.createDate}</p>
        </Card>
    })
}

const BaseChanceMsg = props => {
    return <div style={{ paddingLeft: "50px", fontSize: '16px' }}>
        <Descriptions>
            <Descriptions.Item label={labelRender("机会名称", "heart")}>{props.rowData.oppName}</Descriptions.Item>
            <Descriptions.Item label={labelRender("业务类型", "deployment-unit")}>{props.rowData.proWorkType}</Descriptions.Item>
            <Descriptions.Item label={labelRender("销售阶段", "rise")}>{props.rowData.salesStep}</Descriptions.Item>
            <Descriptions.Item label={labelRender("销售金额", "money-collect")}>{props.rowData.salesMoney}</Descriptions.Item>
            <Descriptions.Item label={labelRender("机会类型", "deployment-unit")}>{props.rowData.oppType}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
            <Descriptions.Item label={labelRender("客户名称", "user")}>{props.rowData.customId}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
            <Descriptions.Item label={labelRender("客户地址", "environment")}>{props.rowData.addressId}</Descriptions.Item>
        </Descriptions>
    </div>
}

const labelRender = (name, type) => {
    return <span><Icon style={{ paddingRight: "5px" }} type={type} />{name}</span>
}


const detailWrapperStyle = { overflow: "auto", padding: "10px" }
const baseMsgStyle = { float: "left", width: "70%" }
const activityWrapperStyle = { float: "right", width: "30%", paddingLeft: '10px' }
const titleWrapperStyle = { paddingLeft: '20px', paddingTop: '20px' }
const titleStyle = { display: 'inline-block', height: "30px", padding: "0 10px", borderBottom: "1px solid #ccc" }