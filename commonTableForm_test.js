import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import commonTableStore from '../../../../store/commonTableStore'
import api from '../../../../api/api'
import { toJS } from 'mobx'

import '../../../../components/Uform_extends/fileuploader'
import '../../../../components/Uform_extends/assocselect'

import {
    SchemaForm,
    createFormActions,

} from '@uform/antd'

const actions = createFormActions()

const CommonTableForm = props => {

    const [state, setState, value] = useState({ editable: props.editable })

    if (!commonTableStore.formCfg) {
        return ''
    }

    // useEffect(() => { }, [])

    console.log('git ceshi')

    if (commonTableStore.tableOptionType == 'addData' || commonTableStore.tableOptionType == 'editData') {
        return <SchemaForm
            value={ value }
            initialValues={ state.value }
            actions={ actions }
            editable={ state.editable }
            schema={ commonTableStore.formCfg }
            effects={
                ($, { setFieldState, getFieldState }) => {

                    const loading = name => {
                        setFieldState(name, state => {
                            state.loading = true
                        })
                    }
                    const loaded = name => {
                        setFieldState(name, state => {
                            state.loading = false
                        })
                    }
                    const hide = name => {
                        setFieldState(name, state => {
                            state.visible = false
                        })
                    }
                    const show = name => {
                        setFieldState(name, state => {

                            console.log("show函数:")
                            console.log(name)
                            console.log(state)
                            state.visible = true
                        })
                    }
                    const setEnum = (field, value) => {

                        console.log("setEnum函数:")
                        console.log(field)
                        console.log(value)

                        setFieldState(field, state => {
                            console.log(state)

                            state.props.enum = value;
                        })
                    }

                    const setValue = (name, value) => {
                        setFieldState(name, state => {
                            state.value = value
                        })
                    }

                    const formatOptionList = (list, label_field, value_field) => {
                        return list.map(item => ({ label: item[label_field], value: item[value_field] }))
                    }

                    // 初始化第一个select的optionList
                    const onLoadAssociateOriginData = async () => {
                        for (let key in commonTableStore.formCfg.properties.group_all.properties) {
                            let field_cfg = commonTableStore.formCfg.properties.group_all.properties[key]

                            if (field_cfg.query_cfg && field_cfg.query_cfg.level == 1) {
                                let prev_field = getFieldState(key);
                                if (!prev_field) {
                                    return;
                                }

                                await getOptionList(prev_field.props.query_cfg, prev_field.value, key, null)
                            }
                        }
                    }

                    const onLoadAssociateHandle = async prev_field => {
                        if (!prev_field.props.query_cfg) return;

                        // 判断是否到最后一个联动select
                        if (prev_field.props.query_cfg && !prev_field.props.query_cfg.associate_field) {
                            return
                        }
                        await onLoadAssociateData(prev_field)
                    }


                    const onLoadAssociateData = async (prev_field) => {

                        let next_key = prev_field.props.query_cfg.associate_field;

                        if (!next_key) {
                            return;
                        }

                        let next_field = getFieldState(next_key);

                        let next_query_cfg = next_field.props.query_cfg;

                        let next_value = next_field.value
                        getOptionList(next_query_cfg, prev_field.value, next_key, next_value)
                    }

                    // 请求optionList 赋值给next_select
                    const getOptionList = async (query_cfg, prev_value, field_key, next_value) => {

                        loading(field_key);

                        let params = {
                            data: { ...query_cfg, value_field: prev_value },
                            method: 'GET'
                        };

                        let res = await api.activity.getAssociateData(params)

                        if (res.code == 200) {

                            let optionsList = formatOptionList(res.data, query_cfg.label_field, query_cfg.value_field)

                            setEnum(field_key, optionsList);

                            loaded(field_key);
                            setValue(field_key, next_value);
                        }

                    }

                    // 清除联动optionList
                    const clearAssociateData = fieldState => {
                        if (fieldState.props.query_cfg && fieldState.props.query_cfg.associate_field) {
                            setValue(fieldState.props.query_cfg.associate_field, null);
                            setEnum(fieldState.props.query_cfg.associate_field, []);
                        }
                    }



                    $('onFormInit').subscribe(async () => {
                        hide('id');
                    })

                    $('onFormMount').subscribe(async () => {

                        await onLoadAssociateOriginData();
                        setState({
                            value: commonTableStore.tableOptionType == 'editData'
                                ?
                                { ...commonTableStore.selectedRows[0] }
                                :
                                {}
                        })
                    })


                    $('onFieldChange').subscribe(fieldState => {
                        onLoadAssociateHandle(fieldState)
                    })
                }
            }
            labelCol={ 8 }
            wrapperCol={ 12 }
        >
            <div style={ { textAlign: 'center' } }>
                <Button type="primary" htmlType="button" className="marginRihgt10" onClick={ async event => {
                    actions.validate()

                    commonTableStore.saveFormData(actions.getFormState().values, props.onChange, props.as_virtual);
                }
                }>提交</Button>
            </div>
        </SchemaForm>

        alert('44444')
        console.log(this)
    }
}
export default CommonTableForm
