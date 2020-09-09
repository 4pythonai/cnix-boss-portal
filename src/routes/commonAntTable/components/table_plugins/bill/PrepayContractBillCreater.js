
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import DevicePort from './DevicePort'
import OneContractBillReportCom from "./OneContractBillReportCom"


@observer
export default class PrepayContractBillCreater extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }


    state = {
        checkpassed: false,
        visible: false,
        billjson: {},
        toal_check_errors: []
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个合同');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])

        //billingoption

        if (current_row.billingoption !== '预付') {
            message.error('请选择一个预付合同');
            return;
        }


        let params = { method: 'GET', data: { "contract_no": current_row.contract_no } }
        let json = await api.billing.billByContract(params);
        console.log('----------------->' + current_row.contract_no);

        console.log(json);

        if (json.success == 'false') {
            this.setState({ visible: true, checkpassed: false, toal_check_errors: json.toal_check_errors })

        } else {
            this.setState({ visible: true, checkpassed: true, billjson: json })
        }


    }



    getModalProps() {
        return {
            width: 1800,
            destroyOnClose: true,
            ref: "billrpt",
            title: '手工出账单[预付]:',
            bodyStyle: {
                width: 1800,
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,
            onOk: this.saveFormData,
            onCancel: () => this.onCancel()
        }
    }



    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }


    render() {

        console.log('将要渲染')


        let modalProps = this.getModalProps();
        if (this.state.checkpassed) {
            return <Modal { ...modalProps }>
                <OneContractBillReportCom onlyShowTimeLine="no" showSaveBillBtn="yes" billjson={ this.state.billjson } />
            </Modal >
        } else {
            return <Modal { ...modalProps }>
                <div>
                    <p>合同资源项目时间检查失败:涉及到合同数量:{ this.state.toal_check_errors.length }:</p>
                    {
                        this.state.toal_check_errors.map(one_contract_error =>
                            (
                                one_contract_error.errors.map(error => <li key={ error.idx }>{ error.text }</li>))
                        )
                    }
                </div >
            </Modal >
        }
    }
}
