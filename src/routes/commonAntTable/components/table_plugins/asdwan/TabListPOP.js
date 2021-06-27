import { Table, Button } from 'antd';
import {} from 'mobx-react';
import api from '@/api/api';
import React from 'react';

export default class TabListPOP extends React.Component {
    state = {
        jsonstr: {},
        pops: []
    };

    availablepop = async () => {
        let params = { method: 'POST' };
        let json = await api.sdwan.availablepop(params);
        console.log(json);
        this.setState({ pops: json.pops });
    };

    expandedRowRender = (data) => {
        console.log(data);
        const columns = [
            { title: '城市', dataIndex: 'city' },
            {
                title: '型号',
                dataIndex: 'model'
            },
            { title: '名称', dataIndex: 'name' },
            {
                title: 'PoP点名称',
                dataIndex: 'popName'
            }
        ];

        return <Table columns={columns} dataSource={data.vpes} pagination={false} />;
    };

    getColumns() {
        return [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: 'PoP点名称',
                dataIndex: 'name'
            },
            {
                title: '地点',
                dataIndex: 'address'
            },
            {
                title: 'isImplicitVpePop',
                dataIndex: 'isImplicitVpePop',
                render: (val) => (val ? '是' : '否')
            }
        ];
    }

    render() {
        return (
            <div>
                <Button style={{ marginRight: '10px', marginBottom: '20px' }} type="danger" onClick={(event) => this.availablepop(event)}>
                    List PoP
                </Button>
                <br />
                <Table rowKey="id" dataSource={this.state.pops} expandedRowRender={this.expandedRowRender} columns={this.getColumns()} pagination={false} size="small" />
            </div>
        );
    }
}
