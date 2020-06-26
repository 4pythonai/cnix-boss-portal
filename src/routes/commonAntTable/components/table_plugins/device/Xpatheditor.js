import React from 'react'
import { Form, Slider, Checkbox, Modal, Row, Button, message, Select, Col, Radio, Icon } from 'antd';
import { observer, inject } from "mobx-react";

import Pathwrapper from './pathwrapper'
import { Input } from 'antd';


@observer
export default class Xpatheditor extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)

    }

    state = {
        visible: false
    }

    init() {
        this.setState({
            visible: true
        })
    }

    hideModal = ()=> {
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

            bodyStyle={{
                minHeight: "400px",
            }}
            onOk = {this.saveForm}
            onCancel={ () => this.hideModal() }
            title="跳纤编辑器" >
            <div>
                <Pathwrapper form_option = "add" ref="pathWrapperRef" hideModal={this.hideModal} refreshTable={ this.props.refreshTable } commonTableStore={ this.props.commonTableStore } />
            </div>
        </Modal>
    }
}