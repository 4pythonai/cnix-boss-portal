import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { Checkbox, Button, Modal } from 'antd';

const SwitchPortSelector = (props) => {
    console.log('props:++++++++++++++++ ', props);

    const [switchDevices, setSwitchDevices] = useState([]);
    const [selectedSwitch, setSelectedSwitch] = useState('');
    const [ports, setPorts] = useState([]);
    const [selectedPort, setSelectedPort] = useState('');

    const getDvices = async () => {
        let params = {
            data: {},
            method: 'POST'
        };

        let resp = await api.device.listSwitchDevices(params);
        setSwitchDevices(resp.data);
    };

    const getPorts = async () => {
        let params = {
            data: { swid: selectedSwitch },
            method: 'POST'
        };
        let resp = await api.device.listSwitchPorts(params);
        setPorts(resp.data);
    };

    useEffect(() => {
        getDvices();
    }, []);

    useEffect(() => {
        if (selectedSwitch) {
            getPorts();
        } else {
            setPorts([]);
        }
    }, [selectedSwitch]);

    const handleSwitchChange = (event) => {
        const selectedDeviceId = event.target.value;
        console.log('selectedDeviceId: ', selectedDeviceId);
        setSelectedSwitch(selectedDeviceId);
        setSelectedPort('');
    };

    const handlePortChange = (event) => {
        setSelectedPort(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Port ID:', props, selectedPort);
        let _para = { resitemid: props.resitemid, current_swportid: props.current_swportid, target_swportid: selectedPort };
        console.log('_para: ', _para);
        const resp = api.device.AlterTwoSwPorts({ data: _para, method: 'POST' });
        props.refreshTable();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="switch-select">选择交换机</label>
                <select id="switch-select" value={selectedSwitch} onChange={(e) => handleSwitchChange(e)}>
                    <option value="">选择交换机</option>
                    {switchDevices.map((device) => (
                        <option key={device.id} value={device.id}>
                            {device.devname}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                <label htmlFor="port-select">选择空闲端口</label>
                <select id="port-select" value={selectedPort} onChange={handlePortChange} disabled={!selectedSwitch}>
                    <option value="">选择端口</option>
                    {ports.map((port) => (
                        <option key={port.id} value={port.id}>
                            ID:{port.id}/名称: {port.port}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <Button style={{ color: 'black' }} onClick={handleSubmit} type="submit">
                替换
            </Button>
        </form>
    );
};

export default SwitchPortSelector;
