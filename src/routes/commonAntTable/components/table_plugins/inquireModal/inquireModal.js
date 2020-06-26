import React, { useState } from 'react';
import { Modal,DatePicker,Button, Input, Icon, message, Form, Select, notification } from 'antd';
import { SchemaForm, createFormActions, } from '@uform/antd'
import '@/components/Uform_extends'
import '../../../commonTable.scss'
import renderformCfg from './formconfig'
const {RangePicker} = DatePicker;
const actions = createFormActions()
export default class InquireModal extends React.Component {
    constructor(props) {
        super(props)
        this.commonTableStore = props.commonTableStore
        this.state = {
            visible: false,
            renderformCfg: renderformCfg.formcfg,
            processdate:'',
            cabinetNumber:'',
            customer:'',
            orderNumber:'',
            contractNumber:''




        };
        this.handleOk = this.handleOk.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

    }
    componentDidMount() {
    }
    async handleOk(e) {
        let FormStateValue = actions.getFormState().values
        this.state.processdate!=''?FormStateValue.processdate=this.state.processdate:null
        this.state.cabinetNumber!=''?FormStateValue.cabinetNumber=this.state.cabinetNumber:null
        this.state.customer!=''?FormStateValue.customer=this.state.customer:null
        this.state.orderNumber!=''?FormStateValue.orderNumber=this.state.orderNumber:null
        this.state.contractNumber!=''?FormStateValue.contractNumber=this.state.contractNumber:null
        this.props.inquireModal(FormStateValue)
        this.handleCancel()
    }
    init() {
        this.showModal()
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
        })
    }
    selectNewValue(a,b){
        switch (b){
            case 'cabinetNumber':
              this.setState({
                cabinetNumber:a.target.value
              }) ;
              break; 
              case 'customer':
              this.setState({
                customer:a.target.value
              }) ;
              break; 
              case 'orderNumber':
              this.setState({
                orderNumber:a.target.value
              }) ;
              break; 
              case 'contractNumber':
              this.setState({
                contractNumber:a.target.value
              }) ;
              break; 

        }
    }
    selectdataValue(a,b){
        this.setState({
            processdate:b
        })
    }
    render() {
        return (
            <div >
                <Modal
                    title="查询"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="800px"
                    visible={this.state.visible}
                    className='inquiremodal'
                >
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
                                                state.props["x-props"].schema = formCfg;
                                            });
                                        }
                                    }
                                })

                            }
                        }
                        actions={actions}
                        schema={this.state.renderformCfg}
                        labelCol={6}
                        wrapperCol={18}
                    >


                    </SchemaForm>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ height: '200px',marginTop:'-25px' }} onSubmit={this.handleOk}>
                        <Form.Item label="合同号：" style={{ width: '48%', float: 'left', marginRight: '2%' }}>
                            <Input onChange={event => this.selectNewValue(event, 'contractNumber')}></Input>
                        </Form.Item>
                        <Form.Item label="订单流水号：" style={{ width: '48%', float: 'left', marginRight: '2%' }}>
                            <Input onChange={event => this.selectNewValue(event, 'orderNumber')}></Input>
                        </Form.Item>
                        <Form.Item label="客户名称：" style={{ width: '48%', float: 'left', marginRight: '2%' }}>
                            <Input onChange={event => this.selectNewValue(event, 'customer')}></Input>
                        </Form.Item>
                        <Form.Item label="处理时间：" style={{ width: '48%', float: 'left', marginRight: '2%' }}>
                             <RangePicker format='YYYY-MM-DD' onChange={this.selectdataValue.bind(this)} />
                        </Form.Item>
                        <Form.Item label="机柜编号：" style={{ width: '48%', float: 'left', marginRight: '2%' }}>
                            <Input onChange={event => this.selectNewValue(event, 'cabinetNumber')}></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}