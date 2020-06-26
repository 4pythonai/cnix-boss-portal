import React from 'react'
import FlowFormWrapper from '../components/flowFormWrapper'
import '../flow.scss'
import { Button, Collapse, Descriptions, Icon } from "antd";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import FlowReferInfo from './flowReferInfo'
import GuideReferInfo from './guideReferInfo'
import DetailWrapper from '@/routes/contract/components/detailCom/detailWrapper'
import ContractContainer from '@/routes/contract/components/contractContainer'
import ISPContractContainer from '@/routes/contract/components/contractContainer'
import Print from '@/utils/print'

const { Panel } = Collapse;

@inject('FlowApprovalStore')
@observer
export default class FlowDetail extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.FlowApprovalStore;
        this.state = {
            flowformdata: {},
            printer:[]
        }

        this.children = []
        this.getParams()
    }

    getParams() {
        var afterUrl = window.location.href.split('?')[1];
        let query_params = {}
        afterUrl.split('&').forEach(item => {
            let query_arr = item.split('=')
            query_params[query_arr[0]] = query_arr[1]
        })

        console.log('查看参数', query_params)
        this.query_params = query_params
    }

    async componentDidMount() {
        await this.store.initData();
        await this.store.setInitNode(this.query_params.init_node)
        await this.store.setProcessDefinitionKey(this.query_params.process_key);
        await this.store.setUuid(this.query_params.uuid);
        await this.store.setReadonly(this.query_params.readonly)

        // NodeKey 为当时填写时候的 节点id

        if (this.query_params.nodeKey&&this.query_params.nodeKey!='null') {
            await this.store.setNodeKey(this.query_params.nodeKey)

        } else {
            await this.store.setNodeKey(null)
        }


        //setActCode action_code

        if (this.query_params.action_code) {
            await this.store.setActCode(this.query_params.action_code)

        } else {
            await this.store.setActCode('')
        }


        await this.store.getFlowFormCfg();
            setTimeout(() =>{
                this.setState({
                    printer:['printer']
                })
            },2000)
        //获取流程策略
        if (this.store.readonly) {
            return;
        }

        // await this.store.getFlowTactics();

        console.log('FlowForm', this.query_params, 'flowFormStore:processDefinitionKey', this.store.processDefinitionKey)
    }



    componentWillUnmount() {
        this.store.initData()
    }

    bindRef = function(ref) {
        this.children.push(ref)
    }

    getPaperTitle() {

        if (!this.store.flowFormCfg) {
            return;
        }
        return this.store.flowFormCfg.papertitle
    }

    getRelatedButton() {

        if (!this.store.flowFormCfg) {
            return;
        }

        return <Button
            style={ { marginLeft: '20px' } }
            size="default"
            htmlType="button"
            type="primary"
            onClick={ event => this.ShowRelatedInfo(event) }>查看相关流程信息</Button>

    }
    async ShowRelatedInfo() {
        if (!this.store.flowFormCfg) {
            return;
        }
        let data = {
            process_key: this.store.processDefinitionKey,
            uuid: this.store.uuid,
            nodeKey: this.store.nodeKey,
            readonly: true,
            init_node: 'n',
            action_code: this.store.actcode,
            page_source: 'detail', // IDC合同专用开关

        }

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `http:${ window.location.host }/#/flow/flowRelatedInfo?${ params }`

        window.open(new_url, '_blank')


    }

    getContractMsg() {
        console.log('state查看', this.query_params)
        let show_idc_component_arr = ["idc_order","idc_order_shadow", "idc_order_payment", "idc_order_stop", "idc_order_vip",'sales_con_tovoid_app','sales_con_change_seal'];

        if (show_idc_component_arr.includes(this.query_params.process_key)) {
            return  <DetailWrapper canprinter={this.query_params.printer?true:false} isShowFlowHistory={ false } defaultProps={ this.query_params }></DetailWrapper>
            // return <ContractContainer defaultProps={ this.query_params }></ContractContainer>
        }
        if (this.query_params.process_key == 'isp_order' || this.query_params.process_key == 'isp_order_payment') {
            return <ISPContractContainer defaultProps={ this.query_params }></ISPContractContainer>
        }

        return null
    }

     //操作指南区
     getGuideInfo() {

        if (!this.store.flowFormCfg || !this.store.flowFormCfg.guide_area) {
            return;
        }
        if (this.store.flowFormCfg.guide_area.length > 0) {

            let content_html = this.store.flowFormCfg.guide_area[0].text
            return <Panel header="操作指南" key="2">
                {
                    <GuideReferInfo xinfo={ content_html } key={ 'guide_1' } />
                }
            </Panel>
        }
    }
    //静态信息参考区
    getReferenceInfo() {
        //单独处理复杂的合同静态编辑页面

        if(this.store.flowFormCfg!=null){
            return <Panel header="受理信息" key="1">
                {/* { this.getContractMsg() } */}
                {/* {
                    this.store.flowFormCfg.combinedRef.map((one, index) => <FlowReferInfo xinfo={ one } key={ index } />)
                }
                 */}
                
                
                {this.getContractMsg()}
                
        {this.store.flowFormCfg.combinedRef.map((one, index) => {
          if (one.bigdata[0]._type == "actiongrid_as_add_as_ref") {
            return (
              <div>
                <div
                  style={{
                    marginBottom: "9px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {one.bigtitle}
                </div>
                <FlowFormWrapper
                  workload={true}
                  uuid={this.store.uuid}
                  triggerRef={this.bindRef.bind(this)}
                  schema={one.bigdata[0]}
                  key={"add_area_" + index}
                  tag={"add_area_" + index}
                  editable={true}
                />
              </div>
            );
          } else {
            return <FlowReferInfo canprinter={this.query_params.printer} xinfo={one} key={index} />;
          }
        })}
                
                
                
                
                
                
                
                
            </Panel>
        // }
        }
        
    }


    // 信息添加区
    // getAddAreaCom() {
    //     if (!this.store.flowFormCfg || !this.store.flowFormCfg.add_area) {
    //         return null
    //     }
    //     let schema = this.store.flowFormCfg.add_area


    //     if (schema.properties.length != 0) {

    //         return <Panel header="新增区" key="2">
    //             <FlowFormWrapper
    //                 uuid={ this.store.uuid }
    //                 triggerRef={ this.bindRef.bind(this) }
    //                 schema={ schema }
    //                 key={ 'add_area' }
    //                 tag={ 'add_area' }
    //                 editable={ true }
    //             />
    //         </Panel>
    //     }
    // }



    // 批注区
    // getFlowNotes() {
    //     if (!this.store.flowFormCfg) {
    //         return;
    //     }
    //     let schema = this.store.flowFormCfg.flow_notes
    //     console.log(toJS(schema))

    //     return (<InnerForm
    //         uuid={ this.store.uuid }
    //         triggerRef={ this.bindRef.bind(this) }
    //         schema={ schema }
    //         key={ 'flow_notes' }
    //         tag={ 'flow_notes' }
    //         editable={ true }
    //     />)
    // }




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
            triggerRef={ this.bindRef.bind(this) }
            schema={ schema }
            key={ 'candidate' }
            tag={ 'candidate' }
            editable={ true }
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
                        key={ item.btnid }
                        className="marginRihgt10"
                        size="default"
                        htmlType="button"
                        type="primary"
                        onClick={ event => this.FlowFormAction(event, this.store[item.flowhandle]) }>{ item.btn_text }</Button>
                })
            }
        </div>

    }



    async FlowFormAction(event, callback) {
        let flowFormData = await this.getFormData();
        console.log(flowFormData)
        callback(event, flowFormData)
    }

    async getFormData() {

        let flowFormData = {};
        console.log('查看this.children', this.children)
        for (let i = 0; i < this.children.length; i++) {
            let subinnerform = this.children[i]
            let subformdata = await subinnerform.getInnerFromData()
            flowFormData = Object.assign(flowFormData, subformdata);

        }
        return flowFormData;
    }


    getVIPcontract_warning() {
        if (this.query_params.process_key == 'idc_order_vip') {
            return <div>
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                大客户预签合同
                    <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
            </div>
        }
        if (this.store.flowFormCfg && this.store.flowFormCfg.hasOwnProperty('formalvipcontractwarning')) {
            return <div>
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                大客户正式合同
                    <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
                <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
            </div>
        }
        return null
    }
    renderPrintBtn = () => {
        let role_code = sessionStorage.getItem('role_code')
        if(!this.query_params.printer){
            return
        }
            if(
            role_code === 'idc_onepart_archiving'|| 
            role_code === 'idc_twopart_archiving'|| 
            role_code === 'business_archiving'|| 
            role_code === 'big_customer_archiving'|| 
            role_code === 'isp_archiving'

           )
        {
            return <div className="idc_form_group">
                    <Button className="no-print" style={ { backgroundColor: '#304156' } } type="primary" htmlType="button" onClick={ event => this.printContract(event) }>打印</Button>
                    </div>
        }

        
    }
    printContract(e) {
        e.stopPropagation();
        setTimeout(() => {
            Print('.flex_wrapper', { 'no-print': '.no-print' });
        }, 1000)
    }

    render() {
        console.log(444444444,this.state.printer)
        return <div className="flex_wrapper">
            <h2 style={ { color: 'red', textAlign: 'center', margin: "10px 0" } }>
                { this.getVIPcontract_warning() }
            </h2>
            <h3 style={ { textAlign: 'center', margin: "10px 0" } }>
                { this.getPaperTitle() }
                { this.store.flowFormCfg && this.store.flowFormCfg.groupcounter > 1 ? this.getRelatedButton() : null }
                </h3>
            <Collapse bordered={ false } defaultActiveKey={ ['1', '2', '3', '4', '5'] }>
            { this.getGuideInfo() }
                { this.getReferenceInfo() }
                {/* { this.getAddAreaCom() } */}

            </Collapse>
            {this.state.printer.map(()=>{
              return  this.renderPrintBtn()
            })}

        </div>


    }
}