import React from 'react'
import ReactDOM from 'react-dom'
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable'
import { Form, Input, Card, Table, Tooltip, Icon, Cascader, Select, Row, Col, Radio, Checkbox, Button, message, AutoComplete, } from 'antd';
import api from '../../../api/api'

import { observer, inject } from "mobx-react";

const { Option } = Select;

const AutoCompleteOption = AutoComplete.Option;



@inject("pmStore")
@observer
class Pluginuform extends React.Component {


    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.xref = React.createRef()

    }


    state = {

        confirmDirty: false,
        autoCompleteResult: []
    };


    render() {

        let xtitle = "注册Plugins:"
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;


        return (
            <Card title={ xtitle } style={ { width: "100%" } }>

                <CommonTable
                    action_code="boss_ufrom_plugin_cfg"
                    is_association_process={ false }
                />



            </Card>
        );
    }
}

export default Form.create()(Pluginuform);
