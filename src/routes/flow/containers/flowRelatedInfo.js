import React from 'react'
import FlowFormWrapper from '../components/flowFormWrapper'
import '../flow.scss'
import { Button, Collapse, Descriptions } from "antd";
import { toJS } from "mobx";
import api from '@/api/api'
import { observer, inject } from "mobx-react";
import FlowReferInfo from './flowReferInfo'

import ContractContainer from '@/routes/contract/components/contractContainer'
import ISPContractContainer from '@/routes/contract/components/contractContainer'

const { Panel } = Collapse;

@inject('FlowApprovalStore')
@observer
export default class FlowDetail extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.FlowApprovalStore;
        this.state = {
            flowformdata: {}
        }
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

        if (this.query_params.nodeKey) {
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
        await this.store.setRelatedFlowFormCfg()
    }
    componentWillUnmount() {
        this.store.initData()
    }
    getPaperTitle() {

        if (!this.store.flowFormCfg) {
            return;
        }
        return this.store.flowFormCfg.papertitle
    }



    getContractMsg(papertitle) {
        console.log('state查看', this.query_params)
        if(this.query_params.process_key == 'idc_order'&&papertitle.indexOf('预签合同流程')!=-1 ){
            this.query_params.process_key='idc_order_shadow'
            this.query_params.contract_no=papertitle.substring(papertitle.indexOf('/')+1)
            return <ContractContainer defaultProps={ this.query_params }></ContractContainer>
        }
        if (this.query_params.process_key == 'idc_order' || this.query_params.process_key == 'idc_order_payment' || this.query_params.process_key == 'idc_order_stop'||this.query_params.process_key=='after_sales_technical_support') {
            return <ContractContainer defaultProps={ this.query_params }></ContractContainer>
        }
        if (this.query_params.process_key == 'isp_order' || this.query_params.process_key == 'isp_order_payment') {
            return <ISPContractContainer defaultProps={ this.query_params }></ISPContractContainer>
        }

        return null
    }

    //静态信息参考区
    getReferenceInfo() {
        //单独处理复杂的合同静态编辑页面
        if (this.store.relatedFlowFormCfg.length > 0) {
            
            return this.store.relatedFlowFormCfg.map((item, index) =>
                item.map((item, index) =>
                    <Panel header={ item.papertitle } key={ index }>
                        {sessionStorage.getItem('role_code').indexOf('nginner')==-1?this.getContractMsg(item.papertitle):null}
                        {
                            item.combinedRef.map((one, index2) => <FlowReferInfo xinfo={ one } key={ one } />)
                        }
                    </Panel>

                ))

        }
    }




    render() {
        return <div className="flex_wrapper">
            {this.store.relatedFlowFormCfg.length!=0?<Collapse defaultActiveKey={["0","1","2","3","4","5"]} bordered={ false }>
                { this.getReferenceInfo() }
            </Collapse>:
            <div style={{width:'100%',height:'600px',position:'relative'}}>
                <div style={{color:'#aaa',fontSize:'30px',position: 'absolute',height:'50px',width:'300px',top:'50%', left: '50%',marginLeft:'-150px',marginTop:'-25px'}}>
                    无 相 关 流 程 信 息!
                </div>
            </div>
            
        }
            


        </div>


    }
}