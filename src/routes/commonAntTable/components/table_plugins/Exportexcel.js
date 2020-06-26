import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
import { message } from 'antd'
import { Modal, Button, Badge } from 'antd';

@observer
export default class Exportexcel extends React.Component {
    state = {
        visible: false,
        odfusage: [],
        devname: '',

    }

    init() {
        this.setState({ visible: true })
        this.exportExcel('aa')

    }


    async exportExcel(actcode) {

        console.log(this)

        let params = {
            data: {
                actcode: this.props.commonTableStore.action_code,
                role: sessionStorage.getItem("role_code"),
                user: sessionStorage.getItem("user")
            },
            method: 'POST'
        }
        console.log(params)


        let res = await api.activity.exportExcel(params)
        console.log(res)
        this.setState({ odfusage: res.data })
        // this.setState({ devname: res.devname })

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




    render() {


        return <Modal
            visible={ this.state.visible }
            title={ this.state.devname }
            onOk={ this.handleOk }
            onCancel={ this.handleCancel }
            width={ 800 }

        >

        </Modal >
    }
}


