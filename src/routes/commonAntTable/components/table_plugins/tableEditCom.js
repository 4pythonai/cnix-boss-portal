import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { message } from 'antd'
import CommonModal from '../commonTableCom/commonModal'

import api from '@/api/api'

export default class TableEditCom extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }
    state = {
        visible: false,
    }


    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据！")
            return;
        }



        let _tmprec = this.props.commonTableStore.selectedRows[0]

        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {

            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == "") {
                canstart = true;
            }

            if (_tmprec.flowstatus == '未启动') {
                canstart = true;
            }
        } else {
            canstart = true;

        }

        if (!canstart) {
            message.error('流程已经启动,不能编辑.');
            return;
        }










        this.refs.commonModalRef.showModal()
        this.props.commonTableStore.setTableAction('edit_table')

    }

    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }

    saveFormData = (fmdata, changeValue, as_virtual, optionType) => {

        let data = {
            actcode: this.props.commonTableStore.action_code,
            rawdata: fmdata
        };
        if (this.props.as_virtual == 'y') {
            this.updateVirtualData(fmdata)
            return;
        }
        this.updateDateApi(data);
    }

    getGhostData = formData => {
        this.props.commonTableStore.triggers.map(item => {
            formData['ghost_' + item.props.ass_select_field_id] = formData[item.props.ass_select_field_id]
            let option_obj = item.state.optionList.find(optionItem => (optionItem.value == formData[item.props.ass_select_field_id]))
            formData[item.props.ass_select_field_id] = option_obj.label
        })
        return formData
    }

    updateVirtualData = fmdata => {

        let id = this.props.commonTableStore.selectedRowKeys[0]
        let index = this.props.commonTableStore.dataSource.findIndex(item => item.id == id)
        fmdata.id = id
        fmdata = this.getGhostData(fmdata);
        let dataSource = [...this.props.commonTableStore.dataSource]
        dataSource[index] = { ...fmdata }
        console.log('查看数据', dataSource)
        this.props.commonTableStore.setDataSource(dataSource)

    }


    updateDateApi = async fmdata => {

        let id = this.props.commonTableStore.selectedRowKeys[0]
        fmdata.rawdata.id = id
        let params = { data: fmdata, method: 'POST' };
        params.updateurl = this.props.commonTableStore.curd.updateurl;
        let json = await api.curd.updateData(params);
        if (json.code == 200) {
            this.props.refreshTable();
        }
    }

    render() {
        return <CommonModal

            footer={ null }
            title="编辑2"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
        >
            <CommonTableForm
                as_virtual={ this.props.as_virtual }
                editable={ true }
                optionType='edit'
                hideModal={ () => this.hideModal() }
                onChange={ this.props.onChange }
                formCfg={ this.props.commonTableStore.formCfg }
                layoutcfg={ this.props.commonTableStore.layoutcfg }
                staticformcfg={ this.props.commonTableStore.staticformcfg }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </CommonModal>
    }
}
