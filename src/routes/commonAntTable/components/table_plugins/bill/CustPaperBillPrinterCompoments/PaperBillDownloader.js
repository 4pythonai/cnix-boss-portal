import { Button } from 'antd';
import { default as React, useEffect, useState } from 'react';
import downloadpdf from '@/utils/Pdfhelper';
import api from '@/api/api';
import CustPaperMainContent from '../CustPaperMainContent';

export default function PaperBillDownloader(props) {
    const [pdfRef] = useState(React.createRef(null));
    const [hasdata, setHasdata] = useState(false);
    const [zone, setZone] = useState({});
    const [paperinfo, setPaperinfo] = useState({});
    const [custinfo, setcustinfo] = useState({});

    const getZone = async () => {
        setHasdata(false);
        if (props.paper_id === 0) {
            alert('REturn');
            return;
        }

        let params = { method: 'POST', data: { paper_id: props.paper_id } };
        const httpobj = await api.billingSale.getZone(params);
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

            // setBillrows(xrows);
            setHasdata(true);
            setTimeout(() => {
                downloadpdf(pdfRef.current, httpobj.paperinfo.paperno + '.pdf');
            }, 5000);
        }
    };

    useEffect(() => {
        getZone();
    }, []);

    if (hasdata) {
        return (
            <div>
                <div>
                    <Button name="print" style={{ marginTop: '10px ' }} type="primary" onClick={() => downloadpdf(pdfRef.current, paperinfo.paperno + '.pdf')}>
                        下载PDF
                    </Button>
                    <br />
                    <br />
                </div>
                <br />
                <CustPaperMainContent pdfRef={pdfRef} zone={zone} visible={true} paperinfo={paperinfo} custinfo={custinfo} />
            </div>
        );
    } else {
        return <div />;
    }
}
