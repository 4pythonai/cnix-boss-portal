import React from 'react';

import AuthService from '../AuthService';
import WsService from '../WsService';
import navigationStore from '@/store/navigationStore';
import {hashHistory} from 'react-router';
import userStore from '@/store/userStore';
import {message,Tabs,Icon,Modal,Form,Select} from 'antd';
import {randomString} from '../../../utils/tools';
import api from '../../../api/api';
import './boot.css';

export default class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            visible: false,
            roles: [],
            rolename: '',
            rolecode: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.login_mobile = this.login_mobile.bind(this);
        this.afterLogin = this.afterLogin.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.jsencode = this.jsencode.bind(this);
        this.Auth = new AuthService();
        this.WsService = new WsService();
    }

    componentWillMount() {
        let transaction_id = randomString(20);
        this.setState({transaction_id});
        sessionStorage.setItem('session_id',transaction_id);
    }

    componentDidMount() {
        this.WsService.wsinit(this.state.transaction_id);
    }

    handleFormSubmitMobile(e) {
        e.preventDefault();
        this.login_mobile(this.jsencode(this.state.mobile),this.jsencode(this.state.password),this.state.transaction_id);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    jsencode(str) {
        let encoded = '';
        for(let i = 0;i < str.length;i++) {
            const a = str.charCodeAt(i);
            const b = a ^ 51;
            encoded += String.fromCharCode(b);
        }
        return encoded;
    }

    async login_mobile(mobile,password,transaction_id) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('mobile');
        let params = {
            data: {mobile,password,transaction_id},
            method: 'POST'
        };

        let res = await api.user.login_mobile(params);

        if(res.code == 401) {
            message.error('登陆失败，请检查手机号和密码！',2.5);
            return;
        }

        if(res.code == 200) {
            this.afterLogin(res);
        }
    }
    afterLogin(res) {
        message.loading('登录成功,准备工作环境',1.1,() => {
            // navigationStore.saveSessionBadge(res.info);
            // navigationStore.setBadge(res.info);
            userStore.setUserProfile(res.profile);
            userStore.setToken(res.token);
            this.setState({
                roles: res.profile.roles,
                rolename: res.profile.roles[0].role_name,
                rolecode: res.profile.roles[0].role_code
            });
            if(res.profile.roles.length == 1) {
                userStore.setUserRole(res.profile.roles[0]);
                hashHistory.push('/home');
            } else {
                this.setState({
                    visible: true
                });
            }
            console.log(456,this.state.roles);
        });
    }
    handleOk() {
        let obj = {};
        obj.role_name = this.state.rolename;
        obj.role_code = this.state.rolecode;
        userStore.setUserRole(obj);
        hashHistory.push('/home');
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    changeValue(a,b) {
        this.setState({
            rolecode: b.props.value,
            rolename: b.props.children
        });
        console.log(b.props.value,b.props.children);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <h1 style={{fontWeight: '200'}}>Welcome</h1>
                    <form className="form">
                        <input type="mobile" id="boss_mobile" name="mobile" placeholder="手机号" onChange={this.handleChange} required="" />
                        <input type="password" id="boss_pwd" name="password" placeholder="密码" onChange={this.handleChange} required="" />
                        <button id="loginbtn" onClick={this.handleFormSubmitMobile} type="submit">
                            Login/登录
                        </button>
                    </form>
                </div>
                <ul className="bg-bubbles">
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                </ul>
            </div>
        );
    }
}
