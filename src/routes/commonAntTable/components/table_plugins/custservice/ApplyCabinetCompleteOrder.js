import React from 'react';
import { message, Modal } from 'antd'
import api from '@/api/api'
const { confirm } = Modal;



export default class ApplyNetLineCompleteOrder extends React.Component {
    constructor(props) {

        super(props)
        this.store=this.props.commonTableStore
        this.state={}
        this.init=this.init.bind(this)
        console.log(props)
    }
    componentWillMount(){

    }
    
    
    ApplyNetLineCompleteOrder = async selectedRows => {
        let params = {
            data: selectedRows,
            method: 'POST'
        };
        
        let json = await api.custservice.ApplyCabinetCompleteOrder(params);
        
        if (json.code == 200) {
            message.info(json.message)
            await this.props.refreshTable()
        }
    }
    

    
    

    async init(){
        if(this.store.selectedRows.length<1){
            message.error('请至少选择一条竣工单')
            return
        }
        
        let uuids=[]
        for(var i=0;i<this.store.selectedRows.length;i++){
            uuids.push(this.store.selectedRows[i].uuid)
        }
        let data = { uuids: uuids}
        
        confirm({
            title: '你确定要认领吗??',
            content: '如果误认领,可以在我的竣工单菜单点击退回',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.ApplyNetLineCompleteOrder(data)
            },
            onCancel: () => {
            },
        });

      
    }

    
    render() {
        return (
           null
        );
    }
}