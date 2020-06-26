import React from 'react'
import { Form, Input, Divider, Card, Select, Row, Col, Button, message } from 'antd';
import api from '../../../api/api'
import { observable, action, autorun, computed } from "mobx";
import Editor from '@/components/Uform_extends/wangeditor'

import { observer, inject } from "mobx-react";
const { TextArea } = Input;

const { Option } = Select;

@inject("pmStore")
@observer
class ReferStatic extends React.Component {
    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
    }

    addStaticCfg = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {

                if (this.pmstore.current_processkey === '') {
                    message.error("请选择流程", 0.5)
                } else {

                    let obj = {}
                    obj = Object.assign({ 'reftype': 'static', maintable: this.pmstore.maintable, processkey: this.pmstore.current_processkey }, values);

                    let params = {
                        data: obj,
                        method: 'POST'
                    };
                    await api.processmanager.addReferCfg(params)
                    if (this.props.tbref.current) {
                        let query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "processkey", operator_0: "=", vset_0: this.pmstore.current_processkey } }
                        this.props.tbref.current.setTableCompomentQueryCfg(query_cfg)
                    }
                }
            } else {
                message.error("请检查输入项", 0.5)
            }
        });
    };



    render() {


        let maintableColumns = this.pmstore.maintableColumns
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };



        return (


            <div>


                <Form { ...formItemLayout } onSubmit={ this.addStaticCfg }>

                    <Form.Item
                        { ...formItemLayout }
                        label="静态文本"
                    >



                        { getFieldDecorator('statictext', {
                            rules: [{ required: true, message: 'Please input 静态文本' }],
                        })(


                            <Editor
                                key='statictext'
                                placeholder="statictext"
                            ></Editor>
                        ) }



                    </Form.Item>


                    <Form.Item { ...formTailLayout }>
                        <Button style={ { padding: '0px 10px ' } } type="primary" htmlType="submit">
                            添加静态文本
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export default Form.create()(ReferStatic);
