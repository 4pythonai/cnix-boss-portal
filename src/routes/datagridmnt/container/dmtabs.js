import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from 'antd';
import ButtonCfg from './buttoncfg';
import TriggerAdder from './trigger/triggerAdder'
import TriggerList from './trigger/triggerList'
import Fieldmanager from './fieldmanager'
import GridEDitor from './gridEditor'
import AddDatagrid from './gridAdder'

export default class Dmtabs extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        key: 'tab0',
        noTitleKey: 'app',
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        const tabList = [

            {
                key: 'tab1',
                tab: '添加',
            },
            {
                key: 'tab2',
                tab: '编辑',
            },

            {
                key: 'tab3',
                tab: '按钮配置',
            },

            {
                key: 'tab4',
                tab: '添加联动',
            },
            {
                key: 'tab5',
                tab: '管理联动',
            }, {
                key: 'tab6',
                tab: '字段管理',
            },
        ];

        const contentList = {
            tab1: <AddDatagrid />,
            tab2: <GridEDitor />,
            tab3: <ButtonCfg />,
            tab4: <TriggerAdder />,
            tab5: <TriggerList />,
            tab6: <Fieldmanager />,
        };


        return (
            <Card
                style={ { width: '100%' } }
                tabList={ tabList }
                activeTabKey={ this.state.key }
                onTabChange={ key => {
                    this.onTabChange(key, 'key');
                } }
            >
                { contentList[this.state.key] }
            </Card>
        );
    }
}

