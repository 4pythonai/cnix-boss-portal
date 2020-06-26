import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'

@observer
export default class IPBatchadd extends React.Component {
    state = {
        visible: false,

        batchFormcfg: {
            "type": "object",
            "properties": {
                "group_all": {
                    "type": "object",
                    "x-component": "card",
                    "x-props": {
                        "title": "IP管理"
                    },
                    "properties": {
                        "id": {
                            "type": "number",
                            "title": "id",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "id",
                                "trigger_style": "no_trigger",
                                "uform_para": ""
                            }
                        },
                        "supplyerid": {
                            "type": "AssocSelectSimple",
                            "title": "提供方",
                            "required": true,
                            "x-visible": true,
                            "enum": [

                            ],
                            "x-component": "AssocSelectSimple",
                            "x-props": {
                                "level": "1",
                                "api": "curd\/getTableData",
                                "basetable": "boss_supplyer_bandwidth",
                                "filter_field": null,
                                "associate_field": null,
                                "trigger_group_uuid": "IJRlKg7xAtRzXZjghQoNUcL9GMJW2p",
                                "codetable_category_value": null,
                                "label_field": "supplyer",
                                "value_field": "id",
                                "query_cfg": {
                                    "level": "1",
                                    "api": "curd\/getTableData",
                                    "basetable": "boss_supplyer_bandwidth",
                                    "filter_field": null,
                                    "associate_field": null,
                                    "trigger_group_uuid": "IJRlKg7xAtRzXZjghQoNUcL9GMJW2p",
                                    "codetable_category_value": null,
                                    "label_field": "supplyer",
                                    "value_field": "id"
                                },
                                "ass_select_field_id": "supplyerid",
                                "uform_para": null
                            }
                        },
                        "ip_segment3": {
                            "type": "string",
                            "title": "IP(114.113.88)",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "ip_segment3",
                                "trigger_style": "no_trigger",
                                "uform_para": null
                            }
                        },
                        "ip_start": {
                            "type": "string",
                            "title": "起始",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "ip_start",
                                "trigger_style": "no_trigger",
                                "uform_para": null
                            }
                        },
                        "ip_end": {
                            "type": "string",
                            "title": "终止",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "ip_end",
                                "trigger_style": "no_trigger",
                                "uform_para": null
                            }
                        },

                        "switchid": {
                            "type": "AssocSelectSimple",
                            "title": "交换机",
                            "required": false,
                            "x-visible": true,
                            "enum": [

                            ],
                            "x-component": "AssocSelectSimple",
                            "x-props": {
                                "level": "1",
                                "api": "curd\/getTableData",
                                "basetable": "boss_switch",
                                "filter_field": null,
                                "associate_field": "swportid",
                                "trigger_group_uuid": "6GeNKi5DmFR9RJ9dIstWMiCh78RmrU",
                                "codetable_category_value": null,
                                "label_field": "devname",
                                "value_field": "id",
                                "query_cfg": {
                                    "level": "1",
                                    "api": "curd\/getTableData",
                                    "basetable": "boss_switch",
                                    "filter_field": null,
                                    "associate_field": "swportid",
                                    "trigger_group_uuid": "6GeNKi5DmFR9RJ9dIstWMiCh78RmrU",
                                    "codetable_category_value": null,
                                    "label_field": "devname",
                                    "value_field": "id"
                                },
                                "ass_select_field_id": "switchid",
                                "uform_para": null
                            }
                        },
                        "swportid": {
                            "type": "AssocSelectSimple",
                            "title": "端口",
                            "required": false,
                            "x-visible": true,
                            "enum": [

                            ],
                            "x-component": "AssocSelectSimple",
                            "x-props": {
                                "level": "2",
                                "api": "curd\/getTableData",
                                "basetable": "boss_switch_ports",
                                "filter_field": "devid",
                                "associate_field": null,
                                "trigger_group_uuid": "6GeNKi5DmFR9RJ9dIstWMiCh78RmrU",
                                "codetable_category_value": null,
                                "label_field": "port",
                                "value_field": "id",
                                "query_cfg": {
                                    "level": "2",
                                    "api": "curd\/getTableData",
                                    "basetable": "boss_switch_ports",
                                    "filter_field": "devid",
                                    "associate_field": null,
                                    "trigger_group_uuid": "6GeNKi5DmFR9RJ9dIstWMiCh78RmrU",
                                    "codetable_category_value": null,
                                    "label_field": "port",
                                    "value_field": "id"
                                },
                                "ass_select_field_id": "swportid",
                                "uform_para": null
                            }
                        }
                    }
                }
            }
        }


    }

    init() {
        this.refs.commonModalRef.showModal()
        this.props.commonTableStore.setTableAction('add_table')

    }

    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }



    getGhostData = formData => {
        this.props.commonTableStore.triggers.map(item => {
            formData['ghost_' + item.props.ass_select_field_id] = formData[item.props.ass_select_field_id]
            let option_obj = item.state.optionList.find(optionItem => (optionItem.value == formData[item.props.ass_select_field_id]))
            formData[item.props.ass_select_field_id] = option_obj.label
        })
        return formData
    }

    saveBatchIP = async data => {

        let params = { data: data, method: 'POST' };
        params.addurl = this.props.commonTableStore.curd.addurl;
        let json = await api.network.saveBatchIP(params);
        if (json.code == 200) {
            this.props.refreshTable()
        }
    }

    saveFormData(fmdata, uuid, changeValue, as_virtual, optionType) {
        if (uuid != '') {
            fmdata.uuid = uuid
        }
        console.log(changeValue, "保存数据", fmdata);
        let data = {
            actcode: this.props.commonTableStore.action_code,
            rawdata: fmdata
        };

        console.log(fmdata)
        this.saveBatchIP(fmdata)

    }

    render() {
        return <CommonModal
          
            
            height="1000"
            width="1200"
            footer={ null }
            title="批量增加"
            ref='commonModalRef'
            layoutcfg={ 2 }
            
            
        >
            <CommonTableForm
                as_virtual={ this.props.as_virtual }
                editable={ true }
                optionType='add'
                onChange={ this.props.onChange }
                hideModal={ () => this.hideModal() }
                formCfg={ this.state.batchFormcfg }
                layoutcfg={ 1 }
                selectedRows={ this.props.commonTableStore.selectedRows }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </CommonModal>
    }
}
