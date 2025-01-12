import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Card, message, Row, Col } from 'antd';
import api from '@/api/api';
import ResCategorySelector from './DDOpenComponent/ResCategorySelector';
import DeliverSelector from './DDOpenComponent/DeliverSelector'

const DDOpen = ({ maincode, contractno }) => {
    const [resRows, setResRows] = useState([]);
    const [relatedDelivernos, setRelatedDelivernos] = useState([]);


    const handleBossOpenk = async () => {
        console.log("相关子relatedDelivernos", relatedDelivernos);
        const params = {
            data: {
                maincode: maincode,
                contractno: contractno,
                resRows: resRows,
                relatedDelivernos: relatedDelivernos
            }, method: 'POST'
        };
        const response = await api.dresource.BOSSOpenResource(params);
        console.log("response", response);




    }

    return (
        <div style={{ marginLeft: '15px' }}>
            <Row align="middle" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <Col span={10}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        开通资源:业务编号:{maincode}/合同号:{contractno}
                    </div>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleBossOpenk}>确定进行资源开通</Button>
                </Col>
            </Row>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    marginTop: '10px',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                <ResCategorySelector maincode={maincode} contract={contractno} resRows={resRows} setResRows={setResRows} />
                <DeliverSelector setRelatedDelivernos={setRelatedDelivernos} />
            </div>
        </div>
    );
};

export default DDOpen;
