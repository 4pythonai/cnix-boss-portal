import { Divider, Table } from 'antd';
import React from 'react';
import './paper_bill_style.scss';
import ResTimeColumns from '../columns/ResTimeColumns';
import ABInfo from './ABInfo';
import PaperBillColumns from '../columns/PaperBillColumns';

const CustPaperMainContent = (props) => {
    // 资源使用日志
    const expandedLog = (record, index, indent, expanded) => {
        return <Table columns={ResTimeColumns} rowKey="id" rowClassName={'small_table'} dataSource={record.resource_logs} pagination={false} />;
    };

    const CreateContractBillItem = (rowstr) => {
        if (!props.visible) {
            return;
        }

        const row = JSON.parse(rowstr);
        let newrow = JSON.stringify(row);
        newrow = JSON.parse(newrow);

        let num = 0;
        for (let j = 0; j < newrow.length; j++) {
            num++;
            newrow[j].key = num;
        }

        return (
            <div>
                <Table
                    dataSource={newrow}
                    columns={PaperBillColumns}
                    size="small"
                    rowClassName={'big_table'}
                    rowKey="id"
                    defaultExpandAllRows={true}
                    pagination={false}
                    expandedRowRender={expandedLog}
                    style={{ marginBottom: '20px', marginLeft: '10px' }}
                />
            </div>
        );
    };

    return (
        <div
            id="pdf_printer_wrapper"
            style={{
                paddingLeft: '10px',
                paddingTop: '10px'
            }}
            ref={props.pdfRef}>
            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '145px',
                    fontWeight: 'bold',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                <h1>账单编号:{props.paperinfo.paperno}</h1>
            </div>
            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: 'black',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                总金额:{props.paperinfo.total_money}
            </div>
            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                账单创建时间:
                {props.paperinfo.createdate}
            </div>
            <Divider />
            <ABInfo custinfo={props.custinfo} zone={props.zone} />
            <Divider />
            <div style={{ fontFamily: '"Microsoft YaHei", 微软雅黑, monospace', margin: '10px' }}>
                费用明细:
                <br />
            </div>
            {CreateContractBillItem(props.paperinfo.billsjson)}
        </div>
    );
};

export default CustPaperMainContent;
