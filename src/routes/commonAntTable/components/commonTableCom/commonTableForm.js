import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import commonTableStore from '@/store/commonTableStore'
import '@/components/Uform_extends'
import { toJS } from 'mobx'
import '../../commonTable.scss'
import {
    SchemaForm,
    createFormActions,

} from '@uform/antd'

const actions = createFormActions()

const CommonTableForm = props => {

    let formCfg = toJS(props.formCfg)
    let layoutcfg = props.layoutcfg
    let formnum = []
    const [state, setState, value] = useState({ editable: props.editable })

    if (!formCfg) {
        return null
    }
    if (layoutcfg == '2') {
        formCfg.properties.group_all['x-component'] = 'grid'
        formnum = Object.keys(formCfg.properties.group_all.properties)
        let cols = []
        for (var i = 0; i < formnum.length; i++) {
            cols.push(12)
        }
        formCfg.properties.group_all['x-props'].title = ''
        formCfg.properties.group_all['x-props'].cols = cols
        formCfg.properties.group_all['x-props'].gutter = 10

    }
    if (props.optionType == 'add' || props.optionType == 'edit') {
         

        return <div className={ layoutcfg == 2 ? "addmodal" : layoutcfg == 3 ? 'addmodalt' : '' }>

             

            <SchemaForm
                value={ value }
                initialValues={ state.value }
                actions={ actions }
                editable={ state.editable }
                schema={ formCfg }
                effects={
                    ($, { setFieldState, getFieldState }) => {

                        const hide = name => {
                            setFieldState(name, state => {
                                state.visible = false
                            })
                        }

                        $('onFormInit').subscribe(async () => {
                            hide('id');
                            hide('transactid');
                            setState({
                                value: props.optionType == 'edit'
                                    ?
                                    { ...props.commonTableStore.selectedRows[0] }
                                    :
                                    {}
                            })

                            for (let newkey in formCfg.properties.group_all.properties) {
                                let newitem = formCfg.properties.group_all.properties[newkey];

                                for (let key in newitem.properties) {
                                    let item = newitem.properties[key];

                                    setFieldState(key, state => {
                                        state.props["x-props"].commontablestore = props.commonTableStore;
                                        state.props["x-props"].action_code = props.dataGridcode;
                                        state.props["x-props"].actions = actions;
                                        state.props["x-props"].schema = formCfg;
                                    });
                                }
                            }
                        })
                    }
                }
                labelCol={ layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8 }
                wrapperCol={ layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15 }
            >
                <div style={ { textAlign: 'center' } }>
                    <Button type="primary" htmlType="button" className="marginRihgt10" onClick={ async event => {
                        let res = await actions.validate()
                        await props.saveFormData(actions.getFormState().values,  '', props.onChange, props.as_virtual, props.optionType);
                        props.hideModal()
                    }
                    }>保存</Button>
                </div>
            </SchemaForm></div>
    }
}
export default CommonTableForm
