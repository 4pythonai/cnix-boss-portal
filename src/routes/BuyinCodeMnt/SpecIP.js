import React, { useImperativeHandle, forwardRef } from 'react';
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
import { useFormFields } from './hooksLib';

const { Option } = Select;
const SpecIP = forwardRef((props, ref) => {
    const [localobj, handleFieldChange] = useFormFields(props.specdetail);

    useImperativeHandle(ref, () => ({
        returnvalue() {
            console.log(localobj);
            return localobj;
        }
    }));

    return (
        <div style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <br />
            &nbsp;&nbsp; 运营商:&nbsp;
            <Select defaultValue="" style={{ width: 120 }} onChange={handleFieldChange.bind(this, '运营商')}>
                <Option value="北京电信">北京电信</Option>
                <Option value="北京移动">北京移动</Option>
                <Option value="北京联通">北京联通</Option>
                <Option value="广州电信">广州电信</Option>
                <Option value="广州移动">广州移动</Option>
                <Option value="广州联通">广州联通</Option>
                <Option value="教育网">教育网</Option>
                <Option value="长宽">长宽</Option>
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
