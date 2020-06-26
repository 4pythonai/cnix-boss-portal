import React from 'react'
import { observer, inject } from "mobx-react";
import FlowHistory from '@/routes/flow/containers/flowHistory'
import {
    SchemaForm,
    createFormActions,
    createAscyncActions,
    Field,
    FormLayout,
    FormItemGrid,
    FormBlock

} from '@uform/antd'

import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import '@/components/Uform_extends'
import { Modal, message, Card } from 'antd'
import IDC_cfg_store from '@/store/IDC_cfg_store'
import navigationStore from '@/store/navigationStore'
import api from '@/api/api'

@observer
export default class Detail extends React.Component {
    state = {
        visible: false,
        actions: createFormActions(),
        showContractListModal: false,
        values: {},
        path: ''
    }

    IDC_cfg_store = IDC_cfg_store


    async init(btncode) {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择1条数据.")
            return;
        }

        this.setState({ visible: true })
        this.getContractList()
    }


    async getContractList() {
        let params = { data: { id: this.props.commonTableStore.selectedRows[0].id }, method: 'POST' };
        let selectedRow = { ...this.props.commonTableStore.selectedRows[0] }
        let json = await api.user.getQuitSelectContractList(params);
        if (json.code == 200) {
            this.state.actions.setFormState(state => {
                state.values = json.data
            })
        }
    }


    hideModal = () => {
        this.setState({ visible: false })
    }
    getFlowHistory = () => {
        let selectRow = this.props.commonTableStore.selectedRows[0];
        return <Card title="审批历史">
            <FlowHistory uuid={selectRow.uuid} process_key={navigationStore.currentMenu.process_key} />
        </Card>
    }


    render() {
        return <div><Modal
            height="500px"
            width="1200px"
            visible={this.state.visible}
            title="编辑"
            footer={null}
            destroyOnClose={true}
            editable={false}
            onCancel={this.hideModal}
        >
            <SchemaForm
                actions={this.state.actions}
                initialValues={this.state.values}
                effects={(
                    $, { setFieldState, getFieldState }) => {

                    // 接受人搜索
                    $('onSearchUser', 'select_contract_arr.*.receiverUser')
                        .pipe(
                            map(fieldState => {
                                console.log(fieldState);
                                return fieldState
                            }),
                            debounceTime(400)
                        )
                        .subscribe(async ({ payload, path }) => {
                            console.log(payload, path);
                            if (!payload) {
                                return;
                            }

                            this.setState({
                                path: path
                            })

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
                    editable={false}
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
                                    editable: false,
                                    parent: this
                                }
                            }
                        />
                        <Field editable={false} x-props={{ readOnly: true }} required name="customerName" type="string" title="客户名称" />
                        <Field editable={false} x-props={{ readOnly: true }} required name="stampSimpleName" type="string" title="用章简称" />
                        <Field editable={false} x-props={{ readOnly: true }} required name="copyNum" type="string" title="份数" />
                        <Field editable={false} x-props={{ readOnly: true }} name="money" type="string" title="金额" />
                        <Field editable={false} x-props={{ readOnly: true }} required name="author" type="string" title="申请人" />
                        <Field
                            name="receiverUser"
                            type="string"
                            title="接收人"
                            default=''
                            editable={false}
                            description="请输入搜索接收人"
                            x-effect={dispatch => ({
                                onChange(value, type, option) {
                                    dispatch('onChangeOption', option, type)
                                },
                                onSearch(value) {
                                    dispatch('onSearchUser', value)
                                }
                            })}
                            x-props={{ readOnly: true, showSearch: true, filterLocal: false, autoClearSearchValue: true }}
                        />
                    </Field>
                </Field>
                <FormItemGrid gutter={20}>
                    <Field required name="user" type="GetLander" title="申请人" />
                    <Field required name="dept" type="GetDepart" title="申请人部门" />
                    <Field editable={false} required name="start_date" type="date" title="申请日期" />

                </FormItemGrid>
                <FormBlock gutter={10}>
                    <Field editable={false} name="note" type="textarea" title="备注" />
                </FormBlock>
            </SchemaForm>
            {this.getFlowHistory()}
        </Modal>
        </div>
    }
}

