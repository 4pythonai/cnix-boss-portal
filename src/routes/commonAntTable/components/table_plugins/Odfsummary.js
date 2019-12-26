import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
import { message } from 'antd'
import { Modal, Button } from 'antd';

@observer
export default class Odfsummary extends React.Component {
    state = {
        visible: false,
        odfusage: []

    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据！")
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0]
        console.log(_tmprec)
        this.showModal()
        this.getOdfsummary(_tmprec.id)
    }


    async getOdfsummary(odfid) {
        let params = {
            method: 'post',
            data: { odfid: odfid }
        }
        let res = await api.network.getOdfsummary(params)
        console.log(res)
        this.setState({ odfusage: res.data })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }

    renderUsage() {

        console.log(this.state)
        let rows = []

        this.state.odfusage.map(item => {
            rows.push(<div key={ item.id } value={ item.id }>{ item.odfportindex }{ item.network_text }</div>)
        })
        return rows;
    }


    render() {


        return <Modal
            title="Basic Modal"
            visible={ this.state.visible }
            onOk={ this.handleOk }
            onCancel={ this.handleCancel }
            width={ 1200 }

        >

            { this.renderUsage() }

        </Modal >
    }
}
