import React from 'react'
import { Table, Button, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react'

@inject("chargeStore")
@observer
export default class ChargeTable extends React.Component {
    constructor(props) {
        super()
        this.store = props.chargeStore
    }

    componentWillUnmount() {
        this.store.clearStore();
    }

    getOption(record) {
        return (<div className="options"><Button
            className="marginRihgt10"
            onClick={event => this.props.editChargeRow(event, record.key)}
            type="primary" size="small">编辑</Button>
            <Popconfirm
                title="您确定要删除么?"
                okText="删除"
                cancelText="取消"
                onConfirm={() => this.props.deleteChargeRow(record)} >
                <Button type="danger" htmlType="button" size="small"  >删除</Button>
            </Popconfirm>
        </div>)
    }

    getColumns() {
        if (this.props.disabled) {
            return this.props.columns;
        }
        
        let optionBtn = {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            fixed: 'right',
            className: 'chargeStyle',
            render: (text, record) => this.getOption(record)
        };
        return [...this.props.columns, optionBtn]
    }

    render() {
        const columns = this.getColumns();
        return (
            <Table
                scroll={this.props.scroll}
                bordered
                columns={columns}                           //列配置
                dataSource={this.store.chargeShowListData}     //数据数组
                pagination={false}
            />
        )
    }

}
