import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { message } from 'antd'
import { Table, Divider, Button } from 'antd';

import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'

export default class ContractSummary extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.lookview = this.lookview.bind(this)
    }
    state = {
        contract_no: '',
        visible: false,
        contractSummary: []
    }


    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据！")
            return;
        }
        let _tmprec = this.props.commonTableStore.selectedRows[0]

        this.refs.commonModalRef.showModal()

        // this.setState({ contract_no: _tmprec.contract_no })
        // this.getcontractlog()

        this.setState({ contract_no: _tmprec.contract_no }, this.getcontractlog)
        // this.props.commonTableStore.setTableAction('edit_table')
    }

    hideModal() {
        this.refs.commonModalRef.onCancelHandle()
    }

    lookview(text, record) {

        console.log(text, record)

        if (text.records.length > 0) {
            console.log(111, text.records[0].uuid, text.records[0].processkey)
            let data = {
                process_key: text.records[0].processkey,
                uuid: text.records[0].uuid,
                nodeKey: '',
                readonly: true,
                init_node: 'n',
                action_code: this.props.commonTableStore.action_code,
                page_source: 'detail', // IDC合同专用开关
                remark: 'remark'

            }

            let params = ''
            let keys = Object.keys(data)
            keys.map((key, index) => {
                params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
            })

            let new_url = `/#/flow/FlowDetail?${ params }`

            window.open(new_url, '_blank')
        } else {
            message.error('没有可查看的详情')
        }

    }

    getcontractlog = async () => {
        let params = {
            data: {
                contract_no: this.state.contract_no,
                role: sessionStorage.getItem("role_code"),
                user: sessionStorage.getItem("user")
            },
            method: 'POST'
        }

        let res = await api.bpm.getIdcContrctLog(params);

        if (res.code == 200) {

            console.log(res.data)

            this.setState({ contractSummary: res.data })

        }
    }


    getColumnsCycle() {
        return [
            {
                title: '流程名称',
                dataIndex: 'processname',
                key: 'processname',
            }
        ];
    }


    expandPapernos = (record, index, indent, expanded) => {
        let papernos = record.papernos //该参数是从父表格带过来的key
        const cols = [

            {
                title: '单据号',
                dataIndex: 'paperno',
                key: 'paperno',
            },
            {
                title: '',
                dataIndex: '',
                align: 'right',
                key: index,
                render: (text, record) => <Button type='primary' htmlType="button" onClick={ () => this.lookview(text, record) }>查看详情</Button>,
            }

        ]

        return (
            <Table
                columns={ cols }
                dataSource={ record.papernos }
                pagination={ false }
                expandedRowRender={ this.expandRecords }
            />
        );
    };



    expandRecords = (record, index, indent, expanded) => {
        let records = record.records //该参数是从父表格带过来的key
        console.log(records)
        const cols = [

            {
                title: '处理时间',
                dataIndex: '时间',
                key: 'actiontime',
            },
            {
                title: '处理动作',
                dataIndex: '动作',
                key: 'action',
            },
            {
                title: '发起人',
                dataIndex: '发起',
                key: 'sender',
            },
            {
                title: '接收人',
                dataIndex: '接收',
                key: 'receiver',
            },
            {
                title: '批注',
                dataIndex: '批注',
                key: 'note',
            },


        ]

        return (
            <Table
                columns={ cols }
                dataSource={ record.records }
                pagination={ false }

            />
        );
    };






    render() {
        return <CommonModal
            height="500px"
            width="1200px"
            footer={ null }
            title="合同概览"
            layoutcfg={ 2 }
            ref='commonModalRef'
        >
            <div>


                <Table
                    dataSource={ this.state.contractSummary }
                    columns={ this.getColumnsCycle() }
                    pagination={ false }
                    defaultExpandAllRows={ true }
                    size="small"
                    expandedRowRender={ this.expandPapernos }

                />

            </div>
        </CommonModal >
    }
}
