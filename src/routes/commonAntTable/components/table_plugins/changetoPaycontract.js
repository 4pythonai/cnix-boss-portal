import React from 'react';
import { message, Modal } from 'antd'
import api from '@/api/api'
const { confirm } = Modal;

export default class ChangetoPaycontract extends React.Component {
    constructor(props) {

        super(props)
        this.store=this.props.commonTableStore
        this.state={}
        this.init=this.init.bind(this)
        console.log(props)
    }
    componentWillMount(){

    }
    async init(){
        if(this.store.selectedRows.length<1){
            message.error('请选择合同数据')
            return
        }
        let contractnoarr=[]
        for(var i=0;i<this.store.selectedRows.length;i++){
            contractnoarr.push(this.store.selectedRows[i].contract_no)
        }
        let data = { contract_no: contractnoarr}
        
        confirm({
            title: '你确定要转为付款合同么?',
            content: '转为付款合同后将无法恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.turnReceiveToPay(data)
            },
            onCancel: () => {
                console.log(this.props)

            },
        });

      
    }

    turnReceiveToPay = async selectedRows => {
        let params = {
            data: selectedRows,
            method: 'POST'
        };
        let json = await api.contract_api.turnReceiveToPay(params);
        if (json.code == 200) {
            await this.props.refreshTable()
        }
    }
    render() {

        return (
           null
        );
    }
}