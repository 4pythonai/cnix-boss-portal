import React, { forwardRef, useImperativeHandle } from 'react';
import { useFormFields } from './hooksLib';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const SpecBandWidth = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

    useImperativeHandle(ref, () => ({
        returnvalue() {
            return localobj;
        }
    }));

    return (
        <div ref={ref} style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp; 运营商:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} id="运营商" onChange={handleFieldChange.bind(this, '运营商')}>
                <Option value="北京电信">北京电信</Option>
                <Option value="北京移动">北京移动</Option>
                <Option value="北京联通">北京联通</Option>
                <Option value="广州电信">广州电信</Option>
                <Option value="广州移动">广州移动</Option>
                <Option value="广州联通">广州联通</Option>
                <Option value="教育网">教育网</Option>
                <Option value="长宽">长宽</Option>
                <Option value="华为云">华为云</Option>
                <Option value="河北联通">河北联通</Option>
                <Option value="河北电信">河北电信</Option>
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
