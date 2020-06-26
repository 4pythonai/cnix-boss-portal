import React, { useState } from 'react';
import { Table, Modal, Button, Input, Icon, message, Select } from 'antd';
import FlowApprovalStore from '@/store/FlowApprovalStore'
import api from '@/api/api'

export default class UncompletedCabinetSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            current: 1,
            pageSize: 5,
            total: 24,
            dataSource: [],
            renderselectedRowKeys:[],
            selectedRowKeys: [],
            cabinetcode: '',
            idc_site: '',
            build_name: '',
            floor_name: '',
            room_name: '',
            PrevSelectedCabinets: ''
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
        
       
        

    }
    async onClick() {
        await this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
        this.setState({
            visible: true,
            selectedRowKeys: []
        })
    }
    async getTableData(idc_site, build_name, floor_name, room_name, cabinetcode) {
        let params = {
            data: {
                size: this.state.pageSize,
                currentPage : this.state.current,
                cabinet_no: cabinetcode,
                idc_site: idc_site,
                build_name: build_name,
                floor_name: floor_name,
                room_name: room_name,
                paperno:this.props.paperno
            },
            method: 'POST'
        }
        let res = await api.api_resource.getCabinetDataByPPowerenId(params);
        this.setState({
            dataSource: res.data,
            total: res.total,
        })
    }
    deleterow(event) {
        var data = this.state.renderselectedRowKeys
        for (var i = 0; i < data.length; i++) {
            if (data[i] == event) {
                data.splice(i, 1)
            }
        }

        this.setState({
            renderselectedRowKeys: data
        }, () => {
            this.props.onChange(this.state.renderselectedRowKeys)
        })
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys:selectedRowKeys
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
        }


    }
    searchcabinet() {
        this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
    }
    getrowdata() {

        let rowdata = this.state.renderselectedRowKeys.map(selectrow => {
            return (<div style={ { display: 'inline-block', width: '50%', float: 'left' } } key={ selectrow }>
                <span style={ { marginRight: '10px' } }>
                    { selectrow }</span>
                <span style={ { cursor: 'pointer' } } onClick={ () => this.deleterow(selectrow) }>
                <Icon type="close-circle" theme="filled" style={{ color: '#e80d11' }}/>
                    </span></div>)
        })
        return rowdata
    }
    getSearchButtonButtonGrp() {
        return <div>
            <span>
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
                    <span style={ { marginRight: '15px' } }>机柜编号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'cabinet_no') } />
                    </span>
                </span>
                <Button
                    onClick={ event => this.searchcabinet(event) }
                    size="default"
                    type="primary"
                    style={ { margin: '15px 20px', marginLeft: '0px' } }>搜索</Button>
            </span>
        </div>
    }
    handleOk() {
        var keys=this.state.renderselectedRowKeys
        var rowkeys=this.state.selectedRowKeys
        for(var a=0;a<rowkeys.length;a++){
            if(keys.indexOf(rowkeys[a])==-1){
                keys.push(rowkeys[a])
            }
        }
        this.setState({
            visible: false,
            renderselectedRowKeys:keys
        },()=>{
            this.props.onChange(this.state.renderselectedRowKeys)
        })
        
    }
    handleCancel() {
        this.setState({
            visible: false,
            selectedRowKeys: []
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
                dataIndex: 'idc_id',
                key: 'idc_id',
            },
            {
                title: '所属楼宇',
                dataIndex: 'building_id',
                key: 'building_id',
            },
            {
                title: '所属楼层',
                dataIndex: 'floor_id',
                key: 'floor_id',
            },
            {
                title: '房间号',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: '租赁状态',
                dataIndex: 'rent_type',
                key: 'rent_type',
            },
            {
                title: '机柜U数',
                dataIndex: 'u_number',
                key: 'u_number',
            }
        ];
        const dataSource = this.state.dataSource
        

        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            getCheckboxProps: record => ({
                disabled: record.is_lock == '加锁'?true:false
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
                        rowKey={ item => item.cabinet_no }
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