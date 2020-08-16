
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import pmStore from '@/store/pmStore'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import DevicePort from './DevicePort'


@observer
export default class PortTpl extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.init = this.init.bind(this)
    }

    state = {
        visible: false,
    }



    componentDidMount() {



    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        let params = {
            method: 'POST'
        };
        this.setState({ visible: true, lines: [] })
    }

    onCancel() {
        this.setState({ visible: false })
    }



    render() {

        return <Modal
            visible={ this.state.visible }
            onCancel={ () => this.onCancel() }
            destroyOnClose={ true }
            width={ 1400 }
            title="端口模板管理" >

        </Modal >
    }
}
