import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
// import '../../../components/Uform_extends/fileuploader'
import api from '../../../api/api'

import {
    SchemaForm,
    Field,
    FormButtonGroup,
    Submit,
    Reset,
    FormItemGrid,
    FormTextBox,
    FormCard,
    FormPath,
    FormBlock,
    FormLayout,
    createFormActions,
    registerFormField,
    connect
} from '@uform/antd'
import { Button, Upload, Icon } from 'antd'

const actions = createFormActions()

const SelfForm = React.forwardRef((props, ref) => {


    const selfFormRef = useRef();
    useImperativeHandle(ref, () => ({
        getFormState: () => selfFormRef.current.props.actions.getFormState().values
    }));




    const [state, setState] = useState({
        editable: true,
        visible: false,
        schemaJson: {
            "type": "object",
            "x-props": {
                "title": "IDC合同录入"
            },
            "properties": {
                "group1": {
                    "type": "object",
                    "x-props": {
                        "title": "基本信息"
                    },
                    "x-component": "card",
                    "properties": {
                        "history_table": {
                            "type": "string",
                            "data_ui": 'action_code',
                            "title": "工作量记录",
                            "required": true
                        }
                    }
                }
            }
        },
    })

    useEffect(() => {
        async function getFormConfig() {
            let params = {
                data: {},
            };
            let res = await api.activity.getFormConfig(params);
            if (res.code == 200) {
                setState({
                    schemaJson: res.data
                })
            }
        }
        getFormConfig();

    }, [])



    return (

        <div id="scrollXContent">



            <div className="row" style={ { background: '#fff', marginLeft: '5px' } }>


                <header><span className="widget-icon"> <i className="fa fa-table" /> </span>
                    <h2>搜索结果</h2>
                </header>
                <div className="col-sm-12">
                    <div className="widget-body no-padding">
                        <div className="antTableWrapper">
                            <h3>{ state.schemaJson ? state.schemaJson.title : null }</h3>
                            {
                                state.schemaJson
                                    ?
                                    <SchemaForm
                                        ref={ selfFormRef }
                                        initialValues={ state.value }
                                        actions={ actions }
                                        schema={ state.schemaJson }
                                        effects={ ($, { setFieldState, getFieldState }) => {
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
                                                    state.visible = true
                                                })
                                            }
                                            const setEnum = (name, value) => {
                                                console.log(value);
                                                setFieldState(name, state => {
                                                    state.props.enum = value
                                                })
                                            }
                                            const setValue = (name, value) => {
                                                setFieldState(name, state => {
                                                    state.value = value
                                                })
                                            }

                                            const formateOptionList = (list, label_field, value_field) => {
                                                return list.map(item => ({ label: item[label_field], value: item[value_field] }))
                                            }

                                            // 初始化第一个select的optionList
                                            const onLoadAssociateOriginData = async field_name => {
                                                let field = getFieldState(field_name);
                                                await onLoadAssociateData(field_name, field.props.query_cfg);
                                            }

                                            // 清除联动optionList
                                            const clearAssociateData = fieldState => {
                                                if (fieldState.props.query_cfg && fieldState.props.query_cfg.associate_field) {
                                                    setValue(fieldState.props.query_cfg.associate_field, null);
                                                    setEnum(fieldState.props.query_cfg.associate_field, []);
                                                }
                                            }

                                            const onLoadAssociateHandle = async fieldState => {
                                                if (!(fieldState.props.query_cfg && fieldState.props.query_cfg.associate_field)) {
                                                    return
                                                }
                                                let field = getFieldState(fieldState.props.query_cfg.associate_field);

                                                show(fieldState.props.query_cfg.associate_field);
                                                loading(fieldState.props.query_cfg.associate_field);

                                                let associate_field = fieldState.props.query_cfg.associate_field
                                                await onLoadAssociateData(associate_field, field.props.query_cfg, fieldState.value)
                                            }

                                            // 请求数据 并get下一个select赋值
                                            const onLoadAssociateData = async (field_name, query_cfg, value_field) => {
                                                console.log('params', query_cfg);
                                                let params = {
                                                    data: { ...query_cfg, value_field: value_field },
                                                };
                                                let res = await api.activity.getAssociateData(params);
                                                if (res.code == 200) {
                                                    loaded(field_name);
                                                    setValue(field_name, null);

                                                    setEnum(field_name, formateOptionList(res.data, query_cfg.label_field, query_cfg.value_field));
                                                }
                                            }


                                            $('onFormInit').subscribe(() => {
                                                // hide('id');
                                                // onLoadAssociateOriginData('idcID');
                                                // onLoadAssociateOriginData('ODF');
                                            })

                                            $('onFieldChange').subscribe(fieldState => {
                                                if (!fieldState.value) {
                                                    clearAssociateData(fieldState)
                                                    return
                                                }
                                                onLoadAssociateHandle(fieldState)

                                            })
                                        } }
                                        onSubmit={ event => console.log(event) }
                                        labelCol={ 7 }
                                        wrapperCol={ 12 }
                                    >

                                        <FormButtonGroup
                                            offset={ 8 }
                                            sticky
                                            editable={ state.editable }
                                            labelCol={ 8 }
                                            wrapperCol={ 6 }
                                            onSubmit={ v => console.log(v) }
                                        >

                                            <Submit>提交</Submit>
                                            <Button
                                                type="primary"
                                                onClick={ () => setState({ editable: !state.editable }) }
                                            >
                                                { !state.editable ? '编辑' : '详情' }
                                            </Button>
                                            <Button
                                                onClick={ () => {
                                                    setState({
                                                        value: {

                                                        }
                                                    })
                                                } }
                                            >
                                                加载详情数据
                                            </Button>
                                            <Button
                                                onClick={ () => {
                                                    actions.validate();
                                                } }
                                            >
                                                手动触发校验
                                            </Button>
                                            <Reset>重置</Reset>
                                        </FormButtonGroup>
                                    </SchemaForm>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})


export default SelfForm
