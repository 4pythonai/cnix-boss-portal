import React, { useState } from 'react';
import { Table, Modal, Button, Input, Icon, message, Select } from 'antd';
import FlowApprovalStore from '@/store/FlowApprovalStore'
import api from '@/api/api'



export default class CabinetSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            current: 1,
            pageSize: 5,
            total: 24,
            dataSource: [],
            selectedRows: [],
            selectedRowKeys: [],
            cabinetcode: '',
            build_name:'',
            floor_name:'',
            room_name:'',
            room_list:[],
            // is_lock: 'n',
            rent_type: '',
            customer_name: '',
            idc_name :'',
            no:'',
            power_type:'',
            contract_no:'',
            ampere:'',
            onoff_status:'',
            billingdate:'',
            lastpaperno:'',
            u_number:''
        };
        this.handleOk = this.handleOk.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.deleterow = this.deleterow.bind(this)
    }
    componentDidMount() {
        console.log('查看room——list',this.props.rooms_list)
       if(this.props.rooms_list){
        this.setState({
            room_list: this.props.rooms_list,
            rent_type:this.props.rent_type,
            cabinetcode:this.props.cabinets?this.props.cabinets:''
        })
       }
        

    }
    onClick() {
        console.log(this.state.rent_type)
        this.setState({
            visible: true,
            selectedRowKeys: []
        })
        this.getTableData(this.state.build_name,this.state.floor_name,this.state.room_name,this.state.room_list,this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.idc_name,this.state.no,this.state.power_type,this.state.contract_no,this.state.ampere,this.state.onoff_status,this.state.billingdate,this.state.lastpaperno,this.state.u_number)
    }
    async getTableData(build_name,floor_name,room_name,room_list,cabinetcode,rent_type,customer_name,idc_name,no,power_type,contract_no,ampere,onoff_status,billingdate,lastpaperno,u_number) {
        let params = {
            data: {
                build_name:build_name,
                floor_name:floor_name,
                room_name:room_name,
                size: this.state.pageSize,
                page: this.state.current,
                cabinet_no: cabinetcode,
                rent_type: rent_type,
                customer_name: customer_name,
                room_list:room_list,
                idc_name :idc_name,
                no:no,
                power_type:power_type,
                contract_no:contract_no,
                ampere:ampere,
                onoff_status:onoff_status,
                billingdate:billingdate,
                lastpaperno:lastpaperno,
                u_number:u_number
            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getCabinetDataByRoomsOrOther(params);
        console.log(786, res.data)
        this.setState({
            dataSource: res.data,
            total: res.total,
        })
    }
    deleterow(event) {
        var data = this.state.selectedRows.concat(this.props.value.split(","))
        data = new Set(data)
        data = Array.from(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i] == event) {
                data.splice(i, 1)
            }
        }

        this.setState({
            selectedRows: data
        }, () => {
            this.props.onChange(JSON.stringify(data).substring(1, JSON.stringify(data).length - 1).replace(/\"/g, ""))
        })
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.getTableData(this.state.build_name,this.state.floor_name,this.state.room_name,this.state.room_list,this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.idc_name,this.state.no,this.state.power_type,this.state.contract_no,this.state.ampere,this.state.onoff_status,this.state.billingdate,this.state.lastpaperno,this.state.u_number)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        var arr = this.state.selectedRows
        for (var i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].cabinet_no)
        }
        if (this.props.value != '') {
            arr = arr.concat(this.props.value.split(","))
        }
        arr = new Set(arr)
        arr = Array.from(arr)
        this.setState({
            selectedRows: arr,
            selectedRowKeys
        })
    }
    changecode(event, data) {
        if (data == 'build_name') {
            this.setState({
                build_name: event.target.value
            })
        } else if (data == 'floor_name') {
            this.setState({
                floor_name: event.target.value
            })
        } else if (data == 'room_name') {
            this.setState({
                room_name: event.target.value
            })
        } else if (data == 'cabinet_no') {
            this.setState({
                cabinetcode: event.target.value
            })
        } else if (data == 'customer_name') {
            this.setState({
                customer_name: event.target.value
            })
        }else if (data == 'idc_name') {
            this.setState({
                idc_name: event.target.value
            })
        }else if (data == 'no') {
            this.setState({
                no: event.target.value
            })
        }else if (data == 'power_type') {
            this.setState({
                power_type: event.target.value
            })
        }else if (data == 'contract_no') {
            this.setState({
                contract_no: event.target.value
            })
        }else if (data == 'ampere') {
            this.setState({
                ampere: event.target.value
            })
        }else if (data == 'onoff_status') {
            this.setState({
                onoff_status: event.target.value
            })
        }else if (data == 'billingdate') {
            this.setState({
                billingdate: event.target.value
            })
        }else if (data == 'lastpaperno') {
            this.setState({
                lastpaperno: event.target.value
            })
        }else if (data == 'u_number') {
            this.setState({
                u_number: event.target.value
            })
        }

    }
    searchcabinet() {
        this.setState({
            current:1
        },()=>{
            this.getTableData(this.state.build_name,this.state.floor_name,this.state.room_name,this.state.room_list,this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.idc_name,this.state.no,this.state.power_type,this.state.contract_no,this.state.ampere,this.state.onoff_status,this.state.billingdate,this.state.lastpaperno,this.state.u_number)
        })
        
    }
    getrowdata() {
        console.log(777,this.props)
        let selectrow = []
        if (this.props.value != '') {
            selectrow = this.props.value.split(',')
        } else {
            selectrow = this.state.selectedRows
        }

        let rowdata = selectrow.map(selectrow => {
            return (<div style={ { display: 'inline-block', width: '50%', float: 'left' } } key={ selectrow }>
                <span style={ { marginRight: '10px' } }>
                    { selectrow }</span>
                    
                <span style={ { cursor: 'pointer' } } onClick={ () => this.deleterow(selectrow) }>
                <Icon type="close-circle" theme="filled" style={{ color: '#e80d11' }}/>
                </span>
                </div>)
        })
        return rowdata
    }
    getSearchButtonButtonGrp() {
        return <div>
             <span>
             <span style={ {marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>所属IDC:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'idc_name') } />
                    </span>
                </span>
             <span style={ {marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼宇:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'build_name') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>所属楼层:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'floor_name') } />
                    </span>
                </span>
                <br/><br/>
                <span style={ {marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>房间号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'room_name') } />
                    </span>
                </span>
                 <span style={ {marginRight: '102px' } }>
                     <span style={ { marginRight: '15px' } }>机柜编号:</span>
                     <span style={ { marginRight: '15px' } }>
                         <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'cabinet_no') } />
                     </span>
                 </span>
                 <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>客户名称:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'customer_name') } />
                    </span>
                </span>

                <br/><br/>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '8px' } }>租赁状态:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'rent_type') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '42px' } }>序号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'no') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>加电状态:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'power_type') } />
                    </span>
                </span>
                <br/><br/>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>合同号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'contract_no') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '1px' } }>单机柜电量:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'ampere') } />
                    </span>
                </span>
                
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '7px' } }>上下架状态:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'onoff_status') } />
                    </span>
                </span>
                <br/><br/>
                <span style={ { marginRight: '58px' } }>
                    <span style={ { marginRight: '8px' } }>计费时间:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'billingdate') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '3px' } }>最近操作的工单号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'lastpaperno') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '25px' } }>机柜U数:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'u_number') } />
                    </span>
                </span>
                {/* <span style={ {marginRight: '102px' } }>
                    <span style={ { marginRight: '10px'} }>是否上锁:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Select defaultValue={ 'n'} style={{ width: 190 }} onChange={ event => this.changecode(event, 'is_lock') }>
                            <Option value="y">是</Option>
                            <Option value="n">否</Option>
                        </Select>
                    </span>
                </span> */}
                 
                <Button
                    onClick={ event => this.searchcabinet(event) }
                    size="default"
                    type="primary"
                    style={ { margin: '15px 20px', marginLeft: '0px' } }>搜索</Button>
           </span>
        </div>
    }
    handleOk() {
        this.setState({
            visible: false
        })
        this.props.onChange(JSON.stringify(this.state.selectedRows).substring(1, JSON.stringify(this.state.selectedRows).length - 1).replace(/\"/g, ""))
    }
    handleCancel() {
        this.setState({
            visible: false,
            selectedRows: []
        })

    }
    render() {
        const columns = [
            {
                title: '机柜编号',
                dataIndex: 'cabinet_no',
                key: 'cabinet_no',
            },
            {
                title: '所属IDC',
                dataIndex: 'idc_site',
                key: 'idc_site',
            },
            {
                title: '所属楼宇',
                dataIndex: 'build_name',
                key: 'build_name',
            },
            {
                title: '所属楼层',
                dataIndex: 'floor_name',
                key: 'floor_name',
            },
            {
                title: '房间号',
                dataIndex: 'room_name',
                key: 'room_name',
            },
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: '租赁状态',
                dataIndex: 'rent_type',
                key: 'rent_type',
            },
            {
                title: '加电状态',
                dataIndex: 'powered',
                key: 'powered',
            },
            {
                title: '机柜U数',
                dataIndex: 'u_number',
                key: 'u_number',
            },
            {
                title: '机柜资产归属',
                dataIndex: 'owner_type',
                key: 'owner_type',
            },
        ];
        const dataSource = this.state.dataSource
        // for (var k = 0; k < dataSource.length; k++) {
        //     if (dataSource[k].is_lock == 'n') {
        //         dataSource[k].is_lock = '否'
        //     } else if (dataSource[k].is_lock == 'y') {
        //         dataSource[k].is_lock = '是'
        //     }
        // }

        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            getCheckboxProps: record => ({
                disabled: record.is_lock == 'y'// Column configuration not to be checked
                // name: record.name,
            }),

        }

        return (
            <div>
                <Button onClick={ this.onClick }>选择机柜</Button>
                <div>
                    { this.getrowdata() }
                </div>
                <Modal
                    title="选择机柜"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    okText="确认"
                    cancelText="取消"
                    width="1200px"
                    visible={ this.state.visible }
                >
                    { this.getSearchButtonButtonGrp() }
                    <Table
                        rowSelection={ rowSelection }
                        rowKey={ item => item.id }
                        dataSource={ dataSource }
                        scroll={ { x: '2000px' } }
                        columns={ columns }
                        pagination={ {  // 分页
                            current: this.state.current,
                            pageSize: this.state.pageSize,
                            total: this.state.total,
                            onChange: this.changePage,
                        } }
                    />
                </Modal>


            </div>

        )
    }
}