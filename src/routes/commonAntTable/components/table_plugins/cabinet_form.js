import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import commonTableStore from '@/store/commonTableStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import '@/components/Uform_extends'
import { toJS } from 'mobx'
import ReferpluginCom from '../commonTableCom/referpluginCom.js'


import '../../commonTable.scss'
import {
    SchemaForm,
    createFormActions,

} from '@uform/antd'

const actions = createFormActions()

const Cabinet_form = props => {
    let formCfg = toJS(props.formCfg)
    let layoutcfg = props.layoutcfg
    let formnum = []
    let staticformcfg = toJS(props.staticformcfg)
    const [state, setState, value] = useState({ editable: props.editable })

    if (!formCfg) {
        return null
    }
    if (props.optionType == 'add' || props.optionType == 'edit') {

        return <div className={layoutcfg == 2 ? "addmodal" : layoutcfg == 3 ? 'addmodalt' : ''}>

            {props.referinfo.length > 0 && props.referinfo.map((item, key) =>
                <ReferpluginCom key={key} {...item} layoutcfg={layoutcfg} />
            )}

            <SchemaForm
                value={value}
                initialValues={state.value}
                actions={actions}
                editable={state.editable}
                schema={formCfg}
                effects={
                    ($, { setFieldState, getFieldState }) => {

                        const hide = name => {
                            setFieldState(name, state => {
                                state.visible = false
                            })
                        }

                        $('onFormInit').subscribe(async () => {
                            hide('id');
                            setState({
                                value: props.optionType == 'edit'
                                    ?
                                    { ...props.commonTableStore.selectedRows[0] }
                                    :
                                    {}
                            })
                            setFieldState('addcabinetpower', state => {
                                state.props.enum = props.cabinet_electricity
                            });
                            setFieldState('closecabinetpower', state => {
                                state.props.enum = props.cabinet_electricity
                            });
                            setFieldState('cabinetpower', state => {
                                state.props.enum = props.cabinet_electricity
                            });

                            for (let newkey in formCfg.properties.group_all.properties) {
                                let newitem = formCfg.properties.group_all.properties[newkey];

                                for (let key in newitem.properties) {
                                    let item = newitem.properties[key];

                                    if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                        setFieldState(key, state => {
                                            state.props["x-props"].commontablestore = props.commonTableStore;
                                            state.props["x-props"].schema = formCfg;
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'customer_phone') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'phone'
                                        });

                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'phone') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'phone'
                                        });

                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'contactPhone') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'phone'
                                        });

                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'customer_email') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'email'
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'email') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'email'
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'postcode') {
                                        setFieldState(key, state => {
                                            state.props['x-rules'] = 'zip'
                                        });
                                    }

                                }
                            }
                            setFieldState('contractno', state => {
                                state.props["x-props"].selectedRow = props.commonTableStore.selectedRows[0];
                            });
                            setFieldState('contractno', state => {
                                state.props["x-props"].action_code = props.commonTableStore.action_code;
                            });
                            setFieldState('contractno', state => {
                                state.props["x-props"].commonTableStore = props.commonTableStore;
                            });
                            setFieldState('customerid', state => {
                                state.props["x-props"].selectedRow = props.commonTableStore.selectedRows[0];
                            });
                            setFieldState('act_code', state => {
                                state.props["x-props"].action_code = props.dataGridcode;
                            });
                        })

                    }
                }
                labelCol={layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8}
                wrapperCol={layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15}
            >
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                        let res = await actions.validate()
                        await props.saveFormData(actions.getFormState().values, FlowApprovalStore.uuid, props.onChange, props.as_virtual, props.optionType);
                    }
                    }>保存</Button>
                </div>
            </SchemaForm></div>
    }
}
export default Cabinet_form
