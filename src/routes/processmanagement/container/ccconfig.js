import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Row, Col, Button, Checkbox, message, Table, AutoComplete, Divider } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";

import { observable, reaction, action, autorun, computed } from "mobx";
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;


@inject("pmStore")
@observer
class CCconfig extends React.Component {


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

        selectedroles: [],
        confirmDirty: false,
    };

    componentDidMount() {

        this.refreshCurrentcfg(this.pmstore.current_processkey)
    }


    componentWillUnmount() {
        this.pk_watcher()
    }



    async refreshCurrentcfg(pk) {

        let query_cfg = null
        if (pk.length > 0) {
            query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "processkey", operator_0: "=", vset_0: pk } }
        }
        await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
        await this.tbref.current.listData()
    }





    onSelectedRowKeysChange = (selectedRowKeys, records) => {
        console.log(records)
        let record = records[0]

    }


    saveCC = async () => {

        console.log(this.state.selectedroles)
        console.log(this.pmstore)
        if (this.state.selectedroles.length == 0) {
            message.error("请选择角色");
            return;
        }

        if (!this.pmstore.current_nodename) {
            message.error('请选择流程节点');
            return;
        }

        let params = {
            data: {
                "processkey": this.pmstore.current_processkey,
                "nodeid": this.pmstore.current_nodeid,
                "nodename": this.pmstore.current_nodename,
                "roles": this.state.selectedroles
            },
            method: 'POST'
        };
        await api.processmanager.saveCCcfg(params);

    }


    resetRoles = () => {

        this.setState({ selectedroles: [] })

    }


    onChangeRoleSelection = selectedroles => {
        this.setState({
            selectedroles,
            indeterminate: !!selectedroles.length && selectedroles.length < this.state.selectedroles.length

        });
    };



    selectNode = (record) => {

        console.log(record)
        console.log(record.id)
        console.log(record.name)


        this.pmstore.setCurrentSid(record.id)
        this.pmstore.setCurrentNodename(record.name)
        this.setState({ selectedRowKeys: [record.id] });


    }


    render() {



        let xtitle = "抄送设置:" + this.pmstore.current_processname
        let allnodes = this.pmstore.AllNodeName
        let allroles = this.pmstore.roleList
        const { selectedRowKeys } = this.state;


        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };


        const columns = [
            // {
            //     title: 'CC操作',
            //     width: 100,
            //     render: (text, record) => {
            //         return (
            //             <div style={ { width: "100px" } }>
            //                 <Button size="small" type="button" onClick={ () => this.onClick(record.activity_code, 'bpmstart_template') }>启动</Button>
            //             </div>
            //         )
            //     }
            // },

            {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'SID',
                dataIndex: 'id',
                key: 'id',
            },
        ];


        return (
            <Card title={ xtitle } style={ { width: "100%" } }>



                <Table
                    onRow={ (record) => ({
                        onClick: () => {
                            this.selectNode(record);
                        },
                    }) }
                    rowKey={ record => record.id }
                    size="small"
                    pagination={ false }
                    columns={ columns }
                    rowSelection={ rowSelection }
                    dataSource={ allnodes } />
                <Divider />


                <br /><br />
                <CheckboxGroup
                    value={ this.state.selectedroles }
                    onChange={ this.onChangeRoleSelection }>

                    {
                        allroles ?
                            allroles.map((item, index) => {
                                return (
                                    <Checkbox style={ { width: '180px', marginLeft: '10px' } } key={ index } value={ item.role_code }>{ item.role_name }</Checkbox>
                                )
                            })
                            :
                            null
                    }
                </CheckboxGroup>

                <div style={ { margin: '20px 0 20px 10px' } }>
                    <Button type="primary" onClick={ () => this.saveCC() }>保存抄送角色配置</Button>
                    <Button style={ { margin: '20px 0 20px 10px' } } type="primary" onClick={ () => this.resetRoles() }>Reset</Button>
                </div>


                <Divider />
                <div style={ { margin: '20px' } }>抄送详情</div>
                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_process_cc_cfg"
                    is_association_process={ false }
                />
            </Card>
        );
    }
}

export default Form.create()(CCconfig);