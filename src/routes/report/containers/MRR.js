import React from 'react';
import { Table } from 'antd';
import api from '@/api/api';
import ReportHeader from './reportHeader';
import createReportColumns from './reportColumns';

export default class MRR extends React.Component {
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
        columns: createReportColumns('MRR'),
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
                    mmrflag={true}
                    columns={columns}
                    mode={'shouldpay'}
                    type={'normal'}
                    title="年应收报表(MRR/基于合同账单/拆分到月)"
                    apiurl={api.report.reportByContractBill}
                    reportrowsHander={this.reportrowsHander}
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
