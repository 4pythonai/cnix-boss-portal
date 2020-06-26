import React, { useState } from 'react';
import { Table, Modal, Button, Input, Icon, message, Select } from 'antd';
import FlowApprovalStore from '@/store/FlowApprovalStore'
import api from '@/api/api'

export default class SelectCabinet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            current: 1,
            pageSize: 5,
            total: 24,
            dataSource: [],
            cabinetcode: '',
            idc_site: '',
            build_name: '',
            floor_name: '',
            room_name: '',
            is_lock:'n',
            rent_type: '',
            customer_name: '',
            selectedRows:[],
            selectedRowKeys: []
        };
        this.init=this.init.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.selectChange = this.selectChange.bind(this)
    }
    init() {
        this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
        this.setState({
            visible:true
        })

        

    }
    async getTableData(idc_site, build_name, floor_name, room_name, cabinetcode, rent_type, customer_name,is_lock) {
        let params = {
            data: {
                size: this.state.pageSize,
                page: this.state.current,
                cabinet_no: cabinetcode,
                idc_site: idc_site,
                build_name: build_name,
                floor_name: floor_name,
                room_name: room_name,
                rent_type: rent_type,
                customer_name: customer_name,
                is_lock:is_lock
            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getCabinetDataInformation(params);
        this.setState({
            dataSource: res.data,
            total: res.total,
        })
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
        })
    }
    changecode(event, data) {
        if (data == 'idc_site') {
            this.setState({
                idc_site: event
            })
        } else if (data == 'build_name') {
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
        }else if(data == 'is_lock'){
            this.setState({
                is_lock: event
            })
        }


    }
    searchcabinet() {
        this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
    }
    getSearchButtonButtonGrp() {
        return <div>
            <span>
                <span style={ { marginLeft: '6px', marginRight: '102px' } }>
                    <span style={ { marginRight: '15px'} }>所属IDC:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Select defaultValue={ this.state.idc_site } style={{ width: 190 }} onChange={ event => this.changecode(event, 'idc_site') }>
                            <Option value="">请选择</Option>
                            <Option value="东直门IDC">东直门IDC</Option>
                            <Option value="酒仙桥IDC">酒仙桥IDC</Option>
                            <Option value="燕郊IDC">燕郊IDC</Option>
                            <Option value="太和桥IDC">太和桥IDC</Option>
                            <Option value="房山IDC">房山IDC</Option>
                            <Option value="国富瑞IDC">国富瑞IDC</Option>
                            <Option value="上海嘉定IDC">上海嘉定IDC</Option>
                        </Select>
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼宇:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'build_name') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼层:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'floor_name') } />
                    </span>
                </span>
                <br /><br />
                <span style={ { marginLeft: '6px',marginRight: '102px' } }>
                    <span style={ { marginRight: '22px' } }>房间号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'room_name') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>机柜编码:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'cabinet_no') } />
                    </span>
                </span>
                <span style={ { marginRight: '102px' } }>
                    <span style={ { marginRight: '15px' } }>客户名称:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'customer_name') } />
                    </span>
                </span>
                <br />
                <br />
                <span style={ { marginLeft: '6px',marginRight: '102px' } }>
                    <span style={ { marginRight: '10px'} }>是否上锁:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Select defaultValue={ 'n'} style={{ width: 190 }} onChange={ event => this.changecode(event, 'is_lock') }>
                            <Option value="y">是</Option>
                            <Option value="n">否</Option>
                        </Select>
                    </span>
                </span>
                <br />
                <Button
                    onClick={ event => this.searchcabinet(event) }
                    size="default"
                    type="primary"
                    style={ { margin: '15px 20px', marginLeft: '0px' } }>搜索</Button>
                    <Button
                    onClick={ event => this.searchcabinet(event) }
                    size="default"
                    type="primary"
                    style={ { margin: '15px 20px', marginLeft: '0px' } }>编辑</Button>
            </span>
        </div>
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
        })

    }
    selectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRows: selectedRows,
            selectedRowKeys
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
        for (var k = 0; k < dataSource.length; k++) {
            if (dataSource[k].is_lock == 'n') {
                dataSource[k].is_lock = '否'
            } else if (dataSource[k].is_lock == 'y') {
                dataSource[k].is_lock = '是'
            }
        }
        const selectedRowKeys=this.state.selectedRowKeys
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange: this.selectChange,
            

        }
        return (
            <div>
                <Modal
                    title="选择机柜"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    okText="确认"
                    cancelText="取消"
                    width="100%"
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