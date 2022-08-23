import React from 'react';
import { Select } from 'antd';
import api from '@/api/api';

export default class SearchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: []
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    async handleSearch(value) {
        let params = {
            data: {
                searchKey: value
            },
            method: 'POST'
        };
        let res = await api.user.getAllUser(params);

        if (res.code == 200) {
            this.setState({
                data: res.data
            });
        }
    }
    handleChange = (value) => {
        this.setState({
            value
        });
        this.props.onChange(value);
    };
    render() {
        const { data, value } = this.state;
        return (
            <Select
                showSearch
                value={this.props.value ? this.props.value : value}
                placeholder="请搜索"
                style={{ width: '100%' }}
                // defaultActiveFirstOption={false}
                // showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                // notFoundContent={null}
            >
                {data.map((d) => (
                    <Select.Option key={d.staff_name} value={d.staff_name}>
                        {d.staff_name}
                    </Select.Option>
                ))}
            </Select>
        );
    }
}
