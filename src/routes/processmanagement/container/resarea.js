import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Button, message, AutoComplete, } from 'antd';
import api from '../../../api/api'
import { observable, reaction, action, autorun, computed } from "mobx";
import { observer, inject } from "mobx-react";

const { Option } = Select;

@inject("pmStore")
@observer
class Resarea extends React.Component {
    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.xref = React.createRef()
        this.tbref = React.createRef()

        this.pk_watcher = reaction(
            () => { return this.pmstore.current_processkey }, pk => {
                this.refreshCurrentcfg(pk)
            }
        )
    }

    state = {

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


    addAddItemCfg = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                if (this.pmstore.current_processkey === '') {
                    message.error("请选择流程", 0.5)
                } else {

                    let obj = {}
                    obj = Object.assign({ processkey: this.pmstore.current_processkey }, values);

                    let params = {
                        data: obj,
                        method: 'POST'
                    };
                    api.processmanager.addProcessResCfg(params)
                }

            } else {
                message.error("请检查输入项", 0.5)
            }
        });
    };




    render() {
        let plugins = this.pmstore.plugins
        let xtitle = "设置网络资源操作区:" + this.pmstore.current_processname


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
                    action_code="boss_flow_res_cfg"
                    is_association_process={ false }
                />


                <Form { ...formItemLayout } onSubmit={ this.addAddItemCfg }>
                    <Form.Item label="字段ID(全英文)">
                        { getFieldDecorator('fieldid', {
                            rules: [{ required: true, message: '输入字段字段ID' }],
                        })(
                            <AutoComplete
                                placeholder="字段ID"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>


                    <Form.Item label="字段标题">
                        { getFieldDecorator('fieldtitle', {
                            rules: [{ required: true, message: '输入字段title' }],
                        })(
                            <AutoComplete
                                placeholder="标题"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>

                    <Form.Item label="UForm字段类型">
                        { getFieldDecorator('uformid', {
                            rules: [{ required: true, message: '请选择字段类型' }],
                        })(
                            <Select
                                showSearch
                                style={ { width: 300 } }
                                placeholder="UForm字段类型"
                                name="uformid"
                                optionFilterProp="children"
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    plugins.length && plugins.map((item, index) => (
                                        <Option key={ index } value={ item.plugid }>{ item.plugname }</Option>)
                                    )
                                }
                            </Select>
                        ) }
                    </Form.Item>


                    <Form.Item label="插件参数(如果需要)">
                        { getFieldDecorator('plugpara', {
                            rules: [{ required: false }],
                        })(
                            <AutoComplete
                                placeholder="plugpara"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
                    </Form.Item>

                    <Form.Item label="备注">
                        { getFieldDecorator('memo', {
                            rules: [{ required: true, message: '备注' }],
                        })(
                            <AutoComplete
                                placeholder="标题"
                            >
                                <Input style={ { width: '60%' } } />
                            </AutoComplete>,
                        ) }
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

export default Form.create()(Resarea);