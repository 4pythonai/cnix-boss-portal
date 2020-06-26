import React, { useState } from 'react';
import { Modal, Button, Input, Icon, message, Form, Select, notification } from 'antd';
import api from '@/api/api'
// import commonTableStore from '@/store/commonTableStore'
import { SchemaForm, createFormActions, } from '@uform/antd'
import '@/components/Uform_extends'
import renderformCfg from './formconfig'
const { confirm } = Modal;

const actions = createFormActions()
export default class BatchUpdate extends React.Component {
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
        if (this.state.selectData == '') {
            message.error('请选择需要修改字段')
            return
        }
        if (this.state.selectData == 'idc_id' || this.state.selectData == 'building_id' || this.state.selectData == 'floor_id' || this.state.selectData == 'room_id') {
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
            let resp = await api.curd.batchUpdate(params);
            if (resp.success == true) {
                message.success('修改成功')
                this.setState({
                    visible: false
                })
                this.props.refreshTable()
            }
        } else {
            if (this.state.newValue == '') {
                message.error('请输入修改后的值')
                return
            }
            let params = {
                data: {
                    "actcode": this.commonTableStore.action_code,
                    "batch_ids": this.state.batchId,
                    "table": this.commonTableStore.base_table,
                    "rawdata": {
                    }
                },
                method: 'POST'
            }
            params.data.rawdata[this.state.selectData] = this.state.newValue
            let res = await api.curd.batchUpdate(params);
            if (res.success == true) {
                message.success('修改成功')
                this.setState({
                    visible: false
                })
                this.props.refreshTable()
            }
        }
    }
    init() {
        if (this.commonTableStore.selectedRowKeys.length==0) {
            message.error('您还没有选择需要修改的数据，请选择')
        } else {
            this.showModal()
        }
    }
    showModal() {
<<<<<<< HEAD
        var obj={}
        var objarr=Object.keys(this.commonTableStore.formCfg.properties.group_all.properties)
        for(var i=0;i<objarr.length;i++){
            obj=Object.assign(this.commonTableStore.formCfg.properties.group_all.properties[objarr[i]].properties)
        }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        var arr=this.commonTableStore.selectedRowKeys
        this.setState({
            visible: true,
            batchId: arr,
<<<<<<< HEAD
            formConfigData: obj
        })
    }
    async onChange(event, data) {
        console.log(this.state.formConfigData,event)
=======
            formConfigData: this.commonTableStore.formCfg.properties.group_all.properties
        })
    }
    async onChange(event, data) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (event == 'idc_id' || event == 'building_id' || event == 'floor_id' || event == 'room_id') {
            this.setState({
                selectData: event,
            })
        } else {
            let newValuearr = []
            if (this.state.formConfigData[event].type == 'assocselect') {
                let params = {
                    method: 'post',
                    data: this.state.formConfigData[event]['x-props']
                }
                let res = await api.curd.getTableData(params)

                res.data.map((item, index) => {
                    newValuearr.push(<Select.Option key={item.value}>{item.display_text}</Select.Option>)
                })
            }
            this.setState({
                selectData: event,
                selectValueType: this.state.formConfigData[event].type,
                newValueData: newValuearr
            }, () => {
            })
        }

    }
    selectNewValue(event, data) {
        if (data == 'newValue') {
            this.setState({
                newValue: event.target.value
            })
        } else {
            this.setState({
                newValue: event
            })
        }
    }
    handleCancel() {
        this.setState({
            visible: false,
            selectedRows: []
        })
    }
    render() {
        const children = this.state.columnsdata
        const newValueChildren = this.state.newValueData
       
        return (
            <div>
                <Modal
                    title="批量修改："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    visible={this.state.visible}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <Form.Item label="选择修改字段：">
                            <Select
                                onChange={event => this.onChange(event, 'selectData')}
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        {this.state.selectData != '' && this.state.selectData != 'idc_id' && this.state.selectData != 'building_id' && this.state.selectData != 'floor_id' && this.state.selectData != 'room_id' ?
                            <Form.Item label="修改后的值：">
                                {this.state.selectValueType == 'assocselect' ?
                                    <Select onChange={event => this.selectNewValue(event, 'selectData')}>
                                        {newValueChildren}
                                    </Select> : <Input onChange={event => this.selectNewValue(event, 'newValue')}></Input>
                                }
                            </Form.Item>
                            : ''}
                    </Form>
                    {this.state.selectData == 'idc_id' || this.state.selectData == 'building_id' || this.state.selectData == 'floor_id' || this.state.selectData == 'room_id' ?
                        <SchemaForm
                            // value={ value }
                            // initialValues={ state.value }
                            effects={
                                ($, { setFieldState, getFieldState }) => {
                                    $('onFormInit').subscribe(async () => {
                
                                        let formCfg = this.state.renderformCfg
                
                                        for (let key in formCfg.properties.group_all.properties) {
                                            let item = formCfg.properties.group_all.properties[key];
                
                                            if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                                setFieldState(key, state => {
                                                    state.props["x-props"].commonTableStore = this.commonTableStore;
<<<<<<< HEAD
                                                    state.props["x-props"].schema = formCfg;
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                                });
                                            }
                                        }
                                    })
                
                                }
                            }
                            actions={actions}
                            schema={this.state.renderformCfg}></SchemaForm>
                        : ''}
                </Modal>
            </div>

        )
    }
}