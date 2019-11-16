import React from 'react';
import { Radio } from 'antd'
import { Select } from 'antd';
import api from '@/api/api'
const { Option } = Select;

import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
export default class WorkloadTableeditor extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }



    componentDidMount() {
    }




    render() {
        let query_cfg_runtime = { count: 1, lines: { and_or_0: "and", field_0: "uuid", operator_0: "=", vset_0: this.props.uuid } }

        // alert(this.props.uuid)

        return (
            <div>
                <CommonTable
                    onChange={ this.props.getComponentValue }
                    as_virtual='n'
                    action_code='boss_construction_workload_manager'
                    query_cfg={ query_cfg_runtime }
                />
            </div>
        );
    }
}