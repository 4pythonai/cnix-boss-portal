import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'

import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import api from '@/api/api'

import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {

    const [value, setValue] = useState()
    let { selectedRows } = props.commonTableStore
    const selectedRow = { ...selectedRows[0] }


    return <SchemaForm
        initialValues={ value }
        actions={ actions }
        effects={ ($, { setFieldState, getFieldState }) => {

            $("onFormInit").subscribe(() => {
                let { customName, contactPhone, email, payee_num, payee_name, bank, bank_number, id, account } = selectedRow
                setValue({ customName, contactPhone, email, payee_num, payee_name, bank, id, account, bank_num: bank_number })
            });

            $('onFieldChange', 'newCustomName')
                .pipe(
                    withLatestFrom($('onChangeOption')),
                    map(([fieldState, { payload: option }]) => {
                        return {
                            state: fieldState,
                            option
                        }
                    })
                ).subscribe(async ({ state, option }) => {
                    if (!state.value) {
                        return;
                    }

                    let params = {
                        data: {
                            companyKey: state.value
                        },
                        method: 'POST'
                    }
                    let res = await api.customer.inquiryCompanyMsg(params)
                    if (res.code == 200) {
                        setFieldState('contactPhone', state => {
                            state.value = res.data.data.contact.telephone
                        })
                        setFieldState('email', state => {
                            state.value = res.data.data.contact.email
                        })
                        setFieldState('payee_num', state => {
                            state.value = res.data.data.credit_no
                        })
                    }

                })


            // 客户搜索
            $('onSearchCustomer', 'newCustomName')
                .pipe(
                    map(fieldState => {
                        return fieldState
                    }),
                    debounceTime(400)
                )
                .subscribe(async ({ payload }) => {
                    if (!payload) {
                        return;
                    }

                    let params = {
                        data: {
                            companyKey: payload
                        },
                        method: 'POST',
                    }
                    let res = await api.customer.inquiryCompanyList(params)

                    if (res.code == 200) {
                        let customerList = res.data.data.items.map(item => ({ label: item.name, value: item.name }))
                        setFieldState('newCustomName', state => {
                            state.loading = false
                            state.props.enum = customerList
                        })
                    }
                })
        } }
        labelCol={ 8 }
        wrapperCol={ 12 }
    >


        <Field
            type="string"
            title="原客户名称"
            required
            name="customName"
            editable={ false }
        />

        <Field
            type="string"
            title="新客户名称"
            default=''
            name="newCustomName"
            x-effect={ dispatch => ({
                onChange(value, type, option) {
                    dispatch('onChangeOption', option)
                },
                onSearch(value) {
                    dispatch('onSearchCustomer', value)
                }
            }) }
            x-props={ { showSearch: true, filterLocal: false } }
        />

        <Field
            type="string"
            title="客户电话"
            required
            editable={ false }
            name="contactPhone"
            default=''
        />

        <Field
            type="string"
            title="客户邮箱"
            required
            name="email"
            editable={ false }
            default=''
        />

        <Field
            type="string"
            title="税号"
            required
            name="payee_num"
            editable={ false }
            default=''
        />

        <Field
            type="string"
            title="户名"
            name="payee_name"
            default=''
        />
        <Field
            type="string"
            title="帐号"
            name="account"
            default=''
            x-rules='number'
        />
        <Field
            type="string"
            title="开户行"
            name="bank"
            default=''
        />
        <Field
            type="string"
            title="银行编号"
            name="bank_num"
            default=''
            x-rules='number'
        />


        <div style={ { textAlign: 'center' } }>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={ async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>提交</Button>
        </div>
    </SchemaForm>
}



export default class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
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
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    async saveFormData(data) {
        let params = {
            data: {
                actcode: this.props.commonTableStore.action_code,
                rawdata: {
                    id: this.props.commonTableStore.selectedRows[0].id,
                    ...data
                }
            },
            updateurl: this.props.commonTableStore.curd.updateurl,
            method: 'POST'
        };

        let json = await api.curd.updateData(params);
        if (json.code == 200) {
            this.hideModal();
            this.props.refreshTable();
        }
    }

    render() {
        return <Modal
            destroyOnClose
            footer={ null }
            visible={ this.state.visible }
            width={ 1000 }
            onCancel={ () => this.hideModal() }
            title="编辑客户" >
            <GetFields
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </Modal>
    }
}