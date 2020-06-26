import React, { useState } from 'react';
<<<<<<< HEAD
import { Table, Modal, Button, Input, Icon, message, Select } from 'antd';
import FlowApprovalStore from '@/store/FlowApprovalStore'
=======
import { Table, Modal, Button, Input, Icon, message } from 'antd';
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
            selectedRows: [],
<<<<<<< HEAD
            selectedRowKeys: [],
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            cabinetcode: '',
            idc_site: '',
            build_name: '',
            floor_name: '',
            room_name: '',
<<<<<<< HEAD
            is_lock:'n',
            rent_type: this.props.uform_para ? this.props.uform_para : this.props.query,
            PrevSelectedCabinets: '',
            customer_name: ''
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
        console.log(956,FlowApprovalStore)
        this.getPrevSelectedCabinets()
        if(FlowApprovalStore.processDefinitionKey=='disassembly_response'){
            for(var i=0;i<FlowApprovalStore.flowFormCfg.combinedRef.length;i++){
                if(FlowApprovalStore.flowFormCfg.combinedRef[i].bigtitle=='工单信息'){
                    this.setState({
                        customer_name:FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].客户名称
                    },()=>{this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)})
                }
            }
        }
        for(var i=0;i<FlowApprovalStore.flowFormCfg.combinedRef.length;i++){
            if(FlowApprovalStore.flowFormCfg.combinedRef[i].bigtitle=='工单信息'){
                this.setState({
                    idc_site:FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].机柜所在IDC?FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].机柜所在IDC:FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].预占机柜所在IDC?FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].预占机柜所在IDC:FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].拆机机柜所在IDC?FlowApprovalStore.flowFormCfg.combinedRef[i].bigdata[0].rows[0].拆机机柜所在IDC:''
                },()=>{this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)})
            }
        }
        

=======
        this.getTableData('', '', '', '', '')
        console.log(222,this.props)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
    onClick() {
        this.setState({
            visible: true,
<<<<<<< HEAD
            selectedRowKeys: []
        })
    }
    async getPrevSelectedCabinets() {
        let params = {
            data: {
                uuid: FlowApprovalStore.uuid
            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getPrevSelectedCabinets(params);
        if (res.code == 200) {
            let str = ''
            let prev_value = ''
            for (var i = 0; i < res.data.length; i++) {
                console.log('查看机柜编号', res.data[i])
                str += res.data[i].机柜编号;
                prev_value += i + 1 === res.data.length ? res.data[i].机柜编号 : res.data[i].机柜编号 + ','
            }

            // this.setState({

            //     //res.data
            //     PrevSelectedCabinets: str
            // })


            // this.setState({
            //     selectedRows: res.data

            // })


            this.setState({
                PrevSelectedCabinets: str
            })
            this.props.onChange(prev_value)
        }
    }
    async getTableData(idc_site, build_name, floor_name, room_name, cabinetcode, rent_type, customer_name,is_lock) {
=======
        })
    }
    async getTableData(idc_site,build_name,floor_name,room_name,cabinetcode) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let params = {
            data: {
                size: this.state.pageSize,
                page: this.state.current,
                cabinet_no: cabinetcode,
                idc_site: idc_site,
                build_name: build_name,
                floor_name: floor_name,
                room_name: room_name,
<<<<<<< HEAD
                rent_type: rent_type,
                customer_name: customer_name,
                is_lock:is_lock
=======


>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getCabinetTableData(params);
<<<<<<< HEAD
        console.log(786,res.data)
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.setState({
            dataSource: res.data,
            total: res.total,
        })
    }
    deleterow(event) {
        var data = this.state.selectedRows.concat(this.props.value.split(","))
        // var data = this.state.selectedRows.concat(JSON.parse(this.props.value))
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
            // this.props.onChange(JSON.stringify(this.state.selectedRows))
<<<<<<< HEAD
            this.props.onChange(JSON.stringify(data).substring(1, JSON.stringify(data).length - 1).replace(/\"/g, ""))
=======
            this.props.onChange(JSON.stringify(data).substring(1,JSON.stringify(data).length-1).replace(/\"/g, ""))
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        })
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
<<<<<<< HEAD
            this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        // var arr=[]
        var arr = this.state.selectedRows
=======
            this.getTableData(this.state.idc_site,this.state.build_name,this.state.floor_name,this.state.room_name,this.state.cabinetcode)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        var arr = []
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        for (var i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].cabinet_no)
        }
        if (this.props.value != '') {
            // arr = arr.concat(JSON.parse(this.props.value))
            arr = arr.concat(this.props.value.split(","))
        }
        arr = new Set(arr)
        arr = Array.from(arr)
        this.setState({
<<<<<<< HEAD
            selectedRows: arr,
            selectedRowKeys
=======
            selectedRows: arr
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        })
    }
    changecode(event, data) {
        if (data == 'idc_site') {
            this.setState({
<<<<<<< HEAD
                idc_site: event
=======
                idc_site: event.target.value
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
        } else if (data == 'customer_name') {
            this.setState({
                customer_name: event.target.value
            })
        }else if(data == 'is_lock'){
            this.setState({
                is_lock: event
            })
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }


    }
    searchcabinet() {
<<<<<<< HEAD
        this.getTableData(this.state.idc_site, this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode, this.state.rent_type, this.state.customer_name,this.state.is_lock)
=======
        this.getTableData(this.state.idc_site,this.state.build_name,this.state.floor_name,this.state.room_name,this.state.cabinetcode)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
    getrowdata() {
        let selectrow = []
        if (this.props.value != '') {
<<<<<<< HEAD
            selectrow = this.props.value.split(',')
=======
            selectrow=this.props.value.split(',')
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            // selectrow = JSON.parse(this.props.value)
        } else {
            selectrow = this.state.selectedRows
        }

        let rowdata = selectrow.map(selectrow => {
<<<<<<< HEAD
            return (<div style={ { display: 'inline-block', width: '50%', float: 'left' } } key={ selectrow }>
                <span style={ { marginRight: '10px' } }>
                    { selectrow }</span>
                <span style={ { cursor: 'pointer' } } onClick={ () => this.deleterow(selectrow) }>
                <Icon type="close-circle" theme="filled" style={{ color: '#e80d11' }}/>
                    </span></div>)
=======
            return (<div key={selectrow}>
                <span style={{ marginRight: '20px' }}>
                    {selectrow}</span>
                <span style={{ cursor: 'pointer' }} onClick={() => this.deleterow(selectrow)}>X</span></div>)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        })
        return rowdata
    }
    getSearchButtonButtonGrp() {
        return <div>
            <span>
<<<<<<< HEAD
                <span style={ { marginLeft: '6px', marginRight: '102px' } }>
                    <span style={ { marginRight: '15px'} }>所属IDC:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Select disabled={this.state.idc_site!=''?true:false} defaultValue={ this.state.idc_site } style={{ width: 190 }} onChange={ event => this.changecode(event, 'idc_site') }>
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
                        <Input disabled={this.state.customer_name!=''?true:false} defaultValue={ this.state.customer_name } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'customer_name') } />
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
=======
                <span style={{ marginLeft: '6px', marginRight: '100px' }}>
                    <span style={{ marginRight: '15px' }}>所属IDC:</span>
                    <span style={{ marginRight: '15px' }}>
                        <Input defaultValue={this.state.cabinetcode} style={{ width: '190px' }} onChange={event => this.changecode(event, 'idc_site')} />
                    </span>
                </span>
                <span style={{ marginRight: '100px' }}>
                    <span style={{ marginRight: '15px' }}>所属楼宇:</span>
                    <span style={{ marginRight: '15px' }}>
                        <Input defaultValue={this.state.cabinetcode} style={{ width: '190px' }} onChange={event => this.changecode(event, 'build_name')} />
                    </span>
                </span>
                <span style={{ marginRight: '100px' }}>
                    <span style={{ marginRight: '15px' }}>所属楼层:</span>
                    <span style={{ marginRight: '15px' }}>
                        <Input defaultValue={this.state.cabinetcode} style={{ width: '190px' }} onChange={event => this.changecode(event, 'floor_name')} />
                    </span>
                </span>

                <span style={{ marginRight: '100px' }}>
                    <span style={{ marginRight: '15px' }}>所属区域:</span>
                    <span style={{ marginRight: '15px' }}>
                        <Input defaultValue={this.state.cabinetcode} style={{ width: '190px' }} onChange={event => this.changecode(event, 'room_name')} />
                    </span>
                </span>
                <span>
                    <span style={{ marginRight: '15px' }}>机柜编码:</span>
                    <span style={{ marginRight: '15px' }}>
                        <Input defaultValue={this.state.cabinetcode} style={{ width: '190px' }} onChange={event => this.changecode(event, 'cabinet_no')} />
                    </span>
                </span>
                <Button
                    onClick={event => this.searchcabinet(event)}
                    size="default"
                    type="primary"
                    style={{ margin: '15px 20px' }}>搜索</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </span>
        </div>
    }
    handleOk() {
        this.setState({
            visible: false
        })
<<<<<<< HEAD
        this.props.onChange(JSON.stringify(this.state.selectedRows).substring(1, JSON.stringify(this.state.selectedRows).length - 1).replace(/\"/g, ""))
=======
        console.log(444,JSON.stringify(this.state.selectedRows).substring(1,JSON.stringify(this.state.selectedRows).length-1).replace(/\"/g, ""))
        // this.props.onChange(JSON.stringify(this.state.selectedRows))
        this.props.onChange(JSON.stringify(this.state.selectedRows).substring(1,JSON.stringify(this.state.selectedRows).length-1).replace(/\"/g, ""))
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
                title: '房间号',
=======
                title: '所属区域',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                dataIndex: 'room_name',
                key: 'room_name',
            },
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
<<<<<<< HEAD
            // {
            //     title: '是否上锁',
            //     dataIndex: 'is_lock',
            //     key: 'is_lock',
            // },
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
        for (var k = 0; k < dataSource.length; k++) {
            if (dataSource[k].is_lock == 'n') {
                dataSource[k].is_lock = '否'
            } else if (dataSource[k].is_lock == 'y') {
                dataSource[k].is_lock = '是'
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            getCheckboxProps: record => ({
                disabled: record.is_lock == '是' && this.state.PrevSelectedCabinets.indexOf(record.cabinet_no) == -1// Column configuration not to be checked
                // name: record.name,
            }),
=======
        // const selectChange=this.selectChange
        const rowSelection = {
            onChange: this.selectChange
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        }

        return (
<<<<<<< HEAD
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
=======
            <div>               
                <Button onClick={this.onClick}>选择机柜</Button>
                <div>
                    {this.getrowdata()}
                </div>
                <Modal
                    title="选择机柜："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1200px"
                    visible={this.state.visible}
                >
                    {this.getSearchButtonButtonGrp()}
                    <Table
                        rowSelection={rowSelection}
                        rowKey={item => item.id}
                        dataSource={dataSource}
                        scroll={{ x: '2000px' }}
                        columns={columns}
                        pagination={{  // 分页
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            current: this.state.current,
                            pageSize: this.state.pageSize,
                            total: this.state.total,
                            onChange: this.changePage,
<<<<<<< HEAD
                        } }
=======
                        }}
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    />
                </Modal>


            </div>

        )
    }
}