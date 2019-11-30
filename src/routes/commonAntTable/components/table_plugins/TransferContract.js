
import React from 'react'
import { Modal, Descriptions, message, Input } from 'antd';
import { observer, inject } from "mobx-react";
import api from '../../../../api/api'


export default class TransferContract extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            old: null,
            new: null,
            indeterminate: true,

        }
        this.init = this.init.bind(this)
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 0) {
            let _srow = this.props.commonTableStore.selectedRows[0]
            this.setState({

                old: _srow.contract_no,
                visible: true
            })
        } else {
            message.error('请选择一个合同')
        }

    }

    onCancel() {
        this.setState({
            visible: false
        })
    }

    //转移合同号
    async TransferContract() {
        let params = { data: this.state, method: 'POST' };
        let json = await api.billing.transferContract(params);
        console.log(json)

    }

    onChangeNew = newcontract => {
        this.setState({ new: newcontract });
    };


    render() {
        return <Modal
            visible={ this.state.visible }
            onCancel={ () => this.onCancel() }
            onOk={ () => this.TransferContract() }
            style={ { width: '400px' } }
            title="合同转移" >
            <div>
                将老合同号[{ this.state.old }]下面的计费项转移到新合同号:
                <br /><br />
                <Input onChange={ e => this.onChangeNew(e.target.value) } />
            </div>
        </Modal >
    }
}


