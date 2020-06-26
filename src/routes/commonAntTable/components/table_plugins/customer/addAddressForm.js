import React, { useState, useEffect } from 'react';
import { message, Modal, List, Icon, Button, Popconfirm } from 'antd'
import api from '@/api/api'
<<<<<<< HEAD
import RenderAddress from './RenderAddress'
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {
    
    return <SchemaForm
        actions={actions}
        labelCol={6}
        wrapperCol={18}
    >

        <Field
            type="string"
            title="新客户地址"
            required
            name="address"
            default=''
        />
        <Field
            type="string"
            title="备注"
            name="salesmanNote"
            x-component="textarea"
            default=''
        />

        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>提交</Button>
        </div>
    </SchemaForm>
}


<<<<<<< HEAD
=======
const RenderAddress = props => {
    let userInfo = sessionStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return <List
        size="small"
        style={{ marginBottom: '20px' }}
        header={<div style={{ fontSize: '16px', fontWeight: 'bold' }}>地址列表</div>}
        footer={null}
        bordered
        dataSource={props.addressList}
        renderItem={item => <List.Item
            avatar={
                <Icon type="environment" style={{ width: '25px', height: '25px' }} />
            }
        >
            <div style={{ overflow: 'hidden',width: '100%' }}>
                <div style={{ float: 'left' }}>{item.address}</div>
                {
                    item.userId == userInfo.staff_id
                        ?
                        <div style={{ float: 'right' }}>
                            <Popconfirm title="确定要删除吗?" onConfirm={() => props.removeAddressList(item)}>
                                <a>删除</a>
                            </Popconfirm>

                        </div>

                        : null
                }
            </div>
        </List.Item>}
    />
}

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

export default class AddAddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
            addressList: []
        }
    }

    
    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.warning('请选择一条数据');
            return;
        }

        this.setState({
            visible: true
        })

        this.getAddressList()
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    async saveFormData(data) {
        data = {
            customer_id: this.props.commonTableStore.selectedRows[0].id,
            ...data,
        }
        let params = { data: data, method: 'POST' };

        await api.customer.pendingAddress(params)

        this.hideModal()
    }


    async getAddressList() {
        let params = {
            data: {
                customer_id: this.props.commonTableStore.selectedRows[0].id
            },
            method: 'POST'
        }

        let res = await api.contract_api.getAddressList(params);
        if (res.code == 200) {
            this.setState({
                addressList: res.data.addressList
            })
        }
    }

    removeAddressList = async (item) => {
        let params = {
            data: {
                id: item.id
            },
            method: 'POST'
        }
        let res = await api.customer.removeAddress(params)
        if (res.code == 200) {
            this.getAddressList()
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
            title="客户地址管理" >

            <RenderAddress
                removeAddressList={this.removeAddressList}
<<<<<<< HEAD
                addressList={this.state.addressList} 
                isDelete = {true} />
                
=======
                addressList={this.state.addressList} />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            <GetFields
                saveFormData={this.saveFormData.bind(this)}
            />
        </Modal>
    }
}