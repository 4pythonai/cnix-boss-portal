import React from "react";
import { Modal, Collapse, Table, message, Form, Button, Divider, Input } from "antd";
import api from "@/api/api";

const { Panel } = Collapse;
export default class GroundingcabinetSelector extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.commonTableStore;
        this.state = {
            current: 1,
            pageSize: 5,
            total: 24,
            visible: false,
            cabinetinfo: [],
            dataSource: [],
            selectedRowKeys: [],
            cabinetcode: '',
            build_name: '',
            floor_name: '',
            room_name: '',
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.changePage=this.changePage.bind(this)
        this.selectChange = this.selectChange.bind(this)
    }
    async init() {
        if (this.store.selectedRows.length != 1) {
            message.error("请选择一条客户数据");
            return;
        }
        this.setState({
            visible:true
        })
        this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)
        let params = {
            data: { custid: this.store.selectedRows[0].id },
            method: "POST"
        };
        let res = await api.cabinet_api.getCustCabinetInfo(params);
        if (res.code == 100) {
            this.setState({
                cabinetinfo: res.cabinetinfo
            });

        }
    }
    async handleOk() {

        if (this.state.selectedRowKeys.length == 0) {
            message.error('请选择机柜')
            return
        }
        let contractarr = []
        let cabinetdata = this.state.cabinetinfo
        for (var j = 0; j < cabinetdata.length; j++) {
            let cabinetinfo = cabinetdata[j].contract_cabinet_info

            for (var k = 0; k < cabinetinfo.length; k++) {
                if (this.state.selectedRowKeys.indexOf(cabinetinfo[k].cabinet_no) != -1) {
                    if (contractarr.indexOf(cabinetdata[j].contract_no.split('(')[0]) == -1) {
                        contractarr.push(cabinetdata[j].contract_no.split('(')[0])
                    }

                }
            }
        }
        if (contractarr.length != 1) {
            message.error('请选择一个合同下的机柜')
        }
        let data = {
            contract_no: contractarr[0],
            cabinets: this.state.selectedRowKeys
        }
        let params = { data: data, method: 'POST' }
        let res = await api.api_resource.generateEnginnerStartCabinetPre(params)
        if (res.code == 200) {
            this.setState({
                visible: false
            });
            this.props.onCancel()
            
        }
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    getcabinetinfo(contract_no) {
        const columns = [
            {
                title: "机柜编号",
                dataIndex: "cabinet_no",
                key: "cabinet_no",
                className: "title"
            },
            {
                title: "所在IDC",
                dataIndex: "idc_id",
                key: "idc_id",
                className: "title"
            },
            {
                title: "所在楼宇",
                dataIndex: "building_id",
                key: "building_id",
                className: "title"
            },
            {
                title: "所在楼层",
                dataIndex: "floor_id",
                key: "floor_id",
                className: "title"
            },
            {
                title: "所在房间",
                dataIndex: "room_id",
                key: "room_id",
                className: "title"
            },
            {
                title: "租赁状态",
                dataIndex: "rent_type",
                key: "rent_type",
                className: "title"
            },
            {
                title: "上架时间",
                dataIndex: "lastoptime",
                key: "lastoptime",
                className: "title"
            },
            {
                title: "计费时间",
                dataIndex: "billingdate",
                key: "billingdate",
                className: "title"
            },

            {

                otitle: "流程状态",
                dataIndex: "noff_status",
                key: "noff_status",
                className: "title"


            }
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            getCheckboxProps: record => ({
                disabled: record.is_lock == '加锁'?true:false
            }),
        };
        return (
            <Table
                style={ { marginTop: "10px" } }
                pagination={ false }
                rowKey={ item => item.cabinet_no }
                rowSelection={ rowSelection }
                dataSource={ this.state.dataSource }
                columns={ columns }
                pagination={ {  // 分页
                    current: this.state.current,
                    pageSize: this.state.pageSize,
                    total: this.state.total,
                    onChange: this.changePage,
                } }
            />
        );
    }
    changePage(e) {
            this.setState({
                current: e
            }, () => {
                this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)
            })
        }
async getTableData(build_name, floor_name, room_name, cabinetcode) {
            let params = {
                data: {
                    size: this.state.pageSize,
                    currentPage: this.state.current,
                    customer_id:this.store.selectedRows[0].id,
                    cabinet_no: cabinetcode,
                    build_name: build_name,
                    floor_name: floor_name,
                    room_name: room_name
                },
                method: 'POST'
            }
            let res = await api.api_resource.getCabinetDataByCustomeridOrContractNo(params);
            console.log(786,res.data)
            this.setState({
                dataSource: res.data,
                total: res.total,
            })
        }
    selectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    searchcabinet() {
        this.setState({
            current:1
        },()=>{this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)}
        ) 
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
    getSearchButtonButtonGrp() {
        return <div>
            <span>
                
                <span style={ { marginLeft: '6px',marginRight: '100px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼宇:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'build_name') } />
                    </span>
                </span>
                <span style={ { marginRight: '100px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼层:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'floor_name') } />
                    </span>
                </span>
                <span style={ { marginLeft: '10px',marginRight: '100px' } }>
                    <span style={ { marginRight: '22px' } }>房间号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input defaultValue={ this.state.cabinetcode } style={ { width: '190px' } } onChange={ event => this.changecode(event, 'room_name') } />
                    </span>
                </span>
                <span style={ { marginLeft: '6px',marginRight: '100px' } }>
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
    render() {
        return (
            <Modal
                title="客户机柜信息："
                onOk={ this.handleOk }
                okText="生成机柜上架工单"
                onCancel={ this.handleCancel }
                width="1200px"
                visible={ this.state.visible }
            >
                    { this.getSearchButtonButtonGrp() }
                    { this.getcabinetinfo() }
            </Modal>
        );
    }
}
