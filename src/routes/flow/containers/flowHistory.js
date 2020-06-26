
import React from 'react'
import { Table } from 'antd';
import api from '@/api/api';


export default class FlowHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flowRecords: [],
            paperno: '',
            columns: [
                {
                    title: '时间',
                    dataIndex: '时间',
                    key: 'actiontime',
                },
                {
                    title: '动作',
                    dataIndex: '动作',
                    key: 'action',
                },
                {
                    title: '批注',
                    dataIndex: '批注',
                    key: 'note',
                },

                {
                    title: '发起',
                    dataIndex: '发起',
                    key: 'sender',
                }, {
                    title: '接收',
                    dataIndex: '接收',
                    key: 'receiver',
                }

            ]
        }
    }



    componentDidMount() {
        this.getFlowRecords()
    }


    async getFlowRecords() {

        let params = {
            data: {
                processDefinitionKey: this.props.process_key,
                uuid: this.props.uuid
            },
            method: 'POST'
        };
        let res = await api.bpm.getFlowRecords(params);
        if (res.code == '200') {
            this.setState({
                paperno: res.data.paperno,
                flowRecords: res.data.records
            })
        }
    }


    render() {

        return <Table size="small" pagination={false} rowKey={ record => record.actiontime } columns={ this.state.columns } dataSource={ this.state.flowRecords } />
    }


}
