
import React from 'react'
import {Modal,Table,message,Checkbox,Input,Button,Progress} from 'antd';
import {observer,inject} from "mobx-react";
import api from '@/api/api'
import {toJS} from 'mobx'
import request from 'then-request'
import {randomString} from '@/utils/tools'
import DevicePort from './DevicePort'


import {root_url,port,controller,version_2} from '@/api/api_config/base_config'
const api_root = `${root_url}:${port}/${version_2}`
export {api_root}



@observer
export default class OneKeyPaperBill extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.onekeyfunction = this.onekeyfunction.bind(this)
    }


    state = {
        checkpassed: false,
        visible: false,
        execute_report: []
    }

    async init() {
        this.setState({visible: true})

    }

    async onekeyfunction() {
        this.setState({visible: true,execute_report: []})
        let params = {method: 'POST'}
        let json = await api.billing.OneKeyPaperBill(params);
        console.log(json.execute_report)
        this.setState({execute_report: json.execute_report})
    }



    getModalProps() {
        return {
            width: 700,
            destroyOnClose: true,
            title: '一键出客户账单',
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


    getReportColumn() {


        return [
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name'
            },{
                title: '地区',
                dataIndex: 'zone',
                key: 'zone'
            },
            {
                title: '结果',
                dataIndex: 'success',
                key: 'success'
            },
            {
                title: '错误信息',
                dataIndex: 'message',
                key: 'message'
            },

        ];
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

                <br /><br />

                <Table
                    dataSource={this.state.execute_report}
                    rowKey="uuid"
                    columns={this.getReportColumn()}
                    pagination={false}
                    size="small"
                />
            </div>
        </Modal >
    }
}
