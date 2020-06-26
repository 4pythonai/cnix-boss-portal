import React from "react";
import { Modal, Collapse, Table, message, Form, Button,DatePicker } from "antd";
import moment from 'moment';
import api from "@/api/api";
import { formatDate } from '../../../../utils/tools.js'

const { Panel } = Collapse;
export default class SetCabinetBillingTime extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.commonTableStore;
        this.state = {
            visible: false,
            cabinetinfo: [],
            dataSource: [],
            selectedRowKeys: [],
            datevalue: '',
            remarkvalue: ''
        };
        console.log(props);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.formChange = this.formChange.bind(this)
        this.selectChange = this.selectChange.bind(this)
    }
    async init() {
        if (this.store.selectedRows.length != 1) {
            message.error("请选择一条数据");
            return;
        }
        this.setState({
            selectedRowKeys: [],
            datevalue: formatDate(new Date())
        })
        // 获取机柜信息
        let params = {
            data: { uuid: this.store.selectedRows[0].uuid },
            method: "POST"
        };
        let res = await api.cabinet_api.getCompletedCabinets(params);
        if (res.code == 200) {
            this.setState({
                dataSource: res.data,
                visible: true
                
            });
        }
    }
    async handleOk() {

        console.log(this.state.datevalue)
        if (this.state.selectedRowKeys.length == 0) {
            message.error('请选择机柜')
            return
        }
        if(this.state.datevalue==''){
            message.error('请设置计费时间')
            return
        }
       //设置计费时间
        let data = {
            cabinets: this.state.selectedRowKeys,
            date: this.state.datevalue,
        }
        let params = { data: data, method: 'POST' }
        let res = await api.cabinet_api.setCabinetsBillingTime(params)
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
            <Table
                style={ { marginTop: "10px" } }
                pagination={ false }
                rowKey={ item => item.cabinet_no }
                rowSelection={ rowSelection }
                dataSource={ this.state.dataSource }
                columns={ columns }
            />
        );
    }
    selectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    formChange = (e, dateString) => {
        this.setState({
            datevalue:dateString
        })

    }
    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };
        console.log(new Date())
        return (
            <Modal
                title="设置机柜计费时间："
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width="1000px"
                visible={ this.state.visible }
            >
                { this.getcabinetinfo() }
                <Form { ...layout } style={ { marginTop: '15px', padding: '20px' } } ref='formm'>
                    <Form.Item
                        label="设置计费时间"
                        name="email"
                    >
                        <DatePicker value={moment(this.state.datevalue)} format="YYYY-MM-DD" onChange={this.formChange} placeholder='请选择时间' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
