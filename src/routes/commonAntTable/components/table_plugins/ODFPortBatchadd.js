import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
import { message } from 'antd'
@observer
export default class ODFPortBatchadd extends React.Component {
    state = {
        visible: false,

        batchFormcfg: {
            "type": "object",
            "properties": {
                "group_all": {
                    "type": "object",
                    "x-component": "card",
                    "x-props": {
                        "title": "ODF端口批量添加,请确保ODF名称存在"
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
                        "odfname": {
                            "type": "string",
                            "title": "ODF名称",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "odfname",
                                "trigger_style": "no_trigger",
                                "uform_para": null
                            }
                        },

                        "odfnumbers": {
                            "type": "string",
                            "title": "数量",
                            "required": true,
                            "x-visible": true,
                            "x-props": {
                                "field_id": "odfnumbers",
                                "trigger_style": "no_trigger",
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




    saveBatchODFPort = async data => {

        let params = { data: data, method: 'POST' };
        params.addurl = this.props.commonTableStore.curd.addurl;
        let json = await api.network.saveBatchODFPort(params);
        if (json.code == 200) {
            message.success(json.message)
            this.props.refreshTable()
        } else {

            message.error(json.message)


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
        this.saveBatchODFPort(fmdata)

    }

    render() {
        return <CommonModal
            height="1000"
            width="900"
            footer={ null }
            title="批量增加"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
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
