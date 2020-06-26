import React from 'react'
import { observer, inject } from "mobx-react";
import {
    SchemaForm,
    createFormActions,
    createAscyncActions,
    Field,
    FormLayout,
    FormItemGrid

} from '@uform/antd'

import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import '@/components/Uform_extends'
import { Modal, message } from 'antd'
import IDC_cfg_store from '@/store/IDC_cfg_store'
import api from '@/api/api'

import moment from 'moment'

@observer
export default class Add extends React.Component {
    state = {
        visible: false,
        actions: createFormActions(),
        showContractListModal: false,
    }

    IDC_cfg_store = IDC_cfg_store

    init(btncode) {
        this.props.commonTableStore.rowSelectChange([], [])
        this.props.commonTableStore.setTableAction('add_table')
        this.setState({ visible: true })

    }

    async okContractHandle() {
        if (this.refs.commonTableRef.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一个合同');
            return;
        }
        let selectRow = this.refs.commonTableRef.commonTableStore.selectedRows[0];
        await this.IDC_cfg_store.setUuid(selectRow.uuid)
        await this.IDC_cfg_store.setContactAction(selectRow.document_type == '收款合同' ? 'IDCReceiveContract' :selectRow.document_type == '付款合同' ?'IDCPaymentsContract': 'boss_idc_termination_agreement')
        await this.IDC_cfg_store.setProcessKey(selectRow.document_type == '收款合同' ? 'idc_order' :selectRow.document_type == '付款合同' ? 'idc_order_payment':'idc_order_stop')
        await this.IDC_cfg_store.setDetailContractNo(selectRow.contract_no)
        await this.IDC_cfg_store.getContractByUUID()
        this.state.actions.setFormState(state => {

            state.values.select_contract_arr[state.values.select_contract_arr.length - 1] = {
                contract_no: selectRow.contract_no,
                customerName: selectRow.customName1,
                stampSimpleName: this.IDC_cfg_store.chinese_shorthand,
                copyNum: selectRow.contract_copies,
                money: selectRow.contract_money,
                author: selectRow.author
            }
        })

        this.cancelContractModal()
    }

    cancelContractModal = () => { this.setState({ showContractListModal: false }) }
    showContractModal = () => { this.setState({ showContractListModal: true }) }

    hideModal = () => {
        this.setState({ visible: false })
    }

    async saveFormData() {
        let formData = await this.state.actions.submit()

        let params = {
            data: formData.values,
            method: 'POST',
        }
        let json = await api.user.addResignHandover(params)
        if(json.code == 200){
            this.hideModal()
            this.props.refreshTable();
        }
    }

    render() {
        return <div><Modal
            height="500px"
            width="1200px"
            visible={this.state.visible}
            title="新增"
            style={{top:20}}
            destroyOnClose={true}
            onOk={this.saveFormData.bind(this)}
            onCancel={this.hideModal}
        >
            <SchemaForm
                actions={this.state.actions}
                effects={(
                    $, { setFieldState, getFieldState }) => {
                    // 接受人搜索
                    $('onSearchUser', 'select_contract_arr.*.receiverUser')
                        .pipe(
                            map(fieldState => {
                                return fieldState
                            }),
                            debounceTime(400)
                        )
                        .subscribe(async ({ payload, path }) => {
                            console.log(payload, path);
                            if (!payload) {
                                return;
                            }
                            
                            
                            let params = {
                                data: {
                                    searchKey: payload
                                },
                                method: 'POST',
                            }
                            let res = await api.user.getAllUser(params)

                            if (res.code == 200) {
                                let userList = res.data.map(({ id, staff_name, department }) => ({ value: staff_name, label: `${staff_name} (${department})` }))
                                setFieldState(path.join('.'), state => {
                                    state.loading = false
                                    state.props.enum = userList
                                })
                            }
                        })
                }
                }
            >
                <Field
                    title="未返合同移交明细"
                    name="select_contract_arr"
                    maxItems={3}
                    type="array"
                    required
                    x-component="table"
                    x-props={{
                        scroll: { x: '200%' },
                        operationsWidth: 200
                    }}
                >
                    <Field type="object">
                        <Field
                            name="contract_no"
                            type="QuitInput"
                            description="请选择合同号"
                            title="合同号"
                            required
                            x-props={
                                {
                                    parent: this,
                                }
                            }
                        />
                        <Field required x-props={{readOnly: true }} name="customerName" type="string" title="客户名称" />
                        <Field required x-props={{readOnly: true }}  name="stampSimpleName" type="string" title="用章简称" />
                        <Field required x-props={{readOnly: true }}  name="copyNum" type="string" title="份数" />
                        <Field name="money" type="string" title="金额" />
                        <Field required x-props={{readOnly: true }}  name="author" type="string" title="申请人" />
                        <Field required
                            name="receiverUser"
                            type="string"
                            title="接收人"
                            default={'dddd'}
                            description="请输入搜索接收人"
                            x-effect={dispatch => ({
                                onChange(value, type, option) {
                                    dispatch('onChangeOption', option, type)
                                },
                                onSearch(value) {
                                    dispatch('onSearchUser', value)
                                }
                            })}
                            x-props={{ showSearch: true, filterLocal: false, autoClearSearchValue: true }}
                        />
                    </Field>
                </Field>
                <FormItemGrid gutter={20}>
                    <Field required name="user" type="GetLander" title="申请人" />
                    <Field required name="dept" type="GetDepart" title="申请人部门" />
                    <Field required name="start_date" type="date" title="申请日期" />

                </FormItemGrid>
                <FormItemGrid gutter={20}>
                    <Field name="note" type="textarea" title="备注" />
                </FormItemGrid>
            </SchemaForm>
        </Modal>
            <Modal
                closable={true}
                keyboard={true}
                maskClosable={true}
                width={1200}
                destroyOnClose={true}
                title="选择合同"
                centered
                cancelText="取消"
                okText="确认"
                onCancel={this.cancelContractModal}
                onOk={() => this.okContractHandle()}
                visible={this.state.showContractListModal}
            >
                <CommonTable ref="commonTableRef" action_code='resign_select_contract' />
            </Modal>
        </div>
    }
}

