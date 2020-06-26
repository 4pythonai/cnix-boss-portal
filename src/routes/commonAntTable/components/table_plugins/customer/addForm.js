import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import api from '@/api/api'

import {
    SchemaForm,
    createFormActions,
    Field,
    FormPath
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {

    const [value] = useState()
    let { selectedRows } = props.commonTableStore

    const selectedRow = selectedRows[0]


    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onFormInit').subscribe(() => {
                setFieldState(FormPath.match('*(address,contactPhone,email,payee_num)'), state => {
                  state.props['x-props'] = state.props['x-props'] || {}
                  state.props['x-props'].style = {
                    width: 200
                  }
                  state.visible = false;
                })
              })


            // 选中客户获取客户地址
            $('onFieldChange', 'customName')
                .pipe(
                    withLatestFrom($('onChangeOption')),
                    map(([fieldState, { payload: option }]) => {
                        return {
                            state: fieldState,
                            option
                        }
                    })
                )
                .subscribe(async ({ state, option }) => {
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
                        setFieldState('address', state => {
                            state.value = res.data.data.contact.address
                            state.visible = true
                        })
                        setFieldState('contactPhone', state => {
                            state.value = res.data.data.contact.telephone
                            state.visible = true
                        })
                        setFieldState('email', state => {
                            state.value = res.data.data.contact.email
                            state.visible = true
                        })
                        setFieldState('payee_num', state => {
                            state.value = res.data.data.credit_no
                            state.visible = true
                        })
                    }

                })

            // 客户搜索
            $('onSearchCustomer', 'customName')
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
                        setFieldState('customName', state => {
                            state.loading = false
                            state.props.enum = customerList
                        })
                    }
                })
        }}
        labelCol={8}
        wrapperCol={12}
    >


        <Field
            type="string"
            title="客户名称"
            required
            name="customName"
            placeholder='请输入客户名搜索'
            x-effect={dispatch => ({
                onChange(value, type, option) {
                    dispatch('onChangeOption', option)
                },
                onSearch(value) {
                    dispatch('onSearchCustomer', value)
                }
            })}
            x-props={{ showSearch: true, filterLocal: false }}
        />

        <Field
            type="string"
            title="客户地址"
            required
            name="address"
            editable={false}
            default=''
        />
        <Field
            type="string"
            title="客户电话"
            required
            editable={false}
            name="contactPhone"
            default=''
        />

        <Field
            type="string"
            title="客户邮箱"
            required
            name="email"
            editable={false}
            default=''
        />

        <Field
            type="string"
            title="税号"
            required
            name="payee_num"
            editable={false}
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



export default class AddForm extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
        }
    }

    init() {
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
                ...data
            },

            addurl: this.props.commonTableStore.curd.addurl,
            method: 'POST'
        };

        let json = await api.curd.addData(params);
        if (json.code == 200) {
            this.hideModal()
            this.props.refreshTable();
        }

    }

    render() {
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            width={650}
            onCancel={() => this.hideModal()}
            title="新增客户" >
            <GetFields
                commonTableStore={this.props.commonTableStore}
                saveFormData={this.saveFormData.bind(this)}
            />
        </Modal>
    }
}