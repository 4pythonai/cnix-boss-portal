import React, { useState } from 'react';
import { Table, Modal, Button, Input, Icon, message } from 'antd';
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
            cabinetcode: '',
            idc_site: '',
            build_name: '',
            floor_name: '',
            room_name: '',
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
        this.getTableData('', '', '', '', '')
        console.log(222,this.props)
    }
    onClick() {
        this.setState({
            visible: true,
        })
    }
    async getTableData(idc_site,build_name,floor_name,room_name,cabinetcode) {
        let params = {
            data: {
                size: this.state.pageSize,
                page: this.state.current,
                cabinet_no: cabinetcode,
                idc_site: idc_site,
                build_name: build_name,
                floor_name: floor_name,
                room_name: room_name,


            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getCabinetTableData(params);
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
            this.props.onChange(JSON.stringify(data).substring(1,JSON.stringify(data).length-1).replace(/\"/g, ""))
        })
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.getTableData(this.state.idc_site,this.state.build_name,this.state.floor_name,this.state.room_name,this.state.cabinetcode)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        var arr = []
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
            selectedRows: arr
        })
    }
    changecode(event, data) {
        if (data == 'idc_site') {
            this.setState({
                idc_site: event.target.value
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
        }


    }
    searchcabinet() {
        this.getTableData(this.state.idc_site,this.state.build_name,this.state.floor_name,this.state.room_name,this.state.cabinetcode)
    }
    getrowdata() {
        let selectrow = []
        if (this.props.value != '') {
            selectrow=this.props.value.split(',')
            // selectrow = JSON.parse(this.props.value)
        } else {
            selectrow = this.state.selectedRows
        }

        let rowdata = selectrow.map(selectrow => {
            return (<div key={selectrow}>
                <span style={{ marginRight: '20px' }}>
                    {selectrow}</span>
                <span style={{ cursor: 'pointer' }} onClick={() => this.deleterow(selectrow)}>X</span></div>)
        })
        return rowdata
    }
    getSearchButtonButtonGrp() {
        return <div>
            <span>
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
            </span>
        </div>
    }
    handleOk() {
        this.setState({
            visible: false
        })
        console.log(444,JSON.stringify(this.state.selectedRows).substring(1,JSON.stringify(this.state.selectedRows).length-1).replace(/\"/g, ""))
        // this.props.onChange(JSON.stringify(this.state.selectedRows))
        this.props.onChange(JSON.stringify(this.state.selectedRows).substring(1,JSON.stringify(this.state.selectedRows).length-1).replace(/\"/g, ""))
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
                title: '所属区域',
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
        // const selectChange=this.selectChange
        const rowSelection = {
            onChange: this.selectChange

        }

        return (
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
                            current: this.state.current,
                            pageSize: this.state.pageSize,
                            total: this.state.total,
                            onChange: this.changePage,
                        }}
                    />
                </Modal>


            </div>

        )
    }
}