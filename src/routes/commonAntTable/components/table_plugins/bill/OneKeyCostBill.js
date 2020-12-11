
import React from 'react'
import {Modal,message,Checkbox,Input,Button,Progress} from 'antd';
import {observer,inject} from "mobx-react";
import api from '@/api/api'
import {toJS} from 'mobx'
import request from 'then-request'
import {randomString} from '@/utils/tools'
import DevicePort from './DevicePort'


import { root_url, port, controller, version_2 } from '@/api/api_config/base_config'
const api_root = `${ root_url }:${ port }/${ version_2 }`
export { api_root }



@observer
export default class OneKeyCostBill extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.onekeyfunction = this.onekeyfunction.bind(this)
        this.tick = this.tick.bind(this)
    }


    state = {
        checkpassed: false,
        visible: false,
        percent: 0.0,
        uuid: '',
        secondsElapsed: 0,
    }

    async init() {

        this.setState({visible: true,secondsElapsed: 0})
        this.interval = setInterval(() => this.tick(),1000);

    }

    async tick() {
        if(this.state.visible && !this.state.uuid == '') {

            let that=this
            let token_from_userStore = sessionStorage.getItem('token')
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token_from_userStore
            }
            
            console.log(api_root)
            request('GET', api_root+'/Billing/percentComputer?uuid=' + this.state.uuid,{headers: headers,json: {}}).getBody('utf8').then(JSON.parse).done(function(res) {
                console.log(res);
                if(res.code == 500) {
                    clearInterval(that.interval);
                }
                
                if(res.total==res.done){
                    clearInterval(that.interval);
                }
                
                let percent= ((res.done/res.total)*100).toFixed(2)
                that.setState({percent: percent })

                
                
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.setState({visible: true,secondsElapsed: 0})

    }



    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }


    async onekeyfunction() {
        this.setState({visible: true})
        let uuid = this.create_UUID()
        this.setState({uuid: uuid})
        let params = {method: 'GET',data: {uuid: uuid}}
        let json = await api.billing.OneKeyCostBill(params);
        if(json.success == 'false') {
            this.setState({visible: true,checkpassed: false,toal_check_errors: json.toal_check_errors})
        } else {
            this.setState({visible: true,checkpassed: true,billjson: json})
        }
    }



    getModalProps() {
        return {
            width: 700,
            destroyOnClose: true,
            title: '一键出合同账单',
            bodyStyle: {
                width: 700,
                height: 500,
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,
            onOk: () => this.onCancel(),
            footer: [<Button key="back" onClick={this.onCancel}>
                关闭
            </Button>,],
            onCancel: () => this.onCancel(),
        }
    }



    onCancel = (e,f) => {
        this.setState({
            visible: false
        })
    }


    render() {

        let modalProps = this.getModalProps();
        return <Modal {...modalProps}>
            <div>
                <Button key="back" onClick={this.onekeyfunction}>
                    点击开始执行
                </Button>
                <div>
                    <Progress strokeLinecap="square" percent={this.state.percent} />
                </div>
            </div>
        </Modal >
    }
}
