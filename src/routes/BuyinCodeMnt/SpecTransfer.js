import React, { useImperativeHandle, forwardRef } from 'react';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
import { useFormFields } from './hooksLib';

const { Option } = Select;
const SpecTransfer = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

    useImperativeHandle(ref, () => ({
        returnvalue() {
            return localobj;
        }
    }));

    return (
        <div style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;A端名称:&nbsp;
            <Input style={{ width: 120 }} placeholder="A端名称" onChange={handleFieldChange.bind(this, 'A端名称')} />
            &nbsp;&nbsp;&nbsp;&nbsp;A端具体位置:&nbsp;
            <Input style={{ width: 120 }} placeholder="A端具体位置" onChange={handleFieldChange.bind(this, 'A端具体位置')} />
            &nbsp;&nbsp;&nbsp;&nbsp;Z端名称:&nbsp;
            <Input style={{ width: 120 }} placeholder="Z端名称" onChange={handleFieldChange.bind(this, 'Z端名称')} />
            &nbsp;&nbsp;&nbsp;&nbsp;Z端具体位置:&nbsp;
            <Input style={{ width: 120 }} placeholder="Z端具体位置" onChange={handleFieldChange.bind(this, 'Z端具体位置')} />
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;传输带宽:&nbsp;
            <Input style={{ width: 114 }} placeholder="传输带宽" onChange={handleFieldChange.bind(this, '传输带宽')} />
            &nbsp;&nbsp;&nbsp;&nbsp;保护:&nbsp;
            <Select defaultValue="有" style={{ width: 170 }} onChange={handleFieldChange.bind(this, '保护')}>
                <Option value="有">有</Option>
                <Option value="无">无</Option>
            </Select>
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;
            <Input style={{ width: '784px' }} placeholder="备注" onChange={handleFieldChange.bind(this, '备注')} />
            <br /> <br />
        </div>
    );
});

export default SpecTransfer;
