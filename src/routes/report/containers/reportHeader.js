import { Button, Input, message, Modal, Select } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import React from 'react';
import api from '@/api/api';
import { v4 as uuidv4 } from 'uuid';
const { Option } = Select;

export default class ReportHeader extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    state = {
        excelModal: false,
        tabletitle: '',
        excelMsg: {},
        year: 0,
        contract_no: '',
        customer_name: '',
        region: '',
        reportrows: []
    };

    onChangeyear = async (value) => {
        this.setState({
            year: value
        });
    };

    onChangeregion = async (value) => {
        this.setState({
            region: value
        });
    };

    onChangeContractno(a, b) {
        this.setState({
            contract_no: a.target.value
        });
    }

    onChangeCustname(a, b) {
        this.setState({
            customer_name: a.target.value
        });
    }

    generageReport = async () => {
        this.props.reportrowsHander([]);

        this.setState({
            reportrows: [],
            tabletitle: this.state.year + '年' + this.state.region + this.props.title
        });

        let argdata = {
            year: this.state.year,
            region: this.state.region,
            contract_no: this.state.contract_no,
            customer_name: this.state.customer_name,
            mode: this.props.mode
        };

        if (parseInt(this.state.year) < 2015) {
            message.info('必须选择年份');
            return false;
        }

        if (this.props.hasOwnProperty('mmrflag')) {
            argdata.mmrflag = this.props.mmrflag;
        }

        let params = {
            data: argdata,
            method: 'POST'
        };

        let res = await this.props.apiurl(params);
        if (res.code === 200) {
            console.log(res);
            this.props.reportrowsHander(res.reportrows);
            this.props.setTitle(this.state.tabletitle);

            this.setState({
                reportrows: res.reportrows
            });
        }
    };

    OneKeyContractBillPrediction = async () => {
        const uuid = uuidv4();
        let params = {
            data: {
                uuid: uuid,
                type: 'Prediction' //- 收入预测的一键出账
            },
            method: 'POST'
        };
        let res = await api.billing.OneKeyContractBill(params);

        if (res.code === 200) {
            message.success(res.message);
        }
    };

    handleExport = () => {
        const reportrows = this.state.reportrows;
        const { columns } = this.props;
        const option = {};

        option.fileName = this.state.tabletitle;
        option.datas = [
            {
                sheetData: reportrows.map((item) => {
                    const result = {};
                    columns.forEach((c) => {
                        result[c.dataIndex] = item[c.dataIndex];
                    });
                    return result;
                }),
                sheetName: 'ExcelName', // Excel文件名称
                sheetFilter: columns.map((item) => item.dataIndex),
                sheetHeader: columns.map((item) => item.title),
                columnWidths: columns.map(() => 10)
            }
        ];
        const toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            excelModal: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            excelModal: false
        });
    };

    render() {
        return (
            <div>
                <div style={{ width: '1100px', justifyContent: 'space-between', display: 'flex', paddingLeft: '100px' }}>
                    <Select
                        showSearch
                        style={{ width: 140 }}
                        placeholder="选择年份"
                        optionFilterProp="children"
                        onChange={this.onChangeyear}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="2015">2015</Option>
                        <Option value="2016">2016</Option>
                        <Option value="2017">2017</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                        <Option value="2023">2023</Option>
                        <Option value="2024">2024</Option>
                        <Option value="2025">2025</Option>
                        <Option value="2026">2026</Option>
                        <Option value="2027">2027</Option>
                        <Option value="2028">2028</Option>
                    </Select>
                    <Select showSearch style={{ width: 200 }} placeholder="选择地区" optionFilterProp="children" onChange={this.onChangeregion}>
                        <Option value="北京">北京</Option>
                        <Option value="广州">广州</Option>
                        <Option value="上海">上海</Option>
                        <Option value="测试">测试</Option>
                        <Option value="DEBUG">DEBUG</Option>
                    </Select>
                    <div style={{ width: '220px' }}>
                        {this.props.type === 'paperbill' ? (
                            <Input style={{ width: '200' }} placeholder="请输入客户名称,留空为所有" onChange={(event) => this.onChangeCustname(event, '')} onPressEnter={this.handleOk}></Input>
                        ) : (
                            <Input style={{ width: '200' }} placeholder="请输入合同号,留空为所有" onChange={(event) => this.onChangeContractno(event, '')} onPressEnter={this.handleOk}></Input>
                        )}
                    </div>

                    {this.props.hasOwnProperty('Prediction') ? <Button onClick={(event) => this.OneKeyContractBillPrediction()}>批量预出全部合同账单</Button> : ''}

                    <Button onClick={(event) => this.generageReport()}>生成报表</Button>
                    <Button onClick={this.handleExport}> 导出Excel表格 </Button>
                </div>
                <Modal visible={this.state.excelModal} title={'导出Excel'} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <a href={this.state.excelMsg.url}>{'点击下载 '}</a>
                </Modal>
            </div>
        );
    }
}
