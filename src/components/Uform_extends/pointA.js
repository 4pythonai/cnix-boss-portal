import React from 'react';
import '@/components/Uform_extends'
import {
    SchemaForm as Resform,
    createFormActions,

} from '@uform/antd'


const actions = createFormActions()

export default class PointA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialValues: {},
            actions: actions,
            triggers: [],
            schema: {
                "type": "object",
                "properties": {
                    "group_all": {
                        "type": "object",
                        "x-component": "card",
                        "properties": {
                            "UFORM_NO_NAME_FIELD0": {
                                "type": "object",
                                "x-component": "card",
                                "properties": {
                                    "specificLocation": {
                                        "grouptitle": "IDC",
                                        "type": "text_area",
                                        "title": "具体位置",
                                        "required": true,
                                    },
                                    "idc": {
                                        "grouptitle": "IDC",
                                        "type": "assocselect",
                                        "title": "所在IDC",
                                        "required": true,
                                        "x-visible": true,
                                        "enum": [],
                                        "x-component": "assocselect",
                                        "x-props": {
                                            "query_cfg": {
                                                "level": 1,
                                                "api": "curd/getTableData",
                                                "basetable": "boss_idc",
                                                "filter_field": null,
                                                "associate_field": "building",
                                                "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                                "codetable_category_value": null,
                                                "label_field": "idc_site",
                                                "value_field": "id"
                                            },
                                            "ass_select_field_id": "idc",
                                            "uform_para": ""
                                        }
                                    },
                                    "building": {
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
                                            "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                            "codetable_category_value": null,
                                            "label_field": "build_name",
                                            "value_field": "id",
                                            "query_cfg": {
                                                "level": 2,
                                                "api": "curd/getTableData",
                                                "basetable": "boss_idc_building",
                                                "filter_field": "idc_id",
                                                "associate_field": "floor",
                                                "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                                "codetable_category_value": null,
                                                "label_field": "build_name",
                                                "value_field": "id"
                                            },
                                            "ass_select_field_id": "building",
                                            "uform_para": ""
                                        }
                                    },
                                    "floor": {
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
                                            "associate_field": "room",
                                            "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                            "codetable_category_value": null,
                                            "label_field": "floor_name",
                                            "value_field": "id",
                                            "query_cfg": {
                                                "level": 3,
                                                "api": "curd/getTableData",
                                                "basetable": "boss_idc_building_floor",
                                                "filter_field": "build_id",
                                                "associate_field": "room",
                                                "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                                "codetable_category_value": null,
                                                "label_field": "floor_name",
                                                "value_field": "id"
                                            },
                                            "ass_select_field_id": "floor",
                                            "uform_para": ""
                                        }
                                    },
                                    "room": {
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
                                            "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                            "codetable_category_value": null,
                                            "label_field": "room_name",
                                            "value_field": "id",
                                            "query_cfg": {
                                                "level": 4,
                                                "api": "curd/getTableData",
                                                "basetable": "boss_idc_room",
                                                "filter_field": "floor_id",
                                                "associate_field": null,
                                                "trigger_group_uuid": "UmyeLLZRzJDInIS6N9uZq748QEdp8X",
                                                "codetable_category_value": null,
                                                "label_field": "room_name",
                                                "value_field": "id"
                                            },
                                            "ass_select_field_id": "room",
                                            "uform_para": ""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    }

    registerTrigger(obj) {
        this.setState({
            triggers: [...this.state.triggers, obj]
        })
    }
    
    clearTrigger() {
        this.setState({
            triggers: []
        })
    }

    componentDidMount() {
        if (this.props.editable) {
            // this.getDefaultValue()
        }
    }

    getDefaultValue = async () => {
        // 请求默认参数

        // setState设置initialValues
    }


    onChange(a, b) {
        this.props.onChange(b)
    }

    render() {

        return <Resform
        className ='resform'
            initialValues={this.state.initialValues}
            actions={this.state.actions}
            editable={this.props.editable}
            schema={this.state.schema}
            effects={
                ($, { setFieldState, getFieldState }) => {
                    $('onFormInit').subscribe(async () => {
                        for (let newkey in this.state.schema.properties.group_all.properties) {
                            let newitem = this.state.schema.properties.group_all.properties[newkey];

                            for (let key in newitem.properties) {
                                let item = newitem.properties[key];

                                if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                                    setFieldState(key, state => {
                                        state.props["x-props"].schema = this.state.schema;
                                        state.props["x-props"].actions = this.state.actions;
                                    });
                                }
                            }
                        }
                    })
                }

            }
        >
        </Resform>
    }
}