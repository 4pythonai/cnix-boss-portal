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
        contract_no: null,
        vendor_name: null,
        region: null,
        reportrows: [],
        regions: []
    };

    async componentWillMount() {
        const params = {
            method: 'POST',
            data: {}
        };
        const json = await api.contract.getVendorRegions(params);
        this.setState({ regions: json.regions.map((item) => item.region) });
    }

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

    onChangeFilterValue(a, b) {
        let filterValue = a.target.value;
        //中文,判断为客户名称
        var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
        if (reg.test(filterValue)) {
            console.log('判断为汉字客户');
            this.setState({
                vendor_name: a.target.value.trim(),
                contract_no: null
            });
        } else {
            this.setState({
                vendor_name: null,
                contract_no: a.target.value.trim()
            });
        }
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
            vendor_name: this.state.vendor_name,
            mode: this.props.mode
        };

        if (parseInt(this.state.year) < 2015) {
            message.info('必须选择年份');
            return false;
        }

        argdata.mmrflag = this.props.mmrflag;
        if (this.props.type == 'normal') {
            argdata.Prediction = false;
        } else {
            argdata.Prediction = true;
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
        let res = await api.billingSale.OneKeyContractBill(params);

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
        // this.setState({
        //     excelModal: false
        // });
    };

    handleCancel = (e) => {
        console.log(e);
        // this.setState({
        //     excelModal: false
        // });
    };

    render() {
        return (
            <div>
                <div style={{ width: '1100px', justifyContent: 'space-between', display: 'flex', marginTop: '10px', paddingLeft: '100px' }}>
                    <Select
                        showSearch
                        style={{ width: 140 }}
                        placeholder="选择年份"
                        optionFilterProp="children"
                        onChange={this.onChangeyear}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {[...Array(15)]
                            .map((v, i) => 2016 + i * 1)
                            .map(function (year, index) {
                                return (
                                    <Option key={index} value={year}>
                                        {year}
                                    </Option>
                                );
                            })}
                    </Select>
                    <Select showSearch style={{ width: 200 }} placeholder="选择地区" optionFilterProp="children" onChange={this.onChangeregion}>
                        {this.state.regions.map(function (region, index) {
                            return (
                                <Option key={index} value={region}>
                                    {region}
                                </Option>
                            );
                        })}
                    </Select>

                    <div style={{ width: '220px' }}>
                        {
                            <Input
                                style={{ width: '200' }}
                                placeholder="输入合同号或者供应商名称"
                                onChange={(event) => this.onChangeFilterValue(event)}
                                onPressEnter={this.handleOk}></Input>
                        }
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
