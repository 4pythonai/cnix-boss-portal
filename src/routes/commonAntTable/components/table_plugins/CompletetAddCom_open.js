import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'

import { Modal, Icon, Descriptions, Form, Input, Divider, Checkbox, Card, Select, Row, Radio, Col, Button, message, TextArea, } from 'antd';
import { DatePicker, TimePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import ReferpluginCom from '@/routes/commonAntTable/components/commonTableCom/referpluginCom'

import {
    SchemaForm,
    Submit,
    FormButtonGroup,
    createFormActions,

} from '@uform/antd'

const RadioGroup = Radio.Group;



/*
竣工单addform
包括
 

*/

const CheckboxGroup = Checkbox.Group;


@observer
export default class CompletetAddCom_open extends React.Component {
    state =
        {
            visible: true,
            cabinets_not_finished: [],
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            refer_uuid: '',
            refer_paperno: '',
            endtype: 'boss_cabinet_poweron',
            completetype: null,
            setlectedCabinets: [],
            canedit: "true"
        }

    init(btncode) {
        console.log('按钮编码,来源:', this.props.parentTable.state.button_code)
        this.setState({ completetype: this.props.parentTable.state.button_code })
        this.props.commonTableStore.rowSelectChange([], [])
        this.refs.commonModalRef.showModal()
        this.props.commonTableStore.setTableAction('add_table')
        this.setState({
            cabinets_not_finished: []
        })

    }

    hideModal() {
        this.refs.commonModalRef.onCancelHandle()
    }



    //选择机柜
    onSelectCabinet = checkedList => {
        console.log(checkedList)
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.cabinets_not_finished.length,
            checkAll: checkedList.length === this.state.cabinets_not_finished.length,
        });
    };


    getCabinetsNotFinished = (sth) => {
        console.log(sth.combinedRef)
        let abc = sth.combinedRef.filter(x => x.key === 'left_cabinets');
        if (abc.length === 1) {
            let left_cabinets = abc[0].bigdata
            this.setState({ cabinets_not_finished: left_cabinets })
        }

    }


    reportUUID = (uuid) => {
        this.setState({ refer_uuid: uuid })
    }

    reportOrginPaperno = (paperno) => {
        this.setState({ refer_paperno: paperno })
    }



    saveFormData = async (values) => {
        if (this.state.setlectedCabinets.length == 0) {
            message.error('请选择机柜')
        } else {
            values.refer_uuid = this.state.refer_uuid
            values.refer_paperno = this.state.refer_paperno

            values.endtype = this.state.endtype
            values.completed_cabinets = this.state.setlectedCabinets
            let params = { data: values, method: 'POST' };
            let res = await api.bpm.addIDCCompleteorder(params)
            if (res.code == 200) {
                this.props.refreshTable()
                this.refs.commonModalRef.onCancelHandle()
            }
        }
    }

    onChange(e) {
        console.log(e)
        this.setState({
            setlectedCabinets: e
        })
    }


    render() {

        return <CommonModal
            height="500px"
            footer={ null }
            title="新增上架竣工单"
            ref='commonModalRef'
            layoutcfg={ 2 }
        >
            <Divider />
            <div>&nbsp;&nbsp;选择上架工单</div>
            <ReferpluginCom reportUUID={ this.reportUUID }
                reportOrginPaperno={ this.reportOrginPaperno }
                uploadfunction={ this.getCabinetsNotFinished }
                refer_actcode='boss_cabinet_poweron_for_select'

                infotitle='获取未完工机柜'
                serviceurl="MIdcruntime/getPoweronUnFinished" />



            <br />
            <div style={ { width: '1100px' } }>
                <div style={ { display: 'inline-block', verticalAlign: 'top' } }><span style={ { marginLeft: '224px', marginBottom: '15px', color: 'red' } }>*</span>选择机柜：</div>
                <div style={ { display: 'inline-block', verticalAlign: 'top' } }>

                    <Checkbox.Group onChange={ this.onChange.bind(this) }>
                        {
                            this.state.cabinets_not_finished.map((item, index) => {
                                return <Checkbox
                                    style={ { display: 'block', marginLeft: '2px' } }
                                    key={ index }
                                    value={ item.value }>{ item.label }
                                </Checkbox>
                            })
                        }
                    </Checkbox.Group>
                </div>
            </div>




            <div style={ { marginLeft: '100px', marginTop: '15px' } }>

                <SchemaForm
                    onSubmit={ values => this.saveFormData(values) }
                    schema={ {
                        "type": "object",
                        "properties": {

                            "delivertime": {
                                "type": "date",
                                "title": "上架日期",
                                "required": true
                            },

                            "powerontime": {
                                "type": "date",
                                "title": "加电日期",
                                "required": true
                            },
                            "fileuploader": {
                                "type": "fileuploader",
                                "x-props": { 'edit': this.state.canedit, uform_para: "true" },
                                "title": "上传附件"
                            },
                            "memo": {
                                "type": "string",
                                "x-component": "textarea",
                                "title": "备注",
                                "required": true,
                            },
                        }
                    } }
                    labelCol={ 5 }
                    wrapperCol={ 15 }
                >

                    <FormButtonGroup style={ { marginLeft: '370px' } }>
                        <Submit style={ { padding: '0px 15px' } }>生成竣工单</Submit>
                    </FormButtonGroup>

                </SchemaForm>
            </div>
        </CommonModal >
    }
}
