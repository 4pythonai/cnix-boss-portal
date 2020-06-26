
import React from 'react'
import { message } from 'antd';
import { hashHistory } from 'react-router'
import '@/components/Uform_extends'
import api from '@/api/api'
import {
    SchemaForm,
    createFormActions,
    FormButtonGroup,
    Submit,
    Reset,

} from '@uform/antd'
export default class UpdateSalesProgessForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(3456, props)
        this.state = {
            actions: createFormActions(),
            step: "",
            formCfg: {
                'type': "object",
                'properties': {
                    "UFORM_NO_NAME_FIELD_$0": {
                        'type': "object",
                        'properties': {
                            'salesStep': {
                                'title': "销售阶段",
                                'type': "YnSelect",
                                "x-component": "YnSelect",
                                'required': true,

                            },
                            'note': {
                                'title': "备注",
                                'type': "string",
                                'required': true,
                                "x-component": "textarea"
                            }
                        }
                    }
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formCfg: {
                'type': "object",
                'properties': {
                    "UFORM_NO_NAME_FIELD_$0": {
                        'type': "object",
                        'properties': {
                            'salesStep': {
                                'title': "销售阶段",
                                'type': "YnSelect",
                                "x-component": "YnSelect",
                                'required': true,
                                'x-props': {
                                    'step': nextProps.step
                                }

                            },
                            'remark': {
                                'title': "备注",
                                'type': "string",
                                'required': true,
                                "x-component": "textarea"
                            }
                        }
                    }
                }
            }
        })
    }


    async saveHandler(e) {
        let obj = e.UFORM_NO_NAME_FIELD_$0
        obj.id = this.props.id
        
        await this.state.actions.validate()

        let params = { data: obj, method: 'POST' };
        let res = await api.activityRecord.addWechatSalesChanceChanceProgess(params);
        if (res.code == 200) {
            this.props.getStepList()
            return;
        }
        message.error(res.msg)
    }



    render() {
        return <div style={{ width: "500px" }}>
            <SchemaForm
                actions={this.state.actions}
                onSubmit={e => this.saveHandler(e)}
                schema={this.state.formCfg}
                effects={
                    ($, { setFieldState, getFieldState }) => {

                    }
                }
                labelCol={6}
                wrapperCol={18}
            >
                <FormButtonGroup offset={7} sticky>
                    <Submit />
                    <Reset />
                </FormButtonGroup>
            </SchemaForm>
        </div>
    }
}




