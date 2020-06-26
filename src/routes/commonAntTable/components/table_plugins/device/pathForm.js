import React, { useState, useEffect } from 'react'

import {
    SchemaForm,
    createAsyncFormActions,
    Field
} from '@uform/antd'
import '@/components/Uform_extends'
import { randomString } from '@/utils/tools'

export default class PathForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        actions: createAsyncFormActions(),
        form_value: this.props.form_option === "edit" ? this.props.form_value : {},
        formCfg: {
            "type": "object",
            "properties": {


                "pointtype": {
                    "type": "string",
                    "title": "类型",
                    "type": "string",
                    "required": true,
                    "enum": [
                        {
                            label: 'ODF端口1X1',
                            value: 'ODF(1X1)'
                        },
                        {
                            label: 'ODF端口2X2',
                            value: 'ODF(2X2)'
                        },
                        {
                            label: '交换机端口',
                            value: 'switch'
                        },
                        {
                            label: '路由器端口',
                            value: 'router'
                        }
                    ],
                    "x-props": {
                        "disabled": this.props.form_disabled
                    }
                }


            }
        }
    }

    componentDidMount() {
        this.props.registerForm(this, this.props.form_order)
    }

    async getFormValue() {
        let inner_fmdata = await this.state.actions.submit();
        return inner_fmdata.values
    }


    getODF_point = (index) => {

        let uuid = randomString(10)
        let odfid_key = "odfid" + index
        let odfportid_key = "odfportid" + index
        let trigger_group_key = uuid + index
        let api = "device/listAvailableODFPort/" + this.props.form_params;

        let odfponit = {
            [odfid_key]: {

                "type": "assocselect",
                "title": "ODF",
                "required": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "commontablestore": this.props.commonTableStore,
                    "actions": this.state.actions,
                    "disabled": this.props.form_disabled,
                    ass_select_field_id: odfid_key,
                    "query_cfg": {
                        "level": "1",
                        "api": "device/listODFbyIDC",
                        "associate_field": odfportid_key,
                        "trigger_group_uuid": trigger_group_key,
                        "label_field": "odfcode",
                        "value_field": "id"
                    },
                    "ass_select_field_id": odfid_key,
                }
            },

            [odfportid_key]: {

                "type": "assocselect",
                "title": "端口",
                "required": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "commontablestore": this.props.commonTableStore,
                    "disabled": this.props.form_disabled,
                    "actions": this.state.actions,
                    "query_cfg": {
                        "level": "2",
                        "api": api,
                        "associate_field": null,
                        "trigger_group_uuid": trigger_group_key,
                        "label_field": "portname",
                        "value_field": "id"
                    },
                    "ass_select_field_id": odfportid_key,
                }
            }
        }
        return odfponit
    }

    getSwitch_point = (index) => {
        let uuid = randomString(10)
        let switchid_key = "switchid"
        let switchportid_key = "switchportid"
        let trigger_group_key = uuid + index
        let api = "device/listAvailableSwitchPort/" + this.props.form_params;

        let swpoint = {
            [switchid_key]: {

                "type": "assocselect",
                "title": "交换机",
                "required": true,
                "x-visible": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "level": "1",
                    "commontablestore": this.props.commonTableStore,
                    "actions": this.state.actions,
                    "disabled": this.props.form_disabled,
                    "query_cfg": {
                        "level": "1",
                        "api": "curd\/getTableData",
                        "basetable": "boss_switch",
                        "filter_field": null,
                        "associate_field": switchportid_key,
                        "trigger_group_uuid": trigger_group_key,
                        "label_field": "switchcode",
                        "value_field": "id"
                    },
                    "ass_select_field_id": switchid_key,
                }
            },
            [switchportid_key]: {
                "type": "assocselect",
                "title": "交换机端口",
                "required": true,
                "x-visible": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "level": "2",
                    "disabled": this.props.form_disabled,
                    "commontablestore": this.props.commonTableStore,
                    "actions": this.state.actions,
                    "query_cfg": {
                        "level": "2",
                        "api": api,
                        "basetable": "boss_switch_ports",
                        "filter_field": "switchid",
                        "associate_field": null,
                        "trigger_group_uuid": trigger_group_key,
                        "label_field": "portname",
                        "value_field": "id"
                    },
                    "ass_select_field_id": switchportid_key,
                }
            }
        }
        return swpoint
    }

    getRouter_point = (index) => {

        let uuid = randomString(10)
        let routerid_key = "routerid"
        let routerportid_key = "routerportid"
        let trigger_group_key = uuid + index

        let api = "device/listAvailableRouterPort/" + this.props.form_params;

        let routerpoint = {

            [routerid_key]: {

                "type": "assocselect",
                "title": "路由器",
                "required": true,
                "x-visible": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "level": "1",
                    "disabled": this.props.form_disabled,
                    "commontablestore": this.props.commonTableStore,
                    "actions": this.state.actions,
                    "query_cfg": {
                        "level": "1",
                        "api": "curd\/getTableData",
                        "basetable": "boss_routers",
                        "filter_field": null,
                        "associate_field": routerportid_key,
                        "trigger_group_uuid": trigger_group_key,
                        "codetable_category_value": null,
                        "label_field": "routercode",
                        "value_field": "id"
                    },
                    "ass_select_field_id": routerid_key,
                }
            },
            [routerportid_key]: {

                "type": "assocselect",
                "title": "路由端口",
                "required": true,
                "x-visible": true,
                "x-component": "Dropdowncombox",
                "x-props": {
                    "level": "2",
                    "disabled": this.props.form_disabled,
                    "commontablestore": this.props.commonTableStore,
                    "actions": this.state.actions,
                    "query_cfg": {
                        "level": "2",
                        "api": api,
                        "basetable": "boss_route_ports",
                        "filter_field": "routerid",
                        "associate_field": null,
                        "trigger_group_uuid": trigger_group_key,
                        "codetable_category_value": null,
                        "label_field": "portname",
                        "value_field": "id"
                    },
                    "ass_select_field_id": routerportid_key,
                }
            }
        }
        return routerpoint
    }


    getODF = counter => {
        let tmp1 = this.getODF_point(1)
        let tmp2 = this.getODF_point(2)
        if (counter == 1) {
            var tmpleft = { ...tmp1 }
        } else {
            var tmpleft = { ...tmp1, ...tmp2 }
        }
        return tmpleft

    }

    generateFormJson = pointtype => {
        if (!pointtype) {
            return;
        }

        let point_cfg = null
        if (pointtype == 'ODF(1X1)') {
            point_cfg = this.getODF(1)
        }

        if (pointtype == 'ODF(2X2)') {
            point_cfg = this.getODF(2)
        }

        if (pointtype == 'switch') {
            point_cfg = this.getSwitch_point(1)
        }

        if (pointtype == 'router') {
            point_cfg = this.getRouter_point(1)
        }

        let formCfg = this.state.formCfg;

        formCfg.properties = {
            "pointtype": {
                "type": "object",
                "title": "类型",
                "type": "string",
                "required": true,
                "enum": [
                    {
                        label: 'ODF端口1X1',
                        value: 'ODF(1X1)'
                    },
                    {
                        label: 'ODF端口2X2',
                        value: 'ODF(2X2)'
                    },
                    {
                        label: '交换机端口',
                        value: 'switch'
                    },
                    {
                        label: '路由器端口',
                        value: 'router'
                    }
                ]
            }, ...point_cfg
        }

        this.setState({ formCfg })
    }



    render() {
        return <SchemaForm
            style={{ flex: 1 }}
            labelCol={7}
            wrapperCol={15}
            value={this.state.form_value}
            schema={this.state.formCfg}
            actions={this.state.actions}
            effects={
                ($, { setFieldState, getFieldState }) => {
                    $('onFormMount').subscribe((state) => {
                        this.setState({
                            pointtype: state.value
                        })

                        this.generateFormJson(state.value);
                        if (this.props.form_option != 'edit') {
                            return
                        }

                        if (this.props.commonTableStore.dropdownRef.odfid1 && this.state.form_value.odfid1) {
                            this.props.commonTableStore.dropdownRef.odfid1.onDropdownVisibleChange(true)
                            this.props.commonTableStore.dropdownRef.odfportid1.getOptionList(
                                this.props.commonTableStore.dropdownRef.odfportid1.props.query_cfg,
                                this.state.form_value.odfid1,
                                this.props.commonTableStore.dropdownRef.odfportid1
                                )

                        }

                        if (this.props.commonTableStore.dropdownRef.odfid2 && this.state.form_value.odfid2) {
                            this.props.commonTableStore.dropdownRef.odfid2.onDropdownVisibleChange(true)
                            this.props.commonTableStore.dropdownRef.odfportid2.getOptionList(
                                this.props.commonTableStore.dropdownRef.odfportid2.props.query_cfg,
                                this.state.form_value.odfid2,
                                this.props.commonTableStore.dropdownRef.odfportid2
                                )
                        }


                        if (this.props.commonTableStore.dropdownRef.routerid && this.state.form_value.routerid) {
                            
                            this.props.commonTableStore.dropdownRef.routerid.onDropdownVisibleChange(true)
                            this.props.commonTableStore.dropdownRef.routerportid.getOptionList(
                                this.props.commonTableStore.dropdownRef.routerportid.props.query_cfg,
                                this.state.form_value.routerid,
                                this.props.commonTableStore.dropdownRef.routerportid
                                )

                        }

                        if (this.props.commonTableStore.dropdownRef.switchid && this.state.form_value.switchid) {
                            this.props.commonTableStore.dropdownRef.switchid.onDropdownVisibleChange(true)
                            this.props.commonTableStore.dropdownRef.switchportid.getOptionList(
                                this.props.commonTableStore.dropdownRef.switchportid.props.query_cfg,
                                this.state.form_value.switchid,
                                this.props.commonTableStore.dropdownRef.switchportid
                                )
                        }


                    })

                    $('onFieldChange', 'pointtype').subscribe((state) => {
                        this.setState({
                            pointtype: state.value
                        })

                        this.generateFormJson(state.value)
                    })


                    $('onFieldChange', 'odfid1').subscribe((state) => {
                        let field = getFieldState('odfid2')
                        // 更新第二个odf的value
                        if (field) {
                            // 请求下一个odf端口的下拉值
                            this.props.commonTableStore.dropdownRef.odfid2.onDropdownVisibleChange(true)
                            this.props.commonTableStore.dropdownRef.odfid2.onSelect(state.value)
                        }
                    })

                    $('onFieldChange', 'odfportid1').subscribe((state) => {
                        let field = getFieldState('odfid2')
                        // 更新第二个odf端口的value
                        if (field) {
                            setFieldState('odfportid2', fieldState => {
                                fieldState.value = state.value
                            })
                        }
                    })

                }
            }
        >
        </SchemaForm>
    }

}
