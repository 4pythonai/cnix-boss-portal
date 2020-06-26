import React from 'react'
import { Table, Select, Modal, Spin, Upload, Input, Icon, Divider, Button, Tag, Card, Popconfirm, message, Checkbox, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';

import 'antd/dist/antd.css';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx'
import api from '../../../api/api'
import Pmtabs from './pmtabs';
import navigationStore from '@/store/navigationStore'
const { Option } = Select;



@inject("pmStore")
@observer
export default class processmanagement extends React.Component {
    constructor(props) {
        super(props)
        this.pmstore = props.pmStore
        this.xref = React.createRef()
        this.limitsChange = this.limitsChange.bind(this)

    }

    state = { tableColums: [], Diagrams: {}, selectedRowKeys: [], 'current_processname': '', 'current_processkey': '', 'processkey': '', 'maintable': '', 'memo': '', limitsNodes: [], defaultLimitNodes: [], progressImgUrl: '', groupName: '' }





    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={ { padding: 8 } }>
                <Input
                    ref={ node => {
                        this.searchInput = node;
                    } }
                    placeholder={ `Search ${ dataIndex }` }
                    value={ selectedKeys[0] }
                    onChange={ e => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                    onPressEnter={ () => this.handleSearch(selectedKeys, confirm) }
                    style={ { width: 188, marginBottom: 8, display: 'block' } }
                />
                <Button
                    type="primary"
                    onClick={ () => this.handleSearch(selectedKeys, confirm) }
                    icon="search"
                    size="small"
                    style={ { width: 90, marginRight: 8 } }
                >
                    Search
            </Button>
                <Button onClick={ () => this.handleReset(clearFilters) } size="small" style={ { width: 90 } }>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={ { color: filtered ? '#1890ff' : undefined } } />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={ { backgroundColor: '#ffc069', padding: 0 } }
                searchWords={ [this.state.searchText] }
                autoEscape
                textToHighlight={ text.toString() }
            />
        ),
    });


    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    selectRow = (record) => {
        this.setState({ selectedRowKeys: [record.id] });
        this.setState({ current_processkey: toJS(record).processkey, current_processname: toJS(record).processname }, () => {
            // this.getLimitNodes()
            this.getlistExtracfg()

        })
        this.changeStoreCfg(record)
    }

    onSelectedRowKeysChange = (selectedRowKeys, records) => {

        let record = records[0]
        this.setState({ selectedRowKeys: [record.id] });
        this.setState({ current_processkey: toJS(record).processkey, current_processname: toJS(record).processname }, () => {
            // this.getLimitNodes()
            this.getlistExtracfg()

        })
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

        let res = await api.bpm.getActivityDiagram({ data: {}, method: 'POST' });
        if (res.code != 200) {
            return;
        }

        if (this.state.Diagrams.hasOwnProperty(processkey)) {
            this.setState({ Diagrams: { processkey: true, }, progressImgUrl: res.data })
        } else {
            let tmp = {}
            tmp[processkey] = true;
            this.setState({ Diagrams: tmp, progressImgUrl: res.data })
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

    async  syncActivitiuser() {
        let params = { data: { ...this.state }, method: 'POST' };
        let json = await api.processmanager.syncActivitiuser(params);
        if(json.code==200){
            navigationStore.changeUpdateKey()
        }

    }


    async syncNodeIdAndName() {
        let params = { data: { ...this.state }, method: 'POST' };
        let res = await api.processmanager.syncNodeIdAndName(params);
        if(res.code==200){
            navigationStore.changeUpdateKey()
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
        console.log(111, value)
        this.setState({
            tableColums: value
        })

    }
    async settableColums() {
        if (this.state.current_processkey == '' || this.state.current_processkey == null) {
            message.error('请选择流程')
            return
        }
        // if (this.state.tableColums.length != 0) {
        let flowparafields = JSON.stringify(this.state.tableColums).substring(1, JSON.stringify(this.state.tableColums).length - 1).replace(/\"/g, "")
        let params = { data: { processkey: this.state.current_processkey, flowparafields: flowparafields }, method: 'POST' };
        let res = await api.bpm.saveProcessParaFields(params);
        if (res.code == 200) {
            await this.pmstore.initAll()
            message.success(res.message)
        }
        // } else {
        //     message.error('请设置参数')
        // }

    }
    async setGroupname() {
        console.log(this.state.current_processkey)
        if (this.state.current_processkey == '' || this.state.current_processkey == null) {
            message.error('请选择流程')
        } else {
            let params = { data: { processkey: this.state.current_processkey, groupname: this.state.groupName }, method: 'POST' };
            let res = await api.bpm.saveProcessGroup(params);
            if (res.code == 200) {
                await this.pmstore.initAll()
                message.success(res.message)
            }
        }
    }
    onChangeGroupname(e) {
        this.setState({
            groupName: e.target.value
        })
    }


    async getlistExtracfg() {
        let params = { data: { processkey: this.state.current_processkey }, method: 'POST' };
        let res = await api.processmanager.listExtracfg(params);
        if (res.code == 200) {
            var limitData = []
            let tableColums = res.data.processpara != '流程未设置参数字段' ? res.data.processpara.split(',') : []
            let groupName = res.data.pkgroupname != '流程未设置流程组名称' ? res.data.pkgroupname : ''
            for (var a = 0; a < res.data.forbidden_btn.length; a++) {
                limitData.push(res.data.forbidden_btn[a].nodesid)
            }

            this.setState({
                defaultLimitNodes: limitData,
                groupName: groupName,
                tableColums: tableColums
            })

        }
    }
    onChangeMemo(e) {
        e.persist();

        let obj = {}
        obj['memo'] = e.target.value
        this.setState(obj)
    }


    onChangePrefix(e) {
        e.persist();
        let obj = {}
        obj['prefix'] = e.target.value
        this.setState(obj)
    }
    async setLimitNodes() {
        // if (this.state.limitsNodes.length != 0) {
        if (this.state.current_processkey == '' || this.state.current_processkey == null) {
            message.error('请选择流程')
            return
        }
        let params = { data: { processname: this.state.current_processname, processkey: this.state.current_processkey, limitsNodes: this.state.limitsNodes }, method: 'POST' };
        let res = await api.bpm.saveBpmFobiddenCfg(params);
        if (res.code == 200) {
            await this.pmstore.initAll()
            message.success(res.message)
        }
        // } else {
        //     message.error('请选择流程节点')
        // }
    }
    limitsChange(e) {
        var arr = []
        for (var i = 0; i < e.length; i++) {
            for (var j = 0; j < this.pmstore.AllNodeName.length; j++) {
                if (this.pmstore.AllNodeName[j].id == e[i]) {
                    arr.push(this.pmstore.AllNodeName[j])
                }
            }
        }
        this.setState({
            limitsNodes: arr,
            defaultLimitNodes: e
        })
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
                    const limitsNodes = this.pmstore.AllNodeName
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
                                    <img style={ { zindex: 12 } } src={ this.state.progressImgUrl + '/null&' + record.processkey } />
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
                title: '流程key',
                dataIndex: 'processkey',
                key: 'processkey',
                ...this.getColumnSearchProps('processkey'),

            },
            {
                title: '流程名',
                dataIndex: 'processname',
                key: 'processname',
                ...this.getColumnSearchProps('processname'),
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
            {
                title: '分组',
                dataIndex: 'groupname',
                key: 'groupname',
            },




        ];


        return (
            <div>
                <div style={ { marginLeft: '20px' } } className="bordered">
                    <div>

                        <div>
                            <Button type="primary" style={ { marginLeft: '2px', marginBottom: '20px' } } onClick={ this.syncActivitiuser.bind(this) }>同步[push=>流程-涉及角色]</Button>
                            <Button type="primary" style={ { marginLeft: '2px', marginBottom: '20px' } } onClick={ this.syncNodeIdAndName.bind(this) }>同步[pull=>流程-SID/节点名称]</Button>
                        </div>





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
                    <div style={ { marginTop: '30px' } }>
                        <p style={ { fontWeight: 'bold' } }>添加分组</p>
                        <div>
                            <Input value={ this.state.groupName } onChange={ e => this.onChangeGroupname(e) } placeholder="请输入组名" style={ { width: '600px' } } />
                            <Button style={ { marginLeft: '20px' } } onClick={ this.setGroupname.bind(this) }>保存</Button>
                        </div>
                    </div>
                </div>

                <div style={ { margin: '30px 0px 10px 20px' } }>
                    <p style={ { fontWeight: 'bold' } }>选择流程参数字段(影响流程走向)</p>
                    <Select
                        mode="multiple"
                        placeholder="请选择"
                        onChange={ this.handleChange.bind(this) }
                        value={ this.state.tableColums }
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
                <div style={ { margin: '30px 0px 10px 20px' } }>
                    <p style={ { fontWeight: 'bold' } }>设置流程按钮权限(选中的角色将没有"退回发起人"和"终止流程"按钮)</p>

                    { this.pmstore.AllNodeName.length != 0 ?
                        <div>
                            <div style={ { marginBottom: '10px' } }>
                                <Checkbox.Group value={ this.state.defaultLimitNodes || '' } onChange={ this.limitsChange }>
                                    {
                                        this.pmstore.AllNodeName.map(item => {
                                            return <Checkbox style={ { margin: '0px 10px 10px 0px' } } key={ item.id } value={ item.id }>{ item.name }</Checkbox>
                                        })
                                    }


                                </Checkbox.Group>
                            </div>
                            <Button onClick={ this.setLimitNodes.bind(this) }>提交</Button>
                        </div>
                        : null }

                </div>













                <div><Pmtabs /></div>
            </div>
        )
    }
}