
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'


@observer
export default class AddReselerItemUsage extends React.Component {
    constructor(props) {
        super(props)
        // this.store = OneContractBillingStore
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
    }

    async init() {


        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条资源计费信息');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        console.log(current_row)

        if (current_row.restype == 'IP' || current_row.restype == '带宽' || current_row.restype == 'U位') {
            this.setState({ visible: true })
            this.setState(current_row)

        } else {

            message.info('只有[带宽,IP,U位]才能录入资源计费信息,其他资源无需录入.');


        }



    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }








    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,

            title: '录入使用项',
            bodyStyle: {
                width: 1200,
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,

            onCancel: () => this.onCancel()
        }
    }






    render() {
        let modalProps = this.getModalProps();
        return <Modal { ...modalProps }>
            <div>



            </div >
        </Modal >
    }
}
