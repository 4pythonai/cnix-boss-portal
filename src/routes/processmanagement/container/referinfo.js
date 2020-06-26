import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'


import { Form, Input, Divider, Card, Select, Row, Col, Button, message, TextArea, } from 'antd';
import api from '../../../api/api'

import { observer, inject } from "mobx-react";
import { observable, reaction, action, autorun, computed } from "mobx";



import ReferTable from './referTable';
import ReferSql from './referSql';
import ReferService from './referService'
import ReferStatic from './referStatic'

const { Option } = Select;




@inject("pmStore")
@observer
class ReferInfo extends React.Component {


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
        updateDirection: 'this',
        confirmDirty: false,
        autoCompleteResult: []
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


    render() {
        let xtitle = "设置ReferinfoArea:" + this.pmstore.current_processname
        return (
            <Card title={ xtitle } style={ { width: "100%" } }>
                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_flow_referenceinfo_cfg"
                    is_association_process={ false }
                />

                <Divider style={ { color: "red" } } orientation="center">|参考表格类型的静态信息|</Divider>
                <ReferTable tbref={ this.tbref } />
                <Divider style={ { color: "red" } } orientation="center">|基于SQL的静态信息|</Divider>
                <div>
                    <ReferSql tbref={ this.tbref } />
                </div>
                <Divider style={ { color: "red" } } orientation="center">|基于Service的静态信息|</Divider>

                <ReferService tbref={ this.tbref } />
                <Divider style={ { color: "red" } } orientation="center">|静态文本|</Divider>
                <ReferStatic tbref={ this.tbref } />
            </Card >
        );
    }
}

export default Form.create()(ReferInfo);
