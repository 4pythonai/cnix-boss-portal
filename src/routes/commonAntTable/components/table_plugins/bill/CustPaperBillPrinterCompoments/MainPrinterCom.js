import { Divider, Button } from 'antd';
import ABinfo from './ABinfo';
import { default as React, useRef, useEffect, useState } from 'react';
import downloadpdf from './Pdfhelper';
import ContractBillPrinterCom from './ContractBillPrinterCom';
import api from '@/api/api';

export default function MainPrinterCom(props) {
    console.log(props);
    const [zone, setZone] = useState({});
    const buttonRef = useRef('print-button');
    const getZone = async () => {
        let params = { method: 'POST', data: { paper_id: props.paper_id } };
        const httpobj = await api.billing.getZone(params);
        if (httpobj.zone) {
            setZone(httpobj.zone);
            setTimeout(() => {
                downloadpdf(pdfEL.current, pdfname);
            }, 100);
        }
    };

    useEffect(() => {
        getZone();
    }, []);

    const pdfEL = useRef(null);
    const pdfname = props.paperinfo.paperno + '.pdf';
    return (
        <div>
            <div>
                <Button ref={buttonRef} name="print" style={{ marginTop: '10px ' }} type="primary" onClick={() => downloadpdf(pdfEL.current, pdfname)}>
                    下载PDF
                </Button>
                <br />
                <br />
            </div>
            <br />
            <div
                style={{
                    paddingLeft: '15px',
                    paddingTop: '15px'
                }}
                ref={pdfEL}>
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
                        fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                    }}>
                    账单创建时间:
                    {props.paperinfo.createdate}
                </div>
                <Divider />

                <ABinfo custinfo={props.custinfo} zone={zone} />
                <Divider />

                <div style={{ fontFamily: '"Microsoft YaHei", 微软雅黑, monospace', margin: '10px' }}>
                    费用明细:
                    <br />
                </div>

                <ContractBillPrinterCom newrow={props.paperinfo.billsjson} />
            </div>
        </div>
    );
}
