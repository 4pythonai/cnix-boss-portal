import React from "react";
import { observer, inject } from "mobx-react";
import { Table, Divider, message } from 'antd';
import api from '@/api/api'
import '../../chargeData.scss'

export default class ChargeCompare extends React.Component {
    constructor(props) {
        super();
        
        this.state={
            sumdata:[]
        }
    }
    componentDidMount() {
        this.setState({
            sumdata:this.props.data
        })
    }  
    
    chargeRender(){
      
        let sumdata=this.state.sumdata
        return sumdata.map((item,index)=>{
            let title=item.prodname
            let data=item.check
        for(var i=0;i<data.length;i++){
            data[i].idc=data[i].loc+'/'+data[i].power_type+'/'+data[i].cabinet_electricity_count            
            data[i].old=data[i].loc
            data[i].new=data[i].loc
            data[i].numberold=data[i].number_in_old
            data[i].numbernew=data[i].number_in_new
            data[i].key=i
            data[i].billing_cycle_old=JSON.stringify(data[i].details_old)
            data[i].number_old=JSON.stringify(data[i].details_old)
            data[i].price_old=JSON.stringify(data[i].details_old)
            data[i].billing_cycle_new=JSON.stringify(data[i].details_new)
            data[i].number_new=JSON.stringify(data[i].details_new)
            data[i].price_new=JSON.stringify(data[i].details_new)
        }
        return <div key={index}>
                    <div style={{fontWeight:'bold',margin:'15px 0px'}}>
                        {title}
                    </div>
                    <Table
                     bordered={true}
                     dataSource={data}
                     pagination={ false }
                     size="small"
                     columns={ this.getColumnsOnetime() }
                    /> 
                </div>
         
        })
    
    }
    getColumnsOnetime() {
        return [
            {
                title: '产品',
                dataIndex: 'idc',
                key: 'idc',
            },
            {
                title: '旧',
                dataIndex: 'old',
                key: 'old',
                children:[
                    {
                        title: '计费周期',
                        dataIndex: 'billing_cycle_old',
                        key: 'billing_cycle_old',
                        render:(value, row, index) => {
                            var row=row.details_old
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.billing_cycle}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                    },
                    {
                        title: '数量',
                        dataIndex: 'number_old',
                        key: 'number_old',
                        render:(value, row, index) => {
                            var row=row.details_old
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.number}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                    },
                    {
                        title: '单价',
                        dataIndex: 'price_old',
                        key: 'price_old',
                        render:(value, row, index) => {
                            var row=row.details_old
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.price}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                    }
                ],
                render:()=>{
                    this.getdetail()
                }
            },
            {
                title: '总数',
                dataIndex: 'numberold',
                key: 'numberold',
            },
            {
                title: '新',
                dataIndex: 'new',
                key: 'new', 
                children:[
                    {
                        title: '单位',
                        dataIndex: 'billing_cycle_new',
                        key: 'billing_cycle_new',
                        render:(value, row, index) => {
                            var row=row.details_new
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.billing_cycle}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                        
                        
                    },
                    {
                        title: '数量',
                        dataIndex: 'number_new',
                        key: 'number_new',
                        render:(value, row, index) => {
                            var row=row.details_new
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.number}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                    },
                    {
                        title: '金额',
                        dataIndex: 'price_new',
                        key: 'price_new',
                        render:(value, row, index) => {
                            var row=row.details_new
                            return <div>
                                {
                                    row.map((item,index)=>{
                                   
                                      return  <div key={index}>{item.price}</div>
                                   })
                                }
                            </div>
                             
                            
                        }
                    }
                ] 
            },
            {
                title: '总数',
                dataIndex: 'numbernew',
                key: 'numbernew',
            },

        ];
    }



    render() {
        return (
            <div className='chargeCompare'>
                {
                    this.chargeRender()
                }               
                            
            </div >
        );
    }
}
