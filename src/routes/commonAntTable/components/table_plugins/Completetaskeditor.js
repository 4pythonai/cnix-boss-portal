import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
import { toJS } from 'mobx'


import { Modal, Icon, Descriptions, Form, Input, Divider, Checkbox, Card, Select, Row, Radio, Col, Button, message, TextArea, } from 'antd';
import { DatePicker, TimePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import ReferpluginCom from '@/routes/commonAntTable/components/commonTableCom/referpluginCom'
import GridRefer from '@/routes/commonAntTable/components/commonTableCom/gridRefer'


import {
    SchemaForm,
    Submit,
    FormButtonGroup,
    createFormActions,

} from '@uform/antd'

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
@observer
export default class Completetaskeditor extends React.Component {
    constructor(props) {
        super(props)
    }



    state =
        {

            orginalrow: null,
            recordid: 0,
            visible: true,
            cabinets_not_finished: [],
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            completetype: null,
            serviceurl: '',
            combinedRef: null,
            setlectedCabinets: [],
            canedit: "false",
        }

    init(btncode) {

        this.setState({ completetype: this.props.parentTable.state.button_code })
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条竣工单');
            return;
        }

        let _srow = this.props.commonTableStore.selectedRows[0]
        console.log(888, _srow)
        this.checkCanEdit()

        this.setState({ recordid: _srow.id })
        this.setState({ orginalrow: _srow })


        if (_srow.endtype == '竣工单(业务开通)') {
            this.setState({ serviceurl: 'MIdcruntime/getOpenResponDetail' }, this.getReferinfo)
        }


        if (_srow.endtype == '竣工单(预留响应)') {
            this.setState({ serviceurl: 'MIdcruntime/getReserveOrderDetail' }, this.getReferinfo)
        }

        if (_srow.endtype == '竣工单(拆机)') {
            this.setState({ serviceurl: 'MIdcruntime/getDisassemblyDetail' }, this.getReferinfo)
        }
    }



    async checkCanEdit() {

        let _srow = this.props.commonTableStore.selectedRows[0]

        if (_srow.flowstatus === '未提交') {
            this.setState({ canedit: "true" })
            return
        }

        let xparams = {
            data: {
                uuid: _srow.refer_uuid,
            },
            method: 'POST'
        }
        let _resp = await api.bpm.TestIDCCompleteTaskUpdate(xparams)
        this.setState({ canedit: _resp.canedit })


    }

    async getReferinfo() {

        let _srow = this.props.commonTableStore.selectedRows[0]
        _srow.uuid = _srow.refer_uuid  // 实际是要查询对应的流程主表记录.

        let xparams = {
            data: {
                srow: _srow,
                infotitle: '',
                serviceurl: this.state.serviceurl,
            },
            method: 'POST'
        }
        let _resp = await api.activity.actionBasedRowPuller(xparams)

        this.setState({
            combinedRef: _resp.combinedRef
        })


        if (_srow.cabinets_apply_for_complete.length > 4) {

            var selected_array = _srow.cabinets_apply_for_complete.split(',');
        } else {
            var selected_array = []

        }
        this.setState({ setlectedCabinets: selected_array })


        _resp.combinedRef.forEach(element => {
            if (element.key == 'left_cabinets') {
                const unselected_array = element.bigdata.map(item => item.value);
                let cabinet_all = selected_array.length > 0 ? unselected_array.concat(selected_array) : unselected_array
                let unqiue_cabinets = cabinet_all.filter((x, i, a) => a.indexOf(x) == i)
                this.setState({ cabinets_not_finished: unqiue_cabinets })
            }
        });





        this.props.commonTableStore.rowSelectChange([], [])
        this.refs.commonModalRef.showModal()
    }



    hideModal() {
        this.refs.commonModalRef.onCancelHandle()
    }



    //选择机柜
    onSelectCabinet = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.cabinets_not_finished.length,
            checkAll: checkedList.length === this.state.cabinets_not_finished.length,
        });
    };


    getGridReferenceInfo() {

        if (!this.state.combinedRef) {
            return null;
        }

        if (this.state.combinedRef.length > 0) {
            return <div header="参考信息" key="1">
                {
                    this.state.combinedRef.map((one, index) => <GridRefer xinfo={ one } key={ index } />)
                }
            </div>
        }
    }

    saveFormData = async (values) => {

        if (this.state.setlectedCabinets.length == 0) {
            message.error('请选择机柜')
        } else {
            let _srow = this.props.commonTableStore.selectedRows[0]
            values.completed_cabinets = this.state.setlectedCabinets
            values.id = this.state.recordid
            let params = { data: values, method: 'POST' };
            let res = await api.bpm.updateIDCCompleteTask(params)
            if (res.code == 200) {
                this.props.refreshTable()
                this.refs.commonModalRef.onCancelHandle()
            }
        }
    }

    onChange(e) {
        this.setState({
            setlectedCabinets: e
        })
    }



    jsonfor_open() {

        let jschema =
        {
            "type": "object",
            "properties": {

                "delivertime": {
                    "type": "date",
                    "title": "上架日期",
                    "default": this.state.orginalrow ? this.state.orginalrow.delivertime : null,
                    "required": true
                },

                "powerontime": {
                    "type": "date",
                    "title": "加电日期",
                    "default": this.state.orginalrow ? this.state.orginalrow.powerontime : null,
                    "required": true
                },
                "fileuploader": {
                    "type": "fileuploader",
                    "default": this.state.orginalrow ? this.state.orginalrow.fileinformation : null,
                    "x-props": { 'edit': this.state.canedit },
                    "title": "上传附件"
                },
                "memo": {
                    "type": "string",
                    "default": this.state.orginalrow ? this.state.orginalrow.memo : null,
                    "x-component": "textarea",
                    "title": "备注",
                    "required": true,
                },



            }
        }
        return jschema
    }


    jsonfor_reserve() {

        let jschema =
        {
            "type": "object",
            "properties": {
                "fileuploader": {
                    "type": "fileuploader",
                    "default": this.state.orginalrow ? this.state.orginalrow.fileinformation : null,
                    "x-props": { 'edit': this.state.canedit },
                    "title": "上传附件"
                },
                "memo": {
                    "type": "string",
                    "default": this.state.orginalrow ? this.state.orginalrow.memo : null,
                    "x-component": "textarea",
                    "title": "备注",
                    "required": true,
                },
            }
        }
        return jschema
    }


    jsonfor_disassembly() {
        let jschema =
        {
            "type": "object",
            "properties": {

                "shifttime": {
                    "type": "date",
                    "title": "下架日期",
                    "default": this.state.orginalrow ? this.state.orginalrow.shifttime : null,
                    "required": true
                },

                "powerofftime": {
                    "type": "date",
                    "title": "断电日期",
                    "default": this.state.orginalrow ? this.state.orginalrow.powerofftime : null,
                    "required": true
                },
                "fileuploader": {
                    "type": "fileuploader",
                    "default": this.state.orginalrow ? this.state.orginalrow.fileinformation : null,
                    "x-props": { 'edit': this.state.canedit },
                    "title": "上传附件"
                },
                "memo": {
                    "type": "string",
                    "default": this.state.orginalrow ? this.state.orginalrow.memo : null,
                    "x-component": "textarea",
                    "title": "备注",
                    "required": true,
                },



            }
        }
        return jschema
    }

    get_json_schema() {


        if (this.state.orginalrow) {
            console.log(this.state.orginalrow)
            let js_row = toJS(this.state.orginalrow)

            //竣工单(业务开通)
            let endtype = js_row.endtype
            console.log(endtype)

            if (endtype == '竣工单(业务开通)') {
                return this.jsonfor_open()
            }

            if (endtype == '竣工单(拆机)') {
                return this.jsonfor_disassembly()
            }

            if (endtype == '竣工单(预留响应)') {
                return this.jsonfor_reserve()
            }


        } else {

            return null;
        }




    }



    render() {
        console.log(this.state.orginalrow)

        return <CommonModal
            height="500px"
            footer={ null }
            title="编辑竣工单"
            ref='commonModalRef'
            layoutcfg={ 2 }
        >
            <div>
                { this.getGridReferenceInfo() }
            </div>

            <br />

            <span><span style={ { marginLeft: '224px', marginBottom: '15px', marginTop: '25px', color: 'red' } }>*</span>选择机柜：</span>

            <div style={ { width: '400px', marginLeft: '300px' } }>

                <Checkbox.Group
                    disabled={ this.state.canedit === "false" ? true : false }
                    defaultValue={ this.state.setlectedCabinets }
                    onChange={ this.onChange.bind(this) }>
                    {
                        this.state.cabinets_not_finished.map((item, index) => {
                            return <Checkbox
                                style={ { float: 'left', marginLeft: '2px', width: '210px' } }
                                checked={ true }
                                key={ index }
                                value={ item }>
                                { item }
                            </Checkbox>
                        })
                    }
                </Checkbox.Group>
            </div>

            < br />

            <div style={ { marginLeft: '100px', marginTop: '15px' } }>
                <SchemaForm
                    editable={ this.state.canedit === "false" ? false : true }
                    onSubmit={ values => this.saveFormData(values) }
                    schema={ this.get_json_schema() }
                    labelCol={ 5 }
                    wrapperCol={ 15 }
                >
                    <FormButtonGroup style={ { marginLeft: '370px' } }>
                        <Submit style={ { padding: '0px 15px' } } disabled={ this.state.canedit === "false" ? true : false }> 保存竣工单</Submit>
                    </FormButtonGroup>
                </SchemaForm>
            </div>
        </CommonModal >
    }
}
