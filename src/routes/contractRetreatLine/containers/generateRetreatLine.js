import React from 'react'
import api from '@/api/api'
import { Button, Input, message, Table,Descriptions } from 'antd';


export default class GenerateRetreatLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:'',
            selectedRowKeys:[],
            contractList:[],
            networkusage:[],
            lineusage:[]
            

        }
        this.importCustomer=this.importCustomer.bind(this)
        this.search=this.search.bind(this)
    }
    importCustomer(e){
        console.log(e.target.value)
        this.setState(
            {
                value:e.target.value
            }
        )
    }
    async search(){
        this.setState({
            contractList:[],
            networkusage:[],
            lineusage:[],
            selectedRowKeys:[]
        })
        let params = { data: { custname: this.state.value }, method: 'POST' };
        console.log(params)
        let res = await api.contract_api.searchUserContractsUsage(params);
        if (res.code == 200) {
            if(res.counter==0){
                message.error('请重新输入关键字')
            }else{
                if(res.contracts.length==0){
                    message.error('该客户的合同数为0')
                    return
                }
                var contracts=res.contracts
                for(var i=0;i<contracts.length;i++){
                    contracts[i].customername=res.customer.customername
                }
                console.log(99,contracts)
                this.setState({
                    contractList:contracts
                })
            }
            
        }
    }
    
    async rowSelectChange(selectedRowKeys,selectedRows){
        let params = { data: { contractid: selectedRows[0].contractid }, method: 'POST' };
        let res = await api.bpm.getContractNetandLineInfo(params);
        if (res.code == 200) {
           this.setState({
            networkusage:res.networkusage,
            lineusage:res.lineusage,
            selectedRowKeys:selectedRowKeys
        })
        }
    }
    getlineusage(){
        var obj=this.state.lineusage
        if(obj!=null&&obj.length>0){
            return <div style={{marginTop:'15px'}}>
                <h3>线路资源占用</h3>
                <Descriptions key={ obj } column={ 3 } bordered>
            {
                obj.map((item, index) =>
                        <Descriptions.Item key={ item.fieldtitle } label={ item.fieldtitle }>{ item.fieldvalue }</Descriptions.Item>
                     
                )
            }
        </Descriptions>
        </div>
        }else{
            return null
        }
        
    }
    getnetworkusage(){
        var obj=this.state.networkusage
        if(obj!=null&&obj.length>0){
            return <div style={{marginTop:'15px'}}>
                <h3>线路资源占用</h3>
                <Descriptions key={ obj } column={ 3 } bordered>
            {
                obj.map((item, index) =>
                        <Descriptions.Item key={ item.fieldtitle } label={ item.fieldtitle }>{ item.fieldvalue }</Descriptions.Item>
                     
                )
            }
        </Descriptions>
        </div>
        }else{
            return null
        }
    }
  
    render() {
        const columns = [
            {
                title: '客户名称',
                dataIndex: 'customername',
              },
            {
              title: '合同名称',
              dataIndex: 'contractname',
            },
            {
              title: '合同号',
              dataIndex: 'contractno',
            },
          ];
          const rowSelection={
              type:'radio',
              selectedRowKeys:this.state.selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => this.rowSelectChange(selectedRowKeys, selectedRows)
            }
        return (
            <div style={{padding:'10px'}}>            
            <div style={{marginTop:'10px',marginBottom:'30px'}}>
                <Input placeholder='请输入关键字' style={{width:'200px',marginRight:'20px'}} onChange={this.importCustomer}></Input>
                <Button type='primary' onClick={this.search}>搜索</Button>
            </div>
            <div>
                <Table bordered rowSelection={rowSelection} pagination={false} columns={columns} dataSource={this.state.contractList} />
            </div>
            <div>
                {
                    this.getlineusage()
                }
               

            </div>   
            <div>
                {
                    this.getnetworkusage()
                }
            </div>         
            </div>

        )
    }
}
