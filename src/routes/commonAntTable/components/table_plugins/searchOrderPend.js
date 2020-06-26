import React, { useState } from 'react';
import { Modal, DatePicker, Button, Input, Icon, message, Form } from 'antd';
// import '@/components/Uform_extends'
import '../../commonTable.scss'

export default class searchOrderPend extends React.Component {
    constructor(props) {
        super(props)
        this.commonTableStore = props.commonTableStore
        this.state = {
            value: ''
        };
        this.handleOk = this.handleOk.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

    }
    componentDidMount() {
    }
    async handleOk(e) {
        if (this.state.value == '') {
            message.error('请输入查询条件')
        } else {
            this.props.searchOrder(this.state.value)
            this.handleCancel()
        }

    }
    init() {
        this.showModal()
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
        })
    }
    selectNewValue(a, b) {
        this.setState({
            value: a.target.value
        });
    }
    render() {
        return (
            <div >
                <Modal
                    title="查询"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    okText="确认"
                    cancelText="取消"
                    width="800px"
                    visible={ this.state.visible }
                    className='inquiremodal'
                >
                    <Form labelCol={ { span: 6 } } wrapperCol={ { span: 18 } } style={ { height: '45px', } } onSubmit={ this.handleOk }>
                        <Form.Item label="模糊查询(代办):" style={ { width: '48%', float: 'left', marginRight: '2%' } }>
                            <Input placeholder='请输入要查询的内容' onChange={ event => this.selectNewValue(event, 'contractNumber') }></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}