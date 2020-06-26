import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
<<<<<<< HEAD
import {message} from 'antd';
import CommonModal from '../commonTableCom/commonModal'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import api from '@/api/api'
import {
    hashHistory
} from 'react-router'

=======
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

@observer
export default class TableAddCom extends React.Component {
    state = {
        visible: false,
    }

<<<<<<< HEAD
    init(btncode) {
        console.log('button_code', this.props.parentTable.state.button_code)
        // console.log(btncode)
        
        this.props.commonTableStore.rowSelectChange([], [])
        this.refs.commonModalRef.showModal()
        this.props.commonTableStore.setTableAction('add_table')

    }
=======
    init() {
        this.refs.commonModalRef.showModal()

        this.props.commonTableStore.setTableAction('add_table')
        // this.props.refreshTable()
    }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }

    addVirtualData = (formData, changeValue) => {
        console.log('this.props.commonTableStore.triggers', this.props.commonTableStore.triggers)
        formData = this.getGhostData(formData)
        let dataSource = [({ id: this.props.commonTableStore.dataSource.length + 1, ...formData }), ...this.props.commonTableStore.dataSource];
        this.props.commonTableStore.setDataSource(dataSource)
        changeValue && changeValue(this.props.commonTableStore.dataSource);
    }

    getGhostData = formData => {
        this.props.commonTableStore.triggers.map(item => {
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
<<<<<<< HEAD
            await this.props.refreshTable()
            // 新增之后自动跳转到启动流程页面
             if (navigationStore.currentMenu.process_key != "" && navigationStore.currentMenu.process_key != null) {
                let data = {
                    process_key: navigationStore.currentMenu.process_key,
                    uuid: json.data.uuid,
                    transactid: json.data.transactid,
                    page_source: 'detail', // IDC合同专用 ISP合同专用
                    readonly: false,
                    init_node: 'y',
                    contract_no: json.data.contract_no?json.data.contract_no:''
                }
                FlowApprovalStore.setInitNode('y');
                hashHistory.push({ pathname: `flow/FlowForm`, state: data });
            }

=======
            this.props.refreshTable()
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }
    }

    saveFormData(fmdata, uuid, changeValue, as_virtual, optionType) {
        if (uuid != '') {
            fmdata.uuid = uuid
        }
<<<<<<< HEAD
        if (fmdata.customerid && fmdata.customerid != '') {
            fmdata.customerAddr = fmdata.customerid.split('-')[2]
            fmdata.customerid = fmdata.customerid.split('-')[0]


        }
        if(this.props.commonTableStore.action_code=='after_sales_technical_support'||this.props.commonTableStore.action_code=='boss_reverse_dn_resolution'||this.props.commonTableStore.action_code=='boss_web_traffic_monitoring'){
            if(fmdata.contractno!=undefined){
                fmdata.customername = fmdata.contractno.split('-')[1]
            fmdata.customeraddr = fmdata.contractno.split('-')[2]
            fmdata.contractno = fmdata.contractno.split('-')[0]
            }
            
        }
        if(this.props.commonTableStore.action_code=='boss_idc_isp_retreat_line'||this.props.commonTableStore.action_code=='idc_network_close_order'){
             if(fmdata.contractno!=undefined){
                 if(fmdata.contractno.split('-')[1]==''){
                     message.error('请选择收费项')
                     return
                 }
                 fmdata.chagredataId=fmdata.contractno.split('-')[1]
                fmdata.contractno = fmdata.contractno.split('-')[0]
            
            }
        }
=======
        console.log(changeValue, "保存数据", fmdata);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
            height="500px"
=======
            height="1000"
            width="1000px"
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            footer={ null }
            title="新增"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
        >
<<<<<<< HEAD



=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            <CommonTableForm
                as_virtual={ this.props.as_virtual }
                editable={ true }
                optionType='add'
                onChange={ this.props.onChange }
                hideModal={ () => this.hideModal() }
                formCfg={ this.props.commonTableStore.formCfg }
<<<<<<< HEAD
                referinfo={ this.props.commonTableStore.referinfo }
                dataGridcode={ this.props.dataGridcode }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                layoutcfg={ this.props.commonTableStore.layoutcfg }
                staticformcfg={ this.props.commonTableStore.staticformcfg }
                selectedRows={ this.props.commonTableStore.selectedRows }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </CommonModal>
    }
}
