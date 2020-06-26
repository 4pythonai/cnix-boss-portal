import React from 'react'
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default class BarChart extends React.Component {

    componentDidMount() {
        this.getBasicBar()
        this.getGroupedBar()
        this.getStackedBar()
    }

    getGroupedBar = () => {
        const data = [
            { label: 'Mon.', type: 'series1', value: 2800 },
            { label: 'Mon.', type: 'series2', value: 2260 },
            { label: 'Tues.', type: 'series1', value: 1800 },
            { label: 'Tues.', type: 'series2', value: 1300 },
            { label: 'Wed.', type: 'series1', value: 950 },
            { label: 'Wed.', type: 'series2', value: 900 },
            { label: 'Thur.', type: 'series1', value: 500 },
            { label: 'Thur.', type: 'series2', value: 390 },
            { label: 'Fri.', type: 'series1', value: 170 },
            { label: 'Fri.', type: 'series2', value: 100 },
        ];
        const chart = new Chart({
            container: 'barChartRoot2',
            autoFit: true,
            height: 500,
        });

        chart.data(data);

        chart
            .coordinate()
            .transpose()
            .scale(1, -1);

        chart.axis('value', {
            position: 'right',
        });
        chart.axis('label', {
            label: {
                offset: 12,
            },
        });

        chart.tooltip({
            shared: true,
            showMarkers: false,
        });

        chart
            .interval()
            .position('label*value')
            .color('type')
            .adjust([
                {
                    type: 'dodge',
                    marginRatio: 0,
                },
            ]);

        chart.interaction('active-region');

        chart.render();
    }

    getStackedBar = () => {
        const data = [
            { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
            { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
            { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
            { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
            { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 },
        ];

        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'fold',
            fields: ['小于5岁', '5至13岁', '14至17岁'], // 展开字段集
            key: '年龄段', // key字段
            value: '人口数量', // value字段
            retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
        });
        // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}

        const chart = new Chart({
            container: 'barChartRoot1',
            autoFit: true,
            height: 500,
        });

        chart.coordinate().transpose();

        chart.data(dv.rows);
        chart.scale('人口数量', { nice: true });

        chart.axis('State', {
            label: {
                offset: 12,
            },
        });

        chart.tooltip({
            shared: true,
            showMarkers: false,
        });

        chart
            .interval()
            .adjust('stack')
            .position('State*人口数量')
            .color('年龄段');

        chart.interaction('active-region');

        chart.render();
    }

    getBasicBar = () => {
        const data = [
            { country: '巴西', population: 18203 },
            { country: '印尼', population: 23489 },
            { country: '美国', population: 29034 },
            { country: '印度', population: 104970 },
            { country: '中国', population: 131744 },
        ];

        const chart = new Chart({
            container: 'barChartRoot',
            autoFit: true,
            height: 500,
        });

        chart.data(data);
        chart.scale('population', { nice: true });
        chart.coordinate().transpose();
        chart.tooltip({
            showMarkers: false
        });
        chart.interaction('active-region');
        chart.interval().position('country*population');
        chart.render();
    }

    render() {
        
        return (
            <div style={{display: 'flex'}}>
                <div style={{ width: '400px', height: '400px' }} id="barChartRoot">BarChart</div>
                <div style={{ width: '400px', height: '400px' }} id="barChartRoot1">stackBar</div>
                <div style={{ width: '400px', height: '400px' }} id="barChartRoot2">groupedBarChart</div>
            </div>
        )
    }
}