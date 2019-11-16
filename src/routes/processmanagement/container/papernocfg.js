import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Row, Col, Button, Checkbox, message, Table, AutoComplete, Divider } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
import { observable, action, autorun, computed } from "mobx";

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;


@inject("pmStore")
@observer
class PapernoCfg extends React.Component {


    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.tbref = React.createRef()

        autorun(() => {
            // this.refreshCurrentcfg()
        })
    }


    state = {
        selectedRowKeys: [],
        confirmDirty: false,
    };



    componentDidMount() {
        // this.refreshCurrentcfg()
    }


    onSelectedRowKeysChange = (selectedRowKeys, records) => {

        let record = records[0]
        this.setState({ selectedRowKeys: [record.id] });
    }



    selectPaperRule = (record) => {
        this.setState({ selectedRowKeys: [record.id] });
    }



    savePaperNORuleUsage = async () => {

        console.log(this.state.selectedRowKeys[0])
        console.log(this.pmstore.current_processkey)

        if (this.pmstore.current_processkey) {

            let params = {
                data: {
                    "processkey": this.pmstore.current_processkey,
                    "ruleid": this.state.selectedRowKeys[0],
                },
                method: 'POST'
            };
            await api.processmanager.savePaperNORuleUsage(params);
        } else {
            message.error("请选择一个流程");
        }



    }



    render() {



        let xtitle = "设置单据号规则:" + this.pmstore.current_processname
        let papernorules = this.pmstore.papernorules
        const { selectedRowKeys } = this.state;


        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };


        const columns = [
            {
                title: '操作',
                width: 100,
                render: (text, record) => {
                    return (
                        <div style={ { width: "100px" } }>
                            <Button size="small" type="button" onClick={ () => this.savePaperNORuleUsage(record.activity_code) }>使用</Button>
                        </div>
                    )
                }
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'rulename',
                key: 'rulename'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            },


        ];


        return (
            <Card title={ xtitle } style={ { width: "100%" } }>



                <Table
                    onRow={ (record) => ({
                        onClick: () => {
                            this.selectPaperRule(record);
                        },
                    }) }
                    rowKey={ record => record.id }
                    size="small"
                    pagination={ false }
                    columns={ columns }
                    rowSelection={ rowSelection }
                    dataSource={ papernorules } />



            </Card>
        );
    }
}

export default Form.create()(PapernoCfg);