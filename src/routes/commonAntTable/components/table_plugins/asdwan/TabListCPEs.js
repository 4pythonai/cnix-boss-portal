import { Table, Button } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import React from 'react';
import ReactJson from 'react-json-view';
@observer
export default class TabListCPEs extends React.Component {
    state = {
        jsonstr: {},
        cpes: []
    };

    listcpes = async () => {
        let params = { method: 'POST' };
        let json = await api.sdwan.listcpes(params);
        console.log(json);
        this.setState({ jsonstr: json.results });
        this.setState({ cpes: json.results.item });
    };

    getColumns() {
        return [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: 'cpe序列号',
                dataIndex: 'cpeSN'
            },
            {
                title: '地点',
                dataIndex: 'address'
            },
            {
                title: 'onlineStatus',
                dataIndex: 'onlineStatus'
            },
            {
                title: 'user',
                dataIndex: 'user'
            }
        ];
    }

    render() {
        return (
            <div>
                <Button style={{ marginRight: '10px', marginBottom: '20px' }} type="danger" onClick={(event) => this.listcpes(event)}>
                    List CPEs
                </Button>
                <Table rowKey="id" dataSource={this.state.cpes} columns={this.getColumns()} pagination={false} size="small" />
                <br />
                <ReactJson src={this.state.jsonstr} theme="twilight" />
            </div>
        );
    }
}
