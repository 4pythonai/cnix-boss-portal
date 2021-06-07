import React from 'react';
import { Select } from 'antd';

import api from '@/api/api';
const { Option } = Select;

export default class ProviderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownoptions: []
        };
        console.log(props);
    }

    async componentDidMount() {
        let params = { data: '', method: 'POST' };
        let res = await api.equipmentMaterial.getEquipmentMaterialNameList(params);
        if (res.code == 200) {
            this.setState({
                dropdownoptions: res.data
            });
        }
    }

    onChange = (e) => {
        this.props.onChange(e);
    };

    render() {
        console.log(12345, this.props);

        return (
            <div>
                <Select defaultValue={this.props.value != '' ? parseInt(this.props.value) : ''} placeholder="请选择" onChange={this.onChange}>
                    <Option key={1} value={1}>
                        客户自带
                    </Option>
                    <Option key={2} value={2}>
                        自有
                    </Option>
                </Select>
            </div>
        );
    }
}
