import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from 'antd';
import Modifyarea from './modifyarea';
import Addarea from './addarea';
<<<<<<< HEAD
import ReferArea from './referArea'
=======
import ReferInfo from './referinfo'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import Resarea from './resarea'
import CCconfig from './ccconfig'
import PapernoCfg from './papernocfg'
import ProcessSummary from './processSummary'
import SidHandlercfg from './sidHandlercfg'





export default class Pmtabs extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
<<<<<<< HEAD
        
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        const tabList = [
            {
                key: 'tab1',
                tab: '增加区域配置',
            },
<<<<<<< HEAD
            // {
            //     key: 'tab2',
            //     tab: '修改区域配置',
            // },
            {
                key: 'tab3',
                tab: '受理信息配置',
=======
            {
                key: 'tab2',
                tab: '修改区域配置',
            },
            {
                key: 'tab3',
                tab: '参考信息配置',
            }, {
                key: 'tab4',
                tab: '资源操作配置',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            }, {
                key: 'tab5',
                tab: '抄送配置',
            }, {
                key: 'tab6',
                tab: 'PaperNo规则',
            },
            {
                key: 'tab7',
                tab: '节点handler',
            },
            {
                key: 'tab8',
<<<<<<< HEAD
                tab: '流程配置总览',
=======
                tab: '已分配规则',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            }
        ];

        const contentList = {
            tab1: <Addarea />,
<<<<<<< HEAD
            // tab2: <Modifyarea />,
            tab3: <ReferArea />,
=======
            tab2: <Modifyarea />,
            tab3: <ReferInfo />,
            tab4: <Resarea />,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            tab5: <CCconfig />,
            tab6: <PapernoCfg />,
            tab7: <SidHandlercfg />,
            tab8: <ProcessSummary />,


        };


        return (
            <div>
                <br />
                <Card
                    style={ { width: '100%' } }
                    title="流程配置区"
                    tabList={ tabList }
                    activeTabKey={ this.state.key }
                    hoverable={ true }
                    headStyle={ { width: '1200px' } }
                    onTabChange={ key => {
                        this.onTabChange(key, 'key');
                    } }
                >
                    { contentList[this.state.key] }
                </Card>
                <br />
                <br />

            </div>
        );
    }

}

