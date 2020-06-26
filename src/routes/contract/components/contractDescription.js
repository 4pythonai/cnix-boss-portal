import React from 'react'
import { Input } from 'antd';


export default class ContractDescription extends React.Component {

    render() {
        let { disabled, formData, setFieldsValue } = this.props
        return (

            <div>

                <section className="contractFormGroup">
                    <label  style={ { color: 'red' } }  className="label  contractFormInfo">* 领导定夺条款:</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input.TextArea
                                required={true}
                                disabled={ disabled } pleaceholder="输入市场部领导定夺条款" type="text"
                                value={ formData.marketing_department_leader_clause || '' }
                                onChange={ event => setFieldsValue('marketing_department_leader_clause', event.target.value) } />

                        </label>
                    </div>

                </section>


                <section className="contractFormGroup">
                    <label className="label contractFormInfo">机柜需求：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input.TextArea
                                disabled={ disabled } pleaceholder="输入机柜需求" type="text"
                                value={ formData.cabinet_description || '' }
                                onChange={ event => setFieldsValue('cabinet_description', event.target.value) } />

                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">网络需求：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input.TextArea
                                disabled={ disabled } pleaceholder="输入网络需求" type="text"
                                value={ formData.bandwidth_description || '' }
                                onChange={ event => setFieldsValue('bandwidth_description', event.target.value) } />

                        </label>
                    </div>

                </section>

                <section className="contractFormGroup">
                    <label className="label contractFormInfo">线路需求：</label>
                    <div className="contractFormValue">
                        <label className="input">
                            <i className="icon-prepend fa fa-question-circle" />
                            <Input.TextArea
                                disabled={ disabled } pleaceholder="输入线路需求" type="text"
                                value={ formData.isp_description || '' }
                                onChange={ event => setFieldsValue('isp_description', event.target.value) } />

                        </label>
                    </div>

                </section>
            </div>
        )
    }
}



