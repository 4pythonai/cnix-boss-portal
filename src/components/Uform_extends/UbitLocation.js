import React from "react";
import { Modal, Collapse, Table, message, Form, Button, Input, Icon, Select } from "antd";
import api from "@/api/api";

export default class UbitLocation extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.commonTableStore;
        this.state = {
            visible: false,
            cabinetinfo: [],
            dataSource: [],
            cabinets: [],
            cabinetValue: '',
            selectedRowKeys: [],
            formvalue: "",
            UbitData: [],
            UbitDataview: []


        };
        this.handleOk = this.handleOk.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.formChange = this.formChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    handleOk() {
        var arr = this.state.selectedRowKeys;
        var ubitarr = this.state.UbitData
        for (var i = 0; i < arr.length - 1; i++) {
            if (parseInt(arr[i]) + 1 != parseInt(arr[i + 1])) {
                message.error("请选择连续的位置");
                return
            }
        }
        var dataarr = []
        for (var r = 0; r < arr.length; r++) {
            dataarr.push(arr[r].split('-')[0])
        }
        for (var j = 0; j < ubitarr.length; j++) {
            for (var k = 0; k < ubitarr[j].ubitList.length; k++) {
                if (dataarr.indexOf(ubitarr[j]['ubitList'][k]) != -1) {
                    message.error("您选择的U位有重复");
                    return
                }
            }
        }
        let obj = {};
        let objarr = []

        obj.deviceNumber = this.state.formvalue;
        for (var h = 0; h < this.state.selectedRowKeys.length; h++) {

            objarr.push(this.state.selectedRowKeys[h].split('-')[0]);

        }
        obj.ubitList = objarr
        let obej = {}
        let obejarr = []
        obej.deviceNumber = this.state.formvalue;
        for (var l = 0; l < this.state.selectedRowKeys.length; l++) {

            obejarr.push(this.state.selectedRowKeys[l].split('-')[1]);
        }
        obej.ubitList = obejarr
        this.setState(
            {
                UbitData: [obj, ...this.state.UbitData],
                UbitDataview: [obej, ...this.state.UbitDataview]
            }, () => { this.props.onChange(this.state.UbitData) }
        );

        this.setState({
            visible: false,
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    getcabinetinfo(contract_no) {

        const cabinetdasoure = this.state.dataSource;

        const customeruibt = this.state.cabinets;
        for (var i = 0; i < customeruibt.length; i++) {
            for (var j = 0; j < cabinetdasoure.length; j++) {
                if (
                    customeruibt[i].cabinet_ulocs.indexOf(
                        cabinetdasoure[j].cabinet_uloc
                    ) != -1
                ) {
                    cabinetdasoure[j].disabled = true;
                    if (
                        customeruibt[i].cabinet_ulocs.indexOf(
                            cabinetdasoure[j].cabinet_uloc
                        ) == 0
                    ) {
                        cabinetdasoure[j].remark = customeruibt[i].cabinet_ulocs.length + "";
                    } else {
                        cabinetdasoure[j].remark = "0";
                    }
                }
            }
        }

        const columns = [
            {
                title: "U位",
                dataIndex: "cabinet_uloc",
                key: "cabinet_uloc",
            },
            {
                title: "信息",
                dataIndex: "cabinet_no",
                key: "cabinet_no",
                render: (value, row, index) => {
                    if (row.remark == "0") {
                        return {
                            children: <span>{ value }</span>,
                            props: {
                                rowSpan: 0,
                            },
                        };
                    } else if (row.remark == null) {
                        return <span></span>;
                    } else {
                        return {
                            children: (
                                <span>
                                    客户名称：{ row.customer_id }；合同编号：
                                    { row.contract_no }
                                </span>
                            ),
                            props: {
                                rowSpan: parseInt(row.remark),
                            },
                        };
                    }
                },
            },
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            getCheckboxProps: (record) => ({
                disabled: record.disabled,
            }),
        };

        return (
            <Table
                style={ { marginTop: "10px" } }
                pagination={ false }
                rowKey={ (item) => item.id + '-' + item.cabinet_uloc }
                rowSelection={ rowSelection }
                dataSource={ cabinetdasoure }
                columns={ columns }
                bordered
            />
        );
    }
    selectChange(selectedRowKeys, selectedRows) {

        this.setState({
            selectedRowKeys: selectedRowKeys,
        });
    }
    formChange = (e) => {
        this.setState({
            formvalue: e.target.value,

        });
    };
    showModal() {

        this.setState({
            visible: true,
            selectedRowKeys: [],
            formvalue: "",
        });


    }
    getrowData() {
        return this.state.UbitDataview.map((item, index) => {
            return (
                <div key={ index }>
                    <span>设备号：{ item.deviceNumber }；</span>
                    <span>U位：{ item.ubitList.join(",") }</span>
                    <span
                        style={ { cursor: "pointer" } }
                        onClick={ () => this.deleterow(item) }
                        style={ { marginLeft: '30px' } }
                    >
                        <Icon
                            type="close-circle"
                            theme="filled"
                            style={ { color: "#e80d11" } }
                        />
                    </span>
                </div>
            );
        });
    }
    deleterow(item) {

        let data = this.state.UbitData
        let viewdata = this.state.UbitDataview
        for (var b = 0; b < viewdata.length; b++) {
            if (viewdata[b] == item) {
                data.splice(b, 1)
                viewdata.splice(b, 1)
            }
        }
        this.setState({
            UbitData: data,
            viewdata: viewdata
        }, () => {
            this.props.onChange(this.state.UbitData)
        })
    }
    async handleChange(e) {

        let params = {
            data: { cabinetno: e },
            method: "POST",
        };
        let res = await api.cabinet_api.getRetailInvestorsCabinet(params);
        if (res.code == 200) {
            this.setState({
                dataSource: res.data.result,
                cabinets: res.data.cabinets ? res.data.cabinets : [],
            });
        }
        this.setState({
            cabinetValue: e,
            selectedRowKeys: []
        })

    }
    getcabinet() {

        //后台获取机柜字符串,进行拆分到数组

        let cabinetstr = this.props.cabinetstr;

        let cabinetarr = cabinetstr.split(',')

        return <Select value={ this.state.cabinetValue } onChange={ this.handleChange }>
            { cabinetarr.map((item) => {
                return <Select.Option key={ item } value={ item }>{ item }</Select.Option>
            }) }
        </Select>


    }
    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                <Button onClick={ () => this.showModal() }>分配机位</Button>
                { this.getrowData() }
                <Modal
                    title="分配机位"
                    onOk={ this.handleOk }
                    okText="确定"
                    onCancel={ this.handleCancel }
                    width="800px"
                    visible={ this.state.visible }
                >
                    <Form { ...layout } style={ { marginTop: "15px" } } ref="formm">
                        <Form.Item label="选择机柜" name="cabinet">
                            { this.getcabinet() }
                        </Form.Item>
                    </Form>
                    { this.state.dataSource.length != 0 ? this.getcabinetinfo() : null }
                    <Form { ...layout } style={ { marginTop: "15px" } } ref="formm">
                        <Form.Item label="设备名称" name="email">
                            <Input
                                value={ this.state.formvalue }
                                onChange={ (event) => this.formChange(event) }
                                placeholder="请输入正确设备名称"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
