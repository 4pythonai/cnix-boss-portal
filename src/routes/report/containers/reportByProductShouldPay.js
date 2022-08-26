import React from 'react';
import { Table } from 'antd';
import api from '@/api/api';
import ReportHeader from './reportHeader';

export default class reportByProductShouldPay extends React.Component {
    constructor(props) {
        super(props);
        this.reportrowsHander = this.reportrowsHander.bind(this);
        this.renderMoneyAndProductNum = this.renderMoneyAndProductNum.bind(this);
    }

    renderMoneyAndProductNum = (text, record) => {
        if (text.includes('/')) {
            const tmparr = text.split('/');
            return (
                <div>
                    <div style={{ whiteSpace: 'nowrap' }}> 金额:{tmparr[0]}</div>
                    <div style={{ borderTop: '0.5px solid black', whiteSpace: 'nowrap' }}> 数量:{tmparr[1]}</div>
                </div>
            );
        } else {
            return <div>{text}</div>;
        }
    };

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
        region: '',
        columns: [
            {
                title: 'ID',
                dataIndex: 'ID',
                key: 'ID'
            },
            {
                title: '年度',
                dataIndex: 'year',
                key: 'year'
            },
            {
                title: '产品',
                dataIndex: 'product_name',
                key: 'product_name',
                width: '180px'
            },
            {
                title: '[1-12月合计]',
                dataIndex: 'm_total',
                key: 'm_total'
            },
            {
                title: '1月应收',
                dataIndex: 'm1',
                key: 'm1',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '2月应收',
                dataIndex: 'm2',
                key: 'm2',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '3月应收',
                dataIndex: 'm3',
                key: 'm3',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '4月应收',
                dataIndex: 'm4',
                key: 'm4',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '5月应收',
                dataIndex: 'm5',
                key: 'm5',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '6月应收',
                dataIndex: 'm6',
                key: 'm6',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '7月应收',
                dataIndex: 'm7',
                key: 'm7',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '8月应收',
                dataIndex: 'm8',
                key: 'm8',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '9月应收',
                dataIndex: 'm9',
                key: 'm9',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '10月应收',
                dataIndex: 'm10',
                key: 'm10',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '11月应收',
                dataIndex: 'm11',
                key: 'm11',
                render: this.renderMoneyAndProductNum
            },
            {
                title: '12月应收',
                dataIndex: 'm12',
                key: 'm12',
                render: this.renderMoneyAndProductNum
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

        //   api.report.reportByProductFromPaperBill()

        return (
            <div className="custServiceContent">
                <ReportHeader
                    columns={columns}
                    mode={'shouldpay'}
                    type={'paperbill'}
                    apiurl={api.report.reportByProductFromPaperBill}
                    reportrowsHander={this.reportrowsHander}
                    setTitle={this.setTitle}
                    title="年应收报表(基于客户账单/产品)"
                />

                <Table
                    rowKey={'ID'}
                    title={() => {
                        return (
                            <div style={{ marginLeft: '500px' }}>
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
