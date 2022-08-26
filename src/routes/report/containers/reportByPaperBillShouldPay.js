import React from 'react';
import { Table } from 'antd';
import api from '@/api/api';
import ReportHeader from './reportHeader';
import createReportColumns from './reportColumns';

export default class ReportByPaperBillShouldPay extends React.Component {
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
        region: '',
        columns: createReportColumns('ReportByPaperBillShouldPay'),
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

        // api.report.reportByPaperBill()
        return (
            <div className="custServiceContent">
                <ReportHeader
                    columns={columns}
                    mode={'shouldpay'}
                    type={'paperbill'}
                    apiurl={api.report.reportByPaperBill}
                    reportrowsHander={this.reportrowsHander}
                    title="年应收报表(基于客户账单)"
                    setTitle={this.setTitle}
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
