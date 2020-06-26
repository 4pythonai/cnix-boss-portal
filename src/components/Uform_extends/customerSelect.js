import React from 'react'
import { Button, Modal, message } from 'antd';
import api from '@/api/api'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

export default class CustomerSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selectRow: {}
        }
    }
    async componentDidMount() {
        console.log(321,this.props)
        if(this.props.commontablestore.selectedRows[0]){
            if(this.props.commontablestore.selectedRows[0].ghost_customerid||this.props.commontablestore.selectedRows[0].ghost_customId){
                let params = {
                    data: {
                        id: this.props.commontablestore.selectedRows[0].ghost_customerid?this.props.commontablestore.selectedRows[0].ghost_customerid:this.props.commontablestore.selectedRows[0].ghost_customId,
                    },
                    method: 'POST'
                }
                let res = await api.address_api.getCustomerDetailById(params)
                if(res.code==200){
                    this.setState({
                        selectRow:res.data[0]
                    })
                    this.props.onChange(res.address[0].customerId)
                }
            }
            
        }
        
        console.log(77,this.props.selectedRow)
    }
    okHandle() {
        
        if (this.refs.commonTableRef.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一个客户');
            return;
        }
        
        let selectRow = this.refs.commonTableRef.commonTableStore.selectedRows[0];
        this.setState({
            selectRow: selectRow
        })
        selectRow.id=selectRow.id?selectRow.id:""
        this.props.onChange(selectRow.id+'-'+selectRow.customName+'-'+selectRow.address)
        // this.props.getCurrentCustomer(selectRow.id, this.props.customer_index, selectRow)

        this.hideCustomerModal()
    }

    hideCustomerModal = () => {
        this.setState({
            visible: false
        })
    }

    showCustomerModal = () => {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            visible: true
        })
    }
    getrowdata() {
        // console.log(77,this.refs.commonTableRef.commontablestore)
        let selectrow = this.state.selectRow
        // if (this.props.value != '') {
        //     selectrow = this.props.selectRow
        //     // selectrow = JSON.parse(this.props.value)
        // } else {
        // selectrow = this.state.selectRow
        // }
        if (selectrow&&selectrow.customName != undefined && selectrow.customName != ''){
           if(this.props.disabled){
            return <div key={selectrow}>
            <div style={{marginLeft:'91px'}}>
                <span style={{display:'inline-block',width:'19%',float:'left'}}>客户名称：</span>
                <span style={{display:'inline-block',width:'81%',float:'left'}}>{selectrow.customName}</span>
            </div>
            <div style={{marginLeft:'91px'}}>
                <span style={{display:'inline-block',width:'19%',float:'left'}}>客户地址：</span>
                <span style={{display:'inline-block',width:'81%',float:'left'}}>{selectrow.address}</span>
            </div>
        </div>
           }else{
            return <div key={selectrow}>
                <div style={{marginLeft:'-70px'}}>
                    <span style={{display:'inline-block',width:'19%',float:'left'}}>客户名称：</span>
                    <span style={{display:'inline-block',width:'81%',float:'left'}}>{selectrow.customName}</span>
                </div>
                <div style={{marginLeft:'-70px'}}>
                    <span style={{display:'inline-block',width:'19%',float:'left'}}>客户地址：</span>
                    <span style={{display:'inline-block',width:'81%',float:'left'}}>{selectrow.address}</span>
                </div>
            </div>
           }
            
        }
         
        
        // return rowdata
    }
    onClick() {
        this.setState({
            visible: true
        })
    }
    render() {
        let disable = false;
        let dissbledbutton=this.props.disabled
        return (
            <div>
                <Button style={dissbledbutton==true?{display:'none'}:null} onClick={this.onClick.bind(this)}>选择客户</Button>
                <div>
                    {this.getrowdata()}
                </div>
                <Modal
                    closable={disable}
                    keyboard={disable}
                    maskClosable={disable}
                    width={1200}
                    title="选择客户"
                    centered
                    cancelText="取消"
                    okText="确认"
                    onCancel={this.hideCustomerModal}
                    onOk={() => this.okHandle()}
                    visible={this.state.visible}
                >

                    <CommonTable ref="commonTableRef" action_code='signer_customer' />
                </Modal>
            </div>

        )
    }

}