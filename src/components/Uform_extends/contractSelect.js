import React, { useState } from 'react';
import { Form, Select, Table, Modal, Button, Input, Icon, message } from 'antd';
import api from '@/api/api'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

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
        };
        this.handleOk = this.handleOk.bind(this)
        this.handleOk1 = this.handleOk1.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCancel1 = this.handleCancel1.bind(this)
        this.changeValue = this.changeValue.bind(this)
    }
    async componentDidMount() {
        console.log(132,this.props.selectedRow)
        if (this.props.selectedRow && this.props.selectedRow.contractno != null) {
            let params = {
                data: {
                    id: this.props.selectedRow.ghost_contractno,
                    contract_action: 'IDCReceiveContract'
                },
                method: 'POST'
            }
            let res = await api.contract_api.getContractDetail(params)
            if (res.code == 200) {
                let arr=[{
                    customerName:res.data.customName,
                    addressName:res.data.address
                }]
                res.data.sign_customers=arr
                console.log(112233,res.data)
                this.setState({
                    contractDetail: res.data
                })
                this.props.onChange(this.props.selectedRow.ghost_contractno)

            }
        }

    }
    onClick() {
        this.setState({
            visible: true,
        })
    }
    getrowdata() {
        console.log(345,this.state.contractDetail)
        let selectrow = []
        if (this.props.value != '') {

            selectrow.push(this.state.contractDetail)

        } else {
            selectrow = this.state.selectedRows
        }
        if (selectrow[0] && selectrow[0].sign_customers) {
            console.log(234)
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
                if (this.props.action_code == 'boss_engineering_construction') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%', float: 'left' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%', float: 'left' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        {/* } */}
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>带宽资源 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{carrier}</span>
                        </p>


                    </div> : '')
                } else if (this.props.action_code == 'boss_resource_survey') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>线路类型 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{jumper_type}</span>
                        </p>
                    </div> : '')
                } else if (this.props.action_code == 'boss_technology_construction') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>接入类型 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{jumper_type}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '36%', position: 'relative', left: '-28px' }}>合同起止日期 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_start_date}<br />{selectrow.contract_end_date}</span>
                        </p>


                    </div> : '')
                } else if (this.props.action_code == 'boss_fiber_resource_application') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.action_code == 'boss_optical_fiber_resource_rent_back') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                } else if (this.props.action_code == 'boss_resource_change') {
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >
                        <p style={{ margin: '10px 0px' }}>
                            <span style={{ margin: '0px' }}>合同号：</span>
                            <span>{selectrow.contract_no}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户地址 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].addressName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '26px' }}>带宽 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{res_id}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>接入类型 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{jumper_type}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '36%', position: 'relative', left: '-28px' }}>合同起止日期 : </span>
                            <span style={{ display: 'inline-block', width: '64%', position: 'relative', left: '-25px' }}>{selectrow.contract_start_date}<br />{selectrow.contract_end_date}</span>
                        </p>


                    </div> : '')
                }else if(this.props.action_code == 'boss_reserved_resource_application'){
                    return (selectrow.contract_no != null ? <div style={{ marginLeft: '-60px' }} key='1' >                       
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', float: 'left' }}>客户名称 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.sign_customers[0]?selectrow.sign_customers[0].customerName:null}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative', left: '15px' }}>联系人 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPerson}</span>
                        </p>
                        <p style={{ margin: '0px 0px 0px -17px' }}><span style={{ display: 'inline-block', width: '27%', position: 'relative' }}>联系电话 : </span>
                            <span style={{ display: 'inline-block', width: '73%' }}>{selectrow.contactPhone}</span>
                        </p>


                    </div> : '')
                }

            })
            return rowdata
        } else {
            console.log(123)
            let rowdata = null
            return rowdata
        }


    }
    async handleOk() {
        if (this.state.selectedRows.length != 0) {
            let params = {
                data: {
                    id: this.state.selectedRows[0].id,
                    contract_action: 'IDCReceiveContract'
                },
                method: 'POST'
            }
            let res = await api.contract_api.getContractDetail(params)
            if (res.code == 200) {
                if (res.data.sign_customers.length == 1) {
                    this.setState({
                        visible: false,
                        contractDetail: res.data
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

                // ()=>{this.props.commonTableStore.setContractno(res.data.contract_no)}

            }
            this.props.onChange(this.state.selectedRows[0].id)
        } else {
            message.error('您还没有选择合同，请选择')
        }

    }
    sendData(selectedRows) {
        console.log(selectedRows)
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
        if(res.code==200){
            this.setState({
                visible1:false
            })
        }
        let params1 = {
            data: {
                id: this.state.selectedRows[0].id,
                contract_action: 'IDCReceiveContract'
            },
            method: 'POST'
        }
        let res1 = await api.contract_api.getContractDetail(params1)
        if(res1.code==200){
            var arr=[]
            for(var i=0;i<res1.data.sign_customers.length;i++){
                if(res1.data.sign_customers[i].customerId==this.state.customerid){
                    arr.push(res1.data.sign_customers[i])
                }
            }
            res1.data.sign_customers=arr
            console.log(777,res1.data)
            this.setState({
                visible:false,
                contractDetail:res1.data
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
                        key='boss_contract_work_order'
                        action_code='boss_contract_work_order'
                        ref="commonTableRef"
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