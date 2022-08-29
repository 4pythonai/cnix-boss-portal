import React, { useState, useRef, useEffect } from 'react';
import { Select, Input } from 'antd';
import { Modal } from 'antd';

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
import SpecOneTime from './SpecOneTime';
import SpecOptimization from './SpecOptimization';
import SpecService from './SpecService';
import SpecMaterial from './SpecMaterial';
import SpecDevice from './SpecDevice';

import { SpecField } from './SpecField';

const { Option } = Select;

export default function BuyinCodeMnt(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fidldMsg, setFidldMsg] = useState('');
    const [category, setCategory] = useState('带宽');
    const [price, setPrice] = useState(0);
    const [prodname, setProdname] = useState('');
    const [vendor, setVendor] = useState('');
    const [vendors, setVendors] = useState([]);

    const childRef = useRef();

    const handleHide = () => {
        setIsModalVisible(false);
    };

    const fetchData = async () => {
        console.log('向接口发起请求');

        // let json = await api.billingSale.testIBM(params);

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
            const SpecComponent = <SpecBandWidth ref={childRef} />;
            return SpecComponent;
        }

        if (category === 'IP地址') {
            const SpecComponent = <SpecIP ref={childRef} />;
            return SpecComponent;
        }

        if (category === '传输') {
            const SpecComponent = <SpecTransfer ref={childRef} />;
            return SpecComponent;
        }

        if (category === '光纤') {
            const SpecComponent = <SpecFiber ref={childRef} />;
            return SpecComponent;
        }

        if (category === '机柜') {
            const SpecComponent = <SpecCabinet ref={childRef} />;
            return SpecComponent;
        }

        if (category === 'U位') {
            const SpecComponent = <SpecUloc ref={childRef} />;
            return SpecComponent;
        }

        if (category === '引接缆') {
            const SpecComponent = <SpecCable ref={childRef} />;
            return SpecComponent;
        }

        if (category === '跳线') {
            const SpecComponent = <SpecJumper ref={childRef} />;
            return SpecComponent;
        }

        if (category === '跳线') {
            const SpecComponent = <SpecJumper ref={childRef} />;
            return SpecComponent;
        }

        if (category === '互联网品质优化') {
            const SpecComponent = <SpecOptimization ref={childRef} />;
            return SpecComponent;
        }

        if (category === '服务') {
            const SpecComponent = <SpecService ref={childRef} />;
            return SpecComponent;
        }
        if (category === '设备') {
            const SpecComponent = <SpecDevice ref={childRef} />;
            return SpecComponent;
        }
        if (category === '耗材') {
            const SpecComponent = <SpecMaterial ref={childRef} />;
            return SpecComponent;
        }
        if (category === '一次性费用') {
            const SpecComponent = <SpecOneTime ref={childRef} />;
            return SpecComponent;
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

    function handleChangePrice(e) {
        console.log('价格:');
        e.persist();
        setPrice(e.target.value);
        console.log(e.target.value);
    }

    const saveBuyin = async () => {
        const specValues = childRef.current.returnvalue();

        if (prodname === '' || prodname === undefined) {
            setIsModalVisible(true);
            setFidldMsg('请填写产品名称');
            return;
        }

        if (vendor === '' || vendor === undefined) {
            setIsModalVisible(true);
            setFidldMsg('请选择供应商');
            return;
        }

        if (specValues === undefined) {
            setIsModalVisible(true);
            setFidldMsg('请填写规格');
            return;
        }

        let checksuccess = true;

        SpecField[category].map((fieldname, index, array) => {
            if (specValues?.[fieldname] === undefined) {
                setIsModalVisible(true);
                setFidldMsg(fieldname + ' 不能为空');
                checksuccess = false;
            }
        });

        if (checksuccess) {
            alert('保存产品数据');
            const saveobj = {
                specValues: specValues,
                category: category,
                prodname: prodname,
                price: price,
                vendor: vendor
            };

            let params = { method: 'POST', data: saveobj };
            await api.buyin.saveBuyInProd(params);
        }
    };

    return (
        <div style={{ color: '#3b3d40', margin: '10px' }}>
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
                <Option value="服务">服务</Option>
                <Option value="耗材">耗材</Option>
                <Option value="设备">设备</Option>

                <Option value="互联网品质优化">互联网品质优化</Option>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月单价:&nbsp;
            <Input onChange={handleChangePrice} style={{ width: '120px' }} placeholder="价格" />
            <br />
            <div style={{ margin: '30px 0 0 10px' }}>
                产品规格/{category}:{getSpecDiv()}
            </div>
            <button style={{ marginLeft: '400px' }} type="primary" onClick={saveBuyin}>
                保存
            </button>
            <Modal destroyOnClose={true} title="提示" visible={isModalVisible} onOk={handleHide} onCancel={handleHide}>
                <p>{fidldMsg}</p>
            </Modal>
        </div>
    );
}
