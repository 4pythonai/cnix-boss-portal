import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'

<<<<<<< HEAD
import api from '@/api/api'
=======
import api from '@/api/customer_address_api'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

const actions = createFormActions()

const GetFields = (props) => {

    const [value] = useState()

    let { selectedRows } = props.commonTableStore

    const selectedRow = selectedRows[0]

    return <SchemaForm
        value={value}
        actions={actions}

        labelCol={8}
        wrapperCol={12}
    >
        <Field
            type="string"
            title="客户名称"
            name="customerName"
            editable={false}
            default={selectedRow.customerId}
        />

        <Field
            type="string"
            title="客户地址"
            name="address"
            editable={false}
            default={selectedRow.customerAddr}
        />

        <Field
            type="string"
            title="发起人"
            name="user"
            editable={false}
            default={selectedRow.salesmanId}
        />

        <Field
            type="string"
            title="发起人备注"
            required
            editable={false}
            default={selectedRow.salesmanNote}
            name="leaderNote"
            x-component="textarea"
        />


        <Field
            type="radio"
            default="同意"
            enum={['同意', '不同意']}
            required
            title="意见"
            name="status"
        />

        <Field
            type="string"
            title="备注"
            required
            name="leaderNote"
            x-component="textarea"
        />

        <Field
            type="string"
            title="创建时间"
            default={selectedRow.createDate}
            editable={false}
            name="date"
        />

        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                await props.saveFormData(actions.getFormState().values);
                props.hideModal()
<<<<<<< HEAD
                props.refreshTable()
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            }
            }>提交</Button>
        </div>
    </SchemaForm>
}



export default class ApprovalAddress extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
        }
    }

<<<<<<< HEAD
    async init() {
=======
    init() {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }
<<<<<<< HEAD
        let data = {
            id:this.props.commonTableStore.selectedRows[0].id
        }
        
        let params = { data: data, method: 'POST' };

        let res = await api.customer_address.checkIsOurData(params)
        if(res.code == 200){
            if(res.data=='n'){
                message.error(res.msg)
                return
            }
            
        }
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.setState({
            visible: true
        })
    }

<<<<<<< HEAD
    hideModal = ()=> {
=======
    hideModal() {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.setState({
            visible: false
        })
    }

    saveFormData = async data => {

        data = {
            customerId: this.props.commonTableStore.selectedRows[0].customerId,
            id: this.props.commonTableStore.selectedRows[0].id,
            ...data
        }
        let params = { data: data, method: 'POST' };

<<<<<<< HEAD
        let res = await api.customer_address.checkAddress(params)
=======
        let res = await api.checkAddress(params)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if(res.code == 200){
            this.hideModal()
        }
    }

    render() {
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            style={{ width: '400px' }}
            onCancel={() => this.hideModal()}
            title="客户地址审批" >
            <GetFields
                commonTableStore={this.props.commonTableStore}
                saveFormData={this.saveFormData}
<<<<<<< HEAD
                hideModal = {this.hideModal}
                refreshTable = {this.props.refreshTable}
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            />
            ></Modal>
    }
}