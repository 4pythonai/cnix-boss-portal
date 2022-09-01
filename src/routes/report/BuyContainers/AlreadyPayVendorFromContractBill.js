import React from 'react';
import api from '@/api/api';
import ReportHeader from './reportHeader';
import createReportColumns from './reportColumns';
import ReportTable from './ReportTable';

export default class AlreadyPayVendorFromContractBill extends React.Component {
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
        columns: createReportColumns('CustPayed'),
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
                    mode={'payed'}
                    type={'normal'}
                    apiurl={api.buyReport.reportByContractBill}
                    reportrowsHander={this.reportrowsHander}
                    setTitle={this.setTitle}
                    title="结算情况"
                />

                <ReportTable title={tabletitle} pagination={pagination} columns={columns} reportrows={this.state.reportrows} />
            </div>
        );
    }
}
