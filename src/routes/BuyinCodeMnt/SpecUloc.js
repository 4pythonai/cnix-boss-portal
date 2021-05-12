import React, { useImperativeHandle, forwardRef } from 'react';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
import { useFormFields } from './hooksLib';

const { Option } = Select;
const SpecUloc = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

    useImperativeHandle(ref, () => ({
        returnvalue() {
            return localobj;
        }
    }));

    return (
        <div style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;机房名称:&nbsp;
            <Input style={{ width: 120 }} placeholder="机房名称" onChange={handleFieldChange.bind(this, '机房名称')} />
            &nbsp;&nbsp;&nbsp;&nbsp;机房具体位置:&nbsp;
            <Input style={{ width: 120 }} placeholder="机房具体位置" onChange={handleFieldChange.bind(this, '机房具体位置')} />
            &nbsp;&nbsp;&nbsp;&nbsp;机柜位置:&nbsp;
            <Input style={{ width: 120 }} placeholder="机柜位置" onChange={handleFieldChange.bind(this, '机柜位置')} />
            &nbsp;&nbsp;&nbsp;&nbsp;电力:&nbsp;
            <Input style={{ width: 120 }} placeholder="电力" onChange={handleFieldChange.bind(this, '电力')} />
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;PDU插孔规格:&nbsp;
            <Input style={{ width: 120 }} placeholder="PDU插孔数量" onChange={handleFieldChange.bind(this, 'PDU插孔数量')} />
            &nbsp;&nbsp;&nbsp;&nbsp;PDU插孔规格:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="PDU插孔规格" onChange={handleFieldChange.bind(this, 'PDU插孔规格')}>
                <Option value="国标">国标</Option>
                <Option value="IEC">IEC</Option>
            </Select>
            <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;
            <Input style={{ width: '744px' }} placeholder="备注" onChange={handleFieldChange.bind(this, '备注')} />
            <br /> <br />
        </div>
    );
});

export default SpecUloc;
