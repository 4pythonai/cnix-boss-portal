import React from 'react';
import api from '@/api/api';
import ReportHeader from './reportHeader';
import createReportColumns from './reportColumns';
import ReportTable from './ReportTable';

export default class MonthlyShouldGet extends React.Component {
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
        columns: createReportColumns('MonthlyShouldGet'),
        reportrows: []
    };

    render() {
        let columns = this.state.columns;
        let tabletitle = this.state.tabletitle;
        var pagination = {
            total: this.state.reportrows.length,
            pageSize: 30
        };

        return (
            <div className="custServiceContent">
                <ReportHeader
                    mmrflag={false}
                    columns={columns}
                    type={'normal'}
                    mode={'shouldpay'}
                    apiurl={api.report.reportByContractBill}
                    reportrowsHander={this.reportrowsHander}
                    setTitle={this.setTitle}
                    title="年应收报表(基于合同账单)"
                />
                <ReportTable title={tabletitle} pagination={pagination} columns={columns} reportrows={this.state.reportrows} />
            </div>
        );
    }
}
