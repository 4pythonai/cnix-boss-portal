import React from 'react'
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default class Bossreport extends React.Component {

    componentDidMount() {
        // this.getBasicBar()
        // this.getGroupedBar()
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
            { State: '酒仙桥', 整租: 25635, '散租': 1890, '整租未上架': 9314 },
            { State: '太和桥', 整租: 30352, '散租': 20439, '整租未上架': 10225 },
            { State: 'VT', 整租: 38253, '散租': 42538, '整租未上架': 15757 },
            { State: 'ND', 整租: 51896, '散租': 67358, '整租未上架': 18794 },
            { State: 'AK', 整租: 72083, '散租': 85640, '整租未上架': 22153 },
        ];

        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'fold',
            fields: ['整租', '散租', '整租未上架'], // 展开字段集
            key: '年龄段', // key字段
            value: '人口数量', // value字段
            retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
        });
        // 数据被加工成 {State: 'WY', 年龄段: '整租', 人口数量: 25635}

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
                <div style={{ width: '400px', height: '400px' }} id="barChartRoot1">stackBar</div>
            </div>
        )
    }
}