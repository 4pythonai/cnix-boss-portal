import React, { useState } from 'react';
import { Form, Select, Table, Modal, Button, Input, Icon, message } from 'antd';
import api from '@/api/api'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import { inject, observer } from 'mobx-react'
@inject('IDC_cfg_store')
export default class ResourceApplicationSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selectedRows: [],
        };
        this.store = this.props.IDC_cfg_store
        this.handleOk = this.handleOk.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    async componentDidMount() {
        if(this.props.commontablestore.selectedRows.length>0){
            let params={
                data:{paperno:this.props.commontablestore.selectedRows[0].fiberresourcepaperno},
                method:'POST'
            }
            let res=await api.bpm.getFiberResourceByPaperno(params)
            if(res.code==200){  
                res.data.customerid=res.data.customName            
                let arr=[]
                arr.push(res.data)
                this.setState({
                selectedRows:arr
              },()=>{this.props.onChange(this.state.selectedRows[0].paperno)})
            }
            
        }
      

    }
    onClick() {
        this.setState({
            visible: true,
        })
    }
    getrowdata() {
           let selectrow = this.state.selectedRows

            return selectrow.map(selectrow => {            
                    return  <div style={{ marginLeft: '-55px' }} key='1' >
                        <p style={{ margin: '0px 0px' }}>
                            <span style={{ margin: '0px' }}>单据号：</span>
                            <span>{selectrow.paperno}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.customerid}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.customerAddr}</span>
                        </p>


                    </div>

            })
    



    }
    async handleOk() {
        if (this.refs.commonTableRef.commonTableStore.selectedRows.length > 0) {
            this.setState({
                selectedRows:this.refs.commonTableRef.commonTableStore.selectedRows
            },()=>{
                this.props.onChange(this.state.selectedRows[0].paperno)
                this.handleCancel()
            })


        } else {
            message.error('您还没有选择光纤资源申请单，请选择')
        }

    }
    handleCancel() {
        this.setState({
            visible: false
        })

    }
    render() {
        return (
            <div>
                <Button onClick={this.onClick}>选择光纤资源申请单</Button>
                <div>
                    {this.getrowdata()}
                </div>
                <Modal
                    title="选择光纤资源申请单"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1200px"
                    visible={this.state.visible}
                >
                    <CommonTable
                        ref="commonTableRef"
                        key='boss_fiber_resource_application_select'
                        action_code='boss_fiber_resource_application_select'
                    />
                </Modal>

            </div>

        )
    }
}