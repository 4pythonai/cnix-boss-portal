import React from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'antd/dist/antd.css';

// import './navbar.scss';






export default class Cabinet extends React.Component {
    constructor(props) {
        super(props)
        this.state={}

    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('cabinet'));
        myChart.setOption({
            title: {
                text: '机柜状态',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['直接访问', '邮件营销', '联盟广告'], 
                top:'10%', 
                right:0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
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
                    name: '直接访问',
                    type: 'bar',
                    stack:'总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
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
                <div id='cabinet' style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}