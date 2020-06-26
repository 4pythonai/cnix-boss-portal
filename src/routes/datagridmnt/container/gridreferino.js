import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'


import { Form, Input, Divider, Card, Select, Row, Col, Button, message, TextArea, } from 'antd';
import api from '../../../api/api'

import { observer, inject } from "mobx-react";
import { observable, reaction, action, autorun, computed } from "mobx";



import ReferTable from './referTable';
import ReferSql from './referSql';
import ReferService from './referService'
import ReferGrid from './referGrid'



const { Option } = Select;




@inject("dmStore")
@observer
class Gridreferino extends React.Component {



    constructor(props) {
        super(props)
        this.dmstore = props.dmStore
        this.tbref = React.createRef()
        this.actcode_watcher = reaction(
            () => { return this.dmstore.current_actcode }, currcode => {
                this.refreshCurrentcfg(currcode)
            }
        )
    }



    state = {
        updateDirection: 'this',
        confirmDirty: false,
        autoCompleteResult: []
    };



    componentDidMount() {
        if (this.dmstore.current_actcode) {
            this.refreshCurrentcfg(this.dmstore.current_actcode)
        }
        this.refreshCurrentcfg(this.dmstore.current_actcode)
    }


    componentWillUnmount() {
        this.actcode_watcher()  //dispose actcode_watcher
    }



    async refreshCurrentcfg(current_actcode) {

        if (this.tbref.current) {
            let query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "act_code", operator_0: "=", vset_0: current_actcode } }
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
            await this.tbref.current.listData()
        }
    }

    render() {
        let xtitle = "设置ReferinfoArea:" + this.dmstore.current_actname
        return (
            <Card title={ xtitle } style={ { width: "100%" } }>
                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_act_referenceinfo_cfg"
                    is_association_process={ false }
                    dataGridcode={ this.dmstore.current_actcode }

                />

                {/* <Divider style={ { color: "red" } } orientation="center">|参考表格类型的静态信息|</Divider>
                <ReferTable tbref={ this.tbref } />

                <Divider style={ { color: "red" } } orientation="center">|基于SQL的静态信息|</Divider>
                <ReferSql tbref={ this.tbref } />

                <Divider style={ { color: "red" } } orientation="center">|基于Service的静态信息|</Divider>
                <ReferService tbref={ this.tbref } /> */}

                <Divider style={ { color: "red" } } orientation="center">|基于Actcode-Service的静态信息|</Divider>
                <ReferGrid tbref={ this.tbref } />
            </Card >
        );
    }
}

export default Form.create()(Gridreferino);
