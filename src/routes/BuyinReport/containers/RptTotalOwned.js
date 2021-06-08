import React, { useEffect, useState } from 'react';

export default function RptTotalOwned(props) {
    const [fundobj, setFundobj] = useState([]);

    const getInputDatas = async () => {
        // const httpobj = await props.apis.methods.list_fund_paybacks({});
        // console.log('返回的结果', httpobj);
        // setFundobj(httpobj);
    };

    useEffect(() => {
        getInputDatas();
    }, []);

    const columns = [
        {
            name: '基金名称',
            selector: 'fund_type',
            sortable: true,
            width: '400px'
        },
        {
            name: '截至日期',
            selector: 'tilldate',
            sortable: true,
            width: '400px'
        },

        {
            name: '金额',
            selector: 'money',
            sortable: true,
            width: '400px'
        }
    ];

    return <div style={{ margin: '10px' }}>总欠费</div>;
}
