import React from 'react'

import AuthService from '../AuthService';
import WsService from '../WsService';
import navigationStore from '@/store/navigationStore'
import { hashHistory } from "react-router";
import userStore from '@/store/userStore'
import Qrimg from './Qrimg'
import { message,Tabs, Icon,Modal,Form,Select } from 'antd'
import { randomString } from '../../../utils/tools'
import api from '../../../api/api'


import './login.css';



export default class Login extends React.Component {

    constructor(props) {
        super();
        this.state={
            visible:false,
            roles:[],
            rolename:'',
            rolecode:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.login_mobile = this.login_mobile.bind(this);
        this.afterLogin = this.afterLogin.bind(this);
        this.changeValue = this.changeValue.bind(this);                       
        this.Auth = new AuthService();
        this.WsService = new WsService();
    }

    componentWillMount() {
        this.setState(
            {
                transaction_id: randomString(20)
            }
        )
    }

    componentDidMount() {
        this.WsService.wsinit(this.state.transaction_id);
    }


    handleFormSubmitMobile(e) {
        e.preventDefault();
        this.login_mobile(this.state.mobile, this.state.password, this.state.transaction_id)
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    async login_mobile(mobile, password, transaction_id) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id },
            method: 'POST'
        };

        let res = await api.user.login_mobile(params)


        if (res.code == 401) {
            message.error('登陆失败，请检查手机号和密码！', 2.5)
            return;
        }

        if (res.code == 200) {
            this.afterLogin(res)
        }
    }
    afterLogin(res) {
        message.loading('登录成功,准备工作环境', 1.1, () => {
            navigationStore.change_badge_num(res);
            userStore.setUserProfile(res.profile);
            userStore.setToken(res.token);
            this.setState({
                roles:res.profile.roles,
                rolename:res.profile.roles[0].role_name,
                rolecode:res.profile.roles[0].role_code
            })
            if(res.profile.roles.length==1){
                userStore.setUserRole(res.profile.roles[0]);
                hashHistory.push('/home')
            }else{
                this.setState({
                    visible:true
                })
            }
            console.log(456,this.state.roles)           
        })





    }
    handleOk(){
        
            let obj={}
            obj.role_name=this.state.rolename
            obj.role_code=this.state.rolecode
            userStore.setUserRole(obj);
                hashHistory.push('/home')
        
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    changeValue(a,b){
        this.setState({
            rolecode:b.props.value,
            rolename:b.props.children
        })
        console.log(b.props.value,b.props.children)
    }
    render() {
        return (
            <div className="w3layouts-two-grids">
                <div className="mid-class">
                    <div className="txt-left-side">
                        <h2> 手机号登录</h2>
                        <p>如果登录有问题,请联系信息管理中心, 热线电话:8888,或发送邮件至 admin@sinnet.com.cn </p>
                        <form action="#" method="post">
                            <div className="form-left-to-w3l">
                                <span className="fa fa-envelope-o" aria-hidden="true"></span>
                                <input type="mobile" name="mobile" placeholder="手机号" onChange={ this.handleChange } required="" />
                                <div className="clear"></div>
                            </div>
                            <div className="form-left-to-w3l ">

                                <span className="fa fa-lock" aria-hidden="true"></span>
                                <input type="password" name="password" placeholder="密码" onChange={ this.handleChange } required="" />
                                <div className="clear"></div>
                            </div>

                            <div className="btnn">
                                <button id="loginbtn" onClick={ this.handleFormSubmitMobile } type="submit">Login/登录</button>

                            </div>
                        </form>
                        <div className="w3layouts_more-buttn">
                            <h3>使用过程中需要帮助?
                    <a href="#/docs">查看文档DOC
                    </a>
                            </h3>
                        </div>

                    </div>
                    <div className="img-right-side">
                        <h3>BOSS小程序扫码登录</h3>
                        <p>安装了BOSS微信小程序的同事,可以扫码进行登录,微信扫码/钉钉扫码/APP扫码登录正在开发部署中</p>
                        <Qrimg transaction_id={ this.state.transaction_id } />
                    </div>
                </div>
                <Modal
                    title="选择角色："
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    width="400px"
                    visible={this.state.visible}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <Form.Item label="选择角色：">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择角色"
                                onChange={this.changeValue}
                                defaultValue={this.state.roles[0]?this.state.roles[0].role_code:null}
                            >
                                {
                            this.state.roles.length && this.state.roles.map((item, index) => (
                                <Select.Option key={index} value={item.role_code}>{item.role_name}</Select.Option>)
                            )
                        }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
