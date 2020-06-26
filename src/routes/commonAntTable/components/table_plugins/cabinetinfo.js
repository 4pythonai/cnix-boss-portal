import React from "react";
import { Modal, Collapse, Table, message, Form, Button, Divider, Input } from "antd";
import api from "@/api/api";

const { Panel } = Collapse;
export default class Cabinetinfo extends React.Component {
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
            emailvalue: '',
            remarkvalue: '',
            cabinetcode: '',
            build_name: '',
            floor_name: '',
            room_name: '',
            contract_no:''

        };
        console.log(props);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.formChange = this.formChange.bind(this)
        this.changePage=this.changePage.bind(this)
        this.collapseChange=this.collapseChange.bind(this)
        this.selectChange = this.selectChange.bind(this)
    }
    async init() {
        if (this.store.selectedRows.length != 1) {
            message.error("请选择一条客户数据");
            return;
        }
        this.setState({
            emailvalue: this.store.selectedRows[0].email
        })
        let params = {
            data: { custid: this.store.selectedRows[0].id },
            method: "POST"
        };
        let res = await api.cabinet_api.getCustCabinetInfo(params);
        if (res.code == 100) {
            this.setState({
                visible: true,
                cabinetinfo: res.cabinetinfo
            });
        }
    }
    async handleOk() {
        console.log(this.refs.formm)
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(this.state.emailvalue)) {
            message.error('请输入正确的邮箱')
            return
        }
        if (this.state.selectedRowKeys.length == 0) {
            message.error('请选择机柜')
            return
        }
        let data = {
            contract_no: this.state.contract_no,
            cabinets: this.state.selectedRowKeys,
            custemail: this.state.emailvalue,
            memo: this.state.remarkvalue
        }
        let params = { data: data, method: 'POST' }
        let res = await api.api_resource.salesAddPoweronOrder(params)
        if (res.code == 200) {
            this.setState({
                visible: false
            });
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
            onChange: this.selectChange
        };
        return (
            <div>
                <div>
            <span>
                
                <span style={ { marginLeft: '6px',marginRight: '100px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼宇:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input style={ { width: '190px' } } onChange={ event => this.changecode(event, 'build_name') } />
                    </span>
                </span>
                <span style={ { marginRight: '100px' } }>
                    <span style={ { marginRight: '15px' } }>所属楼层:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input style={ { width: '190px' } } onChange={ event => this.changecode(event, 'floor_name') } />
                    </span>
                </span>
                <br/>
                <span style={ { marginLeft: '10px',marginRight: '100px' } }>
                    <span style={ { marginRight: '22px' } }>房间号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input style={ { width: '190px' } } onChange={ event => this.changecode(event, 'room_name') } />
                    </span>
                </span>
                <span style={ { marginLeft: '6px',marginRight: '100px' } }>
                    <span style={ { marginRight: '15px' } }>机柜编号:</span>
                    <span style={ { marginRight: '15px' } }>
                        <Input style={ { width: '190px' } } onChange={ event => this.changecode(event, 'cabinet_no') } />
                    </span>
                </span>
                <Button
                    onClick={ event => this.searchcabinet(event) }
                    size="default"
                    type="primary"
                    style={ { margin: '15px 20px', marginLeft: '0px' } }>搜索</Button>
            </span>
        </div>
        <Table
                style={ { marginTop: "10px" } }
                pagination={ false }
                rowKey={ item => item.cabinet_no }
                rowSelection={ rowSelection }
                dataSource={ this.state.dataSource }
                columns={ columns }
                scroll={{x:'2000px'}}
                pagination={ {  // 分页
                    current: this.state.current,
                    pageSize: this.state.pageSize,
                    total: this.state.total,
                    onChange: this.changePage,
                } }
            />
            </div>
            
        );
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
        this.setState({
            current:1
        },()=>{this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)}
        ) 
    }
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)
        })
    }
    selectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    getcontractinfo() {
        return this.state.cabinetinfo.map(item => {
            return (
                <Panel header={ item.contract_no } key={ item.contract_no }>
                    { this.getcabinetinfo(item.contract_no) }
                </Panel>
            );
        });
    }
    formChange = (e, name) => {
        if (name == 'emailvalue') {
            this.setState({
                emailvalue: e.target.value
            })
        } else if (name == 'remarkvalue') {
            console.log()
            this.setState({
                remarkvalue: e.target.value
            })
        }

    }
    collapseChange(e){
        if(e){
            this.setState({
                contract_no:e.split('(')[0],
                selectedRowKeys:[],
                remarkvalue: '',
                cabinetcode: '',
                build_name: '',
                floor_name: '',
                room_name: ''
            },()=>{
                this.getTableData(this.state.build_name, this.state.floor_name, this.state.room_name, this.state.cabinetcode)
            })
        }
        
        
    }
    async getTableData(build_name, floor_name, room_name, cabinetcode) {
        let params = {
            data: {
                size: this.state.pageSize,
                currentPage: this.state.current,
                contract_no:this.state.contract_no,
                cabinet_no: cabinetcode,
                build_name: build_name,
                floor_name: floor_name,
                room_name: room_name
            },
            method: 'POST'
        }
        let res = await api.api_resource.getCabinetDataByCustomeridOrContractNo(params);
        this.setState({
            dataSource: res.data,
            total: res.total,
        })
    }
    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };
        return (
            <Modal
                title="客户机柜信息："
                onOk={ this.handleOk }
                okText="生成机柜上架工单"
                onCancel={ this.handleCancel }
                width="1000px"
                visible={ this.state.visible }
            >
                <Collapse accordion bordered={ false } onChange={this.collapseChange}>
                    { this.getcontractinfo() }
                </Collapse>
                <Divider />
                <div><h3>生成上架工单:</h3></div>
                <Form { ...layout } style={ { marginTop: '15px', padding: '20px' } } ref='formm'>
                    <Form.Item
                        label="客户邮箱"
                        name="email"
                    >
                        <Input value={ this.state.emailvalue } onChange={ event => this.formChange(event, 'emailvalue') } placeholder='请输入正确邮箱' />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <Input.TextArea value={ this.state.remarkvalue } onChange={ event => this.formChange(event, 'remarkvalue') } placeholder='请输入备注' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
