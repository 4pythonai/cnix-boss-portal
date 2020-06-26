import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Button, message, AutoComplete, Radio } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
import { observable, reaction, action, autorun, computed } from "mobx";

const { Option } = Select;

@inject("dmStore")
@observer
class ButtonCfg extends React.Component {
    constructor(props) {
        super(props)
        this.dmstore = props.dmStore
        this.tbref = React.createRef()
        this.actcode_watcher = reaction(
            () => { return this.dmstore.current_actcode }, currcode => {
                this.refreshCurrentcfg(currcode)
            }
        )
    }



    componentDidMount() {
        if (this.dmstore.current_actcode) {
            this.refreshCurrentcfg(this.dmstore.current_actcode)
        }
        this.refreshCurrentcfg(this.dmstore.current_actcode)
    }


    componentWillUnmount() {
        this.actcode_watcher()  //dispose actcode_watcher
    }

    async refreshCurrentcfg(current_actcode) {

        if (this.tbref.current) {
            let query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "act_code", operator_0: "=", vset_0: current_actcode } }
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
            await this.tbref.current.listData()
        }
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

        // let xtitle = "设置按钮:" + this.dmstore.current_actcode + "/" + this.dmstore.current_actname
        let xtitle = "设置按钮:" + this.dmstore.current_actcode + "/" + this.dmstore.current_actname

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
                    action_code="boss_portal_button_actcode"
                    is_association_process={ false }
                    dataGridcode={this.dmstore.current_actcode}

                />
            </Card>
        );
    }
}


export default Form.create()(ButtonCfg);