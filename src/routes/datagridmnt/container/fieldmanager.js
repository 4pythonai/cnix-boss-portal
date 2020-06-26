import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Divider, Button, Radio, message, Row, Col, Checkbox } from 'antd';
import api from '../../../api/api'
<<<<<<< HEAD
import { toJS } from 'mobx'
import { observer, inject } from "mobx-react";

const { Option } = Select;
@inject("dmStore")
=======
import { observer, inject } from "mobx-react";
const { Option } = Select;
@inject("dmStore")

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
@observer
class Fieldmanager extends React.Component {
    constructor(props) {
        super(props)
<<<<<<< HEAD
=======
        this.dmstore = props.dmStore
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }



    saveCfg(field_cfg) {
<<<<<<< HEAD
        this.props.saveFieldCfg(field_cfg)
    };


    changeCfg_input = function (a, attr, field) {
        let value = event.target.value;
        this.setFieldAttr(field, attr, value)
=======
        this.dmstore.saveFieldCfg(field_cfg)
    };


    changeCfg_input = function(a, attr, field) {
        let value = event.target.value;
        this.dmstore.setFieldAttr(field, attr, value)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }



<<<<<<< HEAD
    changeCfg_cbx = function (event, attr, field) {
        console.log(event, attr, field);
        let value = event.target.checked;
        this.setFieldAttr(field, attr, value)
    }


    changeCfg_dropdown = function (v, attr, field) {


        if (v == undefined) {
            v = ''
        }
        this.setFieldAttr(field, attr, v)
    }


    changeVisible = (key, e) => {

        let { maintableColumns } = this.props
        maintableColumns.map((item, index) => {
            item[key] = e.target.checked
            return item
        })
        console.log(key, e.target.checked, this.props.maintableColumns)
        this.props.setMaintableColumns(maintableColumns)
    }

    setFieldAttr = (field, attr, value) => {
        let { maintableColumns } = this.props
        maintableColumns.map((element, idx) => {
            if (element.Field === field) {
                element[attr] = value
            }
        });
        this.props.setMaintableColumns(maintableColumns)
=======
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
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }


    render() {
<<<<<<< HEAD
        let xtitle = "字段管理:" + this.props.current_actname + "/" + this.props.current_actcode
        let allcols = this.props.maintableColumns;
        console.log("当前Code= " + this.props.current_actcode + " 所有字段:")
        console.log(toJS(allcols))


        return (
            <Card title={xtitle}>
                <Row>
                    <Col span={2}>字段</Col>
                    <Col span={2}>Label</Col>
                    <Col span={2}>grouptitle</Col>
                    <Col span={3}>插件 </Col>
                    <Col span={2}>参数 </Col>
                    <Col span={2}>tableX隐藏/可见 </Col>
                    <Col span={2}>form隐藏/可见 </Col>
                    <Col span={2}>form只读/可编辑 </Col>
                    <Col span={1}>宽度</Col>
                    <Col span={2}>处理函数</Col>
                    <Col span={2}>数据字典 </Col>
                    <Col span={1}> 操作</Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={2}></Col>
                    <Col span={2}></Col>
                    <Col span={3}> </Col>
                    <Col span={2}> </Col>
                    <Col span={2}><Checkbox onChange={event => this.changeVisible('column_hidden', event)} > 全选</Checkbox> </Col>
                    <Col span={2}><Checkbox onChange={event => this.changeVisible('form_hidden', event)} > 全选</Checkbox> </Col>
                    <Col span={2}><Checkbox onChange={event => this.changeVisible('readonly', event)} > 全选</Checkbox> </Col>
                    <Col span={1}></Col>
                    <Col span={2}></Col>
                    <Col span={2}> </Col>
                    <Col span={1}>
                        <Button type="primary" htmlType="button" onClick={event => this.props.batchUpdateFieldCfg()}>保存</Button>
                    </Col>
=======
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
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                </Row>
                <Divider />


<<<<<<< HEAD
                {allcols.map((col, idx) =>
                    <div key={idx} >
                        <Row>
                            <Col span={2}>{col.Comment.length == 0 ? col.Field : col.Field + '/' + col.Comment} </Col>
                            <Col span={2}>
                                <Input value={col.label} onChange={(e) => { this.changeCfg_input(e, 'label', col.Field) }} />
                            </Col>
                            <Col span={2}>
                                <Input value={col.grouptitle} onChange={(e) => { this.changeCfg_input(e, 'grouptitle', col.Field) }} />
                            </Col>
                            <Col span={3}>
                                <Select
                                    value={col.pluginname}
                                    key={col.pluginname}
                                    onChange={(e) => { this.changeCfg_dropdown(e, 'pluginname', col.Field) }}
                                    disabled={col.Field == 'id'}
                                    style={{ width: 140, marginLeft: 5 }}
=======
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
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                    placeholder="UForm字段类型"
                                    name="plugin"
                                >
                                    {
<<<<<<< HEAD
                                        this.props.plugins.length && this.props.plugins.map((item, index) => (
                                            <Option key={index} value={item.plugid}>{item.plugname}</Option>)
=======
                                        this.dmstore.plugins.length && this.dmstore.plugins.map((item, index) => (
                                            <Option key={ index } value={ item.plugid }>{ item.plugname }</Option>)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                        )
                                    }
                                </Select>

                            </Col>
<<<<<<< HEAD
                            <Col span={2}>
                                <Input disabled={col.Field == 'id'} value={col.uform_para} onChange={(e) => { this.changeCfg_input(e, 'uform_para', col.Field) }} />
                            </Col>
                            <Col span={2} style={{ marginLeft: '10px' }}>
                                <Checkbox checked={col.column_hidden} onChange={(e) => { this.changeCfg_cbx(e, 'column_hidden', col.Field) }}>隐藏</Checkbox>
                            </Col>
                            <Col span={2} style={{ marginLeft: '10px' }}>
                                <Checkbox checked={col.form_hidden} onChange={(e) => { this.changeCfg_cbx(e, 'form_hidden', col.Field) }}>隐藏</Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox checked={col.readonly} onChange={(e) => { this.changeCfg_cbx(e, 'readonly', col.Field) }}>只读</Checkbox>
                            </Col>
                            <Col span={1}>
                                <Input disabled={col.Field == 'id'} value={col.width} onChange={(e) => { this.changeCfg_input(e, 'width', col.Field) }} />
                            </Col>
                            <Col span={2} style={{ marginLeft: '3px' }}>
                                <Input disabled={col.Field == 'id'} value={col.handler} onChange={(e) => { this.changeCfg_input(e, 'handler', col.Field) }} />
                            </Col>
                            <Col span={2}>
                                <Select
                                    value={col.category}
                                    onChange={(e) => { this.changeCfg_dropdown(e, 'category', col.Field) }}
                                    showSearch
                                    allowClear
                                    disabled={col.Field == 'id'}
                                    style={{ width: 140, marginLeft: 5 }}
=======
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
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                    placeholder="字典表"
                                    name="category"
                                >
                                    {
<<<<<<< HEAD
                                        this.props.Categories.length && this.props.Categories.map((item, index) => (
                                            <Option key={index} value={item.catid}>{item.catname}</Option>)
=======
                                        this.dmstore.Categories.length && this.dmstore.Categories.map((item, index) => (
                                            <Option key={ index } value={ item.catid }>{ item.catname }</Option>)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                                        )
                                    }
                                </Select>
                            </Col>
<<<<<<< HEAD
                            <Col span={1}>
                                <Button type="primary"  onClick={this.saveCfg.bind(this, col.Field)}>
=======
                            <Col span={ 1 }>
                                <Button type="primary" key={ idx } onClick={ this.saveCfg.bind(this, col.Field) }>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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