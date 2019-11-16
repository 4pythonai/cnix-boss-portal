import React from 'react'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Select, Button, message, AutoComplete, } from 'antd';
import api from '../../../api/api'
import { observer, inject } from "mobx-react";
import { observable, reaction, action, autorun, computed } from "mobx";

const { Option } = Select;
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

        if (this.tbref.current) {
            let query_cfg = { count: 1, lines: { and_or_0: "and", field_0: "processkey", operator_0: "=", vset_0: pk } }
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg)
            await this.tbref.current.listData()
        }
    }







    render() {
        let xtitle = "流程节点情况:" + this.pmstore.current_processname


        return (
            <Card title={ xtitle } style={ { width: "100%" } }>

                <CommonTable
                    ref={ this.tbref }
                    action_code="boss_flow_area_cfg_assign"
                    is_association_process={ false }
                />
            </Card>
        );
    }
}

export default Form.create()(ProcessSummary);