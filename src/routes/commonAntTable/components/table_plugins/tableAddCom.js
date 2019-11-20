import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'

@observer
export default class TableAddCom extends React.Component {
    state = {
        visible: false,
    }

    init() {
        this.refs.commonModalRef.showModal()

        this.props.commonTableStore.setTableAction('add_table')
        // this.props.refreshTable()
    }

    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }

    addVirtualData = (formData, changeValue) => {
        console.log('this.props.commonTableStore.triggers',this.props.commonTableStore.triggers)
        formData = this.getGhostData(formData)
        let dataSource = [({ id: this.props.commonTableStore.dataSource.length + 1, ...formData }), ...this.props.commonTableStore.dataSource];
        this.props.commonTableStore.setDataSource(dataSource)
        changeValue && changeValue(this.props.commonTableStore.dataSource);
    }

    getGhostData = formData=> {
        this.props.commonTableStore.triggers.map(item=> {
            formData['ghost_' + item.props.ass_select_field_id] = formData[item.props.ass_select_field_id]
            let option_obj = item.state.optionList.find(optionItem => (optionItem.value == formData[item.props.ass_select_field_id]))
            formData[item.props.ass_select_field_id] = option_obj.label
        })
        return formData
    }

    addRealApi = async data => {

        let params = { data: data, method: 'POST' };
        params.addurl = this.props.commonTableStore.curd.addurl;
        let json = await api.curd.addData(params);
        if (json.code == 200) {
            this.props.refreshTable()
        }
    }

    saveFormData(fmdata,uuid, changeValue, as_virtual, optionType) {
        if(uuid!=''){
            fmdata.uuid=uuid
        }
        console.log(changeValue, "保存数据",fmdata);
        let data = {
            actcode: this.props.commonTableStore.action_code,
            rawdata: fmdata
        };


        as_virtual == 'y'
            ?
            this.addVirtualData(fmdata, changeValue)
            :
            this.addRealApi(data);
    }

    render() {
        return <CommonModal
            height="500px"
            footer={ null }
            title="新增"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
        >
            <CommonTableForm
                as_virtual={ this.props.as_virtual }
                editable={ true }
                optionType='add'
                onChange={ this.props.onChange }
                hideModal={ () => this.hideModal() }
                formCfg={ this.props.commonTableStore.formCfg }
                layoutcfg={ this.props.commonTableStore.layoutcfg }
                staticformcfg={ this.props.commonTableStore.staticformcfg }
                selectedRows={ this.props.commonTableStore.selectedRows }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </CommonModal>
    }
}
