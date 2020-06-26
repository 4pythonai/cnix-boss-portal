import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from 'antd';
import ButtonCfg from './buttoncfg';
import TriggerAdder from './trigger/triggerAdder'
import TriggerList from './trigger/triggerList'
import Fieldmanager from './fieldmanager'
import GridEDitor from './gridEditor'
import AddDatagrid from './gridAdder'
<<<<<<< HEAD
import Gridreferino from './gridreferino'
import Gridinfo from './gridinfo'
import Tablesort from './tablesort'

import { observer, inject } from "mobx-react";




@inject("dmStore")
@observer
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
            {
                key: 'tab7',
                tab: '表格排序',
            },
            {
                key: 'tab8',
                tab: '参考区',
            },
            {
                key: 'tab9',
                tab: 'Info',
            },



=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        ];

        const contentList = {
            tab1: <AddDatagrid />,
            tab2: <GridEDitor />,
            tab3: <ButtonCfg />,
            tab4: <TriggerAdder />,
            tab5: <TriggerList />,
<<<<<<< HEAD
            tab6: <Fieldmanager
                setMaintableColumns={this.props.dmStore.setMaintableColumns}
                batchUpdateFieldCfg={this.props.dmStore.batchUpdateFieldCfg}
                setFieldAttr={this.props.dmStore.setFieldAttr}
                saveFieldCfg={this.props.dmStore.saveFieldCfg}
                maintableColumns={this.props.dmStore.maintableColumns}
                current_actname={this.props.dmStore.current_actname}
                current_actcode={this.props.dmStore.current_actcode}
                plugins={this.props.dmStore.plugins}
                Categories={this.props.dmStore.Categories}
            />,
            tab7: <Tablesort

                maintableColumns={this.props.dmStore.maintableColumns}
                current_actcode={this.props.dmStore.current_actcode}
                onTabChange={this.onTabChange}
            />,
            tab8: <Gridreferino />,
            tab9: <Gridinfo />,


=======
            tab6: <Fieldmanager />,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        };


        return (
            <Card
<<<<<<< HEAD
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {contentList[this.state.key]}
=======
                style={ { width: '100%' } }
                tabList={ tabList }
                activeTabKey={ this.state.key }
                onTabChange={ key => {
                    this.onTabChange(key, 'key');
                } }
            >
                { contentList[this.state.key] }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </Card>
        );
    }
}

