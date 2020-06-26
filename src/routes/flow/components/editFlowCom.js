import React from 'react'
import { SchemaForm, Field } from '@uform/antd'
import { observer, inject } from "mobx-react";
import api from '../../../api/api'

export default class EditFlowCom extends React.Component {
    render() {
        return <div className="resource">
        
        <SchemaForm
            effects={($, { setFieldState, getFieldState }) => {
                $('onFormInit').subscribe(() => {
                    hide('id');
                })
                const hide = name => {
                    setFieldState(name, state => {
                        state.visible = false
                    })
                }
            }}
            editable={true}
            labelCol={6}
            wrapperCol={12}
        />

        </div>
    }
}