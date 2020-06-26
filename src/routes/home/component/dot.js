import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'








export default class Dot extends React.Component {
    constructor(props) {
        super(props)
        this.state={
        }

    }

    componentDidMount() {
      
        
        var myChart = echarts.init(document.getElementById('dot'));
        myChart.setOption({
            title: {
                text: '散点图',
                left: 'center'
            },
            xAxis: {},
            yAxis: {},
            legend:{
                data:['北京'],
                top:'10%', 
                right:0
            },
            series: [{
                name:'北京',
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter'
            }]
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
                    <div id='dot' style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}