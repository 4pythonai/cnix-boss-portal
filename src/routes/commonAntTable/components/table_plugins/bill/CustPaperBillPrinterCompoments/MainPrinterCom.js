import { Divider, Button } from 'antd';
import ABinfo from './ABinfo';
import { default as React, useRef, useEffect, useState } from 'react';
import downloadpdf from './Pdfhelper';
import ContractBillWrapper from './ContractBillWrapper';
import api from '@/api/api';

export default function MainPrinterCom(props) {
    console.log(props);
    const [hasdata, setHasdata] = useState(false);
    const [zone, setZone] = useState({});
    const [paperinfo, setPaperinfo] = useState({});
    const [custinfo, setcustinfo] = useState({});
    const [billrows, setBillrows] = useState([]);
    const buttonRef = useRef('print-button');

    const getZone = async () => {
        setHasdata(false);
        if (props.paper_id === 0) {
            alert('REturn');
            return;
        }

        let params = { method: 'POST', data: { paper_id: props.paper_id } };
        const httpobj = await api.billing.getZone(params);
        console.log(httpobj);
        if (httpobj.zone) {
            setZone(httpobj.zone);
            setPaperinfo(httpobj.paperinfo);
            setcustinfo(httpobj.custinfo);

            let bsstr = httpobj.paperinfo.billsjson;
            const xrows = JSON.parse(bsstr);
            let num = 0;
            for (let j = 0; j < xrows.length; j++) {
                num++;
                xrows[j].key = num;
            }

            setBillrows(xrows);
            setHasdata(true);
            setTimeout(() => {
                downloadpdf(pdfEL.current, httpobj.paperinfo.paperno + '.pdf');
            }, 100);
        }
    };

    useEffect(() => {
        getZone();
    }, []);

    const pdfEL = useRef(null);

    if (hasdata) {
        return (
            <div>
                <div>
                    <Button ref={buttonRef} name="print" style={{ marginTop: '10px ' }} type="primary" onClick={() => downloadpdf(pdfEL.current, paperinfo.paperno + '.pdf')}>
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
                        <h1>账单编号:{paperinfo.paperno}</h1>
                    </div>
                    <div
                        style={{
                            marginBottom: '5px',
                            marginLeft: '10px',
                            fontWeight: 'bold',
                            color: 'black',
                            fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                        }}>
                        总金额:{paperinfo.total_money}
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
                        {paperinfo.createdate}
                    </div>
                    <Divider />

                    <ABinfo custinfo={custinfo} zone={zone} />
                    <Divider />

                    <div style={{ fontFamily: '"Microsoft YaHei", 微软雅黑, monospace', margin: '10px' }}>
                        费用明细:
                        <br />
                    </div>

                    <ContractBillWrapper billrows={billrows} />
                </div>
            </div>
        );
    } else {
        return <div />;
    }
}
