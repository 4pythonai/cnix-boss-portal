import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Divider, Button, Radio, message, Row, Col, Checkbox } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
const { Option } = Select;
@inject("dmStore")

@observer
class Fieldmanager extends React.Component {
    constructor(props) {
        super(props)
        this.dmstore = props.dmStore
    }



    saveCfg(field_cfg) {
        this.dmstore.saveFieldCfg(field_cfg)
    };


    changeCfg_input = function(a, attr, field) {
        let value = event.target.value;
        this.dmstore.setFieldAttr(field, attr, value)
    }



    changeCfg_cbx = function(a, attr, field) {
        let value = event.target.checked;
        this.dmstore.setFieldAttr(field, attr, value)
    }


    changeCfg_dropdown = function(v, attr, field) {


        console.log(v, attr, field)
        if (v == undefined) {
            v = ''
        }
        this.dmstore.setFieldAttr(field, attr, v)
    }


    render() {
        let xtitle = "字段管理:" + this.dmstore.current_actname + "/" + this.dmstore.current_actcode
        let allcols = this.dmstore.maintableColumns;

        return (
            <Card title={ xtitle } style={ { width: "1500px" } }>
                <Row>
                    <Col span={ 2 }>字段</Col>
                    <Col span={ 3 }>Label</Col>
                    <Col span={ 2 }>grouptitle</Col>
                    <Col span={ 3 }>插件 </Col>
                    <Col span={ 2 }>参数 </Col>
                    <Col span={ 2 }>tableX隐藏/可见 </Col>
                    <Col span={ 2 }>form隐藏/可见 </Col>
                    <Col span={ 3 }>form只读/可编辑 </Col>
                    <Col span={ 3 }>数据字典 </Col>
                    <Col span={ 1 }> 操作</Col>
                </Row>
                <Divider />


                { allcols.map((col, idx) =>
                    <div key={ idx } >
                        <Row key={ idx }>
                            <Col span={ 2 }>{ col.Comment.length == 0 ? col.Field : col.Field + '/' + col.Comment } </Col>
                            <Col span={ 3 }>
                                <Input disabled={ col.Field == 'id' } defaultValue={ col.label } onChange={ (e) => { this.changeCfg_input(e, 'label', col.Field) } } />
                            </Col>
                            <Col span={ 2 }>
                                <Input defaultValue={ col.grouptitle } onChange={ (e) => { this.changeCfg_input(e, 'grouptitle', col.Field) } } />
                            </Col>
                            <Col span={ 3 }>
                                <Select
                                    defaultValue={ col.pluginname }
                                    key={ col.pluginname }
                                    onChange={ (e) => { this.changeCfg_dropdown(e, 'pluginname', col.Field) } }
                                    disabled={ col.Field == 'id' }
                                    style={ { width: 140, marginLeft: 5 } }
                                    placeholder="UForm字段类型"
                                    name="plugin"
                                >
                                    {
                                        this.dmstore.plugins.length && this.dmstore.plugins.map((item, index) => (
                                            <Option key={ index } value={ item.plugid }>{ item.plugname }</Option>)
                                        )
                                    }
                                </Select>

                            </Col>
                            <Col span={ 2 }>
                                <Input disabled={ col.Field == 'id' } defaultValue={ col.uform_para } onChange={ (e) => { this.changeCfg_input(e, 'uform_para', col.Field) } } />
                            </Col>
                            <Col span={ 2 } style={ { marginLeft: '10px' } }>
                                <Checkbox checked={ col.column_hidden } onChange={ (e) => { this.changeCfg_cbx(e, 'column_hidden', col.Field) } }>隐藏</Checkbox>
                            </Col>
                            <Col span={ 2 } style={ { marginLeft: '10px' } }>
                                <Checkbox checked={ col.form_hidden } onChange={ (e) => { this.changeCfg_cbx(e, 'form_hidden', col.Field) } }>隐藏</Checkbox>
                            </Col>
                            <Col span={ 3 }>
                                <Checkbox checked={ col.readonly } disabled={ col.Field == 'id' } onChange={ (e) => { this.changeCfg_cbx(e, 'readonly', col.Field) } }>只读</Checkbox>
                            </Col>
                            <Col span={ 3 }>
                                <Select
                                    defaultValue={ col.category }
                                    onChange={ (e) => { this.changeCfg_dropdown(e, 'category', col.Field) } }
                                    showSearch
                                    allowClear
                                    disabled={ col.Field == 'id' }
                                    style={ { width: 140, marginLeft: 5 } }
                                    placeholder="字典表"
                                    name="category"
                                >
                                    {
                                        this.dmstore.Categories.length && this.dmstore.Categories.map((item, index) => (
                                            <Option key={ index } value={ item.catid }>{ item.catname }</Option>)
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={ 1 }>
                                <Button type="primary" key={ idx } onClick={ this.saveCfg.bind(this, col.Field) }>
                                    保存
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                    </div>
                )

                }
            </Card>
        );
    }
}
export default Form.create()(Fieldmanager);