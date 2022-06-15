import React from 'react';
import {Table} from 'antd';
import api from '@/api/api';
import ReportHeader from './reportHeader';

export default class IncomePrediction extends React.Component {
    constructor(props) {
        super(props);
        this.reportrowsHander = this.reportrowsHander.bind(this);
    }

    reportrowsHander(_rptrows) {
        this.setState({
            reportrows: _rptrows
        });
    }

    setTitle = (_title) => {
        this.setState({
            tabletitle: _title
        });
    };

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
                key: 'ID'
            },
            {
                title: 'X年度',
                dataIndex: 'year',
                key: 'year'
            },

            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name'
            },
            {
                title: '[1-12月合计]',
                dataIndex: 'm_total',
                key: 'm_total'
            },

            {
                title: '1月应收',
                dataIndex: 'm1',
                key: 'm1'
            },
            {
                title: '2月应收',
                dataIndex: 'm2',
                key: 'm2'
            },
            {
                title: '3月应收',
                dataIndex: 'm3',
                key: 'm3'
            },
            {
                title: '4月应收',
                dataIndex: 'm4',
                key: 'm4'
            },
            {
                title: '5月应收',
                dataIndex: 'm5',
                key: 'm5'
            },
            {
                title: '6月应收',
                dataIndex: 'm6',
                key: 'm6'
            },
            {
                title: '7月应收',
                dataIndex: 'm7',
                key: 'm7'
            },
            {
                title: '8月应收',
                dataIndex: 'm8',
                key: 'm8'
            },
            {
                title: '9月应收',
                dataIndex: 'm9',
                key: 'm9'
            },
            {
                title: '10月应收',
                dataIndex: 'm10',
                key: 'm10'
            },
            {
                title: '11月应收',
                dataIndex: 'm11',
                key: 'm11'
            },
            {
                title: '12月应收',
                dataIndex: 'm12',
                key: 'm12'
            }
        ],
        reportrows: []
    };

    render() {
        let columns = this.state.columns;
        let tabletitle = this.state.tabletitle;
        let data = this.state.reportrows;
        var pagination = {
            total: this.state.reportrows.length,
            pageSize: 30
        };

        return (
            <div className="custServiceContent">
                <ReportHeader
                    columns={columns}
                    mmrflag={true}
                    mode={'shouldpay'}
                    type={'Prediction'}
                    title="收入预测"
                    apiurl={api.report.reportByContractBill}
                    reportrowsHander={this.reportrowsHander}
                    setTitle={this.setTitle}
                />
                <div style={{margin: '20px 0 0 120px'}}>
                    <ul>
                        <li> 先全部模拟出账, OneKeyContractBillPrediction </li>
                        <li> 算法: 拷贝已经存在的合同账单到临时表,再重新生成所有的合同账单,(不考虑预付后付,取合同结束日期), 并以此为基础进行计算.</li>
                    </ul>
                </div>
                <Table
                    rowKey={'ID'}
                    title={() => {
                        return (
                            <div style={{marginLeft: '500px'}}>
                                <h2>{tabletitle} </h2>
                            </div>
                        );
                    }}
                    columns={columns}
                    pagination={pagination}
                    dataSource={data}
                />
            </div>
        );
    }
}
