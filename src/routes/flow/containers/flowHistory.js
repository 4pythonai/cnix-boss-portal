
import React from 'react'
import { Table } from 'antd';
import { toJS } from 'mobx'

import { inject, observer } from 'mobx-react'



@inject("FlowApprovalStore")
@observer
export default class FlowHistory extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.store = this.props.FlowApprovalStore
    }

    state = { records: [] }

    async componentDidMount() {

        await this.store.getFlowRecords()
        this.setState({ records: this.store.flowRecords })
    }


    render() {
        const columns = [

            {
                title: '时间',
                dataIndex: 'actiontime',
                key: 'actiontime',
            },
            {
                title: '动作',
                dataIndex: 'action',
                key: 'action',
            },
            {
                title: '批注',
                dataIndex: 'note',
                key: 'note',
            },

            {
                title: '发起',
                dataIndex: 'sender',
                key: 'sender',
            }, {
                title: '接收',
                dataIndex: 'receiver',
                key: 'receiver',
            }

        ];

        let rec = toJS(this.state.records)

        return (

            < div className="bordered" >
                <div style={ { margin: '10px' } }>单据号:{ this.store.paperno }</div>
                < div >
                    <Table size="small" rowKey={ record => record.actiontime } columns={ columns } dataSource={ this.state.records } />
                </div >
            </div >
        )
    }


}
