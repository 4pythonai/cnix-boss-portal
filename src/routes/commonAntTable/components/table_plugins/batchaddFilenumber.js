import React, { useState } from "react";
import { Modal, List, Typography, Divider, DatePicker, Button, Input, Icon, message, Form } from "antd";
import "../../commonTable.scss";
import api from '@/api/api'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
export default class BatchaddFilenumber extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            filenumberstr: "",
            selectedRows:[],
            contract_arr: [],
        };
        this.init=this.init.bind(this)
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.selectedrows=this.selectedrows.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleterow=this.deleterow.bind(this)
    }
    componentDidMount() { }
    async handleOk(e) {
        if (this.state.filenumberstr == '') {
            message.error('请输入档案号')
            return
        }
        console.log(this.refs.commonTableRef)
        let dataarr=[]
        for(var u=0;u<this.state.contract_arr.length;u++){
            dataarr.push(this.state.contract_arr[u].concat)
        }
        let sendobj = {
            contractDatalist: dataarr,
            archives_no: this.state.filenumberstr
        }

        let params = { data: sendobj, method: 'POST' }
        let res = await api.contract_api.batchSetArchieveNo(params)
        if (res.code == 200) {
            this.handleCancel();
            this.props.refreshTable()
            this.refs.commonTableRef.refreshTable()
        }

    }
    init() {       
        this.setState({
            contract_arr:[],
            filenumberstr:''

        })
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
    selectedrows(data){
        
        let arr=this.state.contract_arr
        for(var i=0;i<data.length;i++){
            if(arr.length>0){
                for(var j=0;j<arr.length;j++){
                    if(arr[j].contract_no==data[i].contract_no){
                        message.error('您已选择此合同')
                        return
                    }
                    
                }
            }
            arr.push(data[i])
            
           
        }

        this.setState({
            selectedRows:data,
            contract_arr:arr
        })

        
    }
    selectArchfileno(a, b) {
        this.setState({
            filenumberstr: a.target.value,
        });
    }
    deleterow(row){
        let jsonarr=this.state.contract_arr
        for(var k=0;k<jsonarr.length;k++){
            if(jsonarr[k].contract_no==row.contract_no){
                jsonarr.splice(k,1)
            }
        }
        this.setState({
            contract_arr:jsonarr
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="批量设置档案号"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    okText="设置档案号"
                    style={{ top: 20 }}
                    cancelText="取消"
                    width="1100px"
                    visible={ this.state.visible }
                    className="inquiremodal"
                >
                    <CommonTable size='small' sendData={this.selectedrows} ref="commonTableRef" action_code='contract_enquiry_list' />
                    {
                      this.state.contract_arr.length>0?  
                      <List
                        size="small"
                        header={ <div>要设置的合同号:</div> }
                        footer={ <div >{ this.state.contract_arr.length }条</div> }

                        bordered
                        dataSource={ this.state.contract_arr }
                        renderItem={ item => <List.Item><span style={{marginRight:'50px',float:'left'}}>合同号：{item.contract_no}</span><span style={{float:'left'}}>档案号：{item.archives_no}</span><span onClick={()=>this.deleterow(item)} style={{float:'left',color:'red',cursor:'pointer',marginLeft:'50px'}}>删除</span></List.Item> }
                    />
                    : null
                    }
                    



                    <Form
                        labelCol={ { span: 1 } }
                        wrapperCol={ { span: 15 } }
                        style={ { height: "45px",marginTop:'20px' } }
                        onSubmit={ this.handleOk }
                    >
                        <Form.Item
                            label="档案号:"
                            style={ { width: "100%", float: "left", marginRight: "2%" } }
                        >
                            <Input
                                placeholder="请输入档案号"
                                onChange={ (event) =>
                                    this.selectArchfileno(event, "")
                                }
                                onPressEnter={ this.handleOk }
                            ></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
