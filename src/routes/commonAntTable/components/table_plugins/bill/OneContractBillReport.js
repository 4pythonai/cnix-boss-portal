
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import DevicePort from './DevicePort'
import OneContractBillReportCom from "./OneContractBillReportCom"


@observer
export default class OneContractBillReport extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }


    state = {
        checkpassed: false,
        visible: false,
        billstore: null,
        toal_check_errors: []
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        let params = { method: 'GET', data: { "contract_no": current_row.contract_no } }
        let json = await api.billing.billtest(params);
        console.log(json);
        console.log(json.success);

        if (json.success == 'false') {

            this.setState({ visible: true, checkpassed: false, toal_check_errors: json.toal_check_errors })

        } else {
            this.setState({ visible: true, checkpassed: true, billstore: json })
        }


    }



    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: "billrpt",
            title: '账单',
            bodyStyle: {
                width: 1200,
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
        console.log('will render.....')

        let modalProps = this.getModalProps();

        if (this.state.checkpassed) {

            return <Modal { ...modalProps }>

                <OneContractBillReportCom showSaveBillBtn="yes" OneContractBillingStore={ this.state.billstore } />



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
