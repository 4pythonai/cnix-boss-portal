
import React from 'react'
import {Modal,Descriptions,message,InputNumber,Table,Divider,Radio,Checkbox,Slider,Row,Col,Input,Button} from 'antd';
import {observer,inject} from "mobx-react";
import api from '@/api/api'
import {toJS} from 'mobx'
import {randomString} from '@/utils/tools'
import DevicePort from './DevicePort'


@observer
export default class OneKeyCostBill extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.onekeyfunction=this.onekeyfunction.bind(this)
    }


    state = {
        checkpassed: false,
        visible: false,
    }

    async init() {

        this.setState({visible: true})

    }


    async onekeyfunction() {
        this.setState({visible: true})

        let params = {method: 'GET',data: {}}
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
            </div>
        </Modal >
    }


}
