import React, { useImperativeHandle, useState, useEffect, forwardRef } from 'react';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
import { useFormFields } from './hooksLib';
import api from '@/api/api';

const { Option } = Select;
const SpecIP = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

    useImperativeHandle(ref, () => ({
        returnvalue() {
            return localobj;
        }
    }));

    const [bandCarriers, setBandCarriers] = useState([]);

    const fetchCarrier = async (e) => {
        const res = await api.buyin.getBandWidthCarriers();
        console.log('接口返回: ', res);

        if (res && res.bandwidthcarriers) {
            console.log(res.bandwidthcarriers);
            setBandCarriers(res.bandwidthcarriers);
        }
    };

    useEffect(() => {
        fetchCarrier();
    }, []);

    const renderCarriers = () => {
        const OPTs = [];
        bandCarriers.map((item, key) =>
            OPTs.push(
                <Option key={key} value={item.text}>
                    {item.text}
                </Option>
            )
        );
        return OPTs;
    };

    return (
        <div style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp; 运营商:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} onChange={handleFieldChange.bind(this, '运营商')}>
                {renderCarriers()}
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;属性:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} onChange={handleFieldChange.bind(this, '属性')}>
                <Option value="运营商">运营商</Option>
                <Option value="第三方">第三方</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;路由穿透:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} onChange={handleFieldChange.bind(this, '路由穿透')}>
                <Option value="非穿透">非穿透</Option>
                <Option value="穿透">穿透</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;ICP备案:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} onChange={handleFieldChange.bind(this, 'ICP备案')}>
                <Option value="不支持">不支持</Option>
                <Option value="支持">支持</Option>
            </Select>
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;端口限制情况:&nbsp;
            <Input style={{ width: '640px' }} placeholder="端口限制情况" onChange={handleFieldChange.bind(this, '端口限制情况')} />
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;
            <Input style={{ width: '695px' }} placeholder="备注" onChange={handleFieldChange.bind(this, '备注')} />
            <br /> <br />
        </div>
    );
});

export default SpecIP;
