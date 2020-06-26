import React from 'react'
import { Form,message,Input,Menu, Icon, Dropdown, Modal,Radio,Table } from 'antd';
import api from '@/api/api'
import '../flow.scss'
const { TextArea } = Input;
export default class FlowFromModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible:this.props.visible,
            transactid:this.props.transactid,
            dataList:[],
            billsList:[
                // {approve:'',flow_notes:''},
                // {approve:'',flow_notes:''},
                // {approve:'',flow_notes:''}
            ]
        }
        this.handleOk=this.handleOk.bind(this)
    }
    async componentDidMount(){
        let params={
            data:{transactid:this.props.transactid},
            method:'POST'
        }
        let res=await api.bpm.getLineDataByTransactid(params)
        if(res.code==200){
            var arr=[]
            for(var i=0;i<res.data.length;i++){
                arr.push({approve:'',flow_notes:''})
            }
            this.setState({
                dataList:res.data,
                billsList:arr
                
            })
        }
    }
    handleOk(){
        var sbillsList=this.state.billsList
        for(var i=0;i<sbillsList.length;i++){
            if(sbillsList[i].approve==''||sbillsList[i].flow_notes==''){
                message.error('请把操作和批注填写完整')
                return
            }
        }
        var sdataList=this.state.dataList
        for(var i=0;i<sdataList.length;i++){
            Object.assign(sdataList[i],sbillsList[i])
        }
        let params={
            data:sdataList,
            method:'POST'
        }
        let res=api.bpm.examineAndApproveLine(params)
        if(res.code==200){
            this.props.back
            // hashHistory.goBack()
        }
        
      }
      onChange(e,index){
          let arr=this.state.billsList
          arr[index].approve=e.target.value
        this.setState({
            billsList:arr
        },()=>{console.log(this.state.billsList)})
      }
      onChange1(e,index){
          e.persist()
          let arr=this.state.billsList
          arr[index].flow_notes=e.target.value
        this.setState({
            billsList:arr
        },()=>{console.log(this.state.billsList)})
      }
    render() {
        const dataSource=this.state.dataList
        const columns = [
            {
              title: '单据名称',
              dataIndex: 'biztitle',
              width:'300px',
              key: 'biztitle',
            },
            {
                title: '起点',
                dataIndex: 'start',
                width:'120px',
                key: 'start',
              },
              {
                title: '终点',
                dataIndex: 'end',
                width:'120px',
                key: 'end',
              },
              {
                title: '发起人',
                dataIndex: 'staff_name',
                width:'100px',
                key: 'staff_name',
              },
            {
              title: '操作',
              dataIndex: 'opration',
              width:'200px',
              key: 'opration',
              render:(text,row,index)=>{
                  return <div>
                      <Radio.Group onChange={event =>this.onChange(event,index)} value={this.state.billsList[index].approve}>
                            <Radio value='y'>
                                同意
                            </Radio>
                            <Radio value='n'>
                                不同意
                            </Radio>
   
                        </Radio.Group>
                  </div>
              }
            },
            {
              title: '批注',
              dataIndex: 'flow_notes',
              key: 'flow_notes',
              width:'200px',
              render:(text,row,index)=>{
                  return <div>
                      <TextArea type="text" value={this.state.billsList[index].flow_notes} onChange={event=>this.onChange1(event,index)}/>
                  </div>
              }
            }]
        return (
            <Modal
                    title="请填写"
                    onOk={this.handleOk}
                    onCancel={this.props.cancel}
                    okText="确认"
                    cancelText="取消"
                    width="1000px"
                    visible={this.props.visible}
                >
                    <div className='nopass'>
                        <Table rowKey='approval' pagination={false} columns={columns} dataSource={dataSource}></Table>
                    </div>
                </Modal>
        )
    }

}