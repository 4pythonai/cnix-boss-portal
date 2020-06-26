import React from 'react'
import { Form, Input, Select, Button, message, AutoComplete, Radio } from 'antd';
import api from '@/api/api'
import { observer, inject } from "mobx-react";
const { Option } = Select;

@inject("dmStore")
@observer
class ButtonCfgForm extends React.Component {
    constructor(props) {
        super(props)
        this.dmstore = props.dmstore
    }


    //添加按钮

    addActionButton = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {

                if (this.dmstore.current_actcode === '') {
                    message.error("请选择ActionCode", 0.5)
                } else {

                    let obj = {}
                    console.log(this.dmstore)

                    obj = Object.assign({ act_code: this.dmstore.current_actcode }, values);

                    let params = {
                        data: obj,
                        method: 'POST'
                    };

                    if (!this.dmstore.current_actcode) {
                        message.error("请选择ActionCode", 0.5)
                        return;
                    }
                    console.log(params)
                    let ret = await api.activity.addActionButton(params)
                    message.info(ret.message)

                }

            } else {
                message.error("请检查输入项", 0.5)
            }
        });
    };





    render() {
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
                <Form { ...formItemLayout } onSubmit={ this.addActionButton }>
                    <Form.Item label="按钮标题">
                        { getFieldDecorator('title', {
                            rules: [{ required: true, message: '输入按钮标题' }],
                        })(
                            <AutoComplete
                                placeholder="标题"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>
                    <Form.Item label="按钮风格">
                        { getFieldDecorator('ui_type', {
                            rules: [{ required: true, message: '按钮风格' }],
                        })(

                            <Radio.Group>
                                <Radio value="primary">primary</Radio>
                                <Radio value="danger">danger</Radio>
                            </Radio.Group>

                        ) }
                    </Form.Item>

                    <Form.Item label="是否自定义组件">
                        { getFieldDecorator('using_component', {
                            rules: [{ required: true, message: '是否自定义组件' }],
                        })(

                            <Radio.Group onChange={ this.handleUsingComponentChange }>
                                <Radio value="y">yes</Radio>
                                <Radio value="n">no</Radio>
                            </Radio.Group>

                        ) }
                    </Form.Item>

                    <Form.Item label="组件名称">
                        { getFieldDecorator('component_name', {
                            rules: [{ required: false, message: '组件名称' }],
                        })(
                            <AutoComplete
                                placeholder="组件名称"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>

                    <Form.Item label="是否标准按钮">
                        { getFieldDecorator('is_standard', {
                            rules: [{ required: true, message: '是否标准按钮' }],
                        })(

                            <Radio.Group onChange={ this.handleIsStandardChange }>

                                <Radio value="y">yes</Radio>
                                <Radio value="n">no</Radio>
                            </Radio.Group>

                        ) }
                    </Form.Item>

                    <Form.Item label="入口函数" hasFeedback>
                        { getFieldDecorator('btn_handler', {
                            rules: [{ required: false, message: '选额入口函数' }],
                        })(
                            <Select style={ { width: '60%' } } >
                                <Option value="addData">addData</Option>
                                <Option value="editData">editData</Option>
                                <Option value="deleteData">deleteData</Option>
                                <Option value="refreshTable">refreshTable</Option>
                                <Option value="viewProcess">viewProcess</Option>
                                <Option value="BpmProcess">BpmProcess</Option>
                                <Option value="BpmStart">BpmStart</Option>

                            </Select>,
                        ) }
                    </Form.Item>

                    <Form.Item { ...formTailLayout }>
                        <Button style={ { padding: '0px 10px' } } type="primary" htmlType="submit">
                            添加
                       </Button>
                    </Form.Item>
                </Form>
        );
    }
}
export default Form.create()(ButtonCfgForm);