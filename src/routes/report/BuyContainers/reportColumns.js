import React from 'react';

function renderAsButton(text, record) {
    return <div>{text}</div>;
}

function renderMoneyAndProductNum(text, record) {
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
}

export default function createReportColumns(reportSchema) {
    let $tmp = [];
    $tmp[0] = {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID'
    };
    $tmp[1] = {
        title: '年度',
        dataIndex: 'year',
        key: 'year'
    };

    $tmp[2] = {
        title: '供应商名称',
        dataIndex: 'vendorname',
        key: 'vendorname'
    };

    $tmp[3] = {
        title: '[1-12月合计]',
        dataIndex: 'm_total',
        key: 'm_total'
    };

    let $owe_or_have;
    if (
        reportSchema == 'ReportByPaperBillShouldPay' ||
        reportSchema == 'ReportByProductShouldPay' ||
        reportSchema == 'MRR' ||
        reportSchema == 'MonthlyShouldGet' ||
        reportSchema == 'CustPayed' ||
        reportSchema == 'IncomePrediction'
    ) {
        $owe_or_have = '应收';
    }

    if (reportSchema == 'ReportByPaperBillPayed') {
        $owe_or_have = '已结算';
    }

    if (reportSchema == 'CustOwned' || reportSchema == 'ReportByPaperBillOwned') {
        $owe_or_have = '欠费';
    }

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month, index) => {
        let monthCol = {
            title: `${month}月${$owe_or_have}`,
            dataIndex: `m${month}`,
            key: `m${month}`
        };

        monthCol.onCell = (record, rowIndex) => {
            return {
                onClick: (ev) => {
                    console.log(monthCol);
                    console.log(record, rowIndex);
                    console.log(record[monthCol['key']]);
                }
            };
        };

        if (reportSchema == 'ReportByProductShouldPay') {
            monthCol.render = renderMoneyAndProductNum;
        } else {
            monthCol.render = renderAsButton;
        }

        $tmp.push(monthCol);
    });
    return $tmp;
}
