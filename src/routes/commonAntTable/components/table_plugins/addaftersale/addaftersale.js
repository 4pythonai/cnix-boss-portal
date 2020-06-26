import React, { useState } from 'react';
import { Modal, Button, Input, Icon, message, Form, Select, notification,Radio } from 'antd';
import api from '@/api/api'
// import commonTableStore from '@/store/commonTableStore'
import { SchemaForm, createFormActions, } from '@uform/antd'
import '@/components/Uform_extends'
import renderformCfg from './formconfig'
import renderformCfg1 from './form_config'
const { confirm } = Modal;

const actions = createFormActions()
export default class Addaftersale extends React.Component {
    constructor(props) {
        super(props)
        this.commonTableStore = props.commonTableStore
        this.state = {
            visible: false,
            editvisible: false,
            columnsdata: [],
            batchId: [],
            selectData: '',
            newValueData: [],
            selectValueType: null,
            newValue: '',
            formConfigData: {},
            renderformCfg: renderformCfg.formcfg,
            renderformCfg1: renderformCfg1.formcfg,
            value:''
            

        };
        this.handleOk = this.handleOk.bind(this)
        this.onChange = this.onChange.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

    }
    componentDidMount() {
        var columns = []
        this.commonTableStore.tableColumnsJson.map((item, index) => {
            columns.push(<Select.Option key={item.key}>{item.title}</Select.Option>)
        })
        this.setState({
            columnsdata: columns
        })

    }
    async handleOk() {
            let res = await actions.validate()
            let FormStateValue = actions.getFormState().values
            let params = {
                data: {
                    "actcode": this.commonTableStore.action_code,
                    "batch_ids": this.state.batchId,
                    "table": this.commonTableStore.base_table,
                    "rawdata": {
                        "idc_id": FormStateValue.idc_id,
                        "building_id": FormStateValue.building_id,
                        "floor_id": FormStateValue.floor_id,
                        "room_id": FormStateValue.room_id
                    }
                },
                method: 'POST'
            }
            let resp = await api.bpm.addRresupportorder(params);
            if (resp.success == true) {
                message.success('修改成功')
                this.setState({
                    visible: false
                })
                this.props.refreshTable()
            }
        
    }
    init() {
            this.showModal()
    }
    showModal() {
        this.setState({
            visible: true,

        })
    }
    async onChange(e) {
        this.setState({
            value:e.target.value
        })
        console.log(e.target.value)
    }
    handleCancel() {
        this.setState({
            visible: false,
        })
    }
    render() {      
        return (
            <div>
                <Modal
                    title="售后支持单："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    visible={this.state.visible}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <Form.Item label="选择类型：">
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>测试1</Radio>
                                <Radio value={2}>测试2</Radio>
                                <Radio value={3}>测试3</Radio>
                        </Radio.Group>
                        </Form.Item>
                    </Form>
                    {this.state.value == '1' ?
                        <SchemaForm
                            effects={
                                ($, { setFieldState, getFieldState }) => {
                                    $('onFormInit').subscribe(async () => {
                
                                        let formCfg = this.state.renderformCfg
                
                                        for (let key in formCfg.properties.group_all.properties) {
                                            let item = formCfg.properties.group_all.properties[key];
                
                                            if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                                setFieldState(key, state => {
                                                    state.props["x-props"].commonTableStore = this.commonTableStore;
                                                });
                                            }
                                        }
                                    })
                
                                }
                            }
                            actions={actions}
                            schema={this.state.renderformCfg}></SchemaForm>
                        :this.state.value == '2'?
                        <SchemaForm
                        effects={
                            ($, { setFieldState, getFieldState }) => {
                                $('onFormInit').subscribe(async () => {
            
                                    let formCfg = this.state.renderformCfg1
            
                                    for (let key in formCfg.properties.group_all.properties) {
                                        let item = formCfg.properties.group_all.properties[key];
            
                                        if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                            setFieldState(key, state => {
                                                state.props["x-props"].commonTableStore = this.commonTableStore;
                                            });
                                        }
                                    }
                                })
            
                            }
                        }
                        actions={actions}
                        schema={this.state.renderformCfg1}></SchemaForm>
                        : ''}
                </Modal>
            </div>

        )
    }
}