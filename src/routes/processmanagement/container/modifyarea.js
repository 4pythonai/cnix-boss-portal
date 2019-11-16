import React from 'react'

import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'


import { Form, Input, Card, Select, Row, Col, Button, message, AutoComplete, } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
import { observable, reaction, action, autorun, computed } from "mobx";

const { Option } = Select;




@inject("pmStore")
@observer
class Modifyarea extends React.Component {


    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.tbref = React.createRef()

        this.pk_watcher = reaction(
            () => { return this.pmstore.current_processkey }, pk => {
                this.refreshCurrentcfg(pk)
            }
        )
    }


    state = {
        updateDirection: 'this',
        confirmDirty: false,
        autoCompleteResult: []
    };

    componentDidMount() {

        this.refreshCurrentcfg(this.pmstore.current_processkey)
    }


    componentWillUnmount() {
        this.pk_watcher()
    }


    async refreshCurrentcfg(pk) {

        let query_cfg = null
        if (pk.length > 0) {
            query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "processkey", operator_0: "=", vset_0: pk } }
        }
        await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
        await this.tbref.current.listData()
    }



    addModifyCfg = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                if (this.pmstore.current_processkey === '') {
                    message.error("请选择流程", 0.5)
                } else {

                    let obj = {}
                    obj = Object.assign({ maintable: this.pmstore.maintable, processkey: this.pmstore.current_processkey }, values);

                    let params = {
                        data: obj,
                        method: 'POST'
                    };
                    api.processmanager.addProcessModifyCfg(params)

                }

            } else {

                message.error("请检查输入项", 0.5)
            }
        });
    };


    onSelectDestTable = (v, f) => {
        this.pmstore.setRelatedtable(v)

        if (v === this.pmstore.maintable) {
            //说明是修改本表的某个字段
            this.pmstore.updateDirection = 'this'
        } else {
            this.pmstore.updateDirection = 'that'
        }


        this.props.form.setFieldsValue({
            'column_to_update': ''
        })
    };




    handleTitleChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        }
        this.setState({ autoCompleteResult });
    };

    render() {



        let biztables = this.pmstore.biztableList
        let filedTypes = this.pmstore.filedTypes
        let maintableColumns = this.pmstore.maintableColumns
        let relatedtableColumns = this.pmstore.relatedtableColumns

        let xtitle = "设置ModifyArea:" + this.pmstore.current_processname


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
            <Card title={ xtitle } style={ { width: "100%" } }>

                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_flow_modify_cfg"
                    is_association_process={ false }
                />


                <Form { ...formItemLayout } onSubmit={ this.addModifyCfg }>
                    <Form.Item label="修改表格">
                        { getFieldDecorator('desttable', {
                            rules: [{ required: true, message: '请选择表格' }],
                        })(
                            <Select
                                showSearch
                                style={ { width: 300 } }
                                placeholder="选择RefTable"
                                name="desttable"
                                optionFilterProp="children"
                                onChange={ v => this.onSelectDestTable(v, "desttable") }
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    biztables.length && biztables.map((item, index) => (
                                        <Option key={ index } value={ item.value }>{ item.text }</Option>)
                                    )
                                }
                            </Select>
                        ) }
                    </Form.Item>


                    <Form.Item label="字段">
                        { getFieldDecorator('column_to_update', {
                            rules: [{ required: true, message: '请选择字段' }],
                        })(
                            <Select
                                showSearch
                                style={ { width: 300 } }
                                placeholder="请选择字段"
                                allowClear={ true }
                                name="biztable"
                                optionFilterProp="children"
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    relatedtableColumns.length && relatedtableColumns.map((item, index) => (
                                        <Option key={ index } value={ item.Field }>{ item.Field }</Option>)
                                    )
                                }
                            </Select>
                        ) }
                    </Form.Item>




                    <Form.Item label="字段标题">
                        { getFieldDecorator('fieldtitle', {
                            rules: [{ required: true, message: '输入字段title' }],
                        })(
                            <AutoComplete
                                onChange={ this.handleTitleChange }
                                placeholder="标题"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>

                    <Form.Item label="字段类型(不包括插件)">
                        { getFieldDecorator('fieldtype', {
                            rules: [{ required: true, message: '请选择字段类型' }],
                        })(
                            <Select
                                showSearch
                                style={ { width: 300 } }
                                placeholder="字段类型"
                                name="fieldtype"
                                optionFilterProp="children"
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    filedTypes.length && filedTypes.map((item, index) => (
                                        <Option key={ index } value={ item }>{ item }</Option>)
                                    )
                                }
                            </Select>
                        ) }
                    </Form.Item>

                    <Form.Item
                        { ...formItemLayout }
                        label={ 'Where主表' }
                    >
                        <Row gutter={ 24 } style={ { width: 620 } }>
                            <Col span={ 12 }>
                                <Form.Item label="字段">
                                    { getFieldDecorator('maincolumn', {
                                        rules: [{ required: false, message: '请选择字段' }],
                                    })(
                                        <Select
                                            showSearch
                                            style={ { width: 300 } }
                                            placeholder="请选择字段"
                                            allowClear={ true }
                                            name="biztable"
                                            disabled={ this.pmstore.updateDirection == 'this' ? true : false }
                                            optionFilterProp="children"
                                            filterOption={ (input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                maintableColumns.length && maintableColumns.map((item, index) => (
                                                    <Option key={ index } value={ item.Field }>{ item.Field }</Option>)
                                                )
                                            }
                                        </Select>
                                    ) }
                                </Form.Item>

                            </Col>

                            <Col span={ 12 }>
                                <Form.Item label=" =从表字段">
                                    { getFieldDecorator('column_to_filter', {
                                        rules: [{ required: false, message: '请选择字段' }],
                                    })(
                                        <Select
                                            showSearch
                                            style={ { width: 300 } }
                                            placeholder="请选择字段"
                                            allowClear={ true }
                                            disabled={ this.pmstore.updateDirection == 'this' ? true : false }
                                            name="biztable"
                                            optionFilterProp="children"
                                            filterOption={ (input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                relatedtableColumns.length && relatedtableColumns.map((item, index) => (
                                                    <Option key={ index } value={ item.Field }>{ item.Field }</Option>)
                                                )
                                            }
                                        </Select>
                                    ) }
                                </Form.Item>
                            </Col>


                        </Row>
                    </Form.Item>
                    <Form.Item { ...formTailLayout }>
                        <Button style={ { padding: '0px 10px ' } } type="primary" htmlType="submit">
                            添加
                       </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(Modifyarea);
