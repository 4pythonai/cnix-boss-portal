import React from 'react';
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable';
export default class WorkloadTableeditor extends React.Component {
    render() {
        let query_cfg_runtime = { count: 1, lines: { and_or_0: 'and', field_0: 'uuid', operator_0: '=', vset_0: this.props.uuid } };

        //插件都有plugpara 配置, 对表格型数据,plugpara 为action_code
        let actcode = this.props.plugpara;
        console.log('工作量编辑插件');
        console.log(this.props);

        return (
            <div>
                <CommonTable onChange={this.props.getComponentValue} as_virtual="n" action_code={actcode} query_cfg={query_cfg_runtime} readOnly={this.props.readOnly} />
            </div>
        );
    }
}
