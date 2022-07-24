import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useFormFields } from './hooksLib';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
import api from '@/api/api';

const { Option } = Select;

const SpecBandWidth = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

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

    useImperativeHandle(ref, () => ({
        returnvalue() {
            return localobj;
        }
    }));

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
        <div ref={ref} style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp; 运营商:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="运营商" onChange={handleFieldChange.bind(this, '运营商')}>
                {renderCarriers()}
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;分类:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="分类" onChange={handleFieldChange.bind(this, '分类')}>
                <Option value="单线">单线</Option>
                <Option value="BGP双线">BGP双线</Option>
                <Option value="BGP三线">BGP三线</Option>
                <Option value="BGP多线">BGP多线</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;属性:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="属性" onChange={handleFieldChange.bind(this, '属性')}>
                <Option value="IDC">IDC</Option>
                <Option value="ISP">ISP</Option>
                <Option value="单上行">单上行</Option>
                <Option value="ADSL">ADSL</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;限速:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="限速" onChange={handleFieldChange.bind(this, '限速')}>
                <Option value="固定带宽">固定带宽</Option>
                <Option value="保底">保底</Option>
                <Option value="无保底">无保底</Option>
            </Select>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;
            <Input style={{ width: '646px' }} onChange={handleFieldChange.bind(this, '备注')} placeholder="备注" />
            <br /> <br />
        </div>
    );
});

export default SpecBandWidth;
