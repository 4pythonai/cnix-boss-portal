import React from 'react'
import { Select, Input } from 'antd';
import { Table, Button, Modal } from 'antd';
import api from '@/api/api'
import ExportJsonExcel from "js-export-excel"

const { Option } = Select;

export default class MRR extends React.Component {

    state = {
        excelModal: false,
        tabletitle: '',
        excelMsg: {},
        year: 0,
        contract_no: '',
        region: '',
        columns: [
            {
                title: 'ID',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '年度',
                dataIndex: 'year',
                key: 'year',
            },

            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: '[1-12月合计]',
                dataIndex: 'm_total',
                key: 'm_total',
            },

            {
                title: '1月应收',
                dataIndex: 'm1',
                key: 'm1',
            },
            {
                title: '2月应收',
                dataIndex: 'm2',
                key: 'm2',
            },
            {
                title: '3月应收',
                dataIndex: 'm3',
                key: 'm3',
            },
            {
                title: '4月应收',
                dataIndex: 'm4',
                key: 'm4',
            },
            {
                title: '5月应收',
                dataIndex: 'm5',
                key: 'm5',
            },
            {
                title: '6月应收',
                dataIndex: 'm6',
                key: 'm6',
            },
            {
                title: '7月应收',
                dataIndex: 'm7',
                key: 'm7',
            },
            {
                title: '8月应收',
                dataIndex: 'm8',
                key: 'm8',
            },
            {
                title: '9月应收',
                dataIndex: 'm9',
                key: 'm9',
            },
            {
                title: '10月应收',
                dataIndex: 'm10',
                key: 'm10',
            },
            {
                title: '11月应收',
                dataIndex: 'm11',
                key: 'm11',
            },
            {
                title: '12月应收',
                dataIndex: 'm12',
                key: 'm12',
            },

        ],
        reportrows: [],
    }

    onChangeyear = async (value) => {
        this.setState({
            year: value
        })

    }

    onChangeregion = async (value) => {
        this.setState({
            region: value
        })
    }

    generageReport = async () => {
        this.setState({
            tabletitle: this.state.year + '年' + this.state.region + '年应收报表(MRR/基于合同账单/拆分到月)'
        })
        let params = {
            data: {
                year: this.state.year,
                region: this.state.region,
                mmrflag: true,
                contract_no: this.state.contract_no,
                mode: 'shouldpay',
            },
            method: 'POST'
        }

        let res = await api.report.reportByContractBill(params)
        if (res.code === 200) {

            console.log(res)
            this.setState({
                reportrows: res.reportrows
            })
        }
    }




    handleExport = () => {

        const reportrows = this.state.reportrows
        const { columns } = this.state;      // 需要放在state里边,Table，Columns
        const option = {};

        option.fileName = this.state.tabletitle
        option.datas = [
            {
                sheetData: reportrows.map(item => {
                    const result = {};
                    columns.forEach(c => {
                        result[c.dataIndex] = item[c.dataIndex];
                    });
                    return result;
                }),
                sheetName: 'ExcelName',     // Excel文件名称
                sheetFilter: columns.map(item => item.dataIndex),
                sheetHeader: columns.map(item => item.title),
                columnWidths: columns.map(() => 10),
            },
        ];
        const toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            excelModal: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            excelModal: false,
        });
    };



    selectContractno(a, b) {
        this.setState({
            contract_no: a.target.value,
        });
    }



    render() {
        let columns = this.state.columns
        let tabletitle = this.state.tabletitle
        let data = this.state.reportrows
        var pagination = {
            total: this.state.reportrows.length,
            pageSize: 30
        };


        return (
            <div className="custServiceContent">
                <div style={ { width: "900px", justifyContent: 'space-between', display: 'flex', paddingLeft: '100px' } }>
                    <Select
                        showSearch
                        style={ { width: 140 } }
                        placeholder="选择年份"
                        optionFilterProp="children"
                        onChange={ this.onChangeyear }
                        filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
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
                    </Select>
                    <Select
                        showSearch
                        style={ { width: 200 } }
                        placeholder="选择地区"
                        optionFilterProp="children"
                        onChange={ this.onChangeregion }
                    >
                        <Option value="北京">北京</Option>
                        <Option value="广州">广州</Option>
                        <Option value="测试">测试</Option>
                    </Select>
                    <div style={ { width: '220px' } }
                    >
                        <Input
                            style={ { width: '200' } }
                            placeholder="请输入合同号,留空为所有"
                            onChange={ (event) =>
                                this.selectContractno(event, "")
                            }
                            onPressEnter={ this.handleOk }
                        ></Input>
                    </div>
                    <Button onClick={ event => this.generageReport() }>生成报表</Button>
                    <Button onClick={ this.handleExport }> 导出excel表格 </Button>
                </div>
                <Modal
                    visible={ this.state.excelModal }
                    title={ '导出Excel' }
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    width={ 800 }
                >
                    <a href={ this.state.excelMsg.url }>{ '点击下载 ' }</a>
                </Modal >

                <Table rowKey={ 'ID' } title={ () => { return <div style={ { marginLeft: '800px' } }><h2>{ tabletitle } </h2></div> } }
                    columns={ columns } pagination={ pagination } dataSource={ data } />
            </div>
        )
    }
}