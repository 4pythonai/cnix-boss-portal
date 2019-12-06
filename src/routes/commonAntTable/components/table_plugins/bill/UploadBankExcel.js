import { Modal, Descriptions, message, InputNumber, Table, Upload, Icon, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import React, { useState } from 'react';
import { registerFormField, connect } from '@uform/antd';
import reqwest from 'reqwest';



@observer
export default class UploadBankExcel extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
    }

    async init() {
        this.setState({ visible: true })
    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }

    getPdfURL = () => {
        const _this = this;
        const props = {
            name: 'file',
            action: api.curd.upload,
            accept: "application/vnd.ms-excel",
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
            onChange(info) {
                console.log(info)
                if (info.file.status === 'done') {
                    message.success(`${ info.file.name } 上传成功！`);
                    console.log(_this.props.commonTableStore)
                    _this.props.refreshTable()
                } else if (info.file.status === 'error') {
                    message.error(`${ info.file.name } 上传失败！`);
                }
            },
        };
        return props;
    }


    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '上传银行流水',
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
                <Upload { ...this.getPdfURL() } showUploadList={ false }>
                    <Button>
                        <Icon type="upload" /> 选择银行流水文件
                   </Button>
                </Upload>
            </div >
        </Modal >
    }
}
