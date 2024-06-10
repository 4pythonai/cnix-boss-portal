import CommonTableFormSimple from '../commonTableCom/commonTableFormSimple';
import React from 'react';
import { observer } from 'mobx-react';
import CommonModal from '../commonTableCom/commonModal';
import api from '@/api/api';

@observer
export default class SwportsInnerLink extends React.Component {
    state = {
        visible: false,

        batchFormcfg: {
            type: 'object',
            properties: {
                group_all: {
                    type: 'object',
                    'x-component': 'card',
                    'x-props': {
                        title: '交换机端口内联管理'
                    },
                    properties: {
                        switchid: {
                            type: 'AssocSelectSimple',
                            title: '交换机1',
                            required: false,
                            'x-visible': true,
                            enum: [],
                            'x-component': 'AssocSelectSimple',
                            'x-props': {
                                level: '1',
                                query_cfg: {
                                    level: '1',
                                    api: 'curd/getTableData',
                                    basetable: 'boss_switch',
                                    filter_field: null,
                                    associate_field: 'swportid',
                                    trigger_group_uuid: '6GeNKi5DmFR9RJ9dIstWMiCh78RmrU',
                                    codetable_category_value: null,
                                    label_field: 'devname',
                                    value_field: 'id'
                                },
                                ass_select_field_id: 'switchid',
                                uform_para: null
                            }
                        },
                        swportid: {
                            type: 'AssocSelectSimple',
                            title: '端口1',
                            required: false,
                            'x-visible': true,
                            enum: [],
                            'x-component': 'AssocSelectSimple',
                            'x-props': {
                                level: '2',
                                query_cfg: {
                                    level: '2',
                                    api: 'Network/ListBlankSwitchport',
                                    filter_field: 'devid',
                                    associate_field: null,
                                    trigger_group_uuid: '6GeNKi5DmFR9RJ9dIstWMiCh78RmrU',
                                    codetable_category_value: null,
                                    label_field: 'port',
                                    value_field: 'id'
                                },
                                ass_select_field_id: 'swportid',
                                uform_para: null
                            }
                        },

                        switchid2: {
                            type: 'AssocSelectSimple',
                            title: '交换机2',
                            required: false,
                            'x-visible': true,
                            enum: [],
                            'x-component': 'AssocSelectSimple',
                            'x-props': {
                                level: '1',
                                query_cfg: {
                                    level: '1',
                                    api: 'curd/getTableData',
                                    basetable: 'boss_switch',
                                    filter_field: null,
                                    associate_field: 'swportid2',
                                    trigger_group_uuid: 'group_234234ADFXDADF544',
                                    codetable_category_value: null,
                                    label_field: 'devname',
                                    value_field: 'id'
                                },
                                ass_select_field_id: 'switchid2',
                                uform_para: null
                            }
                        },

                        swportid2: {
                            type: 'AssocSelectSimple',
                            title: '端口2',
                            required: false,
                            'x-visible': true,
                            enum: [],
                            'x-component': 'AssocSelectSimple',
                            'x-props': {
                                level: '2',
                                query_cfg: {
                                    level: '2',
                                    api: 'Network/ListBlankSwitchport',
                                    filter_field: 'devid',
                                    associate_field: null,
                                    trigger_group_uuid: 'group_234234ADFXDADF544',
                                    codetable_category_value: null,
                                    label_field: 'port',
                                    value_field: 'id'
                                },
                                ass_select_field_id: 'swportid2',
                                uform_para: null
                            }
                        },

                        memo: {
                            type: 'text_area',
                            title: '备注',
                            required: true
                        }
                    }
                }
            }
        }
    };

    init() {
        this.refs.commonModalRef.showModal();
        this.props.commonTableStore.setTableAction('add_table');
    }

    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    getGhostData = (formData) => {
        this.props.commonTableStore.triggers.map((item) => {
            formData['ghost_' + item.props.ass_select_field_id] = formData[item.props.ass_select_field_id];
            let option_obj = item.state.optionList.find((optionItem) => optionItem.value == formData[item.props.ass_select_field_id]);
            formData[item.props.ass_select_field_id] = option_obj.label;
        });
        return formData;
    };

    // saveSwinnerLink = async data => {

    //     let params = { data: data, method: 'POST' };
    //     params.addurl = this.props.commonTableStore.curd.addurl;
    //     let json = await api.network.saveBatchIP(params);
    //     if (json.code == 200) {
    //         this.props.refreshTable()
    //     }
    // }

    saveFormData = async (fmdata, uuid, changeValue, as_virtual, optionType) => {
        if (uuid != '') {
            fmdata.uuid = uuid;
        }
        console.log(changeValue, '保存数据', fmdata);

        let params = { data: fmdata, method: 'POST' };
        let json = await api.network.saveSwinnerLink(params);
        if (json.code == 200) {
            this.props.refreshTable();
        }
    };

    render() {
        console.log(this.props);

        return (
            <CommonModal height="1000" width="1200" footer={null} title="端口内联" ref="commonModalRef" layoutcfg={2}>
                <CommonTableFormSimple
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    optionType="add"
                    onChange={this.props.onChange}
                    hideModal={() => this.hideModal()}
                    formCfg={this.state.batchFormcfg}
                    layoutcfg={1}
                    selectedRows={this.props.commonTableStore.selectedRows}
                    commonTableStore={this.props.commonTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
