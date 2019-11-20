import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react'
import auth from '../../routes/auth';
// import QueueAnim from 'rc-queue-anim';
const { Header, Sider, Content } = Layout;

@inject('navigation')
@observer
export default class PortalLayout extends React.Component {
    constructor(props) {
        super();
        this.store = props.navigation
    }
    render() {
        let flowremark=window.location.href.indexOf('remark')
        return <Layout style={ { height: '100vh' } }>
            <Sider
                collapsed={ this.store.isCollapse }
                className="portal_menu"
                style={ flowremark!=-1?{ padding: 0, height: "100vh", overflowY: "scroll",display:'none'}:{ padding: 0, height: "100vh", overflowY: "scroll"} }
                width={224}
                >
                <Sidebar /></Sider>
            <Layout>

                <Header>
                    <Navbar />
                </Header>

                <Content
                    style={ {
                        background: '#fff',
                        minHeight: 280,
                        height: "100vh",
                        overflowY: "scroll",
                    } }
                    className="portal_content"
                >{ this.props.children }</Content>
            </Layout>
        </Layout>
    }
}