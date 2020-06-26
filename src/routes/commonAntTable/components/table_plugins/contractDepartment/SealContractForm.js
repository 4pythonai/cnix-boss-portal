import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'
import api from '@/api/api'
import ContractContainer from '@/routes/contract/components/contractContainer'
import FlowHistory from '@/routes/flow/containers/flowHistory'
import moment from 'moment';
import {
    SchemaForm,
    createFormActions,
    Field,
    FormItemGrid
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {

    const [value] = useState()
    let { selectedRows } = props.commonTableStore

    const selectedRow = selectedRows[0]

    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onFormMount').subscribe(async () => {

                // let archives_no = '';
                // if (selectedRow.archives_no) {
                //     archives_no = selectedRow.archives_no;
                // } else {
                //     let position = selectedRow.contract_no.indexOf('-');
                //     archives_no = selectedRow.contract_no.slice(0, position + 1)
                // }

                // setValue('archives_no', archives_no)

                getAllCustomerType()
            })

            // const setValue = (name, value) => {
            //     setFieldState(name, state => {
            //         state.value = value
            //     })
            // }


            const getAllCustomerType = async () => {
                let params = {
                    data: {},
                    method: 'POST'
                }
                let res = await api.contractManage.getAllCustomerType(params)
                let customerTypeList = res.data.map(({ id, category }) => ({ label: category, value: id }))
                setFieldState('customer_type', state => {
                    state.props.enum = customerTypeList
                })
            }
        }}
        labelCol={8}
        wrapperCol={12}
    >

        <FormItemGrid cols={[12,12]}>
            <Field
                type="string"
                title="档案号"
                name="archives_no"
                default=''
            />

 
            <Field
                type="string"
                title="客户类型"
                required
                name="customer_type"
                default ={selectedRow.ghost_customer_type_id}
            />
           

        </FormItemGrid>


        <FormItemGrid cols={[12, 12]}>
        <Field
                type="date"
                title="盖章日期"
                required
                name="seal_date"
                default={selectedRow.seal_date ? selectedRow.seal_date : moment(new Date()) }
            />
            <Field
                type="string"
                title="盖章备注"
                name="seal_note"
                default={selectedRow.seal_note || ''}
                x-component='textarea'
            />

        </FormItemGrid>



        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>保存</Button>
        </div>
    </SchemaForm>
}



export default class SealContractForm extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
            contract_info: []
        }
    }

    init = async () => {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.warning('请选择一条数据');
            return;
        }
        
        console.log(this.props.commonTableStore.selectedRowKeys) 
        
        // uuid: this.props.commonTableStore.selectedRows[0].uuid,


        this.setState({
            visible: true
        })


    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    async saveFormData(data) {
        let params = {
            data: {
                concat: this.props.commonTableStore.selectedRows[0].concat,
                ...data
            },
            method: 'POST'
        };

        let json = await api.contractManage.sealOperation(params)
        if (json.code == 200) {
            this.hideModal()
            this.props.refreshTable();
        }

    }


    getContractInfo = () => {
        if (!this.props.commonTableStore.selectedRows[0]) {
            return null
        }
        // let contract_action = this.props.commonTableStore.selectedRows[0].concat.indexOf('receive') != -1 ? "IDCReceiveContract" :this.props.commonTableStore.selectedRows[0].concat.indexOf('pay') != -1 ?'IDCPaymentsContract': "boss_idc_termination_agreement"
        let process_key = this.props.commonTableStore.selectedRows[0].concat.indexOf('receive') != -1 ? "idc_order"  :this.props.commonTableStore.selectedRows[0].concat.indexOf('pay') != -1 ?'idc_order_payment': 'idc_order_stop'

        
        let params = {
            page_source: 'detail',
            // contract_action: contract_action,
            uuid: this.props.commonTableStore.selectedRows[0].uuid,
            process_key: process_key,
            // contract_no: this.props.commonTableStore.selectedRows[0].contract_no
        }

        return <ContractContainer defaultProps={params} />


    }

    render() {
        if(this.props.commonTableStore.selectedRows[0]){
            var process_key = this.props.commonTableStore.selectedRows[0].concat.indexOf('receive') != -1 ? "idc_order" :this.props.commonTableStore.selectedRows[0].concat.indexOf('pay') != -1 ? 'idc_order_payment':'idc_order_stop'
            var uuid=this.props.commonTableStore.selectedRows[0].uuid
        }
        
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            width={1200}
            onCancel={() => this.hideModal()}
            title="盖章" >
            {this.getContractInfo()}
            <div style={{margin:'24px',fontWeight: 'bold' }}>流程记录</div>
            <FlowHistory uuid={uuid} process_key={process_key} />
            <GetFields
                commonTableStore={this.props.commonTableStore}
                saveFormData={this.saveFormData.bind(this)}
            />
        </Modal>
    }
}