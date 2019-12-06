import React from 'react'
import { Table, Select, Modal, Spin, Upload, Input, Icon, Divider, Button, Tag, Card, Popconfirm, message } from 'antd';

import 'antd/dist/antd.css';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx'
import api from '../../../api/api'
import Pmtabs from './pmtabs'
const { Option } = Select;



@inject("pmStore")
@observer
export default class processmanagement extends React.Component {
    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.xref = React.createRef()

    }

    state = { tableColums: [], Diagrams: {}, selectedRowKeys: [], 'current_processkey': '', 'processkey': '', 'maintable': '', 'memo': '' }

    selectRow = (record) => {
        this.setState({ selectedRowKeys: [record.id] });
        this.changeStoreCfg(record)
    }

    onSelectedRowKeysChange = (selectedRowKeys, records) => {

        let record = records[0]
        this.setState({ selectedRowKeys: [record.id] });
        this.setState({ current_processkey: toJS(record).processkey })
        this.changeStoreCfg(record)

    }


    changeStoreCfg(record) {
        this.setState({ current_processkey: toJS(record).processkey })
        this.pmstore.setMainTable(toJS(record).maintable)
        this.pmstore.setCurrentProcessKey('')
        this.pmstore.setCurrentProcessKey(toJS(record).processkey)
        this.pmstore.setCurrentProcessName(toJS(record).processname)
    }



    closeDiagram(key) {
        let tmp = {}
        tmp[key] = false;
        this.setState({ Diagrams: tmp })
        Modal.destroyAll();
    }

    async openDiagram(processkey) {
        if (this.state.Diagrams.hasOwnProperty(processkey)) {
            this.setState({ Diagrams: { processkey: true } })
        } else {
            let tmp = {}
            tmp[processkey] = true;
            this.setState({ Diagrams: tmp })
        }
    }

    async deletePKmain(idtodel) {

        let params = { data: { id: idtodel }, method: 'POST' };
        let res = await api.processmanager.deletePKmain(params);
        if (res.code == 200) {
            this.pmstore.initAll()
        }
    }

    async setPkMain() {
        let params = { data: { ...this.state }, method: 'POST' };
        let res = await api.processmanager.setPkMain(params);
        if (res.code == 200) {
            this.pmstore.initAll()
        }
    }

    componentDidMount() {
        this.pmstore.initAll()
    }

    onChange(k, v, x) {
        let obj = {}
        obj[k] = v
        this.setState(obj)
    }
    handleChange(value) {
        this.setState({
            tableColums: value
        })

    }
    async settableColums() {
        if (this.state.tableColums.length != 0) {
            let flowparafields = JSON.stringify(this.state.tableColums).substring(1, JSON.stringify(this.state.tableColums).length - 1).replace(/\"/g, "")
            let params = { data: { processkey: this.state.current_processkey, flowparafields: flowparafields }, method: 'POST' };
            let res = await api.bpm.saveProcessParaFields(params);
            if (res.code == 200) {
                await this.pmstore.initAll()
                message.success(res.message)
            }
        } else {
            message.error('请设置参数')
        }

    }
    onChangeMemo(e) {
        e.persist();

        let obj = {}
        obj['memo'] = e.target.value
        console.log(obj)
        this.setState(obj)
    }


    onChangePrefix(e) {
        e.persist();
        let obj = {}
        obj['prefix'] = e.target.value
        console.log(obj)
        this.setState(obj)
    }


    render() {
        let maintables = this.pmstore.processMaintableList
        let processes = this.pmstore.processList
        let biztables = this.pmstore.biztableList
        let roles = this.pmstore.roleList
        let tableColums = this.pmstore.maintableColumns

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };





        const columns = [
            {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Popconfirm
                            title="确定删除此流程配置?"
                            icon={ <Icon type="api" style={ { color: 'red' } } /> }
                            onConfirm=
                            { () => {
                                console.log(toJS(record))
                                this.deletePKmain(record.id)
                            }
                            }
                        >
                            <Button type="button">删除</Button>
                        </Popconfirm>
                    )
                }
            },
            {
                title: '显示',
                render: (text, record) => {
                    const antIcon = <Icon type="loading" style={ { fontSize: 24 } } spin />;
                    let displayLoading = this.state.Diagrams[record.processkey] ? 'inline-block' : 'none;';
                    return (
                        <div>
                            <Button onClick={ () => this.openDiagram(record.processkey) } type="button">流程图</Button>
                            <Modal
                                title={ "流程图: " + record.processname }
                                width={ 1200 }
                                visible={ this.state.Diagrams[record.processkey] }
                                onCancel={ this.closeDiagram.bind(this, record.processkey) }
                                destroyOnClose={ true }
                            >
                                <div style={ { textAlign: "center", overflowX: 'auto' } }>
                                    <img style={ { zindex: 12 } } src={ api.bpm.progressImgUrl + '/null&' + record.processkey } />
                                </div>
                            </Modal>
                        </div >
                    )
                }
            },

            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '流程key4',
                dataIndex: 'processkey',
                key: 'processkey',
            },
            {
                title: '流程名',
                dataIndex: 'processname',
                key: 'processname',
            },
            {
                title: '单据前缀',
                dataIndex: 'prefix',
                key: 'prefix',
            },

            {
                title: '主表',
                dataIndex: 'maintable',
                key: 'maintable',
            },

            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
            },
            {
                title: '参数字段',
                dataIndex: 'flowparafields',
                key: 'flowparafields',
            },




        ];


        return (
            <div>
                <div style={ { marginLeft: '20px' } } className="bordered">
                    <div>



                        <Table
                            onRow={ (record) => ({
                                onClick: () => {
                                    this.selectRow(record);
                                },
                            }) }
                            rowKey={ record => record.id }
                            size="small"
                            columns={ columns }
                            rowSelection={ rowSelection }
                            dataSource={ maintables } />




                    </div>
                    <div>
                        <p style={ { fontWeight: 'bold' } }>添加新流程</p>
                        <Select
                            showSearch
                            ref={ this.xref }
                            name="processkey"
                            style={ { width: 200 } }
                            placeholder="选择流程"
                            optionFilterProp="children"
                            onChange={ this.onChange.bind(this, "processkey") }
                            filterOption={ (input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                processes.length && processes.map((item, index) => (
                                    <Option key={ index } value={ item.modelkey }>{ item.description }</Option>)
                                )
                            }

                        </Select>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="选择主表"
                            name="biztable"
                            ref={ this.xref }
                            optionFilterProp="children"
                            onChange={ this.onChange.bind(this, "maintable") }
                            filterOption={ (input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                biztables.length && biztables.map((item, index) => (
                                    <Option key={ index } value={ item.value }>{ item.text }</Option>)
                                )
                            }
                        </Select>
                        <Input onChange={ e => this.onChangePrefix(e) } placeholder="单据前缀" style={ { width: '100px' } } />
                        <Input onChange={ e => this.onChangeMemo(e) } placeholder="备注" style={ { width: '300px' } } />
                        <Button onClick={ this.setPkMain.bind(this) }>提交</Button>
                    </div>
                </div>
                <div style={ { margin: '30px 0px 10px 20px' } }>
                    <p style={ { fontWeight: 'bold' } }>设置参数</p>
                    <Select
                        mode="multiple"
                        placeholder="请选择"
                        onChange={ this.handleChange.bind(this) }
                        style={ { width: 600 } }
                    >
                        {
                            tableColums.length && tableColums.map((item, index) => (
                                <Option key={ index } value={ item.Field }>{ item.Comment }</Option>)
                            )
                        }
                    </Select>
                    <Button style={ { marginLeft: '20px' } } onClick={ this.settableColums.bind(this) }>提交</Button>
                </div>













                <div><Pmtabs /></div>
            </div>
        )
    }
}