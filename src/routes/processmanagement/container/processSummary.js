import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Card, Table, Button, Select, Collapse, Descriptions, message } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
import { observable, toJS, reaction, action, autorun, computed } from "mobx";


// const { Option } = Select;
const { Panel } = Collapse;

@inject("pmStore")
@observer
class ProcessSummary extends React.Component {
    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.tbref = React.createRef()
        this.pk_watcher = reaction(
            () => { return this.pmstore.current_processkey }, pk => {
                this.refreshCurrentcfg(pk)
            }
        )
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };


    componentDidMount() {

        if (this.pmstore.current_processkey) {
            this.refreshCurrentcfg(this.pmstore.current_processkey)
        }
        this.refreshCurrentcfg(this.pmstore.current_processkey)
    }


    componentWillUnmount() {
        this.pk_watcher()
    }

    async refreshCurrentcfg(pk) {
        this.pmstore.setPorcessSummary(pk);
        if (this.tbref.current) {
            let query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "processkey", operator_0: "=", vset_0: pk } }
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
            await this.tbref.current.listData()
        }
    }

    expandedAssigned = (record, index, indent, expanded) => {

        if (record.assigned) {
            let assigned = record.assigned //该参数是从父表格带过来的key
            console.log(assigned)
            const cols = [
                {
                    title: '节点SID',
                    width: 100,
                    dataIndex: 'nodesid',
                    key: 'nodesid',
                },
                {
                    title: '节点名称',
                    width: 50,
                    dataIndex: 'nodename',
                    key: 'nodename',
                }

            ]

            return (
                <Table
                    columns={ cols }
                    size="small"
                    width="400"
                    dataSource={ record.assigned }
                    pagination={ false }
                />
            );

        } else {
            return null;
        }

    };





    renderAsObj = (row) => {

        if (!row) {
            return null;
        }

        let obj = Object.keys(row)
        obj.map((item, index) => {
            var tap = ''
            if (typeof row[item] == 'object' && row[item] != null) {
                console.log(435, row[item])
                row[item].map(items => {
                    tap = tap + items.url
                })
                // row[item]=<a href=''>123</a>
                row[item] = tap
            }
        })

        return <Descriptions key={ obj } bordered style={ { marginLeft: '10px' } }>
            {
                obj.map(item =>
                    row[item] && row[item].indexOf('href') == -1 ?
                        <Descriptions.Item key={ item } label={ item }>{ row[item] }</Descriptions.Item>
                        :
                        <Descriptions.Item key={ item } label={ item }><p dangerouslySetInnerHTML={ { __html: row[item] } }></p></Descriptions.Item>
                )
            }
        </Descriptions>
    }


    renderAsTable = (row, subrows) => {
        let keys = Object.keys(row[0])

        let columns = []
        for (var i = 0; i < keys.length; i++) {
            var obj = {
                title: keys[i],
                dataIndex: keys[i],
                key: keys[i]
            }
            if (!(keys[i] == 'assigned')) {
                columns.push(obj)
            }
        }

        let newrow = JSON.stringify(row)
        newrow = JSON.parse(newrow)
        let num = 0
        for (var j = 0; j < newrow.length; j++) {
            num++
            newrow[j]['key'] = num
        }
        if (subrows) {
            return (
                <div>
                    <Table
                        dataSource={ newrow }
                        columns={ columns }
                        size="small"
                        pagination={ {
                            hideOnSinglePage: true
                        } }
                        expandedRowRender={ this.expandedAssigned }
                        style={ { marginBottom: '20px', marginLeft: '10px' } }
                    />
                </div>
            )

        } else {
            return (
                <div>
                    <Table
                        dataSource={ newrow }
                        columns={ columns }
                        size="small"
                        pagination={ {
                            hideOnSinglePage: true
                        } }

                        style={ { marginBottom: '20px', marginLeft: '10px' } }
                    />
                </div>
            )

        }

    }


    renderRowsFormatData = (rows, subrows) => {


        if (rows) {
            if (rows.length >= 1) {
                return (
                    this.renderAsTable(rows, subrows)
                )
            }
        }
    }



    render() {
        let xtitle = "流程:" + this.pmstore.current_processkey + "/" + this.pmstore.current_processname
        console.log(toJS(this.pmstore.PorcessSummary))
        let summary = this.pmstore.PorcessSummary
        console.log(toJS(summary))


        return (
            <Collapse defaultActiveKey={ ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] } >
                <Panel header="流程概览" key="1">
                    <div>{ xtitle }</div>
                    <br />
                    <div>流程参数字段:{ summary.processpara }</div>

                </Panel>

                <Panel header="涉及到的角色" key="2">

                    <div style={ { margin: '10px' } }>增加区条目</div>
                    { summary.additems ? this.renderRowsFormatData(summary.relatedroles, false) : null }
                </Panel>



                <Panel header="增加区条目" key="3">

                    <div style={ { margin: '10px' } }>增加区条目</div>
                    { summary.additems ? this.renderRowsFormatData(summary.additems, true) : null }
                </Panel>


                <Panel header="单据号生成规则" key="4">
                    <div style={ { margin: '10px' } }>方法存储于模型文件:MPapernofactory</div>
                    { summary.paperrule ? this.renderRowsFormatData(summary.paperrule, false) : null }
                </Panel>

                <Panel header="前置处理handler" key="5">
                    { summary.prehandler ? this.renderRowsFormatData(summary.prehandler, false) : null }
                </Panel>

                <Panel header="后置处理handler" key="6">
                    { summary.posthandler ? this.renderRowsFormatData(summary.posthandler, false) : null }
                </Panel>

                <Panel header="SQL类型参考" key="7">
                    { summary.ref_sql ? this.renderRowsFormatData(summary.ref_sql, true) : null }
                </Panel>

                <Panel header="Service类型参考" key="8">
                    { summary.ref_service ? this.renderRowsFormatData(summary.ref_service, true) : null }
                </Panel>

                <Panel header="增加区某项作为参考" key="9">
                    { summary.ref_addasref ? this.renderRowsFormatData(summary.ref_addasref, true) : null }
                </Panel>

                <Panel header="抄送配置" key="10">
                    { summary.cccfg ? this.renderRowsFormatData(summary.cccfg, false) : null }
                </Panel>

                <Panel header="禁用[返回上一步][终止]按钮的节点" key="11">
                    { summary.cccfg ? this.renderRowsFormatData(summary.forbidden_btn, false) : null }
                </Panel>

            </Collapse >
        )

    }
}

export default ProcessSummary;
