import React, { useEffect, useState } from 'react';
import { Input, DatePicker, Button, Table } from 'antd';
import api from '@/api/api';

export default function PayBuyinInner(props) {
    const [bills, setBills] = useState([]);
    const [invoice_date, setInvoice_date] = useState(null);
    const [invoice_no, setInvoice_no] = useState('');
    const [paymoney, setPaymoney] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    const getInputDatas = async (e) => {
        let params = { method: 'POST', data: { vendorid: props.vendorid } };
        let json = await api.billing.getUnPayedBuyInBills(params);
        setBills(json.bills);
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
        })
    };

    const savePayBuyIn = async (e) => {
        const data = {
            invoice_date: invoice_date,
            invoice_no: invoice_no,
            paymoney: paymoney,
            unpayedBills: selectedRows
        };

        let params = { method: 'POST', data: data };
        await api.billing.SaveBuyInBillPayment(params);
        props.refresh();
    };

    useEffect(() => {
        getInputDatas();
    }, []);

    const cols = [
        {
            title: '合同编号',
            dataIndex: 'contract_no',
            key: 'contract_no'
        },
        {
            title: '采购账单编号',
            dataIndex: 'billpaperno',
            key: 'billpaperno'
        },
        {
            title: '账单金额',
            dataIndex: 'actual_money',
            key: 'actual_money'
        },

        {
            title: '账期开始',
            dataIndex: 'periodstart',
            key: 'periodstart'
        },
        {
            title: '账期结束',
            dataIndex: 'periodend',
            key: 'periodend'
        },

        {
            title: '备注',
            dataIndex: 'memo',
            key: 'memo'
        }
    ];

    return (
        <div className="count-box">
            供应商ID={props.vendorid}
            <br />
            <br />
            <Input onChange={(e) => setInvoice_no(e.target.value)} style={{ width: '200px' }} placeholder="发票号码" />
            <br />
            <br />
            <Input onChange={(e) => setPaymoney(e.target.value)} style={{ width: '200px' }} placeholder="发票金额" />
            <br />
            <br />
            <DatePicker onChange={(e, str) => setInvoice_date(str)} placeholder="开票日期" />
            <br />
            <br />
            <Table rowSelection={rowSelection} columns={cols} rowKey="reactkey" dataSource={bills} pagination={false} />
            <br />
            <br />
            <Button onClick={(event) => savePayBuyIn(event)}>保存</Button>
            <br />
        </div>
    );
}
