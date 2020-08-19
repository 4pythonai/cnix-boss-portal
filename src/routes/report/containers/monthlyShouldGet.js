import React from 'react'
import { Select } from 'antd';
import { Table, Divider, Button, Modal, Tag } from 'antd';
import api from '@/api/api'
const { Option } = Select;

export default class MonthlyShouldGet extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        excelModal: false,
        tabletitle: '',
        excelMsg: {},
        year: 0,
        region: '',
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
            tabletitle: this.state.year + '年' + this.state.region + '年应收报表'
        })
        let params = {
            data: {
                year: this.state.year,
                region: this.state.region
            },
            method: 'POST'
        }

        let res = await api.billing.getShouldPay(params)
        if (res.code == 200) {

            console.log(res)
            this.setState({
                reportrows: res.reportrows
            })
        }
    }


    getColumns = () => {
        const columns = [
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

        ];

        return columns;
    }


    async exportExcel(actcode) {

        console.log(this)
        this.setState({ excelModal: true })
        let params = {
            data: {
                actcode: 'MonthlyShouldGet',
                role: sessionStorage.getItem("role_code"),
                user: sessionStorage.getItem("user")
            },
            method: 'POST'
        }
        console.log(params)


        let res = await api.activity.exportExcel(params)

        if (res.code == 200) {
            this.setState({
                excelMsg: res.data
            })
            // this..showModal()
        }

    }


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
        let columns = this.getColumns()
        let tabletitle = this.state.tabletitle
        let data = this.state.reportrows
        var pagination = {
            total: this.state.reportrows.length,
            pageSize: 30
        };


        return (
            <div className="custServiceContent">
                <div style={ { display: 'flex', paddingLeft: '100px' } }> <h4>选择年份</h4> &nbsp;&nbsp;&nbsp;
                    <Select
                        showSearch
                        style={ { width: 200 } }
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
                    </Select>


                    <Button onClick={ event => this.generageReport() }>生成报表</Button>

                    <Button onClick={ event => this.exportExcel(event) }>导出Excel</Button>



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