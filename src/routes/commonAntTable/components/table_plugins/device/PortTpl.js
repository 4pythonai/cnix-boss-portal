
import React from 'react'
import { Modal, Descriptions, message, InputNumber, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import api from '@/api/api'
import pmStore from '@/store/pmStore'
import { toJS } from 'mobx'

import { randomString } from '@/utils/tools'

import DevicePort from './DevicePort'
import PortLine from './PortLine'

@observer
export default class PortTpl extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.DeleteLine = this.DeleteLine.bind(this)
        this.init = this.init.bind(this)
        this.statics = this.statics.bind(this)
    }

    state = {
        routermodelid: 0,
        nameTpl: '',   //命名规则
        visible: false,
        spec_portnum: 0, //总共端口数量,
        spec_optical_num: 0, // 光口情况
        spec_elect_num: 0, // 光口情况
        portnum_to_generate: 0, // 输入的数量
        lines: [],   // 所有行的信息,每行有多个端口.
    }

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        let params = {
            method: 'POST'
        };
        this.setState({ visible: true, lines: [] })
    }

    onCancel() {
        this.setState({ visible: false })
    }

    onChangeNumberrequest(req) {
        this.setState({ portnum_to_generate: req })
    }


    async  SavePortsHandler() {
        this.statics(true)
        console.log(this.props.parentTable.commonTableStore.selectedRows[0].id)

        await this.setState({ 'routermodelid': this.props.parentTable.commonTableStore.selectedRows[0].id })

        console.log(JSON.stringify(this.state))
    }

    //统计当前的端口情况
    statics(need_check_blan_and_duplicate) {
        let allportnames = []
        let allmedia = []
        let allspeed = []
        this.state.lines.map((line) => {
            line.ports.map((port) => {
                allportnames.push(port.portname)
                allmedia.push(port.portmedia)
                allspeed.push(port.portspeed)
            })
        })

        this.setState({ spec_portnum: allportnames.length })

        console.log(allmedia)

        var spec_optical_num = allmedia.reduce(function(n, val) {
            return n + (val === '光口');
        }, 0);

        var spec_elect_num = allmedia.reduce(function(n, val) {
            return n + (val === '电口');
        }, 0);
        this.setState({ spec_optical_num: spec_optical_num, spec_elect_num: spec_elect_num })

        if (need_check_blan_and_duplicate) {
            let hasblank = false;

            for (name of allportnames) {
                if (name === '') {
                    message.error('有端口未设置名称')
                    hasblank = true
                    break;
                }
            }


            for (const media of allmedia) {
                if (media === '') {
                    message.error('有端口未设置光/电')
                    hasblank = true
                    break;
                }
            }


            for (const speed of allspeed) {
                if (speed === '') {
                    message.error('有端口未设置速率')
                    hasblank = true
                    break;
                }
            }

            if (hasblank) {
                return false
            }

            let unique = [...new Set(allportnames)];
            if (!(unique.length == allportnames.length)) {
                message.error('有端口名称重复')
                return false
            }
        }
        return true;
    }


    //增加1行端口
    generateLine() {

        if (this.state.portnum_to_generate == 0) {
            message.error('必须填上数量,必须大于0')
            return
        }

        if (this.state.nameTpl == '') {
            message.error('必须选择命名模板')
            return
        }

        let line_obj = {}
        line_obj.lineindex = this.state.lines.length

        let tmp_ports = []
        for (let index = 1; index <= this.state.portnum_to_generate; index++) {
            let tmp = { inner_index: index.toString(), portmedia: '', portspeed: '', portname: '', selected: false }
            tmp_ports.push(tmp)
        }

        line_obj.ports = tmp_ports
        let tmplines = this.state.lines
        tmplines.push(line_obj);
        this.setState({ lines: tmplines })
        this.statics(false)
    }


    DeleteLine(idx) {
        let myArray = this.state.lines.filter(function(obj) {
            return obj.lineindex !== idx;
        });
        this.setState({ lines: myArray }, () => {
            this.statics(false)
        });

    }




    onChangeNameingTpl = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            nameTpl: e.target.value,
        });
    };




    deviceInfo() {
        let currentrow = toJS(this.props.commonTableStore.selectedRows[0])
        if (currentrow) {
            return (
                <Descriptions title="设备信息:" bordered>
                    <Descriptions.Item label="品牌">{ currentrow.brandid }</Descriptions.Item>
                    <Descriptions.Item label="型号">{ currentrow.modelstr }</Descriptions.Item>
                    <Descriptions.Item label="总行/列"> { this.state.lines.length }</Descriptions.Item>
                    <Descriptions.Item label="总端口数"> { this.state.spec_portnum }</Descriptions.Item>
                    <Descriptions.Item label="电口数"> { this.state.spec_elect_num }</Descriptions.Item>
                    <Descriptions.Item label="光口数"> { this.state.spec_optical_num }</Descriptions.Item>

                </Descriptions>
            )
        } else {
            return null
        }
    }


    render() {

        let alllines = this.state.lines
        let { portnum_to_generate } = this.state
        return <Modal
            visible={ this.state.visible }
            onCancel={ () => this.onCancel() }
            onOk={ () => this.SavePortsHandler() }
            destroyOnClose={ true }
            width={ 1400 }
            title="端口模板管理" >
            <div>
                { this.deviceInfo() }
            </div>

            <div style={ wrapper }>
                <div style={ operationarea1 }>
                    <div>端口排/列</div>
                    <div style={ { marginLeft: '10px' } }>
                        <Input placeholder="第几排"
                            value={ this.state.lines.length + 1 }
                            disabled
                        />
                    </div>
                    <div style={ { marginLeft: '10px' } }>
                        <Input placeholder="端口数量"
                            onChange={ event => this.onChangeNumberrequest(event.target.value) }
                        />
                    </div>
                    <div style={ { marginLeft: '10px' } }>
                        <Button type="primary" htmlType="submit" onClick={ this.generateLine.bind(this) }>
                            生成批量
                        </Button>
                    </div>
                </div>


                <div style={ operationarea2 }>
                    <div style={ { marginRight: '10px' } }>命名模板(24端口示范)</div>

                    <Radio.Group onChange={ this.onChangeNameingTpl } value={ this.state.nameTpl }>
                        <Radio value={ "tpl_single" }> 1-24  </Radio>
                        <Radio value={ "tpl_tripple" }> 0/0/1-0/0/24  </Radio>
                        <Radio value={ "tpl_double" }>L1C1-L1C24</Radio>
                    </Radio.Group>

                </div>

            </div>
            <div>
                { alllines.length > 0 && alllines.map((item, key) =>
                    <PortLine statics={ this.statics } destoryLine={ this.DeleteLine } nameTpl={ this.state.nameTpl } lineindex={ item.lineindex } ports={ item.ports } key={ key } />
                ) }
            </div>
        </Modal >
    }
}

const operationarea1 = {
    width: '500px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}

const operationarea2 = {
    width: '700px',
    marginLeft: '12px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}

const wrapper = {
    width: '1210',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}