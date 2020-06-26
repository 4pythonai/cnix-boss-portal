import React from 'react'
import Hamburger from './hamburger';
import PortalBreadcrumb from './breadcrumb/PortalBreadcrumb'
<<<<<<< HEAD
import { Form, message, Input, Menu, Badge, Icon, Dropdown, Modal } from 'antd';
=======
import { Form, message, Input, Menu, Icon, Dropdown, Modal } from 'antd';
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import AuthService from '../../../routes/auth/AuthService'
import EditPassword from '../../antdComponents/editPassword'
import api from '../../../api/api'
import { inject, observer } from 'mobx-react'
import { hashHistory } from "react-router";

const { confirm } = Modal


<<<<<<< HEAD
@inject('navigation')
=======
// @inject('userStore')
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imageUrl: null
        }
<<<<<<< HEAD
        this.navigationStore = props.navigation
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.AuthService = new AuthService()

        if (sessionStorage.getItem("staff_name") === null) {
            this.AuthService.logout()
        }
    }


    componentWillMount() {
        if (sessionStorage.getItem("staff_name") === null) {
            this.AuthService.logout()
        }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


    componentDidMount() {
        this.getprofile()
<<<<<<< HEAD
        let staff_name = sessionStorage.getItem("staff_name")
        this.navigationStore.setBossTitle(staff_name)
        if (staff_name == 'null') {
=======
        if (sessionStorage.getItem("staff_name") == 'null') {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            hashHistory.push('/login')
        }
    }

<<<<<<< HEAD
    

    logout = ()=> {
        this.navigationStore.setBossTitle(null)
        this.AuthService.logout()
    }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    async getprofile() {
        let res = await api.user.profile({ method: 'POST' })
        if (res.code == '200') {
            this.setState({
                imageUrl: res.data.head_portrait,
            })
        }
    }

    showConfirm() {
        confirm({
            content: <h4>您确定要退出系统么？</h4>,
<<<<<<< HEAD
            onOk: () => this.logout(),
=======
            onOk: () => this.AuthService.logout(),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            cancelText: '取消',
            okText: '确定',
            onCancel() {
                console.log('Cancel');

            },
        });
    }
    showmodal() {
        this.setState({
            visible: true,
        });
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    getUserBox = () => {
        return <Menu className="dropdownMenu">
<<<<<<< HEAD
            <Menu.Item key="setting:2" onClick={event => hashHistory.push('/profile')}>个人中心</Menu.Item>
            <Menu.Item key="setting:1" onClick={event => this.showmodal()} >修改密码</Menu.Item>
            {/* <Menu.Item key="setting:3">锁屏</Menu.Item> */}
            <Menu.Divider />
            <Menu.Item key="setting:5" onClick={event => this.showConfirm()}>退出登录</Menu.Item>
        </Menu>
    }

    switchToWaiting(actioncode) {
        if(this.navigationStore.currentMenu.action_code === actioncode && location.hash.indexOf(this.navigationStore.currentMenu.router) != -1){
            this.navigationStore.changeUpdateKey()
            return;
        }

        this.navigationStore.switchRouter({action_code: actioncode})
    }
    render() {
        return (
            
            <div className="hamburger_box">
                <Hamburger className="hamburger-container" />
                <PortalBreadcrumb />
                <Dropdown overlay={this.getUserBox()} trigger={['click']} className="dropdown">
                    <a className="ant-dropdown-link" href="#">
                        <span style={{ paddingRight: '5px', color: "#97a8be", fontSize: "14px" }}>
=======
            <Menu.Item key="setting:2" onClick={ event => hashHistory.push('/profile') }>个人中心</Menu.Item>
            <Menu.Item key="setting:1" onClick={ event => this.showmodal() } >修改密码</Menu.Item>
            {/* <Menu.Item key="setting:3">锁屏</Menu.Item> */ }
            <Menu.Divider />
            <Menu.Item key="setting:5" onClick={ event => this.showConfirm() }>退出登录</Menu.Item>
        </Menu>
    }



    render() {
        return (
            <div className="hamburger_box">
                <Hamburger className="hamburger-container" />
                <PortalBreadcrumb />
                <Dropdown overlay={ this.getUserBox() } trigger={ ['click'] } className="dropdown">
                    <a className="ant-dropdown-link" href="#">
                        <span style={ { paddingRight: '5px', color: "#97a8be", fontSize: "14px" } }>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            {
                                sessionStorage.getItem("staff_name")
                                + " / " +
                                sessionStorage.getItem("role_name")
                            }
                        </span>
<<<<<<< HEAD
                        <img style={{ width: '36px',height:'36px', verticalAlign: 'middle' }} src={this.state.imageUrl} className="user-avatar" />
=======
                        <img style={ { width: '36px', verticalAlign: 'middle' } } src={ this.state.imageUrl } className="user-avatar" />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

                        <Icon type="down" />
                    </a>
                </Dropdown>
<<<<<<< HEAD
                <div className="dropdown" style={{marginRight:'15px',color:'rgb(151, 168, 190)',cursor: 'pointer'}}>
                    <Badge count={this.navigationStore.affair_count} onClick={()=> this.switchToWaiting('pendtask')}>
                    待办<Icon type="copy" style={{fontSize:'20px'}}/>
                    </Badge>
                </div>
                <div className="dropdown" style={{marginRight:'15px',color:'rgb(151, 168, 190)',cursor: 'pointer'}}>
                    <Badge count={this.navigationStore.message_count} onClick={()=> this.switchToWaiting('customer_notify')}>
                    通知<Icon type="bell" style={{fontSize:'20px'}}/>
                    </Badge>
                </div>
                <EditPassword visible={this.state.visible} onchanged={this.handleCancel} />
=======
                <EditPassword visible={ this.state.visible } onchanged={ this.handleCancel } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </div>
        )
    }
}