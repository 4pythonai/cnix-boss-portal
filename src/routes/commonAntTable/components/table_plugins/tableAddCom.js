import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import { message } from 'antd';

import { Card, Table, Button, Select, Collapse } from 'antd';

import CommonModal from '../commonTableCom/commonModal'
import navigationStore from '@/store/navigationStore'
import api from '@/api/api'
import {
    hashHistory
} from 'react-router'


@observer
export default class TableAddCom extends React.Component {
    state = {
        visible: false,
    }

    init(btncode) {
        console.log('button_code', this.props.parentTable.state.button_code)
        // console.log(btncode)

        this.props.commonTableStore.rowSelectChange([], [])
        this.refs.commonModalRef.showModal()
        this.props.commonTableStore.setTableAction('add_table')

    }
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
            await this.props.refreshTable()
            // 新增之后自动跳转到启动流程页面
            if (navigationStore.currentMenu.process_key != "" && navigationStore.currentMenu.process_key != null) {

                console.log(navigationStore)

                let data = {
                    process_key: navigationStore.currentMenu.process_key,
                    uuid: json.data.uuid,
                    transactid: json.data.transactid,
                    page_source: 'detail', // IDC合同专用 ISP合同专用
                    readonly: false,
                    init_node: 'y',
                    contract_no: json.data.contract_no ? json.data.contract_no : ''
                }
                // FlowApprovalStore.setInitNode('y');
                hashHistory.push({ pathname: `flow/FlowForm`, state: data });
            }

        }
    }

    saveFormData(fmdata, uuid, changeValue, as_virtual, optionType) {
        if (uuid != '') {
            fmdata.uuid = uuid
        }
        if (fmdata.customerid && fmdata.customerid != '') {
            fmdata.customerAddr = fmdata.customerid.split('-')[2]
            fmdata.customerid = fmdata.customerid.split('-')[0]


        }



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

        let tips = this.props.commonTableStore.tips

        return <CommonModal
            height="500px"
            footer={ null }
            title="新增记录"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
        >
            {
                tips ? <Card title="帮助信息" style={ { marginBottom: '12px' } }>
                    <p dangerouslySetInnerHTML={ { __html: tips } }>
                    </p>

                </Card>
                    : ''
            }



            <CommonTableForm
                as_virtual={ this.props.as_virtual }
                editable={ true }
                optionType='add'
                onChange={ this.props.onChange }
                hideModal={ () => this.hideModal() }
                formCfg={ this.props.commonTableStore.formCfg }
                referinfo={ this.props.commonTableStore.referinfo }
                dataGridcode={ this.props.dataGridcode }
                layoutcfg={ this.props.commonTableStore.layoutcfg }
                staticformcfg={ this.props.commonTableStore.staticformcfg }
                selectedRows={ this.props.commonTableStore.selectedRows }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
        </CommonModal >
    }
}
