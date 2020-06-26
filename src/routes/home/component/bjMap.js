import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'
import './beijing.js'








export default class BjMap extends React.Component {
    constructor(props) {
        super(props)
        this.state={
        }

    }

    componentDidMount() {
      
        
        var myChart = echarts.init(document.getElementById('map'));
        var data = [{
            name: '房山IDC',
            value: 90
        }, {
            name: '东直门IDC',
            value: 90
        }]
        var geoCoordMap = {
            '房山IDC': [116.139157,39.735535],
            '东直门IDC': [116.418757,39.917544],
        };
    
        var convertData = function(data) {
            var res = [];
            for(var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if(geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
    
        var option = {
            backgroundColor: '',
            title: {
                text: '',
                subtext: '',
                sublink: '',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: ''
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: [''],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: '北京',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                zoom: 1.1,
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#6bdddd',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#6bdddd'
                    }
                }
            },
            series: [{
                    name: '',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 5;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ce4032'
                        }
                    }
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 15)),
                    symbolSize: function(val) {
                        return val[2] / 5;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'fill',
                        scale: 5
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ce4032',
                            shadowBlur: 50,
                            shadowColor: 'red'
                        }
                    },
                    zlevel: 1
                }
            ]
        };
        myChart.setOption(option, true);
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
                    <div id='map' style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}