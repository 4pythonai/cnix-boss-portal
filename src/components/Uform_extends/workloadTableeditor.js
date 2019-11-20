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

        //插件都有plugpara 配置, 对表格型数据,plugpara 为action_code
        let actcode = this.props.plugpara

        // alert(this.props.uuid)

        return (
            <div>
                <CommonTable
                    onChange={ this.props.getComponentValue }
                    as_virtual='n'
                    action_code={ actcode }
                    query_cfg={ query_cfg_runtime }
                />
            </div>
        );
    }
}