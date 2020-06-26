import React from 'react'
import { Descriptions } from 'antd'

export default class ContractInfoHtml extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(999777, this.props.contractManageData)
        return <div>
            <div style={{margin:'24px',fontWeight: 'bold' }}>合同部信息</div>
            <Descriptions bordered size='small'>
                <Descriptions.Item label={'档案号'}> {this.props.contractManageData.archives_no}  </Descriptions.Item>
                <Descriptions.Item label={'客户类型'}> {this.props.contractManageData.customer_type_id}  </Descriptions.Item>
                <Descriptions.Item label={'印花税'}> {this.props.contractManageData.stamp_duty_tax}  </Descriptions.Item>
                <Descriptions.Item label={'盖章日期'}> {this.props.contractManageData.seal_date}  </Descriptions.Item>
                <Descriptions.Item label={'返还日期'}> {this.props.contractManageData.return_date}  </Descriptions.Item>
                <Descriptions.Item label={'作废日期'}> {this.props.contractManageData.failure_date}  </Descriptions.Item>
                <Descriptions.Item span={3} label={'盖章备注'}> {this.props.contractManageData.seal_note}  </Descriptions.Item>
                <Descriptions.Item span={3} label={'返还备注'}> {this.props.contractManageData.return_note}  </Descriptions.Item>
                <Descriptions.Item span={3} label={'归档备注'}> {this.props.contractManageData.archive_note}  </Descriptions.Item>
            </Descriptions>
        </div>
    }
}