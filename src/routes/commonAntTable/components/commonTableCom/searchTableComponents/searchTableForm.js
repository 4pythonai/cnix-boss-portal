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
<<<<<<< HEAD
            actions={this.state.actions}
            effects={($, { setFieldState, getFieldState }) => {
=======
            actions={ this.state.actions }
            effects={ ($, { setFieldState, getFieldState }) => {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

                $("onFormInit").subscribe(() => {
                    setFieldState('field_' + this.props.form_index, state => {
                        state.enum = this.props.fieldList
                    })
                });

                const setEnum = (name, operator_list) => {
                    setFieldState(name, state => {
                        console.log(state, name, operator_list)
                        state.props.enum = operator_list
<<<<<<< HEAD
                        for(var k=0;k<operator_list.length;k++){
                            if(operator_list[k].value=='like'){
                                state.value='like'
                            }
                        }
                        
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
                let contentfield='vset_'+this.props.form_index
                $('savevalue',contentfield).subscribe(()=>{
                    this.props.onOk()
                   
                })
                $('onFieldChange', contentfield).subscribe(fieldState => {
                    if(fieldState.value){
                        setFieldState(contentfield, (state) => {
                        state.value = state.value?state.value.replace(/(^\s*)|(\s*$)/g,""):''
                      });
                    }
                    
                })
                let field = 'field_' + this.props.form_index
                
=======


                let field = 'field_' + this.props.form_index

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD

                        let keys = Object.keys(formCfg)
                        let type = ''
                        for(let i = 0; i< keys.length; i++){
                            let field_group_key = keys[i]
                            if (formCfg[field_group_key].properties[state.value]) {
                                field = formCfg[field_group_key].properties[state.value].type
                                break;
                            }
                        }
                        

                        switch (type) {
=======
                        if (!formCfg[state.value]) {
                            return;
                        }

                        switch (formCfg[state.value].type) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            case 'string':
                                setEnum(operator, this.props.operation_list.string)

                                setType('vset_' + this.props.form_index, 'string')
                                break
                            case 'number':
                                setEnum(operator, this.props.operation_list.number)
                                setType('vset_' + this.props.form_index, 'number')
                                break
                            case 'date':
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                setEnum(operator, this.props.operation_list.date)
                                setType('vset_' + this.props.form_index, 'date')
                                break
                            default:
<<<<<<< HEAD
                                console.log()
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                setEnum(operator, this.props.operation_list.other)
                                setType('vset_' + this.props.form_index, 'string')
                        }
                    })

<<<<<<< HEAD
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
                    x-effect={dispatch => ({
                        onPressEnter(value, type, option) {
                            dispatch('savevalue', option)
                        }
                    })}
=======
            } }
            labelCol={ 8 }
            wrapperCol={ 16 }
        >
            <FormItemGrid gutter={ 3 } cols={ [8, 8, 8] }>
                <Field
                    type="string"
                    title="搜索字段"
                    name={ 'field_' + this.props.form_index }
                    default='id'
                    required
                    enum={ this.props.field_list }
                    x-effect={ dispatch => ({
                        onChange(value, type, option) {
                            dispatch('onChangeOption', option)
                        }
                    }) }
                />

                <Field
                    type="string"
                    title="搜索条件"
                    required
                    name={ 'operator_' + this.props.form_index }
                    default='='

                />
                <Field
                    type="string"
                    title="内容"
                    name={ 'vset_' + this.props.form_index }
                    required
                    default={ null }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                />
            </FormItemGrid>
        </SchemaForm>
    }
}