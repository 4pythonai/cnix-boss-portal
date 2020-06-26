import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'

import api from '@/api/api'

import { Modal, Descriptions, message } from 'antd';



import {
    SchemaForm,
    Submit,
    FormButtonGroup,
    createFormActions,

} from '@uform/antd'



@observer
export default class CabinetCompletionsheet extends React.Component {
    constructor(props) {
        super(props)
    this.state ={
            visible: false,
            refer_uuid: '',
            refer_paperno: '',
            endtype: 'boss_cabinet_poweron',
            completetype: null,
            setlectedCabinets: [],
            canedit: "true"
        }
        this.init=this.init.bind(this)
    }

 async init() {
     console.log(879,this.props)
     if(this.props.commonTableStore.selectedRows.length!=1){
         message.error('请选择一条数据')
         return
     }
     this.refs.commonModalRef.showModal()

    }

    // hideModal() {
    //     this.refs.commonModalRef.onCancelHandle()
    // }


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
            let res = await api.bpm.addIDCCompleteorder(params)
            if (res.code == 200) {
            //    this.setState({
            //     visible:false
            //    })
            this.refs.commonModalRef.onCancelHandle()
            }
    }

    // handlecancel(){
    //     this.setState({
    //         visible:false
    //     })
    // }
    renderrows(item,data){
        if(item=='机柜编号'){
            
            return data.replace(/,/g,"；")
        }else{
            return data
        }
    }
    render() {
        var rowkey=[]
        var row={}
        var obj={}
        if(this.props.commonTableStore.selectedRows.length==1){
        row=this.props.commonTableStore.selectedRows[0]        
        obj.合同编号=row.contractno
        obj.合同名称=row.contractname
        obj.客户名称=row.custname
        obj.合同类型=row.rent_type
        obj.单据号=row.paperno
        obj.新增机柜数量=row.cabinetsnumber
        obj.流程状态=row.flowstatus
        obj.申请人=row.author
        obj.添加日期=row.adddate
        obj.机柜编号=row.cabinets
        rowkey=Object.keys(obj)
        }
        
        return <CommonModal
            // height="300px"
            width='1000px'
            footer={null}
            title="新增上架竣工单"
            // visible={this.state.visible}
            // onCancel={event=>this.handlecancel()}
            ref='commonModalRef'
            layoutcfg={2}
        >
            <div>
            <Descriptions
                key={ rowkey }
                // column={ 3 }
                bordered
                style={ { marginLeft: "10px" } }
            >
                {
                    rowkey.map((item,index)=>{
                        return <Descriptions.Item
                                // span={1}
                                key={ item }
                                label={ item }
                            >
                                {this.renderrows(item,obj[item])}
                            </Descriptions.Item>
                    })
                }
            </Descriptions>
            </div>
            <div style={ { marginLeft: '100px', marginTop: '15px' } }>

                <SchemaForm
                    onSubmit={ values => this.saveFormData(values) }
                    schema={ {
                        "type": "object",
                        "properties": {
                            "completed_cabinets": {
                                "type": "UncompletedCabinetSelector",
                                "title": "选择机柜",
                                "x-props": { 'paperno': row.paperno},
                                "required": true
                            },
                            "delivertime": {
                                "type": "date",
                                "title": "上架日期",
                                "required": true
                            },

                            "powerontime": {
                                "type": "date",
                                "title": "加电日期",
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
        </CommonModal >
    }
}
