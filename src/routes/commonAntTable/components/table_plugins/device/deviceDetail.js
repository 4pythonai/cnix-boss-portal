
import React from 'react'
import { Modal, message, Input, Button } from 'antd'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

export default class DeviceDetail extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }

    state = {
        visible: false,
        query_cfg: {}
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        }

        let field_0 = ''
        if(this.props.commonTableStore.action_code == "boss_odf_model"){
            field_0 = 'odfmodelid'
        }

        if(this.props.commonTableStore.action_code == "boss_router_model"){
            field_0 = 'routermodelid'
        }

        if(this.props.commonTableStore.action_code == "boss_switch_model"){
            field_0 = 'switchmodelid'
        }

        if(this.props.commonTableStore.action_code == "boss_wdm_model"){
            field_0 = 'wdnmodelid'
        }
        

        this.setState({
            visible: true,
            query_cfg: {
                count: 1,
                lines: {
                    and_or_0: "and",
                    field_0: field_0,
                    operator_0: "=",
                    vset_0: this.props.commonTableStore.selectedRows[0].modelstr
                }
            }
        })

    }

    onCancel() {
        this.setState({ visible: false })
    }




    render() {

        return <Modal
            visible={this.state.visible}
            onCancel={() => this.onCancel()}
            onOk={() => this.onCancel()}
            destroyOnClose={true}
            width={1400}
            title="查看模板" >
            <CommonTable
                action_code={this.props.commonTableStore.action_code + '_tmp'}
                query_cfg={this.state.query_cfg}
            />
        </Modal >
    }
}