import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import api from '@/api/api'
import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

import moment from 'moment';

const actions = createFormActions()


const GetFields = (props) => {

    const [value] = useState()
    let { selectedRows } = props.commonTableStore

    const selectedRow = selectedRows[0]


    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onFormInit').subscribe(async () => {
                let stamp_duty_tax = selectedRow.contract_money
                    ?
                    (selectedRow.contract_money / 1 * 0.0003).toFixed(2)
                    :
                    '0.00'

                setFieldState('stamp_duty_tax', state => {
                    state.value = stamp_duty_tax
                })
                setFieldState('customer_type', state => {
                    state.value = selectedRow.ghost_customer_type_id
                })
                setFieldState('state', state => {
                    state.value = '生效作废'
                })
                setFieldState('return_date', state => {
                    state.value = selectedRow.return_date&&selectedRow.return_date!='0000-00-00' ? selectedRow.return_date : moment(new Date())
                })
                setFieldState('return_note', state => {
                    state.value = selectedRow.return_note
                })
            })


            $('onFormMount').subscribe(async () => {
                getAllCustomerType()
            })


            const getAllCustomerType = async () => {
                let params = {
                    data: {},
                    method: 'POST'
                }
                let res = await api.contractManage.getAllCustomerType(params)
                let customerTypeList = res.data.map(({ id, category }) => ({ label: category, value: id }))
                customerTypeList.unshift({ label:'请选择', value:'请选择'})
                setFieldState('customer_type', state => {
                    state.props.enum = customerTypeList
                })
            }
        }}
        labelCol={8}
        wrapperCol={12}
    >


        <Field
            type="radio"
            title="状态"
            required
            name="state"
            enum={[
                {
                    label: '作废',
                    value: '生效作废'
                },
            ]}
            editable={false}
        />

        <Field
            type="string"
            title="印花税"
            required
            name="stamp_duty_tax"
            editable={false}
        />

        <Field
            type="string"
            title="客户类型"
            required
            name="customer_type"
            default={selectedRow.customer_type || '请选择'}
            editable={false}
        />

        <Field
            type="date"
            title="作废日期"
            name="return_date"
            required
        />
        <Field
            type="string"
            title="作废备注"
            name="return_note"
            value="确认"
            x-component='textarea'
        />


        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>保存</Button>
        </div>
    </SchemaForm>
}



export default class Obsolete extends React.Component {
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
                concat: this.props.commonTableStore.selectedRows[0].concat,
                ...data
            },
            method: 'POST'
        };

        let json = await api.contractManage.saveStampData(params);
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
            title="作废" >
            <GetFields
                commonTableStore={this.props.commonTableStore}
                saveFormData={this.saveFormData.bind(this)}
            />
        </Modal>
    }
}