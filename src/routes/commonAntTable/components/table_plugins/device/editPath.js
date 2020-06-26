import React from 'react'
import { Form, Slider, Checkbox, Modal, Row, Button, message, Select, Col, Radio, Icon } from 'antd';
import { observer, inject } from "mobx-react";

import Pathwrapper from './pathwrapper'
import { Input } from 'antd';


@observer
export default class EditPath extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        visible: false,
        formData: {}
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.info('请选择一条数据')
            return
        }
        let formData = JSON.parse(this.props.commonTableStore.selectedRows[0].pointsjson)
        this.setState({
            visible: true,
            formData
        })
    }

    hideModal = () => {
        this.setState({
            visible: false
        })
    }

    handleChangePortType = (e) => {
        console.log(e)
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        console.log(nextProps)
        this.setState({ lineindex: nextProps.lineindex, ports: nextProps.ports })
    }

    saveForm = () => {
        this.refs.pathWrapperRef.saveFormData()
    }




    render() {


        return <Modal
            destroyOnClose
            visible={ this.state.visible }
            width={ 780 }
            destroyOnClose
            okText="保存跳纤"

            bodyStyle={ {
                minHeight: "400px",
            } }
            onOk={ this.saveForm }
            onCancel={ () => this.hideModal() }
            title="编辑跳纤" >
            <div>
                <Pathwrapper
                    formData={ { ...this.state.formData } }
                    form_option="edit" ref="pathWrapperRef"
                    hideModal={ this.hideModal }
                    refreshTable={ this.props.refreshTable }
                    commonTableStore={ this.props.commonTableStore }
                />
            </div>
        </Modal>
    }
}