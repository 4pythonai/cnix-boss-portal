import React from 'react'
import { Select } from 'antd';
import { Table, Divider, Button, Modal, Tag } from 'antd';
import api from '@/api/api'
import ExportJsonExcel from "js-export-excel"

const { Option } = Select;

export default class CustOwned extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        excelModal: false,
        tabletitle: '',
        excelMsg: {},
        year: 0,
        region: '',
        columns: [
            {
                title: 'ID',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: '[账单金额]',
                dataIndex: 'period_money',
                key: 'period_money',
            },

            {
                title: '调整金额',
                dataIndex: 'adjust_money',
                key: 'adjust_money',
            },
            {
                title: '实际应收金额',
                dataIndex: 'actual_money',
                key: 'actual_money',
            },
            {
                title: '已销账',
                dataIndex: 'payment_amount',
                key: 'payment_amount',
            },
            {
                title: '欠费金额',
                dataIndex: 'owned_money',
                key: 'owned_money',
            }
        ],
        Ownedrows: [],
    }

    onChangeregion = async (value) => {
        this.setState({
            region: value
        })
    }

    generageReport = async () => {
        this.setState({
            tabletitle: this.state.region + '客户欠费报表'
        })
        let params = {
            data: {
                // region: this.state.region
            },
            method: 'POST'
        }

        let res = await api.billing.getOwnedReport(params)
        if (res.code == 200) {

            console.log(res)
            this.setState({
                Ownedrows: res.Ownedrows
            })
        }
    }




    handleExport = () => {

        const Ownedrows = this.state.Ownedrows
        const { columns } = this.state;      // 需要放在state里边,Table，Columns
        const option = {};

        option.fileName = this.state.tabletitle
        option.datas = [
            {
                sheetData: Ownedrows.map(item => {
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





    render() {
        let columns = this.state.columns
        let tabletitle = this.state.tabletitle
        let data = this.state.Ownedrows
        var pagination = {
            total: this.state.Ownedrows.length,
            pageSize: 30
        };


        return (
            <div className="custServiceContent">
                <div style={ { display: 'flex', paddingLeft: '100px' } }> <h4>选择地区</h4> &nbsp;&nbsp;&nbsp;

                     {/* <Select
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
                */}
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