import React from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import Cabinet from '../component/cabinet'
import Network from '../component/network'
import Brokenline from '../component/brokenline'
import Dot from '../component/dot'
import BjMap from '../component/bjMap'
import Characters from '../component/characters'
import 'antd/dist/antd.css';
import '../home.scss'


// import './navbar.scss';

import Bossreport from  './bossreport'




export default class home extends React.Component {
    constructor(props) {
        super(props)
        this.state={}

    }

    componentDidMount() {
     
    }
    render() {
        return (
            <div className='homecontent' style={{height:'100%'}}>
                {/* <div  style={{width:'30%',height:'100%',float:'left'}}>
                    <Cabinet/>
                    <Network/>
                </div>
                <div style={{width:'40%',height:'100%',float: 'left'}}>
                    <Brokenline/>
                    <BjMap/>
                 </div>
                <div  style={{width:'30%',height:'100%',float:'left'}}>
                    <Characters/>
                    
                    <Dot/>
                </div> */}
            </div>
        )
    }
}