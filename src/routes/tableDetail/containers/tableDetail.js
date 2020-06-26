import React from 'react'
import { Descriptions } from 'antd';
import './tableDetail.scss'
import { observer, inject } from "mobx-react";
import FlowHistory from '@/routes/flow/containers/flowHistory'
import store from '@/store/navigationStore'




export default class TableDetail extends React.Component {

    constructor(props) {
        super();
        this.store = store
        this.state = {
            obj:{},
            longobj:{},
            shortobj:{},
            rowData:{},
            processKey:null,
            title:''
        }
        
    }
    componentDidMount(){    
        var Url = sessionStorage.getItem('tableDetail')              
        let obj = {}
        var shortobj={}
        var longobj={}
        Url.split('&').forEach(item => {
            let arr = item.split('=')
                obj[decodeURI(arr[0])] = decodeURI(arr[1])           
        })
        console.log(666666,obj)
        this.setState({
            obj:obj,
            rowData:JSON.parse(sessionStorage.getItem('rowData')),
            processKey:sessionStorage.getItem('processKey'),
            title:sessionStorage.getItem('formtitle')

        },()=>{
            for(var item in obj){
                
                if(obj[item].length>30){
                    console.log(111111,item,obj[item])
                    longobj[item]=obj[item]
                }else{
                    console.log(22222,item)
                    shortobj[item]=obj[item]
                }
                
            }
            this.setState({
                longobj:longobj,
                shortobj:shortobj
            })
        
        })
        
    }
    getdescription(){
        let obj=this.state.shortobj
        let arr=Object.keys(obj)
        return arr.map((item,index)=>{
            if(item!='uuid'&&item!='transactid'&&item!='流程Key'){
                if(item!=''){
                    return <Descriptions.Item span={1} key={item} label={item}>{this.state.obj[item]=='y'?'是':this.state.obj[item]=='n'?'否':this.state.obj[item]=='null'?'':this.state.obj[item]}</Descriptions.Item>
                }
            }
            
       
        })
    }
    getlongdescription(){
        let obj=this.state.longobj
        let arr=Object.keys(obj)
        return arr.map((item,index)=>{
            if(item!='uuid'&&item!='transactid'&&item!='流程Key'){
                if(item!=''){
                    return <Descriptions.Item span={3} key={item} label={item}>{this.state.obj[item]=='y'?'是':this.state.obj[item]=='n'?'否':this.state.obj[item]=='null'?'':this.state.obj[item]}</Descriptions.Item>
                }
            }
            
       
        })
    
    }
    render() {
        const uuid=this.state.rowData.uuid?this.state.rowData.uuid:''
        const processKey=this.state.processKey?this.state.processKey:''
        const title=this.state.title
        const paperno=this.state.obj.单据号?'/'+this.state.obj.单据号:''
        return (
            <div className='box'>
                <div className='title'>{title+paperno}</div>
                <div className='smalltitle'>
                    工单信息
                </div>
                <Descriptions bordered>
                    {this.getdescription()}
                    {/* {this.getlongdescription()} */}
                </Descriptions>
                <Descriptions bordered>
                {this.getlongdescription()}
                </Descriptions>
                <div className='smalltitle'>
                    流程信息
                </div>
                <div>
                    {
                        uuid?<FlowHistory uuid={uuid} process_key={processKey} />:null
                    }
                
                </div>
            </div>
        )
    }
}
