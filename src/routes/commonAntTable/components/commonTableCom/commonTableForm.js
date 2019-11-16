import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import commonTableStore from '@/store/commonTableStore'
import '@/components/Uform_extends'
import { toJS } from 'mobx'
import { newformatDate} from '@/utils/tools'
import {
    SchemaForm,
    createFormActions,

} from '@uform/antd'

const actions = createFormActions()
let date=newformatDate(new Date())
const CommonTableForm = props => {
    let formCfg = toJS(props.formCfg)
    let layoutcfg=props.layoutcfg
    let formnum=[]
    let staticformcfg=toJS(props.staticformcfg)
    const [state, setState, value] = useState({ editable: props.editable })

    if (!formCfg) {
        return null
    }
    if(layoutcfg=='2'){
        require('../../commonTable.scss')
        formCfg.properties.group_all['x-component']='grid'
        formnum=Object.keys(formCfg.properties.group_all.properties)
        let cols=[]
        for(var i=0;i<formnum.length;i++){
            cols.push(12)
        }
        formCfg.properties.group_all['x-props'].title=''
        formCfg.properties.group_all['x-props'].cols=cols       
        formCfg.properties.group_all['x-props'].gutter=10
        // formCfg.properties.group_all['x-props'].labelCol=7
        // formCfg.properties.group_all['x-props'].wrapperCol=10
    }
    if (props.optionType == 'add' || props.optionType == 'edit') {
        return <div>
            {staticformcfg!=null?<div style={{marginBottom:'20px'}}><span style={{marginRight:'10px'}}>下单人:{localStorage.getItem('staff_name')}</span><span style={{marginRight:'10px'}}>下单时间:{date}</span><span style={{marginRight:'10px'}}>下单部门：{staticformcfg.departname}</span></div>:null}
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



                        for (let key in formCfg.properties.group_all.properties) {
                            let item = formCfg.properties.group_all.properties[key];

                            if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                setFieldState(key, state => {
                                    state.props["x-props"].commonTableStore = props.commonTableStore;
                                });
                            }
                        }

                        setFieldState('contractno', state => {
                            state.props["x-props"].selectedRow = props.commonTableStore.selectedRows[0];
                        });
                        setFieldState('contractno', state => {
                            state.props["x-props"].action_code = props.commonTableStore.action_code;
                        });                       
                    })

                    $("onFormInit").subscribe(() => {
                        setState({
                            value: props.optionType == 'edit'
                                ?
                                { ...props.commonTableStore.selectedRows[0] }
                                :
                                {}
                        })
                    });

                    $('onFormMount').subscribe(async () => {

                    })

                }
            }
            labelCol={layoutcfg=='2'?7:8}
            wrapperCol={layoutcfg=='2'?17:12}
        >

            <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                    let res = await actions.validate()
                    await props.saveFormData(actions.getFormState().values, props.onChange, props.as_virtual, props.optionType);
                    props.hideModal()
                }
                }>保存</Button>
            </div>
        </SchemaForm></div>
    }
}
export default CommonTableForm
