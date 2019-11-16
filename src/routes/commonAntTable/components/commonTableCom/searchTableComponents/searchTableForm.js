import React, { useState, useEffect } from 'react'
import { Modal, Row, Button, Select, Input } from 'antd';
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
const { Option } = Select

import { toJS } from 'mobx'


import {
    SchemaForm,
    createAsyncFormActions,
    Field,
    FormItemGrid,
    createFormActions
} from '@uform/antd'


export default class SearchTableForm extends React.Component {
    constructor(props) {
        super(props)

        let actions = createAsyncFormActions()

        this.state = {
            actions: actions
        }
    }

    componentWillMount() {
        this.props.saveActions(this, this.props.form_index)
    }


    getSearchTableFormData = async () => {

        let inner_fmdata = await this.state.actions.submit();
        return inner_fmdata.values
    }

    render() {
        return <SchemaForm
            actions={this.state.actions}
            effects={($, { setFieldState, getFieldState }) => {

                $("onFormInit").subscribe(() => {
                    setFieldState('field_' + this.props.form_index, state => {
                        state.enum = this.props.fieldList
                    })
                });

                const setEnum = (name, operator_list) => {
                    setFieldState(name, state => {
                        console.log(state, name, operator_list)
                        state.props.enum = operator_list
                    })
                }

                const setType = (name, type) => {
                    setFieldState(name, state => {
                        state.props.type = type
                        if (type != 'date') {
                            state.value = ''
                        }
                    })
                }


                let field = 'field_' + this.props.form_index

                $('onFieldChange', field)
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
                        let formCfg = toJS(this.props.formCfg)

                        let operator = 'operator_' + this.props.form_index
                        if (!formCfg[state.value]) {
                            return;
                        }

                        switch (formCfg[state.value].type) {
                            case 'string':
                                setEnum(operator, this.props.operation_list.string)

                                setType('vset_' + this.props.form_index, 'string')
                                break
                            case 'number':
                                setEnum(operator, this.props.operation_list.number)
                                setType('vset_' + this.props.form_index, 'number')
                                break
                            case 'date':

                                setEnum(operator, this.props.operation_list.date)
                                setType('vset_' + this.props.form_index, 'date')
                                break
                            default:
                                setEnum(operator, this.props.operation_list.other)
                                setType('vset_' + this.props.form_index, 'string')
                        }
                    })

            }}
            labelCol={8}
            wrapperCol={16}
        >
            <FormItemGrid gutter={3} cols={[8, 8, 8]}>
                <Field
                    type="string"
                    title="搜索字段"
                    name={'field_' + this.props.form_index}
                    default=''
                    required
                    enum={this.props.field_list}
                    x-effect={dispatch => ({
                        onChange(value, type, option) {
                            dispatch('onChangeOption', option)
                        }
                    })}
                />

                <Field
                    type="string"
                    title="搜索条件"
                    required
                    name={'operator_' + this.props.form_index}
                />
                <Field
                    type="string"
                    title="搜索内容"
                    name={'vset_' + this.props.form_index}
                    required
                    default={null}
                />
            </FormItemGrid>
        </SchemaForm>
    }
}