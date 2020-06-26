import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'






export default class Characters extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            list:[
                '阿三倒萨倒萨倒萨倒萨倒萨倒萨倒萨啊',
                '行政村自行车自行车自行车行政村这些',
                '艰苦艰苦艰苦艰苦艰苦艰苦艰苦艰苦艰',
                '如题如题如题如题如题如题如题如题人',
                '人突然有速度速度速度速度撒打算大苏',
                '艰苦艰苦就看见规划规划风格化风格化'
            ],
            
        }

    }

    componentDidMount() {
        this.scrol()
    }
    scrol(){
         this.timer=setInterval(()=>{
            let dataarr=this.state.list.slice(1)
            dataarr.push(this.state.list[0])
            this.setState({
                list:dataarr
            })
        },1000)
    }
    stop(){   
         window.clearInterval(this.timer)   
    }
    goon(){
        this.scrol()
    }
    click(e){
        console.log(e)
    }
    render() {
        return (
            <div style={{height:'50%',textAlign: 'center',color:'#e5831d',fontSize:'17px'}} onMouseOut={()=>this.goon()} onMouseOver={()=>this.stop()}>
                    <div style={{width:'100%',height:'100%',paddingTop:'10%'}}>
                        {
                            this.state.list.map((item,index)=>{
                            return <p key={index} onClick={()=>this.click(item)}>{item}</p>
                            })
                        }
                        </div>
            </div>
        )
    }
}