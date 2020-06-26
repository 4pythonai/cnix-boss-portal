import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'






export default class Network extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
        this.LineRef = React.createRef()

    }

    componentDidMount() {
      
        
        var myChart = echarts.init(document.getElementById('network'));
        myChart.setOption({
            title: {
                text: '某站点用户访问来源',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
        setTimeout(()=>{
            myChart.resize();
        })
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

   
    render() {
        return (
            <div style={{height:'50%'}}>
                    <div ref ={this.LineRef} id='network' style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}