import { Button } from 'antd';
import { default as React, useEffect, useState, forwardRef } from 'react';
import api from '@/api/api';
import CustPaperMainContent from './CustPaperMainContent';
import downloadpdf from '@/utils/Pdfhelper';

const PaperBillDownloader = forwardRef((props, ref) => {
    const [pdfRef] = useState(React.createRef(props.paper_id));
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
            setHasdata(true);
        }
    };

    useEffect(() => {
        getZone();
    }, [props.paper_id]);

    if (hasdata) {
        return (
            <div>
                <div>
                    {!props.autodownload && (
                        <Button
                            className="pdf_download_btn"
                            name="print"
                            ref={ref}
                            style={{ marginTop: '10px ' }}
                            type="info"
                            onClick={() => {
                                console.log('下载文件');
                                downloadpdf(pdfRef.current, paperinfo.paperno + '.pdf');
                            }}>
                            下载PDF
                        </Button>
                    )}

                    <br />
                    <br />
                </div>
                <br />
                <CustPaperMainContent
                    autodownload={props.autodownload}
                    onDownloadComplete={props.onDownloadComplete}
                    pdfRef={pdfRef}
                    zone={zone}
                    visible={true}
                    paperinfo={paperinfo}
                    custinfo={custinfo}
                />
            </div>
        );
    } else {
        return <div />;
    }
});

export default PaperBillDownloader;
