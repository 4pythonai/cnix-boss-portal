import React, { useState } from "react";
import { Modal, List, Typography, Divider, DatePicker, Button, Input, Icon, message, Form } from "antd";
import api from '@/api/api'
import PicturesWall  from './PicturesWall'

  

export default class BackToAssistant extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            alertReason: "",
            dataarr: [],
            contract_arr: [],
        };
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() { }
    
    
    
    async handleOk(values) {
        
        let rowdata=this.commonTableStore.selectedRows[0]
        if (this.state.alertReason == '') {
            message.error('请输入终止原因')
            return;
        }


        let sendobj = {
            uuid:rowdata.uuid,
            contract_no:rowdata.contract_no,
            concat:rowdata.concat,
            imgList: this.child.state.imgList,
            alertReason: this.state.alertReason
        }

        let params = { data: sendobj, method: 'POST' }
        let res = await api.contract_api.backToAssistant(params)  
        if (res.code == 200) {
            this.props.refreshTable()
            this.handleCancel();
        }

    }
    init() {

        if (this.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条合同')
            return
        }


        this.showModal();
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    setAlertReason(a, b) {
        this.setState({
            alertReason: a.target.value,
        });
    }
    
    onRef = (ref) => {
        this.child = ref
    }
 
    
    
    render() {
        this.state.dataarr = [];
        this.state.contract_arr = [];

        for (var i = 0; i < this.commonTableStore.selectedRows.length; i++) {
            this.state.dataarr.push(this.commonTableStore.selectedRows[i].concat)
            this.state.contract_arr.push(this.commonTableStore.selectedRows[i].contract_no)
        }

        return (
            <div>
                <Modal
                    title="合同终止警告"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    okText="发送!"
                    cancelText="取消"
                    width="600px"
                    visible={ this.state.visible }
                    className="inquiremodal"
                >

                    <List
                        size="small"
                        header={ <div>要预警的合同号:</div> }

                        bordered
                        dataSource={ this.state.contract_arr }
                        renderItem={ item => <List.Item>{ item }</List.Item> }
                    />
                    
                     <PicturesWall    onRef={this.onRef}  /> 
                      
                     
                    <div style={ { marginTop: "25px" } } >
                        <Form
                            labelCol={ { span: 6 } }
                            wrapperCol={ { span: 18 } }
                            style={ { height: "45px" } }
                            onSubmit={values=> this.handleOk(values) }
                        >
                            <Form.Item
                                label="终止原因:"
                                style={ { width: "100%", float: "left", marginRight: "2%" } }
                            >

                                <Input
                                    placeholder="请输入终止原因"
                                    onChange={ (event) =>
                                        this.setAlertReason(event, "")
                                    }
                                 ></Input>

                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}