import React from 'react';
import api from '@/api/api';
import ReportHeader from './reportHeader';
import createReportColumns from './reportColumns';
import ReportTable from './ReportTable';

export default class PayPrediction extends React.Component {
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
        columns: createReportColumns('IncomePrediction'),
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
                    columns={columns}
                    mmrflag={true}
                    mode={'shouldpay'}
                    type={'Prediction'}
                    title="收入预测"
                    apiurl={api.buyReport.reportByContractBill}
                    reportrowsHander={this.reportrowsHander}
                    setTitle={this.setTitle}
                />
                <div style={{ color: '#3b3d40', margin: '20px 0 0 120px' }}>
                    <ul>
                        <li> 先全部模拟出账, OneKeyContractBillPrediction </li>
                        <li> 算法: 拷贝已经存在的合同账单到临时表,再重新生成所有的合同账单,(不考虑预付后付,取合同结束日期), 并以此为基础进行计算.</li>
                    </ul>
                </div>{' '}
                <ReportTable title={tabletitle} pagination={pagination} columns={columns} reportrows={this.state.reportrows} />
            </div>
        );
    }
}
