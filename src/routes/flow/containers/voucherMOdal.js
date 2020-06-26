import CommonTableForm from '../../commonAntTable/components/commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import FlowApprovalStore from '@/store/FlowApprovalStore'
import candidateStore from '@/store/candidateStore'
// import CommonModal from '@/routes/commonAntTable/components/CommonTableForm/c'

import api from '@/api/api'

import { Modal, Descriptions, message } from 'antd';



import {
    SchemaForm,
    Submit,
    FormButtonGroup,
    createFormActions,

} from '@uform/antd'



@observer
export default class VoucherMOdal extends React.Component {
    constructor(props) {
        super(props)
        this.store=FlowApprovalStore

    this.state ={
        }
        this.candidateStore = new candidateStore()
      
    }

    componentDidMount(){
        this.candidateStore.setUuid(this.store.uuid)
        this.candidateStore.setProcessDefinitionKey('engineering_construction_list')
        this.candidateStore.setInitNode('y')
        // this.candidateStore.setFilterUserParams(this.props.getUserParams)
        this.candidateStore.getFlowTactics()
    }

    saveFormData = async (values) => {
            values.innerid=this.store.uuid
            let params = { data: values, method: 'POST' };
            let res = await api.bpm.addEngineeringConstruction(params)
            if (res.code == 200) {
              this.props.cancel()
            }
    }


    render() {
        return <Modal
            width='800px'
            footer={null}
            title="转网建中心"
            visible={this.props.visible}
            onCancel={event=>this.props.cancel()}
            ref='commonModalRef'
        >
            <div style={ { marginLeft: '100px', marginTop: '15px' } }>

                <SchemaForm
                    onSubmit={ values => this.saveFormData(values) }
                    schema={ {
                        "type": "object",
                        "properties": {
                           
                            "describe": {
                                "type": "textarea",
                                "title": "需求描述",
                                "required": true
                            },
                            "candidate": {
                                "type": "string",
                                "x-component": "CandidateRefactor",
                                "title": "提交给",
                                "required": true,
                                'x-props':{candidateStore: this.candidateStore}
                            },
                        }
                    } }
                    labelCol={ 3 }
                    wrapperCol={ 18 }
                >

                    <FormButtonGroup style={ { marginLeft: '545px' } }>
                        <Submit>保存并启动</Submit>
                    </FormButtonGroup>

                </SchemaForm>
            </div>
        </Modal >
    }
}
