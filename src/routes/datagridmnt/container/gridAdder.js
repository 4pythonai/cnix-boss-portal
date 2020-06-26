import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Row, Col, Input, Card, Select, Button, message, AutoComplete,Switch  } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";


const { Option } = Select;

@inject("dmStore")
@observer
class GridAdder extends React.Component {
    constructor(props) {
        super(props)
        this.dmstore = props.dmStore
    }

    state = {

        confirmDirty: false,
        autoCompleteResult: []
    };

    componentDidUpdate() {

    }


    dropdown(e) {
        console.log('dropdown.....')
        console.log(e)
    }




    addActionCode = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {

                values.portaluse = 'y'
                values.multiple = values.multiple == true ? 'y' : 'n';
                let params = {
                    data: values,
                    method: 'POST'
                };
                console.log(values)
                let ret = await api.activity.addActionCode(params)

                if (ret.code == 200) {
                    this.dmstore.initAll()
                }

            } else {
                message.error("请检查输入项", 0.5)
            }
        });
    };




    render() {

        let xtitle = "添加ActionCode"
        let biztables = this.dmstore.biztableList
        const { getFieldDecorator } = this.props.form;


        return (
            <Card title={xtitle} style={{ width: "100%" }}>
                <Form onSubmit={this.addActionCode} >
                    <Row>
                        <Col span={4}> <Form.Item label="ActionCode">
                            {getFieldDecorator('activity_code', {
                                rules: [{ required: true, message: 'ActionCode' }],
                            })(
                                <AutoComplete
                                    placeholder="ActionCode"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item></Col>
                        <Col span={4}><Form.Item label="标题">
                            {getFieldDecorator('grid_title', {
                                rules: [{ required: true, message: '输入标题' }],
                            })(
                                <AutoComplete
                                    placeholder="标题"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item></Col>
                        <Col span={4}><Form.Item label="基础表格">
                            {getFieldDecorator('base_table', {
                                rules: [{ required: true, message: '选择基表' }],
                            })(
                                <Select
                                    showSearch
                                    placeholder="选择基表"
                                >

                                    {
                                        biztables.length && biztables.map((item, index) => (
                                            <Option key={index} value={item.value}>{item.value}</Option>)
                                        )
                                    }
                                </Select>,
                            )}
                        </Form.Item></Col>
                        <Col span={4}><Form.Item label="宽度">
                            {getFieldDecorator('win_size_width', {
                                rules: [{ required: true, message: '宽度' }],
                            })(
                                <AutoComplete
                                    placeholder="win_size_width"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item></Col>

                        <Col span={4}>
                            <Form.Item label="多选">
                                {getFieldDecorator('multiple', {
<<<<<<< HEAD
                                    valuePropName: 'checked',
=======
                                    valuePropName: 'y',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                    rules: [{ required: true, message: '多选' }],
                                })(<Switch style={{ marginLeft: '10px' }}  checkedChildren="y" unCheckedChildren="n"/>)}
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={4}><Form.Item label="getterurl">
                            {getFieldDecorator('geturl', {
                                rules: [{ required: true, message: 'geturl' }],
                                initialValue: 'curd/listData',
                            })(
                                <AutoComplete
                                    placeholder="geturl"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item> </Col>
                        <Col span={4}><Form.Item label="_addurl">
                            {getFieldDecorator('addurl', {
                                rules: [{ required: true, message: 'addurl' }],
                                initialValue: 'curd/addData',
                            })(
                                <AutoComplete
                                    placeholder="addurl"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item></Col>
                        <Col span={4}><Form.Item label="_delurl">
                            {getFieldDecorator('delurl', {
                                rules: [{ required: true, message: 'delurl' }],
                                initialValue: 'curd/deleteData',
                            })(
                                <AutoComplete
                                    placeholder="delurl"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item> </Col>
                        <Col span={4}> <Form.Item label="_updateurl">
                            {getFieldDecorator('updateurl', {
                                rules: [{ required: true, message: 'updateurl' }],
                                initialValue: 'curd/updateData',
                            })(
                                <AutoComplete
                                    placeholder="updateurl"
                                >
                                    <Input />
                                </AutoComplete>,
                            )}
                        </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" style={{ padding: '0px 10px ' }} htmlType="submit">
                            添加
                       </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(GridAdder);