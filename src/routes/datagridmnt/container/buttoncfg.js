import React from 'react';
import CommonTable from '../../../routes/commonAntTable/components/commonTableCom/commonTable';
import { Form, Card, message } from 'antd';
import api from '../../../api/api';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';

@inject('dmStore')
@observer
class ButtonCfg extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
        this.tbref = React.createRef();
        this.actcode_watcher = reaction(
            () => {
                return this.dmstore.current_actcode;
            },
            (currcode) => {
                this.refreshCurrentcfg(currcode);
            }
        );
    }

    componentDidMount() {
        if (this.dmstore.current_actcode) {
            this.refreshCurrentcfg(this.dmstore.current_actcode);
        }
        this.refreshCurrentcfg(this.dmstore.current_actcode);
    }

    componentWillUnmount() {
        this.actcode_watcher(); //dispose actcode_watcher
    }

    async refreshCurrentcfg(current_actcode) {
        if (this.tbref.current) {
            let query_cfg = { count: 1, lines: { and_or_0: 'and', field_0: 'act_code', operator_0: '=', vset_0: current_actcode } };
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg);
            await this.tbref.current.listData();
        }
    }

    //添加按钮

    render() {
        let xtitle = '设置按钮:' + this.dmstore.current_actcode + '/' + this.dmstore.current_actname;

        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <CommonTable
                    query_cfg={{ code: this.dmstore.current_actcode }}
                    ref={this.tbref}
                    action_code="boss_portal_button_actcode"
                    is_association_process={false}
                    dataGridcode={this.dmstore.current_actcode}
                />
            </Card>
        );
    }
}

export default Form.create()(ButtonCfg);
