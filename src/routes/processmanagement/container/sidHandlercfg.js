import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'


import { Form, Input, Divider, Card, Select, Row, Radio, Col, Button, message, TextArea, } from 'antd';
import api from '../../../api/api'
import { observable, reaction, action, autorun, computed } from "mobx";

import { observer, inject } from "mobx-react";

import ReferTable from './referTable';
import ReferSql from './referSql';
import ReferService from './referService'
import ReferStatic from './referStatic'

const { Option } = Select;




@inject("pmStore")
@observer
class SideHandlercfg extends React.Component {


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




    addNodeHander = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                if (this.pmstore.current_processkey === '') {
                    message.error("请选择流程", 0.5)
                } else {
                    let obj = {}
                    let flowName = ''
                    this.pmstore.AllNodeName.map(item => {
                        if (item.id == values.flowsid) {
                            flowName = item.name

                        }
                    })
                    obj = Object.assign({ processkey: this.pmstore.current_processkey, flowName: flowName }, values);
                    let params = {
                        data: obj,
                        method: 'POST'
                    };

                    let res = api.bpm.addBossProcessNodeHandler(params)
                }
            } else {
                message.error("请检查输入项", 0.5)
            }
        });
    };



    render() {



        const { getFieldDecorator } = this.props.form;
        let xtitle = "设置节点处理函数:" + this.pmstore.current_processname


        let AllNodeName = this.pmstore.AllNodeName

        //flowactions ,动作,也就是按钮

        let flowactions = [
            { id: 'startProcess', 'text': '启动' },
            { id: 'nextStep', 'text': '下一步' },
            { id: 'withDraw', 'text': '撤回' },
            { id: 'returnToPrev', 'text': '退回上一步' },
            { id: 'returnToStart', 'text': '退回发起人' },
            { id: 'terminateProcess', 'text': '终止' },
            { id: 'ArchivingProcess', 'text': '归档' },
        ]

        return (
            <Card title={ xtitle } style={ { width: "100%" } }>

                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_process_node_handler"
                    is_association_process={ false }
                />

                <Form onSubmit={ this.addNodeHander }>
                    <Form.Item label="前置/后置">
                        { getFieldDecorator('handlertype', {
                            rules: [{ required: true, message: '选择类型' }],
                        })(
                            <Radio.Group>
                                <Radio value="pre">前置</Radio>
                                <Radio value="post">后置</Radio>
                            </Radio.Group>,
                        ) }
                    </Form.Item>


                    <Form.Item label="选择流程节点">
                        { getFieldDecorator('flowsid', {

                        })(
                            <Select
                                showSearch
                                style={ { width: 300 } }
                                placeholder="选择流程节点"
                                optionFilterProp="children"
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    AllNodeName.length && AllNodeName.map((item, index) => (
                                        <Option key={ index } value={ item.id }>{ item.name }</Option>)
                                    )
                                }
                            </Select>
                        ) }
                    </Form.Item>


                    <Form.Item label="选择动作">
                        { getFieldDecorator('flow_action', {
                            rules: [{ required: false, message: '选择动作' }],
                        })(
                            <Select
                                showSearch

                                style={ { width: 300 } }
                                placeholder="选择动作"
                                allowClear={ true }
                                name="action"
                                optionFilterProp="children"
                                filterOption={ (input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    flowactions.length && flowactions.map((item, index) => (
                                        <Option key={ index } value={ item.id }>{ item.text }</Option>)
                                    )
                                }
                            </Select>
                        ) }

                    </Form.Item>


                    <Form.Item
                        label="执行函数(model/method)"
                    >
                        { getFieldDecorator('handlerfunction', {
                            rules: [{ required: true, message: '执行函数(' }],
                        })(
                            <Input placeholder="执行函数"
                            />,
                        ) }
                    </Form.Item>
                    <Form.Item>
                        <Button style={ { padding: '0px 10px ' } } type="primary" htmlType="submit">
                            保存配置
                       </Button>
                    </Form.Item>
                </Form>
            </Card >
        );
    }
}

export default Form.create()(SideHandlercfg);
