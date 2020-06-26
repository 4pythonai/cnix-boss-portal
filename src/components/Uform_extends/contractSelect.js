import React, { useState } from 'react';
import { Form, Select, Table, Modal, Button, Input, Icon, message,Radio } from 'antd';
import api from '@/api/api'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import DetailWrapper from '@/routes/contract/components/detailCom/detailWrapper'
import ContractSelectTable from './contractSelectTable'
import navigationStore from '@/store/navigationStore'
import { inject, observer } from 'mobx-react'
@inject('IDC_cfg_store')
export default class ContractSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            visible1: false,
            selectedRows: [],
            contractDetail: {},
            customerList: [],
            customerid: '',
            chargeData:[],
            selectedKeys:[],
            charageSelectedId:''
        };
        this.store = this.props.IDC_cfg_store
        this.handleOk = this.handleOk.bind(this)
        this.handleOk1 = this.handleOk1.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCancel1 = this.handleCancel1.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.getcharageSelectedId=this.getcharageSelectedId.bind(this)
    }
    async componentDidMount() {
        console.log(123123123,navigationStore.currentMenu.process_key)
        if (this.props.commontablestore.selectedRows[0] && this.props.commontablestore.selectedRows[0].contractno != null) {
            if(this.props.commontablestore.action_code=='after_sales_technical_support'){
                let params = {
                      data: {
                            id: this.props.commontablestore.selectedRows[0].contractno,
                            contract_action:'IDCReceiveContract'
                             },
                          method: 'POST'
                        }
                    var resjson = await api.contract_api.getContractDataById(params)
            }else{
                // let process_key=navigationStore.currentMenu.process_key
            // if(this.props.commontablestore.action_code=='boss_sales_change_contract'||this.props.commontablestore.action_code=='sales_con_tovoid'){
            //     process_key=this.props.commontablestore.selectedRows[0].contracttype=='收款'?    'idc_order':this.props.commontablestore.selectedRows[0].contracttype=='付款'?'idc_order_payment':'idc_order_stop'
            // }else{
            //     process_key='idc_order'
            // }
            let params = {
                  data: {
                    //       contract_no: this.props.commontablestore.selectedRows[0].contractno,
                          uuid:this.props.commontablestore.selectedRows[0].uuid,
                          process_key:navigationStore.currentMenu.process_key
                         },
                      method: 'POST'
                    }
                var resjson = await api.contract_api.getContractByUUID(params)
            }
            
            if (resjson.code == 200) {
                let arr = [{
                    customerName: resjson.data.customName,
                    addressName: resjson.data.address
                }]
                resjson.data.sign_customers = arr
                this.setState({
                    contractDetail: resjson.data,
                    chargeData:resjson.data.chargeData
                })
                if(this.props.commontablestore.action_code=='boss_idc_isp_retreat_line'||this.props.commontablestore.action_code=='idc_network_close_order'){
                    
                    var arr1=[]
                    arr1.push(this.props.commontablestore.selectedRows[0].chagredataId)
                    this.setState({
                    selectedKeys:arr1
                })
                }
                
                this.props.onChange(this.props.commontablestore.selectedRows[0].ghost_contractno?this.props.commontablestore.selectedRows[0].ghost_contractno:this.props.commontablestore.selectedRows[0].contractno)

            }
        }

    }
    onClick() {
        this.setState({
            visible: true,
        })
    }
    getrowdata() {
        let selectrow = []
        if (this.props.value != '') {
            selectrow.push(this.state.contractDetail)
        } else {
            selectrow = this.state.selectedRows
        }
        if (selectrow[0] && selectrow[0].sign_customers) {

            let rowdata = selectrow.map(selectrow => {
                if (selectrow.chargeData) {
                    var res_id = ''
                    var jumper_type = ''
                    var carrier = ''
                    for (var i = 0; i < selectrow.chargeData.length; i++) {
                        if (selectrow.chargeData[i].res_id == '7' && selectrow.chargeData[i].billing_methods == 'using_fee_fixed_without_overflow') {
                            res_id = selectrow.chargeData[i].bandwidth_type
                        }
                        if (selectrow.chargeData[i].res_id == '9') {
                            jumper_type = selectrow.chargeData[i].jumper_type
                        }
                        if (selectrow.chargeData[i].res_id == '7' || selectrow.chargeData[i].res_id == '14') {
                            carrier = selectrow.chargeData[i].carrier
                        }
                    }
                }
                if (this.props.commontablestore.action_code == 'boss_engineering_construction') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        {/* } */}
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>带宽资源 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{carrier}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_resource_survey') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>线路类型 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{jumper_type}</span>
                        </p>
                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_technology_construction') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>接入类型 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{jumper_type}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '26%', position: 'relative', left: '-28px' }}>合同起始时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_start_date}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '26%', position: 'relative', left: '-28px' }}>合同结束时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_end_date}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_fiber_resource_application') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_optical_fiber_resource_rent_back') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_resource_change') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>接入类型 : </span>
                            <span style={{ display: 'inline-block', width: '81%' }}>{jumper_type}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '26%', position: 'relative', left: '-28px' }}>合同起始时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_start_date}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '26%', position: 'relative', left: '-28px' }}>合同结束时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_end_date}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_reserved_resource_application') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_new_resources_order') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '21%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '21%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '21%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -49px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>新增机柜电量 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.cabinet_electricity_count[0] ? selectrow.cabinet_electricity_count[0].keyvalue : null}(M)</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_close_resources_order') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.commontablestore.action_code == 'boss_idc_termination_agreement' || this.props.commontablestore.action_code == 'boss_sales_change_contract' || this.props.commontablestore.action_code == 'sales_con_tovoid') {
                    if (this.state.selectedRows[0]) {
                        let processkey=this.state.selectedRows[0].concat?this.state.selectedRows[0].concat:''
                        return <div style={{ marginLeft: '-430px', marginRight: '-240px' }}>
                            <DetailWrapper
                                isShowFlowHistory={false}
                                defaultProps={{
                                    process_key: processkey.indexOf('pay')!=-1?'idc_order_payment':processkey.indexOf('agreement')!=-1?'idc_order_stop':'idc_order',
                                    uuid: this.state.selectedRows[0].uuid,
                                    readonly: true,
                                    action_code: 'boss_contract_work_order',
                                    page_source: 'detail'
                                }} // IDC合同专用开关} 
                                key='1' />

                        </div>
                    } else {
                        return <div style={{ marginLeft: '-430px', marginRight: '-240px' }}>
                            <DetailWrapper
                                isShowFlowHistory={false}
                                defaultProps={{
                                    process_key: 'idc_order',
                                    uuid: selectrow.uuid,
                                    readonly: true,
                                    action_code: 'boss_contract_work_order',
                                    page_source: 'detail'
                                }} // IDC合同专用开关} 
                                key='1' />
                        </div>
                    }

                }else if(this.props.commontablestore.action_code =='boss_idc_retreat_line'){
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px 0px 0px' }}>
                            <span>合同号：</span>
                            <span  style={{ marginLeft: '8px' }}>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '21%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '21%', position: 'relative', left: '1px' }}>合同金额 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_money?selectrow.contract_money:''}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '28%', position: 'relative', left: '-28px' }}>合同起始时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_start_date}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '28%', position: 'relative', left: '-28px' }}>合同结束时间 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_end_date}</span>
                        </p>
                        


                    </div> : '')
                }else if(this.props.commontablestore.action_code=='after_sales_technical_support'||this.props.commontablestore.action_code=='boss_reverse_dn_resolution'||this.props.commontablestore.action_code=='boss_web_traffic_monitoring'){
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                    <p style={{ margin: '10px 0px 0px 0px' }}>
                        <span>合同号：</span>
                        <span  style={{ marginLeft: '8px' }}>{selectrow.contract_no}</span>
                    </p>
                    <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                    


                </div> : '')
                }else if(this.props.commontablestore.action_code=='boss_idc_isp_retreat_line'||this.props.commontablestore.action_code=='idc_network_close_order'){
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                    <p style={{ margin: '10px 0px 0px 0px' }}>
                        <span>合同号：</span>
                        <span  style={{ marginLeft: '8px' }}>{selectrow.contract_no}</span>
                    </p>
                    <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].customerName : null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '19%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '81%', float: 'left' }}>{selectrow.sign_customers[0] ? selectrow.sign_customers[0].addressName : null}</span>
                        </p>
                    
                    <ContractSelectTable selectedKeys={this.state.selectedKeys} getcharageSelectedId={this.getcharageSelectedId} chargeData={this.state.chargeData}></ContractSelectTable>

                </div> 
                
                : '')
                }

            })
            return rowdata
        } else {
            let rowdata = null
            return rowdata
        }


    }
    getcharageSelectedId(msg){
        this.props.onChange(this.state.selectedRows[0].id+'-'+msg)
    }
    async handleOk() {
        if (this.state.selectedRows.length != 0) {
            let contractaction=this.state.selectedRows[0].concat?this.state.selectedRows[0].concat:''
            let params = {
                data: {
                    uuid: this.state.selectedRows[0].uuid,
                    process_key: contractaction.indexOf('pay')!=-1?'idc_order_payment':contractaction.indexOf('agreement')!=-1?'idc_order_stop':'idc_order'
                },
                method: 'POST'
            }
            let res = await api.contract_api.getContractByUUID(params)
            if (res.code == 200) {
                if (res.data.sign_customers.length == 1) {
                    this.setState({
                        visible: false,
                        contractDetail: res.data,
                        chargeData:res.data.chargeData
                    })



                    let params1 = {
                        data: {
                            id: this.state.selectedRows[0].id,
                            customer_id: res.data.sign_customers[0].customerId
                        },
                        method: 'POST'
                    }
                    let res1 = await api.contract_api.updateContractCustomer(params1)


                } else {
                    this.setState({
                        visible1: true,
                        customerList: res.data.sign_customers
                    })
                }
                

            }
            this.props.onChange(this.state.selectedRows[0].id)
            if(this.props.commontablestore.action_code == 'boss_sales_change_contract'||this.props.commontablestore.action_code == 'sales_con_tovoid'){
                this.props.onChange(this.state.selectedRows[0].contract_no)
                this.store.setUuid(this.state.selectedRows[0].uuid)
                let contractaction=this.state.selectedRows[0].concat?this.state.selectedRows[0].concat:''
                this.store.setProcessKey( contractaction.indexOf('pay')!=-1?'idc_order_payment':contractaction.indexOf('agreement')!=-1?'idc_order_stop':'idc_order')
                this.store.getContractByUUID()
            }
            if (this.props.commontablestore.action_code == 'boss_idc_termination_agreement') {
                // this.props.onChange(this.state.selectedRows[0].contract_no)
                this.store.setUuid(this.state.selectedRows[0].uuid)
                this.store.getContractByUUID()
            }
            if(this.props.commontablestore.action_code =='after_sales_technical_support'||this.props.commontablestore.action_code=='boss_reverse_dn_resolution'||this.props.commontablestore.action_code=='boss_web_traffic_monitoring'){
                this.props.onChange(this.state.selectedRows[0].id+'-'+this.state.contractDetail.customName+'-'+this.state.contractDetail.address+this.state.charageSelectedId)
            }

        } else {
            message.error('您还没有选择合同，请选择')
        }

    }
    sendData(selectedRows) {

        this.setState({
            selectedRows: selectedRows,
        })
    }
    changeValue(value) {
        console.log(value)
        this.setState({
            customerid: value,
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
            selectedRows: []
        })

    }
    async handleOk1() {
        let params = {
            data: {
                id: this.state.selectedRows[0].id,
                customer_id: this.state.customerid
            },
            method: 'POST'
        }
        let res = await api.contract_api.updateContractCustomer(params)
        if (res.code == 200) {
            this.setState({
                visible1: false
            })
        }
        let contractaction=this.state.selectedRows[0].concat?this.state.selectedRows[0].concat:''
            let params1 = {
                data: {
                    uuid: this.state.selectedRows[0].uuid,
                    process_key: contractaction.indexOf('pay')!=-1?'idc_order_payment':contractaction.indexOf('agreement')!=-1?'idc_order_stop':'idc_order'
                },
                method: 'POST'
            }
            let res1 = await api.contract_api.getContractByUUID(params1)
        if (res1.code == 200) {
            var arr = []
            for (var i = 0; i < res1.data.sign_customers.length; i++) {
                if (res1.data.sign_customers[i].customerId == this.state.customerid) {
                    arr.push(res1.data.sign_customers[i])
                }
            }
            res1.data.sign_customers = arr
            this.setState({
                visible: false,
                contractDetail: res1.data
            },()=>{
                this.props.onChange(this.state.selectedRows[0].id)
            if(this.props.commontablestore.action_code == 'boss_sales_change_contract'||this.props.commontablestore.action_code == 'sales_con_tovoid'){
                this.props.onChange(this.state.selectedRows[0].contract_no)
                this.store.setUuid(this.state.selectedRows[0].uuid)
                let contractaction=this.state.selectedRows[0].concat?this.state.selectedRows[0].concat:''
                this.store.setProcessKey( contractaction.indexOf('pay')!=-1?'idc_order_payment':contractaction.indexOf('agreement')!=-1?'idc_order_stop':'idc_order')
                this.store.getContractByUUID()
            }
            if (this.props.commontablestore.action_code == 'boss_idc_termination_agreement') {

                this.store.setUuid(this.state.selectedRows[0].uuid)
                this.store.getContractByUUID()
            }
                if(this.props.commontablestore.action_code =='after_sales_technical_support'){
                this.props.onChange(this.state.selectedRows[0].id+'-'+this.state.contractDetail.customName+'-'+this.state.contractDetail.address)
            }
        })
        }


    }
    handleCancel1() {
        this.setState({
            visible1: false
        })

    }
    render() {
        const children = []
        let list = this.state.customerList
        for (var i = 0; i < list.length; i++) {
            children.push(<Select.Option key={list[i].customerId}>{list[i].customerName}</Select.Option>);
        }
        return (
            <div>
                <Button onClick={this.onClick}>选择合同</Button>
                <div>
                    {this.getrowdata()}
                </div>
                <Modal
                    title="选择合同"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1200px"
                    visible={this.state.visible}
                >
                    <CommonTable
                        ref="commonTableRef"
                        key='boss_contract_work_order'
                        action_code={this.props.uform_para || 'boss_contract_work_order'}
                        sendData={(res) => this.sendData(res)}
                    />
                </Modal>
                <Modal
                    title="选择客户："
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    okText="确认"
                    cancelText="取消"
                    width="400px"
                    visible={this.state.visible1}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <Form.Item label="选择客户：">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                optionFilterProp="children"
                                onChange={this.changeValue}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {children}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>

        )
    }
}