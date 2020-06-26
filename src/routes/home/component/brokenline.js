import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'antd/dist/antd.css';






export default class Brokenline extends React.Component {
    constructor(props) {
        super(props)
        this.state={}

    }

    componentDidMount() {
      
        
        var myChart = echarts.init(document.getElementById('line'));
        myChart.setOption({
            title: {
                text: '堆叠区域图',
                left: 'center'
            },
            tooltip: {
                // trigger: 'axis',
                // axisPointer: {
                //     type: 'cross',
                //     label: {
                //         backgroundColor: '#6a7985'
                //     }
                // }
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告'], 
                top:'10%', 
                right:0
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
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
                    <div id='line' style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}