import React from 'react'
import InnerForm from '../components/innerForm'
import '../flow.scss'
import { Button, Collapse, Descriptions } from "antd";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import FlowReferInfo from './flowReferInfo'

import ContractContainer from '@/routes/contract/components/contractContainer'


const { Panel } = Collapse;

@inject('FlowApprovalStore')
@observer
export default class FlowForm extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.FlowApprovalStore;
        this.state = {
            flowformdata: {}
        }
    }

    async componentDidMount() {
        await this.store.initData();
        await this.store.setInitNode(this.props.location.state.init_node)
        await this.store.setProcessDefinitionKey(this.props.location.state.process_key);
        await this.store.setUuid(this.props.location.state.uuid);

        await this.store.setReadonly(this.props.location.state.readonly)

        // NodeKey 为当时填写时候的 节点id

        if (this.props.location.state.nodeKey) {
            await this.store.setNodeKey(this.props.location.state.nodeKey)

        } else {
            await this.store.setNodeKey(null)
        }


        //setActCode action_code

        if (this.props.location.state.action_code) {
            await this.store.setActCode(this.props.location.state.action_code)

        } else {
            await this.store.setActCode('')
        }


        await this.store.getFlowFormCfg();

        //获取流程策略
        if (this.store.readonly) {
            return;
        }
        await this.store.getFlowTactics();

        console.log('FlowForm', this.props.location.state, 'flowFormStore:processDefinitionKey', this.store.processDefinitionKey)
    }


    componentWillMount() {
        this.children = []
    }


    componentWillUnmount() {
        this.store.initData()
    }

    bindRef = function (ref) {
        this.children.push(ref)
    }

    getPaperTitle() {

        if (!this.store.flowFormCfg) {
            return;
        }
        return this.store.flowFormCfg.papertitle
    }


    //静态信息参考区
    getReferenceInfo() {

        //单独处理复杂的合同静态编辑页面

        console.log(this.props.location.state)

        if (this.props.location.state.process_key == 'idc_order' || this.props.location.state.process_key == 'idc_order_payment') {
            return <Panel header="参考信息" key="1">



                <ContractContainer defaultProps={this.props.location.state}></ContractContainer>
            </Panel>
        }

        if (!this.store.flowFormCfg || !this.store.flowFormCfg.combinedRef) {
            return;
        }

        console.log('静态信息参考区')
        console.log(toJS(this.store.flowFormCfg.combinedRef))

        if (this.store.flowFormCfg.combinedRef.length > 0) {
            return <Panel header="参考信息" key="1">
                {
                    this.store.flowFormCfg.combinedRef.map((one, index) => <FlowReferInfo xinfo={one} key={index} />)
                }
            </Panel>
        }
    }


    // 信息添加区
    getAddAreaCom() {
        if (!this.store.flowFormCfg || !this.store.flowFormCfg.add_area) {
            return null
        }
        let schema = this.store.flowFormCfg.add_area
        if (schema.properties.length != 0) {

            return <Panel header="新增区" key="2">
                <InnerForm
                    uuid={this.store.uuid}
                    triggerRef={this.bindRef.bind(this)}
                    schema={schema}
                    key={'add_area'}
                    tag={'add_area'}
                    editable={true}
                />
            </Panel>
        }
    }


    // 修改信息区
    getModifyAreaCom() {
        if (!this.store.flowFormCfg) {
            return null
        }

        let schema = this.store.flowFormCfg.modifiy_area
        console.log('信息修改区')
        if (schema.properties.length != 0) {
            return <Panel header="修改区" key="3">
                <InnerForm
                    triggerRef={this.bindRef.bind(this)}
                    schema={schema}
                    key={'modifiy_area'}
                    tag={'modifiy_area'}
                    editable={true}
                />
            </Panel>
        }
    }


    //  网络资源操作区 

    getResOperationCom() {
        if (!this.store.flowFormCfg || !this.store.flowFormCfg.resoperation_area) {
            return null
        }


        let schema = this.store.flowFormCfg.resoperation_area

        if (schema.properties.length != 0) {
            return (<Panel header="网络资源操作区" key="4">

                <InnerForm
                    triggerRef={this.bindRef.bind(this)}
                    schema={schema}
                    key={'resoperation_area'}
                    tag={'resoperation_area'}
                    editable={true}
                />

            </Panel>)
        }
    }

    // 批注区
    getFlowNotes() {
        if (!this.store.flowFormCfg) {
            return;
        }

        console.log(this.store.flowFormCfg.flow_notes)
        let schema = this.store.flowFormCfg.flow_notes
        return (<InnerForm
            uuid={this.store.uuid}
            triggerRef={this.bindRef.bind(this)}
            schema={schema}
            key={'flow_notes'}
            tag={'flow_notes'}
            editable={true}
        />)
    }




    // 候选人
    getFlowCandidate() {
        // 详情只读，不显示候选人
        if (this.store.readonly) {
            return null
        }

        if (!this.store.flowFormCfg || !this.store.flowFormCfg.candidate) {
            return;
        }
        if (this.store.newTreeData.length == 0) {
            return null
        }
        console.log('this.store.newTreeData', this.store.newTreeData)
        let schema = this.store.flowFormCfg.candidate
        return (<InnerForm
            triggerRef={this.bindRef.bind(this)}
            schema={schema}
            key={'candidate'}
            tag={'candidate'}
            editable={true}
        />)
    }

    // 流程按钮区
    getApproveButtonGroup() {

        if (this.store.readonly) {
            return null
        }

        if (!this.store.flowFormCfg || !this.store.flowFormCfg.processBtns) {
            return;
        }


        let { processBtns } = this.store.flowFormCfg

        let tempArr = []
        for (let key in processBtns) {
            tempArr.push(processBtns[key])
        }

        return <div className="approvalOption">
            {
                tempArr.map(item => {
                    return <Button
                        key={item.btnid}
                        className="marginRihgt10"
                        size="default"
                        htmlType="button"
                        type="primary"
                        onClick={event => this.FlowFormAction(event, this.store[item.flowhandle])}>{item.btn_text}</Button>
                })
            }
        </div>

    }



    async FlowFormAction(event, callback) {
        let flowFormData = await this.getFormData();
        callback(event, flowFormData)
    }

    async getFormData() {

        let flowFormData = {};
        for (let i = 0; i < this.children.length; i++) {
            let subinnerform = this.children[i]
            let subformdata = await subinnerform.getInnerFromData()
            flowFormData = Object.assign(flowFormData, subformdata);

        }
        return flowFormData;
    }

    render() {
        
        return <div className="flex_wrapper">
            <h3 style={{ textAlign: 'center', margin: "10px 0" }}>{this.getPaperTitle()}</h3>
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4', '5']}>



                {this.getReferenceInfo()}
                {this.getAddAreaCom()}


                {this.getModifyAreaCom()}
                {this.getResOperationCom()}


                <Panel header="流程处理" key="5">
                    {this.getFlowNotes()}
                    {this.getFlowCandidate()}
                    {this.getApproveButtonGroup()}
                </Panel>
            </Collapse>


        </div>


    }
}