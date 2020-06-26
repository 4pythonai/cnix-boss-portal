import React from 'react'
import { Descriptions, Divider } from 'antd';
import FlowHistory from '@/routes/flow/containers/flowHistory'

export default class ResourceSurveyDetail extends React.Component {

    getdescription() {
        let rowData = this.props.location.state.rowData
        let arr = Object.keys(rowData)
        return arr.map((item) => {
            if (item != 'uuid' && item != 'transactid' && item != '流程Key') {
                if (item != '') {
                    return <Descriptions.Item key={item} label={item}>{rowData[item]}</Descriptions.Item>
                }
            }


        })
    }
    render() {
        return (
            <div style={{padding: '10px 20px'}}>
                <h3 style={{textAlign: 'center'}}>{this.props.location.state.title/ + this.props.location.state.rowData.单据号}</h3>
                
                <Divider orientation="left">工单信息</Divider>
                <Descriptions bordered>
                    {this.getdescription()}
                </Descriptions>
                <Divider orientation="left">流程记录</Divider>
                <FlowHistory uuid={this.props.location.state.rowData.uuid} process_key={this.props.location.state.process_key} />

            </div>
        )
    }
}
