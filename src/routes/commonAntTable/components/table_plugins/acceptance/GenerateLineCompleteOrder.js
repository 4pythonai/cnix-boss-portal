import CommonTableForm from '../../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";

import api from '@/api/api'

import { Modal, Descriptions, message,Table } from 'antd';


import {
    SchemaForm,
    Submit,
    FormButtonGroup,
    createFormActions,

} from '@uform/antd'

// 单独为腾然准备的竣工单按钮.

@observer
export default class GenerateLineCompleteOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            refer_uuid: '',
            refer_paperno: '',
            setlectedCabinets: [],
            canedit: "true",
            endtype: 'acceptance_line',
            rowkey: [],
            obj: {},
            bigjson:[],
            workload:[]
        }
        this.init = this.init.bind(this)

    }

     init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据')
            return
        }
        if(this.props.commonTableStore.selectedRows[0].flownode!='已归档'){
            message.error('已归档数据才可以生成竣工单')
            return
        }
        if(this.props.commonTableStore.selectedRows[0].processDefinitionKey!='idc_isp_line_order'){
            message.error('请选择线路开通工单[非派生工单]')
            return
        }
        this.fetchOrderInfo()
        console.log(this.props.commonTableStore.selectedRows)
    }




    async fetchOrderInfo() {
        let params = {
            data: {
                uuid: this.props.commonTableStore.selectedRows[0].uuid,
                contractno: this.props.commonTableStore.selectedRows[0].contractno,

            },
            method: "POST"
        };

        let res = await api.acceptance.getLineOrderData(params)
        this.setState({ visible: true })
        let row = this.props.commonTableStore.selectedRows[0]
        let obj={}
        let rowKey=[]
        obj.开通单流水号 = row.paperno
        obj.合同编号 = res.orderdata.contractno
        obj.合同名称 = res.orderdata.contractname
        obj.客户名称 = res.orderdata.custname
        obj.合同类型 = res.orderdata.rent_type
        obj.申请人 = res.orderdata.author
        obj.添加日期 = row.adddate
        obj.流程状态 = row.flownode
      
        rowKey = Object.keys(obj)
        this.setState({
            rowkey:rowKey,
            obj:obj, 
            bigjson:res.bigjson
        })
        
        console.log(this.state.rowkey)
        console.log(this.state.obj)
    }


    reportUUID = (uuid) => {
        this.setState({ refer_uuid: uuid })
    }

    reportOrginPaperno = (paperno) => {
        this.setState({ refer_paperno: paperno })
    }



    saveFormData = async (values) => {
        values.refer_uuid = this.props.commonTableStore.selectedRows[0].uuid
        values.refer_paperno = this.props.commonTableStore.selectedRows[0].paperno

        values.endtype = this.state.endtype
        let params = { data: values, method: 'POST' };
        let res = await api.acceptance.addLineCompleteOrder(params)
        if (res.code == 200) {
            this.setState({
                visible: false
            })
        }
    }

    handlecancel() {
        this.setState({
            visible: false
        })
    }

    renderrows(key, value) {
        console.log(key)
        console.log(value)
        return value

        
    }

    hideCustomerModal() {

        this.setState({ visible: false })
    }




    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };



    render() {
        console.log('================render')
        console.log(this.state.rowkey)
        console.log(this.state.rowkey.length)
        const columns=[
            {
                title: '施工人员',
                dataIndex: 'authorname',
                key: 'authorname',
              },
              {
                title: '施工描述',
                dataIndex: 'constructiondesc',
                key: 'constructiondesc',
              },
              {
                title: '所属部门',
                dataIndex: 'currentdeptname',
                key: 'currentdeptname',
              }
        ]

        if (this.state.rowkey.length > 1) {
            return (<Modal

                width='1200px'
                footer={ null }
                height={1000}

                title="新增线路竣工单"
                ref='commonModalRef'
                layoutcfg={ 2 }
                closable={ true }
                cancelText="取消"
                okText="确认"
                
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                
                
                visible={ this.state.visible }
            >
                <div>
                <div style={{fontWeight: 'bold',margin:'10px 0px' }}>工单信息</div>
                    <Descriptions
                        key={ this.state.rowkey }
                        bordered
                        columns={2}
                        style={ { marginLeft: "10px" } }
                    >
                        {
                            this.state.rowkey.map((onekey, index) => {
                                return <Descriptions.Item
                                    key={ onekey }
                                    label={ onekey }
                                >

                                    { this.renderrows(onekey, this.state.obj[onekey]) }
                                </Descriptions.Item>
                            })
                        }
                         {
                            this.state.bigjson.map((item,index)=>{
                                if(item.fieldid!='workload'){
                                    return <Descriptions.Item
                                    key={ item.fieldtitle }
                                    label={ item.fieldtitle }
                                >

                                    { item.value}
                                </Descriptions.Item>
                                }
                                
                            })
                        }
                    </Descriptions>

                    <div style={{fontWeight: 'bold',margin:'10px 0px' }}>线路部操作记录</div>
                    {
                        
                        this.state.bigjson.map((item)=>{
                            if(item.fieldid=='workload'){
                                return <Table style={{marginLeft:'10px'}} columns={columns} pagination={false} bordered dataSource={item.value}></Table>
                            }
                        })
                    }
                </div>
                <div style={ { marginLeft: '100px', marginTop: '15px' } }>

                    <SchemaForm
                        onSubmit={ values => this.saveFormData(values) }
                        schema={ {
                            "type": "object",
                            "properties": {

                               
                                "completetime": {
                                    "type": "date",
                                    "title": "完工日期",
                                    "required": true
                                },
                                "fileuploader": {
                                    "type": "fileuploader",
                                    "x-props": { 'edit': this.state.canedit, uform_para: "true" },
                                    "title": "上传附件"
                                },
                                "memo": {
                                    "type": "string",
                                    "x-component": "textarea",
                                    "title": "备注",
                                    "required": true,
                                },
                            }
                        } }
                        labelCol={ 5 }
                        wrapperCol={ 15 }
                    >

                        <FormButtonGroup style={ { marginLeft: '350px' } }>
                            <Submit>生成竣工单</Submit>
                        </FormButtonGroup>

                    </SchemaForm>
                </div>
            </Modal >
            )
        } else {
            return (
                <Modal

                    width='1000px'
                    height={1000}
                    footer={ null }
                    title="新增机柜竣工单"
                    ref='commonModalRef'
                    layoutcfg={ 2 }
                    closable={ true }
                    cancelText="取消"
                    okText="确认"
                    
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    
                    
                    visible={ this.state.visible }>
                </Modal>)
        }
    }
}

