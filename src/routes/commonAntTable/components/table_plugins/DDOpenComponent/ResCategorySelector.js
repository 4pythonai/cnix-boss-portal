import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Select, Button, Table } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';


const { Option } = Select;

// 使用 lazy 和 Suspense 动态导入组件
const Cabinet = lazy(() => import('./Cabinet'));
const Xpath = lazy(() => import('./Xpath'));
const Optical = lazy(() => import('./Optical'));
const Bandwidth = lazy(() => import('./Bandwidth'));
const Transfer = lazy(() => import('./Transfer'));
const Ip = lazy(() => import('./Ip'));
const Ethernet = lazy(() => import('./Ethernet'));
const Uloc = lazy(() => import('./Uloc'));
const Nothing = lazy(() => import('./Nothing'));


const ResCategorySelector = observer(({ maincode, contract, resRows, setResRows }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [SelectedComponent, setSelectedComponent] = useState(null);
    const [category, setCategory] = useState('');
    const [catid, setCatid] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = { method: 'POST', data: { contract: contract } };
                const response = await api.dd.getGetContractProductName(params);
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (contract) {
            fetchData();
        }
    }, [contract]);

    const handleChange = (selectedValue) => {
        console.log("置要渲染的组件", selectedValue);
        setValue(selectedValue);

        const selectedOption = options.find(option => option.value === selectedValue);
        setCategory(selectedOption.label);
        setCatid(selectedOption.catid);
        // 根据选择的值动态设置要渲染的组件
        switch (selectedOption.category) {
            case 'cabinet':
                setSelectedComponent(Cabinet);
                break;
            case 'xpath':
                setSelectedComponent(Xpath);
                break;
            case 'optical':
                setSelectedComponent(Optical);
                break;
            case 'bandwidth':
                setSelectedComponent(Bandwidth);
                break;
            case 'transfer':
                setSelectedComponent(Transfer);
                break;
            case 'ip':
                setSelectedComponent(Ip);
                break;
            case 'ethernet':
                setSelectedComponent(Ethernet);
                break;
            case 'uloc':
                setSelectedComponent(Uloc);
                break;
            default:
                setSelectedComponent(Nothing);
                break;
        }
    };

    const deleteRow = (index) => {
        const newRows = [...resRows];
        newRows.splice(index, 1);
        setResRows(newRows);
    }

    const columns = [
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Button type="primary" size="small" onClick={() => deleteRow(record.key)}>删除</Button>
            ),
        },
        {
            title: '主业务编号',
            dataIndex: 'bizcode',
        }, {
            title: '产品名称',
            dataIndex: 'product_name',
        },
        {
            title: '资源',
            dataIndex: 'restext',
        }
    ];


    const appendrows = (rowObject) => {
        setResRows([...resRows, rowObject]);
    }

    return (
        <div style={{ padding: "0 10px 10px 10px", background: "#f3f2f2" }}>
            <div>预备开通的资源:</div>
            <Table columns={columns} rowKey="reactkey" dataSource={resRows} pagination={false} />
            <br />
            选择资源类型:
            <Select
                value={value}
                onChange={handleChange}
                loading={loading}
                style={{ width: '100%', marginTop: "4px" }}
            >
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
            {/* 使用 Suspense 包裹动态组件 */}

            <Suspense fallback={<div>Loading...</div>}>
                {SelectedComponent && <div style={{ marginTop: "4px" }}><SelectedComponent appendrows={appendrows} catid={catid} product_name={category} bizCode={maincode} /></div>
                }
            </Suspense>
        </div>
    );
});

export default ResCategorySelector;
