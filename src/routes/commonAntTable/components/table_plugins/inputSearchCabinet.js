import React, { useState } from 'react';
import { message, Button } from 'antd'

import {
    SchemaForm,
    createFormActions,
    Field,
    FormItemGrid,
    FormButtonGroup
} from '@uform/antd'

const actions = createFormActions()




const GetFields = (props) => {
    console.log(props,'查看数据')
    const [value] = useState()
    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onFieldChange', 'building_id').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_0')
            })

            $('onFieldChange', 'floor_id').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_1')
            })
            $('onFieldChange', 'room_id').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_2')
            })
            $('onFieldChange', 'customer_name').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_3')
            })
            $('onFieldChange', 'rent_type').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_4')
            })
            $('onFieldChange', 'cabinet_no').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_5')
            })
            $('onFieldChange', 'idc_id').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_6')
            })
            $('onFieldChange', 'no').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_7')
            })
            $('onFieldChange', 'powered').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_8')
            })
            $('onFieldChange', 'ampere').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_9')
            })
            $('onFieldChange', 'contract_no').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_10')
            })
            $('onFieldChange', 'onoff_status').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_11')
            })
            $('onFieldChange', 'billingdate').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_12')
            })
            $('onFieldChange', 'lastpaperno').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_13')
            })
            $('onFieldChange', 'u_number').subscribe(fieldState => {
                props.setQuery(fieldState.value, 'vset_14')
            })
        }}
        inline
        labelCol={14}
        // wrapperCol={10}
    >

        
        <Field
            type="string"
            title="机柜编号"
            name="cabinet_no"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="所属IDC"
            name="idc_id"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />

        <Field
            type="string"
            title="所属楼宇"
            name="building_id"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        

        <Field
            type="string"
            title=" 所属楼层"
            name="floor_id"
            default=''
            
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="房间号"
            name="room_id"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        
        
        <Field
            type="string"
            title="客户名称"
            name="customer_name"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="租赁状态"
            name="rent_type"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="序号"
            name="no"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
       
        <Field
            type="string"
            title="加电状态"
            name="powered"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="单机柜电量"
            name="ampere"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        
         
        <Field
            type="string"
            title="合同号"
            name="contract_no"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="上下架状态"
            name="onoff_status"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
       
        <Field
            type="string"
            title="计费时间"
            name="billingdate"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="最近操作的工单号"
            name="lastpaperno"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        <Field
            type="string"
            title="机柜u数"
            name="u_number"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />

        
        



        {/* <FormButtonGroup>
            <Button style={{ marginTop: '5px' }} type="primary" htmlType="button" size="small" onClick={props.refreshTable}>搜索</Button>
        </FormButtonGroup> */}

    </SchemaForm>
}



export default class inputSearchCabinet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query_cfg: {
                count: 5,
                lines: {
                    field_0: "building_id",
                    vset_0: '',
                    operator_0: "like",
                    and_or_0: "and",
                    field_1: "floor_id",
                    vset_1: '',
                    operator_1: "like",
                    and_or_1: "and",
                    field_2: "room_id",
                    vset_2: '',
                    operator_2: "like",
                    and_or_2: "and",
                    field_3: "customer_name",
                    vset_3: '',
                    operator_3: "like",
                    and_or_3: "and",
                    field_4: "rent_type",
                    vset_4: '',
                    operator_4: "like",
                    and_or_4: "and",

                    field_5: "cabinet_no",
                    vset_5: '',
                    operator_5: "like",
                    and_or_5: "and",

                    field_6: "idc_id",
                    vset_6: '',
                    operator_6: "like",
                    and_or_6: "and",

                    field_7: "no",
                    vset_7: '',
                    operator_7: "like",
                    and_or_7: "and",

                    field_8: "powered",
                    vset_8: '',
                    operator_8: "like",
                    and_or_8: "and",

                    field_9: "ampere",
                    vset_9: '',
                    operator_9: "like",
                    and_or_9: "and",

                    field_10: "contract_no",
                    vset_10: '',
                    operator_10: "like",
                    and_or_10: "and",

                    field_11: "onoff_status",
                    vset_11: '',
                    operator_11: "like",
                    and_or_11: "and",


                    field_12: "billingdate",
                    vset_12: '',
                    operator_12: "like",
                    and_or_12: "and",


                    field_13: "lastpaperno",
                    vset_13: '',
                    operator_13: "like",
                    and_or_13: "and",

                    field_14: "u_number",
                    vset_14: '',
                    operator_14: "like",
                    and_or_14: "and",
                }
            }
        }


    }



    async saveFormData(data) {

        this.props.refreshTable();

    }


    setQuery = (value, key) => {
        let { query_cfg } = this.state

        query_cfg.lines[key] = value
        this.setState({ query_cfg })
    }

    refreshTable = async () => {
      
        let query_cfg = {
            count: 15,
            lines: {
                ...this.state.query_cfg.lines
            }
        }

        query_cfg.lines.vset_0 = query_cfg.lines.vset_0 || ''
        query_cfg.lines.vset_1 = query_cfg.lines.vset_1 || ''
        query_cfg.lines.vset_2 = query_cfg.lines.vset_2 || ''
        query_cfg.lines.vset_3 = query_cfg.lines.vset_3 || ''
        query_cfg.lines.vset_4 = query_cfg.lines.vset_4 || ''
        query_cfg.lines.vset_5 = query_cfg.lines.vset_5 || ''
        query_cfg.lines.vset_6 = query_cfg.lines.vset_6 || ''
        query_cfg.lines.vset_7 = query_cfg.lines.vset_7 || ''
        query_cfg.lines.vset_8 = query_cfg.lines.vset_8 || ''
        query_cfg.lines.vset_9 = query_cfg.lines.vset_9 || ''
        query_cfg.lines.vset_10 = query_cfg.lines.vset_10 || ''
        query_cfg.lines.vset_11 = query_cfg.lines.vset_11 || ''
        query_cfg.lines.vset_12 = query_cfg.lines.vset_12 || ''
        query_cfg.lines.vset_13 = query_cfg.lines.vset_13 || ''
        query_cfg.lines.vset_14 = query_cfg.lines.vset_14 || ''

        
        await this.props.clearPaginationStore()
        await this.props.setQueryCfg(query_cfg)
        await this.props.listData()
    }




    render() {
        
        return <GetFields
            commonTableStore={this.props.commonTableStore}
            setQuery={this.setQuery.bind(this)}
            refreshTable={this.refreshTable}
        />
    }
}