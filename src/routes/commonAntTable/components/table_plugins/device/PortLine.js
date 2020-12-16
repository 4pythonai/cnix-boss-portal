

import React from 'react'
import {Slider,Checkbox,Row,Button,message,Select,Col,Radio,Icon} from 'antd';

import {observer,inject} from "mobx-react";

import DevicePort from './DevicePort'


@observer
export default class PortLine extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        selectStart: 0,
        selectEnd: 0,
        ports: this.props.ports,
        batch_portmedia: '',
        batch_portspeed: '',



        Nsingle: {
            n1: 0,
        },

        Ndouble: {
            n1: 0,
            n2: 0
        },


        // 三段式命名
        Ntripple: {
            n1: 0,
            n2: 0,
            n3: 0,
        },


        sliderWidth: 0
    }

    componentDidMount() {
        let sliderWidth = this.getSliderWidth()
        this.setState({
            lineindex: this.props.lineindex,
            ports: this.props.ports,
            sliderWidth: sliderWidth
        })
    }


    onChangeSlider(range) {
        let start = range[0]
        let end = range[1]
        if(start == 0) {start = 1}
        this.setState({selectStart: start,selectEnd: end},() => {
            this.batchSet('selected',true)
        });
    }

    batchsetPortSpec() {
        if(this.state.selectEnd == 0) {
            message.info('请拖动上方的滑块选择范围')
            return
        }
        this.batchSet('portmedia',this.state.batch_portmedia);
        this.batchSet('portspeed',this.state.batch_portspeed);
        this.props.generate_Displayports()

    }

    batchSet(key,value) {
        const array = [...this.state.ports];
        this.state.ports.map((currElement,index) => {
            if(((index + 1) >= this.state.selectStart) && ((index + 1) <= this.state.selectEnd)) {
                array[index][key] = value;
            } else {
                if(key == 'selected') {
                    array[index][key] = false;
                }
            }
        })


        this.setState({ports: array},() => {
            this.props.statics(false)   //统计目前的端口情况
        });


    }


    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        console.log(nextProps)
        this.setState({lineindex: nextProps.lineindex,ports: nextProps.ports})
    }


    destoryLine() {
        this.props.destoryLine(this.state.lineindex) //调用父组件的DeleteLine
    }




    onChangeMedia = e => {
        this.setState({batch_portmedia: e.target.value})
    };


    onChangeSpeed = value => {
        this.setState({batch_portspeed: value})
    };


    onChangePattern(pattern,value,key) {

        if(pattern == 'single') {
            let Nsingle = {...this.state.Nsingle}
            Nsingle[key] = value
            this.setState({Nsingle: Nsingle})
        }


        if(pattern == 'double') {
            let Ndouble = {...this.state.Ndouble}
            Ndouble[key] = value
            this.setState({Ndouble: Ndouble})
        }


        if(pattern == 'tripple') {
            let Ntripple = {...this.state.Ntripple}
            Ntripple[key] = value
            this.setState({Ntripple: Ntripple})
        }
    }


    setPortsName() {


        const array = [...this.state.ports];
        this.state.ports.map((currElement,index) => {

            if(this.props.nameTpl == 'tpl_tripple') {
                let tmpidx = (parseInt(this.state.Ntripple.n3) + index)
                let tmpname = (this.state.Ntripple.n1).toString() + '/' + (this.state.Ntripple.n2).toString() + '/' + tmpidx
                array[index]['portname'] = tmpname
            }

            if(this.props.nameTpl == 'tpl_double') {
                let tmpidx = (parseInt(this.state.Ndouble.n2) + index)
                let tmpname = 'L' + (this.state.Ndouble.n1).toString() + 'C' + tmpidx
                array[index]['portname'] = tmpname
            }

            if(this.props.nameTpl == 'tpl_single') {
                let tmpidx = (parseInt(this.state.Nsingle.n1) + index)
                let tmpname = tmpidx
                array[index]['portname'] = tmpname
            }
        })
        this.setState({ports: array});
        this.props.generate_Displayports()
    }



    getSelectOption(count,disabledPortNumEndCount) {
        let tempArray = new Array(count).join(',').split(',')
        return tempArray.map((value,index) => {
            return <Select.Option key={index} value={index}>{index}</Select.Option>
        })
    }

    getSliderWidth() {
        return Math.min(55.5 * this.props.ports.length,1350)
    }

    getSpec = () => {

        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col>
                    <Radio.Group onChange={this.onChangeMedia} value={this.state.batch_portmedia}>
                        <Radio value={"光口"}>光口</Radio>
                    </Radio.Group>
                </Col>
                <Col>
                    <Radio.Group onChange={this.onChangeMedia} value={this.state.batch_portmedia}>
                        <Radio value={"电口"}>电口</Radio>
                    </Radio.Group>
                </Col>
                <Col>
                    速率
                </Col>
                <Col>
                    <Select style={{width: '100px'}} onChange={this.onChangeSpeed} value={this.state.batch_portspeed || '请选择'}  >
                        <Select.Option key='E' value='E'>E</Select.Option>
                        <Select.Option key='GE' value='GE'>GE</Select.Option>
                        <Select.Option key='XE' value='XE'>XE</Select.Option>
                        <Select.Option key='10GE' value='10GE'>10GE</Select.Option>
                        <Select.Option key='25GE' value='25GE'>25GE</Select.Option>

                    </Select>
                </Col>
                <Col>
                    <Button type="primary" htmlType="submit" onClick={this.batchsetPortSpec.bind(this)}>
                        设置规格
                        </Button>
                </Col>
            </Row>
        )
    }


    getNameSetter = () => {

        if(this.props.nameTpl == 'tpl_single') {
            return this.getNameSetter_single()
        }

        if(this.props.nameTpl == 'tpl_double') {
            return this.getNameSetter_double()
        }
        if(this.props.nameTpl == 'tpl_tripple') {
            return this.getNameSetter_tripple()
        }
    }


    getNameSetter_single = () => {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                    <Select style={selectStyle} onChange={value => this.onChangePattern('single',value,'n1')} value={this.state.Nsingle.n1}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(2)}
                    </Select>
                </Col>
                <Col>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit" onClick={this.setPortsName.bind(this)}>
                        保存命名</Button>

                </Col>
            </Row>
        )
    }



    getNameSetter_double = () => {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                    L<Select style={selectStyle} onChange={value => this.onChangePattern('double',value,'n1')} value={this.state.Ndouble.n1}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(9)}
                    </Select>
                    C
            <Select style={selectStyle} onChange={value => this.onChangePattern('double',value,'n2')} value={this.state.Ndouble.n2}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(9)}
                    </Select>
                </Col>
                <Col>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit" onClick={this.setPortsName.bind(this)}>
                        保存命名</Button>
                </Col>
            </Row>
        )
    }



    getNameSetter_tripple = () => {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                    <Select style={selectStyle} onChange={value => this.onChangePattern('tripple',value,'n1')} value={this.state.Ntripple.n1}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(9)}
                    </Select>
                    /
            <Select style={selectStyle} onChange={value => this.onChangePattern('tripple',value,'n2')} value={this.state.Ntripple.n2}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(9)}
                    </Select>
                    /
            <Select style={selectStyle} onChange={value => this.onChangePattern('tripple',value,'n3')} value={this.state.Ntripple.n3}>
                        <Select.Option value='请选择'>选择</Select.Option>
                        {this.getSelectOption(99)}
                    </Select>

                </Col>
                <Col>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit" onClick={this.setPortsName.bind(this)}>
                        保存命名</Button>

                </Col>
            </Row>
        )
    }




    render() {

        let sliderWidth = this.state.sliderWidth
        return (
            <div style={lineWrapper} id="slider_template_wrapper">
                <Slider
                    style={{width: sliderWidth ? sliderWidth : '100%',position: 'relative'}}
                    getTooltipPopupContainer={() => document.getElementById('slider_template_wrapper')}
                    min={0}
                    range
                    max={this.state.ports.length}
                    defaultValue={[0,0]}
                    tooltipVisible
                    onChange={value => this.onChangeSlider(value)}
                />
                <div style={{marginBottom: '10px'}} >
                    <Row>
                        <Col span={7}>  {this.getSpec()}</Col>
                        <Col span={4}> </Col>
                        <Col span={10}>  <div style={namewrapper}> 起始序号: {this.getNameSetter()} </div></Col>
                        <Col span={1}>
                            <Button style={{marginLeft: '10px'}} type="danger" htmlType="submit" onClick={this.destoryLine.bind(this)}>
                                删除此模块{this.state.lineindex}</Button>
                        </Col>
                    </Row>
                </div>
                <div style={lineStyle}>
                    {this.state.ports.map(item => <DevicePort className="devicePort" ref="devicePortRef" port={{...item}} key={item.inner_index} />)}
                </div>
            </div>
        )
    }
}

const lineWrapper = {
    border: '1px solid #eaeaea',
    marginTop: '30px',
    background: '#fafafa'
}

const namewrapper = {
    width: '500px',
    display: 'flex',
    alignItems: 'center',
}


const lineStyle = {
    color: 'black',
    fontSize: '12px',
    cursor: 'pointer',
    margin: '1px',
    display: 'flex',
    width: '1400',
    flexWrap: 'wrap',
    flexDirection: 'row',

};


const selectStyle = {
    width: '80px'
}
