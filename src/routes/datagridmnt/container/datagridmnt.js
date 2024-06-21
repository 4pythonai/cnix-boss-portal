import React from 'react';
import { Table, Select, Modal, Spin, Upload, Radio, Form, Input, Icon, Divider, AutoComplete, Button, Tag, Card, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import GridAdder from './gridAdder';
import Dmtabs from './dmtabs';
import api from '../../../api/api';
import { hashHistory } from 'react-router';
const { Option } = Select;

@inject('dmStore')
@observer
export default class datagridmnt extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    state = { searchText: '', current_actcode: '', actcode: '', maintable: '', memo: '', selectedRowKeys: [] };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[this.state.searchText]} autoEscape textToHighlight={text.toString()} />
        )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    selectRow = (record) => {
        this.setState({ selectedRowKeys: [record.id] });
        this.changeStoreCfg(record);
    };

    onSelectedRowKeysChange = (selectedRowKeys, records) => {
        let record = records[0];
        this.selectRow(record);
        console.log(record);
    };

    changeStoreCfg(record) {
        this.dmstore.setCurrentActcode(toJS(record).activity_code);
        this.dmstore.clearMaintableColumns();
        this.dmstore.setCurrentActName(toJS(record).grid_title);
        this.dmstore.setCurrentBasetable(toJS(record).base_table);
        this.dmstore.setCurrentActObj(toJS(record));
    }

    async deleteActioncode(idtodel) {
        let params = { data: { id: idtodel }, method: 'POST' };
        let res = await api.activity.deleteAction(params);
        if (res.code == 200) {
            this.dmstore.initAll();
        }
    }

    componentDidMount() {
        this.dmstore.initAll();
    }

    //批处理按钮组
    async onClick(actioncode, type) {
        let params = { method: 'POST', data: { actioncode: actioncode, batch_type: type } };
        let res = await api.activity.batchSetButtons(params);
        console.log(res);
        if (res.code == '200') {
        }
    }

    //跳转到字段可见配置
    async gotoFieldVisibeConfigure(actioncode, grid_title, type) {
        let arg = { actioncode: actioncode, grid_title: grid_title, dmstore: this.dmstore };
        hashHistory.push({ pathname: `/FiledVisibleConfigure`, state: arg });
        // hashHistory.push('/FiledVisibleConfigure', (state: arg));
    }

    render() {
        let dataGrids = this.dmstore.dataGrids;
        let biztables = this.dmstore.biztableList;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange
        };

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },

            {
                title: '操作',
                key: 'xcodes',
                render: (text, record) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <Popconfirm
                                title="确定删除此Acttion_code?"
                                icon={<Icon type="api" style={{ color: 'red' }} />}
                                onConfirm={() => {
                                    console.log(toJS(record));
                                    this.deleteActioncode(record.id);
                                }}>
                                <Button size="small" type="button">
                                    删除
                                </Button>
                            </Popconfirm>
                            <Button size="small" type="button" onClick={() => this.gotoFieldVisibeConfigure(record.activity_code, record.grid_title, 'fieldVisible')}>
                                字段可见配置
                            </Button>
                            <Button size="small" type="button" onClick={() => this.onClick(record.activity_code, 'curd_template')}>
                                CURD
                            </Button>
                            <Button size="small" type="button" onClick={() => this.onClick(record.activity_code, 'reset')}>
                                重置
                            </Button>
                        </div>
                    );
                }
            },
            {
                title: 'ActionCode',
                dataIndex: 'activity_code',
                key: 'ActionCode',
                ...this.getColumnSearchProps('activity_code')
            },

            {
                title: '名称',
                width: '200px',
                dataIndex: 'grid_title',
                key: 'grid_title',
                ...this.getColumnSearchProps('grid_title')
            },
            {
                title: '基础表格',
                dataIndex: 'base_table',
                key: 'base_table',
                ...this.getColumnSearchProps('base_table')
            },
            {
                title: '多选',
                dataIndex: 'multiple',
                key: 'multiple'
            },
            {
                title: 'geturl',
                dataIndex: 'geturl',
                key: 'geturl'
            },
            {
                title: 'delurl',
                dataIndex: 'delurl',
                key: 'delurl'
            },
            {
                title: 'addurl',
                dataIndex: 'addurl',
                key: 'addurl'
            },
            {
                title: 'updateurl',
                dataIndex: 'updateurl',
                key: 'updateurl'
            },
            {
                title: '布局',
                dataIndex: 'layoutcfg',
                key: 'layoutcfg'
            },

            {
                title: 'Tips',
                dataIndex: 'tips',
                key: 'tips'
            }
        ];

        return (
            <div>
                <div className="bordered">
                    <div>
                        <Table
                            onRow={(record) => ({
                                onClick: () => {
                                    this.selectRow(record);
                                }
                            })}
                            rowKey={(record) => record.id}
                            size="small"
                            columns={columns}
                            rowSelection={rowSelection}
                            dataSource={dataGrids}
                        />
                    </div>
                </div>

                <div>
                    <Dmtabs />
                </div>
            </div>
        );
    }
}
