
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import DevicePort from './DevicePort'

export default class ContractRelatedResources extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个合同');
            return;
        }

        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        let params = { method: 'GET', data: { "contract_no": current_row.contract_no } }
        let json = await api.billing.getContractRelatedResources(params);
        if (json.code === 200) {
            this.setState({ visible: true, resources: json.resources })
        } else {
            this.setState({ visible: true, resources: [] })
        }
    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }



    createTableByRows = (rowstr) => {

        if (!this.state.visible) {
            return;
        }



        const cols = [
            {
                title: '资源项ID',
                dataIndex: 'resid',
                key: 'resid',
            },
            {
                title: '产品分类',
                dataIndex: 'sub_category',
                key: 'sub_category',
            },
            {
                title: '产品名称',
                dataIndex: 'prodname',
                key: 'prodname',
            },
            {
                title: '资源详情',
                dataIndex: 'network_text',
                key: 'network_text',
            },

            {
                title: '备注',
                dataIndex: 'meno',
                key: 'meno',
            },

            {
                title: '资源价格(框架)',
                dataIndex: 'frameprice',
                key: 'frameprice',
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo'
            }
        ]


        return (
            <div>
                <Table
                    dataSource={ this.state.resources }
                    columns={ cols }
                    size="small"
                    style={ { marginBottom: '20px', marginLeft: '10px' } }
                />
            </div>
        )
    }






    getModalProps() {
        return {
            width: 1800,
            destroyOnClose: true,
            ref: "billrpt",
            title: '资源价格情况',
            bodyStyle: {
                width: 1800,
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
                <div style={ { margin: '10px' } }>资源明细:<br /></div>
                {
                    this.createTableByRows()
                }

            </div >
        </Modal >
    }
}
