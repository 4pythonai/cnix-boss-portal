import React, { useState, useRef, useEffect } from 'react';

import { Select, Input } from 'antd';
import api from '@/api/api';
import 'antd/dist/antd.css';
import SpecBandWidth from './SpecBandWidth';
import SpecIP from './SpecIP';
import SpecTransfer from './SpecTransfer';
import SpecFiber from './SpecFiber';
import SpecCabinet from './SpecCabinet';
import SpecJumper from './SpecJumper';
import SpecCable from './SpecCable';
import SpecUloc from './SpecUloc';

const { Option } = Select;

export default function BuyinCodeMnt(props) {
    const [category, setCategory] = useState('带宽');
    const [prodname, setProdname] = useState('');
    const [vendor, setVendor] = useState('');
    const [vendors, setVendors] = useState([]);

    const childRef = useRef();

    // const titleRef = useRef();

    const fetchData = async () => {
        console.log('向接口发起请求');

        // let json = await api.billing.testIBM(params);

        const res = await api.buyin.getVendors();
        console.log('接口返回: ', res);

        if (res && res.list) {
            console.log(res.list);
            setVendors(res.list);
        }
    };

    // 只要queryParams改变，就发起请求
    useEffect(() => {
        fetchData();
    }, []);

    const getSpecDiv = () => {
        if (category === '带宽') {
            const Spec2 = <SpecBandWidth ref={childRef} />;
            return Spec2;
        }

        if (category === 'IP地址') {
            const Spec2 = <SpecIP ref={childRef} />;
            return Spec2;
        }

        if (category === '传输') {
            const Spec2 = <SpecTransfer ref={childRef} />;
            return Spec2;
        }

        if (category === '光纤') {
            const Spec2 = <SpecFiber ref={childRef} />;
            return Spec2;
        }

        if (category === '机柜') {
            const Spec2 = <SpecCabinet ref={childRef} />;
            return Spec2;
        }

        if (category === 'U位') {
            const Spec2 = <SpecUloc ref={childRef} />;
            return Spec2;
        }

        if (category === '引接缆') {
            const Spec2 = <SpecCable ref={childRef} />;
            return Spec2;
        }

        if (category === '跳线') {
            const Spec2 = <SpecJumper ref={childRef} />;
            return Spec2;
        }
    };

    function onChangeVendor(value) {
        console.log(`vender:selected ${value}`);
        setVendor(value);
    }

    function handleChangeCategory(value) {
        console.log(`产品大类:selected ${value}`);
        setCategory(value);
    }

    function handleChangeProdname(e) {
        console.log('产品:');
        e.persist();
        setProdname(e.target.value);
        console.log(e.target.value);
    }

    const handleOnClick = () => {
        childRef.current.returnvalue();
        console.log(category, prodname, vendor);
    };

    return (
        <div style={{ margin: '10px' }}>
            <br />
            &nbsp;&nbsp; 产品类别:&nbsp;
            <Select defaultValue="带宽" style={{ width: 120 }} onChange={handleChangeCategory}>
                <Option value="带宽">带宽</Option>
                <Option value="IP地址">IP地址</Option>
                <Option value="传输">传输</Option>
                <Option value="光纤">光纤</Option>
                <Option value="机柜">机柜</Option>
                <Option value="U位">U位</Option>
                <Option value="引接缆">引接缆</Option>
                <Option value="跳线">跳线</Option>
                <Option value="一次性费用">一次性费用</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;产品名称:&nbsp;
            <Input onChange={handleChangeProdname} style={{ width: '200px' }} placeholder="产品名称" />
            &nbsp;&nbsp; 供应商名称:&nbsp;
            <Select
                showSearch
                style={{ width: 300 }}
                placeholder="选择供应商"
                optionFilterProp="children"
                onChange={onChangeVendor}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {vendors.map((item, i) => {
                    return (
                        <Option key={i} value={item.id}>
                            {item.vendorname}
                        </Option>
                    );
                })}
            </Select>
            <br />
            <br />
            <div style={{ margin: '10px' }}>
                产品规格/{category}:{getSpecDiv()}
            </div>
            <button style={{ marginLeft: '400px' }} type="primary" onClick={handleOnClick}>
                保存
            </button>
        </div>
    );
}
