import React from 'react'
import './CompletionOrder.scss'



export default class CompletionOrder extends React.Component {

    constructor(props) {
        super();
        this.state = {
            obj:{}
        }
    }
    
    componentDidMount(){     
        var Url = sessionStorage.getItem('completionorder')          
        let obj = {}
        Url.split('&').forEach(item => {
            let arr = item.split('=')
              
                obj[decodeURI(arr[0])] = decodeURI(arr[1])           
        })
        this.setState({
            obj:obj
        })
        console.log('查看参数', obj)
    }
    render() {
        
        let obj=this.state.obj
        return (
    <div className="completionOrderWrapper">
            
              <h3>IDC网络租用竣工确认单</h3>
               <div><span className='title'>类型：</span>IDC线路租用</div>
               <div><span className='title'>服务提供：</span>北京光环新网科技股份有限公司</div>
                <div><span className='title'>客户名称：</span>{obj.客户名称}</div>
               <div><span className='title'>合同编号：</span>{obj.合同编号}</div>
               <div><span className='title'>受理人员：</span>{obj.受理人员}</div>
               <div><span className='title'>施工要求：</span>{obj.施工要求}</div>
               <div className='title'>(请确认如下相关服务内容后，负责人签名并加盖公章)</div>
               <div><span className='three'><span className='title'>本端所在机房：</span>{obj.本端所在机房}</span><span className='three'><span className='title'>所在楼层：</span>{obj.所在楼层}</span><span className='three'><span className='title'>所在模块间：</span>{obj.所在模块间}</span></div>
               <div><span className='two'><span className='title'>具体位置：</span>{obj.具体位置}</span><span className='two'><span className='title'>IP地址个数：</span>{obj.IP地址个数}</span></div>
               <div><span className='two'><span className='title'>IP地址段：</span>{obj.IP地址段}</span><span className='two'><span className='title'>互联地址：</span>{obj.互联地址}</span></div>
               <div><span className='three'><span className='title'>AS号：</span>{obj.AS号}</span><span className='three'><span className='title'>用户IP地址：</span>{obj.用户IP地址}</span><span className='three'><span className='title'>用户AS号：</span>{obj.用户AS号}</span></div>
               <div><span className='two'><span className='title'>BGP：</span>{obj.BGP}</span><span className='two'><span className='title'>双线或三线：</span>{obj.双线或三线}</span></div>
               <div><span className='title'>实际竣工时间：</span>{obj.实际竣工时间}</div>
               <div><span className='title'>测试结果：</span>{obj.测试结果}</div>
               <div><span className='two'><span className='title'>丢包率：</span>{obj.丢包率}</span><span className='two'><span className='title'>时延：</span>{obj.时延}</span></div>
               <div><span className='title'>施工备注信息：</span>{obj.施工备注信息}</div>
               <div><span className='title'>提供电路类型：</span>{obj.提供电路类型}</div>
               <div><span className='two'><span className='title'>原电路租用带宽：</span>{obj.原电路租用带宽}</span><span className='two'><span className='title'>新电路租用带宽：</span>{obj.新电路租用带宽}</span></div>
               <div><span className='title'>端口资源占用：</span>{obj.端口资源占用}</div>
               <div><span className='two'><span className='title'>类型：</span>{obj.类型}</span><span className='two'><span className='title'>端口速率：</span>{obj.端口速率}</span></div>
               <div><span className='title'>客户签字：</span>{obj.客户签字}</div>
               <div><span className='title'>技术负责人签字：</span>{obj.技术负责人签字}</div>
            </div>
        )
    }
}
