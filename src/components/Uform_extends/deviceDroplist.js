import React from 'react';
import { Radio } from 'antd';
import { Select } from 'antd';

import api from '@/api/api';
const { Option } = Select;

export default class DeviceDroplist extends React.Component {
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
        let dropdownoptions = this.state.dropdownoptions;

        return (
            <div>
                <Select defaultValue={this.props.value != '' ? this.props.value : ''} showSearch optionFilterProp="children" placeholder="请选择" onChange={this.onChange}>
                    {dropdownoptions
                        ? dropdownoptions.map((item, index) => {
                              return (
                                  <Option key={item.sbName} value={item.sbName}>
                                      {item.sbName}
                                  </Option>
                              );
                          })
                        : null}
                </Select>
            </div>
        );
    }
}
