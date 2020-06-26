import React from "react";
import { Select, Input } from 'antd';
import { observer, inject } from "mobx-react";

import AssocSelect_charge from '@/components/Uform_extends/assocSelect_charge'

const { Option } = Select;

@inject("chargeStore")
@observer
export default class IdcLocation extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.chargeStore;
    }

    getOption(options_list) {

        return options_list.map(item => {
            return <Option key={item.value} value={item.text}>
                {item.text}
            </Option>
        })
    }


    opticalfiber_dropdown(item,index,name){
        return <div className="charge_form">
                <div className="charge_info">
                光纤模数
                </div>
                <div className="charge_control">
                <Select value={this.store.chargeRowData[name]?this.store.chargeRowData[name]:''} style={{width:'100%'}} onChange={event => this.store.setNormalFiledsValue(event, name)}>
                    {this.getOption([{value:'1',text:'单模'},{value:'2',text:'双模'}])} 
                </Select>
                </div>
                </div>
    }
    idc_dropdown(item, index, postfix) {
        postfix = postfix || ''
        let group_id = 'UmyeLLZRzJDInIS6N9uZq748QEdp8X9' + postfix

        let idc_cfg = this.getLocCfg(group_id, postfix)
        

        let schemaJson = {
            "type": "object",
            "properties": {
                "group_all": {
                    "type": "object",
                    "x-component": "card",
                    "properties": {
                        "UFORM_NO_NAME_FIELD0": {
                            "type": "object",
                            "x-component": "card",
                            "x-props": {
                                "title": "机柜开通工单"
                            },
                            properties: idc_cfg
                        }
                    }
                }
            }
        }

        let keys = Object.keys(idc_cfg)
        return keys.map((item, order_index) => {
            return <div className="charge_form" key={order_index}>
                <div className="charge_info">
                    {this.requiredIconRender(idc_cfg[item].required ? 'y' : 'n')}
                    {idc_cfg[item].title}
                </div>
                <div className="charge_control">
                    <AssocSelect_charge
                        style={{ width: '100%' }}
                        schema={schemaJson}
                        value={this.store.chargeRowData[item]}
                        query_cfg={idc_cfg[item]['x-props'].query_cfg}
                        store={this.store}
                        onChange={this.setLocValue}
                        {...idc_cfg[item]} />
                        
                </div>
            </div>
        })

    }

    getLocCfg = (group_id, postfix) => {
        let loc_cfg = {}
        loc_cfg['loc' + postfix] = {
            "grouptitle": "IDC",
            "type": "assocselect",
            "title": "所在机房",
            "required": true,
            "x-visible": true,
            "enum": [],
            "x-component": "assocselect",
            "x-props": {
                "form_action": "edit",
                "disabled": true,
                "query_cfg": {
                    "level": 1,
                    "api": "curd/getTableData",
                    "basetable": "boss_idc",
                    "filter_field": null,
                    "associate_field": "building" + postfix,
                    "trigger_group_uuid": group_id,
                    "codetable_category_value": null,
                    "label_field": "idc_site",
                    "value_field": "id"
                },
                "ass_select_field_id": "loc" + postfix,
                "uform_para": ""
            }
        }

        loc_cfg['building' + postfix] = {
            "grouptitle": "IDC",
            "type": "assocselect",
            "title": "所在楼宇",
            "required": false,
            "x-visible": true,
            "enum": [],
            "x-component": "assocselect",
            "x-props": {
                "level": 2,
                "api": "curd/getTableData",
                "basetable": "boss_idc_building",
                "filter_field": "idc_id",
                "associate_field": "floor",
                "trigger_group_uuid": group_id,
                "codetable_category_value": null,
                "label_field": "build_name",
                "value_field": "id",
                "query_cfg": {
                    "level": 2,
                    "api": "curd/getTableData",
                    "basetable": "boss_idc_building",
                    "filter_field": "idc_id",
                    "associate_field": "floor" + postfix,
                    "trigger_group_uuid": group_id,
                    "codetable_category_value": null,
                    "label_field": "build_name",
                    "value_field": "id"
                },
                "ass_select_field_id": "building" + postfix,
                "uform_para": ""
            }
        }
        loc_cfg['floor' + postfix] = {
            "grouptitle": "IDC",
            "type": "assocselect",
            "title": "所在楼层",
            "required": false,
            "x-visible": true,
            "enum": [],
            "x-component": "assocselect",
            "x-props": {
                "level": 3,
                "api": "curd/getTableData",
                "basetable": "boss_idc_building_floor",
                "filter_field": "build_id",
                "associate_field": "preoccupationroom",
                "trigger_group_uuid": group_id,
                "codetable_category_value": null,
                "label_field": "floor_name",
                "value_field": "id",
                "query_cfg": {
                    "level": 3,
                    "api": "curd/getTableData",
                    "basetable": "boss_idc_building_floor",
                    "filter_field": "build_id",
                    "associate_field": "room" + postfix,
                    "trigger_group_uuid": group_id,
                    "codetable_category_value": null,
                    "label_field": "floor_name",
                    "value_field": "id"
                },
                "ass_select_field_id": "floor" + postfix,
                "uform_para": ""
            }
        }

        loc_cfg['room' + postfix] = {
            "grouptitle": "IDC",
            "type": "assocselect",
            "title": "所在区域",
            "required": false,
            "x-visible": true,
            "enum": [],
            "x-component": "assocselect",
            "x-props": {
                "level": 4,
                "api": "curd/getTableData",
                "basetable": "boss_idc_room",
                "filter_field": "floor_id",
                "associate_field": null,
                "trigger_group_uuid": group_id,
                "codetable_category_value": null,
                "label_field": "room_name",
                "value_field": "id",
                "query_cfg": {
                    "level": 4,
                    "api": "curd/getTableData",
                    "basetable": "boss_idc_room",
                    "filter_field": "floor_id",
                    "associate_field": null,
                    "trigger_group_uuid": group_id,
                    "codetable_category_value": null,
                    "label_field": "room_name",
                    "value_field": "id"
                },
                "ass_select_field_id": "room" + postfix,
                "uform_para": ""
            }
        }
        return loc_cfg
    }

    setLocValue = (value, key) => {
        this.store.setNormalFiledsValue(value, key)
    }

    loc_text(item, index) {
        return <div className="charge_form" key={item.ui_id}>
            <div className="charge_info" >
                {this.requiredIconRender(item.is_required)}
                {item.ui_title}
            </div>
            <div className="charge_control">

                <Input
                    value={this.store.chargeRowData[item.ui_id] || ''}
                    onChange={event => this.store.setNormalFiledsValue(event, item.ui_id)} />
            </div>
        </div>
    }

    locStartDropDown(item, index) {
        return <div key="loc_start">
            {this.store.chargeRowData.start_type === '楼内' && this.idc_dropdown(item, index, '_start')}
            {this.store.chargeRowData.start_type === '楼内' &&this.store.chargeRowData.resname=='裸纤'&& this.opticalfiber_dropdown(item, index, 'opticalfiber_start')}
            {this.store.chargeRowData.start_type === '楼外' && this.loc_text(item, index)}
            {this.getAPoint(item, index)}
        </div>
    }

    locEndDropDown(item, index) {
        return <div key="loc_end">
            {this.store.chargeRowData.end_type === '楼内' && this.idc_dropdown(item, index, '_end')}
            {this.store.chargeRowData.end_type === '楼内'&&this.store.chargeRowData.resname=='裸纤' && this.opticalfiber_dropdown(item, index, 'opticalfiber_end')}
            {this.store.chargeRowData.end_type === '楼外' && this.loc_text(item, index)}
            {this.getZPoint(item, index)}
        </div>
    }

    getAPoint(item, index) {
        return <div className="charge_form" key={index}>
            <div className="charge_info" >
                {this.requiredIconRender('y')}
                A端具体位置
            </div>
            <div className="charge_control">

                <Input.TextArea
                    value={this.store.chargeRowData.a_location || ''}
                    onChange={event => this.store.setNormalFiledsValue(event, 'a_location')} />
            </div>
        </div>
    }

    getZPoint(item, index) {
        return <div className="charge_form" key={index}>
        <div className="charge_info" >
            {this.requiredIconRender('y')}
            Z端具体位置
        </div>
        <div className="charge_control">

            <Input.TextArea
                value={this.store.chargeRowData.z_location || ''}
                onChange={event => this.store.setNormalFiledsValue(event, 'z_location')} />
        </div>
    </div>
    }

    dropDownRender(item, index) {
        return (
            <div className="charge_form" key={index} >
                <label className="charge_info">
                    {this.requiredIconRender(item.is_required)}
                    {item.ui_title}
                </label>
                <div className="charge_control">
                    <Select
                        style={{ width: '100%' }}
                        value={this.store.chargeRowData[item.ui_id] || '请选择'}
                        onChange={value => this.store.setNormalFiledsValue(value, item.ui_id)}>
                        <Select.Option key='请选择' value='请选择' >请选择</Select.Option>
                        {item.options_list.map(optionItem => {
                            return (
                                <Select.Option key={optionItem.text} value={optionItem.text}>
                                    {optionItem.text}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
            </div>
        )
    }

    requiredIconRender(is_required) {
        return is_required == 'y' ? <span className="price_require_icon">*</span> : ''
    }

    render() {
        if (this.store.charge_cfg.loc == undefined) {
            return;
        }
        return this.store.charge_cfg.loc.map((item, index) => this[item.compoment_name](item, index))
    }
}

