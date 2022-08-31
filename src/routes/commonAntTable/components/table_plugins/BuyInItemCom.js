import React, { useState, useEffect } from 'react';
import { Select, Modal, Button } from 'antd';
import api from '@/api/api';
import 'antd/dist/antd.css';
import { DatePicker, Input } from 'antd';

const { Option } = Select;

export default function BuyInItemCom(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fidldMsg, setFidldMsg] = useState('');
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState(null);
    const [contractnos, setContractnos] = useState([]);
    const [contract, setContract] = useState(null);
    const [prods, setProds] = useState([]);
    const [prod, setProd] = useState(null);
    const [opendate, setOpendate] = useState('');
    const [billingdate, setBillingdate] = useState(null);
    const [closedate, setClosedate] = useState(null);
    const [memo, setMemo] = useState(null);

    const handleHide = () => {
        setIsModalVisible(false);
    };

    const fetchData = async () => {
        console.log('向接口发起请求');
        let res = await api.buyin.getVendors();
        console.log('接口返回: ', res);
        if (res && res.list) {
            console.log(res.list);
            setVendors(res.list);
        }

        res = await api.buyin.getBuyInContractNos();
        console.log('接口返回: ', res);
        if (res && res.list) {
            console.log(res.list);
            setContractnos(res.list);
        }
    };

    // 只要queryParams改变，就发起请求
    useEffect(() => {
        fetchData();
    }, []);

    const onChangeVendor = async (value) => {
        console.log(`vender:selected ${value}`);
        setVendor(value);
        setProds([]);
        setProd(null);
        const params = { data: { vendorid: value }, method: 'POST' };
        let res = await api.buyin.getProdsByVendorId(params);
        console.log('接口返回: ', res);
        if (res && res.list) {
            console.log(res.list);
            setProds(res.list);
        }
    };

    function onChangeContract(value) {
        console.log(`contractno:selected ${value}`);
        setContract(value);
    }

    function onChangeProd(value) {
        console.log(`prod:selected ${value}`);
        setProd(value);
    }

    function onChangeOpendate(xdate, dateString) {
        setOpendate(dateString);
    }

    function onChangeBillingdate(xdate, dateString) {
        setBillingdate(dateString);
    }

    function onChangeClosedate(xdate, dateString) {
        setClosedate(dateString);
    }

    function onChangeMemo(e) {
        e.persist();
        setMemo(e.target.value);
    }

    const saveBuyinResourceItem = async () => {
        if (vendor === '' || vendor === undefined) {
            setIsModalVisible(true);
            setFidldMsg('请选择供应商');
            return;
        }

        if (contract === '' || contract === undefined) {
            setIsModalVisible(true);
            setFidldMsg('请选择合同');
            return;
        }

        let checksuccess = true;

        if (checksuccess) {
            const saveobj = {
                contract_no: contract,
                vendorID: vendor,
                prodID: prod,
                opendate: opendate,
                billingdate: billingdate,
                closedate: closedate,
                memo: memo
            };

            let params = { method: 'POST', data: saveobj };
            console.log('🚀 ~ file: BuyInItemCom.js ~ line 113 ~ saveBuyinResourceItem ~ params', params);
            let res = await api.buyin.saveBuyinResourceItem(params);
            if (res.code === 200) {
                props.refreshTable();
            }
        }
    };

    return (
        <div style={{ color: '#3b3d40', margin: '10px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;合同号:&nbsp;
            <Select
                showSearch
                style={{ width: 300 }}
                placeholder="选择合同"
                optionFilterProp="children"
                onChange={onChangeContract}
            >
                {contractnos.map((item, i) => {
                    return (
                        <Option key={i} value={item.contract_no}>
                            {item.contract_no}
                        </Option>
                    );
                })}
            </Select>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;供应商:&nbsp;
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
            &nbsp;&nbsp;&nbsp;&nbsp;选产品:&nbsp;
            <Select
                showSearch
                style={{ width: 300 }}
                placeholder="选产品"
                optionFilterProp="children"
                onChange={onChangeProd}
                value={prod}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {prods.map((item, i) => {
                    return (
                        <Option key={i} value={item.id}>
                            {item.prodname}
                        </Option>
                    );
                })}
            </Select>
            <br />
            <br />
            开通时间:&nbsp;
            <DatePicker format="YYYY-MM-DD" onChange={onChangeOpendate} placeholder="请选择时间" />
            <br /> <br />
            计费开始:&nbsp;
            <DatePicker format="YYYY-MM-DD" onChange={onChangeBillingdate} placeholder="请选择时间" />
            <br /> <br />
            计费终止:&nbsp;
            <DatePicker format="YYYY-MM-DD" onChange={onChangeClosedate} placeholder="请选择时间" />
            <br /> <br />
            备注信息:&nbsp;
            <Input style={{ width: '304px' }} placeholder="备注" onChange={onChangeMemo}></Input>
            <br /> <br />
            <Button style={{ marginLeft: '64px' }} type="primary" onClick={saveBuyinResourceItem}>
                保存采资源占用项
            </Button>
            <Modal destroyOnClose={true} title="提示" visible={isModalVisible} onOk={handleHide} onCancel={handleHide}>
                <p>{fidldMsg}</p>
            </Modal>
        </div>
    );
}
