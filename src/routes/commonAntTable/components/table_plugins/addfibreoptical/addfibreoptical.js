import CommonTableForm from '../../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../../commonTableCom/commonModal'
import navigationStore from '@/store/navigationStore'
import FlowApprovalStore from '@/store/FlowApprovalStore'
import fibreopticalconfig from './fibreopticalconfig'
import api from '@/api/api'
import {
    hashHistory
} from 'react-router'
import { Divider,Modal, message } from 'antd';


@observer
export default class Addfibreoptical extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        visible: false,
        fibreopticalconfig:fibreopticalconfig.formcfg

    }
    this.init=this.init.bind(this)
}
    init(btncode) {
        if(this.props.commonTableStore.selectedRows.length==0){
            message.error('请选择客户')
            return
        }else if(this.props.commonTableStore.selectedRows[0].isexternalrent=='n'){
            message.error('不是外租工单，无法生成光纤资源申请单')
            return
        }
        console.log(999999,this.props.commonTableStore)
        console.log('button_code', this.props.parentTable.state.button_code)
        this.refs.commonModalRef.showModal()

    }

    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }
    addRealApi = async data => {
        console.log(7778,this.props.commonTableStore)
        data.rawdata.customerid=this.props.commonTableStore.selectedRows[0].ghost_customerid
        data.rawdata.customerAddr=this.props.commonTableStore.selectedRows[0].customerAddr
        let params = { data: data, method: 'POST' };
        params.addurl = '/curd/addData';
        let json = await api.curd.addData(params);
        if (json.code == 200) {
            // await this.props.refreshTable()

        }
    }

    saveFormData(fmdata, uuid, changeValue, as_virtual, optionType) {
        let data = {
            actcode: "boss_fiber_resource_application",
            rawdata: fmdata
        };

            this.addRealApi(data);
    }
    render() {
        return <div>
        <CommonModal
            height="500px"
            footer={ null }
            title="生成光纤资源申请单"
            ref='commonModalRef'
            layoutcfg={ this.props.commonTableStore.layoutcfg }
        >
       <CommonTableForm
                editable={ true }
                optionType='add'
                onChange={ this.props.onChange }
                hideModal={ () => this.hideModal() }
                formCfg={ this.state.fibreopticalconfig }
                referinfo={ this.props.commonTableStore.referinfo }
                dataGridcode={ this.props.dataGridcode }
                layoutcfg={ this.props.commonTableStore.layoutcfg }
                staticformcfg={ this.props.commonTableStore.staticformcfg }
                commonTableStore={ this.props.commonTableStore }
                saveFormData={ this.saveFormData.bind(this) }
            />
    </CommonModal>
    </div>
    }
}
