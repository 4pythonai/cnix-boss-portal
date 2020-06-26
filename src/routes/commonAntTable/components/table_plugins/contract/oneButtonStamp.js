import React from 'react';
import { message,Modal,Descriptions,Radio  } from 'antd'
import {
    hashHistory
} from 'react-router'
import api from '@/api/api'

const { confirm } = Modal;
//增加普通IDC合同

export default class OneButtonStamp extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            visible:false,
            selectedRows:[],
            radioValue:''
        }
        this.init = this.init.bind(this)
        this.onChange=this.onChange.bind(this)
    }

    async init() {
        if(this.props.commonTableStore.selectedRows.length <= 0){
            message.warning('请至少选择一条数据')
            return;
        }

        let selectedRows = this.props.commonTableStore.selectedRows
        for(let i = 0; i< selectedRows.length; i++){
            if(selectedRows[i].flowstatus != '归档'){
                message.info('请选择已归档合同')
                return;
            }
            
        }
        this.setState({
            visible:true,
            selectedRows:selectedRows
        })

        
    }

    deliverToContractDepartment = async selectedRows => {
        let params = {
            data: selectedRows,
            method: 'POST'
        };
        let json = await api.contract_api.deliverToContractDepartment(params);
        if(json.code == 200){
            this.props.refreshTable()
            this.setState({
                visible:false
            })
        }
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    onChange(e){
        this.setState({
            radioValue:e.target.value
        })
    }
    handleOk(){
        if(this.state.selectedRows[0].hasContract=='否'&&this.state.radioValue==""){
            message.error('请选择是否需要走流程')
            return
        }
        let data=this.state.selectedRows
        data[0].needReflow=this.state.radioValue
        this.deliverToContractDepartment(data)
    }
    render() {
        let selectedRows=this.state.selectedRows.length>0?this.state.selectedRows[0]:{}
        let obj={}
        obj.合同号=selectedRows.contract_no
        obj.合同名称=selectedRows.contract_name
        obj.申请人=selectedRows.author
        obj.合同类型=selectedRows.document_type
        obj.签约类型=selectedRows.contract_type
        obj.流程状态=selectedRows.flowstatus
        let objkeys=Object.keys(obj)
        return (<Modal
        title="一键转盖章"
        onOk={ ()=>this.handleOk() }
        onCancel={ ()=>this.handleCancel() }
        okText="转合同部"
        cancelText="取消"
        width="800px"
        visible={ this.state.visible }
        >
            <Descriptions key={obj} bordered style={{ marginLeft: '10px', marginBottom: '10px' }}>
                {objkeys.map((item,index)=>{
                   return  <Descriptions.Item key={item} label={item}>{obj[item]}</Descriptions.Item>
                })}

            </Descriptions>
            
            {selectedRows.label=='预签合同'?<div>
                <span style={{color:'red',fontWeight:'bold',margin:'10px'}}>请选择:</span>
                <Radio.Group style={{ marginLeft: '10px' }} onChange={this.onChange}>
                    <Radio key='y' value='y'>需要重新走审批流程</Radio>
                    <Radio key='n' value='n'>不需要重新走审批流程</Radio>
                </Radio.Group>
            </div>:null
                
            }
        </Modal>)
    }
}
