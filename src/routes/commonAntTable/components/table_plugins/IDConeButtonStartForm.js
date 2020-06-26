
import React, { useState } from 'react'
import '@/components/Uform_extends'
import { toJS } from 'mobx'


import '../../commonTable.scss'
import {
    SchemaForm,
    createFormActions

} from '@uform/antd'
import candidateStore from '@/store/candidateStore'

import { inject, observer } from 'mobx-react'
@observer
export default class IDConeButtonStartForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            actions: createFormActions()
        }
        this.candidateStore = new candidateStore()
        this.getFlowMsg()

    }
    async getFlowMsg() {
        this.candidateStore.setUuid(this.props.uuid)
        this.candidateStore.setProcessDefinitionKey(this.props.processDefinitionKey)
        this.candidateStore.setInitNode('y');
        this.candidateStore.setFilterUserParams(this.props.getUserParams)
        await this.candidateStore.getFlowTactics()
    }

    componentDidMount() {
        this.props.registerForm(this.props.form_name, this)
    }

    // 父组件调用,获取表单的数据
    getJsonFormData = async () => {
        let inner_fmdata = await this.state.actions.submit();
        let values = inner_fmdata.values;

        let flow_data = {
            role: sessionStorage.getItem('role_code'),
            processDefinitionKey: this.props.processDefinitionKey,
            username: JSON.parse(sessionStorage.getItem('userInfo')).user,
        }

        values = {
            ...values,
            ...flow_data,
            contract_id: this.props.commonTableStore.selectedRows[0].id
        };
        return values
    }

    render() {
        let layoutcfg = this.props.layoutcfg

        if (!this.props.formCfg) {
            return null
        }

        return <div className={layoutcfg == 2 ? "addmodal" : layoutcfg == 3 ? 'addmodalt' : ''}>

            {this.props.referinfo.length > 0 && this.props.referinfo.map((item, key) =>
                <ReferpluginCom key={key} {...item} layoutcfg={layoutcfg} />
            )}

            <SchemaForm
                initialValues={this.props.initValue ? this.props.initValue : {}}
                actions={this.state.actions}
                schema={this.props.formCfg}
                effects={
                    ($, { setFieldState, getFieldState }) => {
                        // 机柜开通，机柜电量
                        setFieldState('addcabinetpower', state => {
                            state.props.enum = this.props.cabinet_electricity
                        });
                        // 机柜预占，机柜电量
                        setFieldState('cabinetpower', state => {
                            console.log('机柜预占电量', this.props.cabinet_electricity)
                            state.props.enum = this.props.cabinet_electricity
                        });


                        const hide = name => {
                            setFieldState(name, state => {
                                state.visible = false
                            })
                        }

                        $('onFieldChange', 'ischarging').subscribe(async (fieldState) => {

                            if (this.candidateStore.filterUserParams&&fieldState.value != this.candidateStore.filterUserParams.ischarging) {
                                setFieldState('candidate', state => {
                                    state.value = ''
                                });
                                this.candidateStore.clearCheckedKeys()
                                this.candidateStore.setFilterUserParams({ ischarging: fieldState.value })
                                await this.candidateStore.getFlowTactics('change')
                            }

                        })



                        $('onFormInit').subscribe(async () => {
                            hide('id');

                            // 候选人处理
                            setFieldState('candidate', state => {
                                state.props['x-props'] = {
                                    candidateStore: this.candidateStore
                                }
                            });

                            for (let newkey in this.props.formCfg.properties.group_all.properties) {
                                let newitem = this.props.formCfg.properties.group_all.properties[newkey];

                                for (let key in newitem.properties) {
                                    let item = newitem.properties[key];

                                    if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                        setFieldState(key, state => {
                                            state.props["x-props"].commontablestore = this.props.commonTableStore;
                                            state.props["x-props"].schema = this.props.formCfg;
                                        });
                                    }
                                    if((item.default==""||item.default==null)&&item['x-props']&&item['x-props'].editable==false){
                                        item.default=" "
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
                        })


                    }
                }
                labelCol={layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8}
                wrapperCol={layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15}
            >
            </SchemaForm>
        </div>
    }
}

