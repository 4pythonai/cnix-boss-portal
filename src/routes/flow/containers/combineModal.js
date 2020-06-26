import React from 'react';
import { Form,message,Input,Menu, Icon, Dropdown, Modal,Radio,Table } from 'antd';
import api from '@/api/api'
import '../flow.scss'

import {
    SchemaForm,
    createFormActions,
    Field,
    FormItemGrid,

} from '@uform/antd'

export default class CombineModal extends React.Component {
    constructor(props) {
        super(props);
        let actions = createFormActions()
        this.store=props.store
        this.state={
            actions: actions,
            visible:this.props.visible,
            formCfg: {
                'type': "object",
                'properties': {
                            'ISP_compltedate': {
                                'title': "实际竣工时间",
                                'type': "date",
                                "x-component": "date",
                                'required': true,                              
    
                            },
                            'a_accesspoint_miles': {
                                'title': "A端至接入点公里数",
                                'type': "string",
                                'required': true
                            },
                            'signal_attentuation_a': {
                                'title': "损耗值(A端至接入点)",
                                'type': "string",
                                'required': true
                            },
                            'z_accesspoint_miles': {
                                'title': "Z端至接入点公里数",
                                'type': "string",
                                'required': true
                            },
                            'signal_attentuation_z': {
                                'title': "损耗值(Z端至接入点)",
                                'type': "string",
                                'required': true
                            },
                            'accesspoint_accesspoint_miles': {
                                'title': "接入点至接入点（或对端）公里数",
                                'type': "string",
                                'required': true
                            },
                            'signal_attentuation_attentuation': {
                                'title': "损耗值(接入点至接入点)",
                                'type': "string",
                                'required': true
                            },
                            'Totalmiles': {
                                'title': "全程公里数",
                                'type': "string",
                                'required': true
                            },
                            'signal_attentuation_total': {
                                'title': "全程损耗值",
                                'type': "string",
                                'required': true
                            },
                            'porttype': {
                                'title': "端口类型",
                                'type': "PortTypeDropdown",
                                'x-component':'PortTypeDropdown',
                                'required': true,
                                'x-props':[]
                            },
                            'portspeed': {
                                'title': "端口速率",
                                'type': "PortSpeedDropdown",
                                'x-component':'PortSpeedDropdown',
                                'required': true,
                                'x-props':[]
                            },
                            'orginal_bandwidth': {
                                'title': "原电路租用带宽",
                                'type': "string",
                                'required': true
                            },
                            'current_bandwidth': {
                                'title': "新电路租用带宽",
                                'type': "string",
                                'required': true
                            },
                            'portsused': {
                                'title': "端口资源占用",
                                'type': "string",
                                'required': true
                            },
                            'linetype': {
                                'title': "接入电路类型",
                                'type': "string",
                                'required': true
                            },
                            'workmemo': {
                                'title': "施工备注信息",
                                'type': "string",
                                'required': true
                            }
                }
            }
          
        }
        this.handleOk=this.handleOk.bind(this)
    }
    componentDidMount(){
    }
    async handleOk(){
        let resp=await this.state.actions.validate()

        let data=this.state.actions.getFormState().values
            data=Object.assign(data,{ uuid: this.store.uuid })
            console.log(888777,data)
        let params = { data: data, method: 'POST' }
        let res = await api.bpm.addCompletionLine(params);
        if (res.code == 200) {
        
        }
        // this.store['lineCompletionOrder']()
    }
    render() {
         const obj={portsused:'1234',linetype:'12321',porttype:'123123'}
        return <Modal
                    title="请填写"
                    onOk={this.handleOk}
                    onCancel={this.props.cancel}
                    okText="确认"
                    cancelText="取消"
                    editable={true}
                    width="600px"
                    visible={this.props.visible}
                >
                    <SchemaForm
                        actions={ this.state.actions }
                        schema={this.state.formCfg}
                        effects={
                            ($, { setFieldState, getFieldState }) => {
                                $('onFormInit').subscribe( () => {
                                    // getCompletionLine()
                        
                                })


                                const getCompletionLine = async () => {
                                    let params = { data: { uuid: this.store.uuid }, method: 'POST' }
                                    let res = await api.bpm.getCompletionLineByUuid(params);
                                    if (res.code == 200) {
                                        Object.keys(res.data[0]).map(key => {
                                            setFieldState(key, state => {
                                                state.value = res.data[0][key] != null ? res.data[0][key] : ' '
                                                state.props['x-props'] = {
                                                    value: res.data[0][key]
                                                }
                                            })
                                        })
        
                                    }
                                }
                               

                        }
                    }
                    labelCol={10}
                    wrapperCol={14}
                    >
                    </SchemaForm>
            </Modal>
        
    }

}