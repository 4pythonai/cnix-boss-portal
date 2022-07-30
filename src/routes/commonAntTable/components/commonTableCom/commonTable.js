import React from 'react';
import { observer } from 'mobx-react';
import { Button, Table, message, Icon } from 'antd';
import { toJS } from 'mobx';
import field_cfg from './columnsRender/columnsRednerCfg.json';
import commonTableStore from '@/store/commonTableStore';
import '../../commonTable.scss';
import createQueryConfig from './commonTableQueryCfg';
import getTextWidth from './commonTableTextTool';
import api from '@/api/api';

@observer
export default class CommonTable extends React.Component {
        constructor(props) {
                super(props);
                this.commonTableStore = new commonTableStore();
                this.state = {
                        buttonremark: 'false',
                        button_code: '',
                        buttonUsedComponent: null,
                        columns: [],
                        search_query_cfg: null,
                        isFilterSelfData: false,
                        query_cfg: this.props.query_cfg ? this.props.query_cfg : null //表格保持自己的query_cfg
                };
                this.resetTable = this.resetTable.bind(this);
                this.pluginComRef = null;
        }
        // 查询
        inquireModal = async (data) => {
                await this.setState({ query_cfg: data });
                await this.listData();
        };

        searchOrder = async (data) => {
                await this.commonTableStore.setCurrentPage(1);
                await this.setState({ search_query_cfg: data });
                await this.listData();
        };

        //设置表格自己的query_cfg ,不是store的 query_cfg
        setTableCompomentQueryCfg = async (cfg) => {
                this.setState({ query_cfg: cfg });
        };

        setSearchQueryConfig = async (cfg) => {
                this.setState({ search_query_cfg: cfg });
        };

        async componentDidMount() {
                this.commonTableStore.resetTableStore();
                this.commonTableStore.clearPaginationStore();
                await this.commonTableStore.setActionCode(this.props.action_code);
                await this.refreshTable();

                // 作为uform插件时的赋值处理
                if (this.props.onChange) {
                        this.props.onChange(this.commonTableStore.dataSource);
                }
        }

        refreshTable = async () => {
                await this.getACtcfg('refreshTable');
                if (this.props.as_virtual == 'y') {
                        return;
                }
                await this.setState(
                        {
                                search_query_cfg: null
                        },
                        () => {
                                this.listData();
                        }
                );
        };

        resetTable() {
                this.setState(
                        {
                                query_cfg: null
                        },
                        () => {
                                this.listData();
                        }
                );
        }

        getACtcfg = async (source) => {
                this.commonTableStore.clearSelectRowData();
                let params = {
                        data: {
                                actcode: this.commonTableStore.action_code,
                                role: sessionStorage.getItem('role_code'),
                                user: sessionStorage.getItem('user')
                        },
                        method: 'POST'
                };

                let res = await api.activity.getACtcfg(params);

                if (res.code == 200) {
                        console.log(res.data);

                        this.commonTableStore.setIsExistence(res.data.isExistence);
                        this.commonTableStore.setTableColumnsJson(res.data.tableColumnConfig);
                        this.commonTableStore.setFormCfg(res.data.formcfg);
                        this.commonTableStore.setReferinfo(res.data.referinfo);
                        this.commonTableStore.setlayoutCfg(res.data.layoutcfg);
                        this.commonTableStore.setTips(res.data.tips);

                        if (res.data.staticformcfg) {
                                this.commonTableStore.setstaticformcfg(res.data.staticformcfg);
                        }

                        this.commonTableStore.setselectType(res.data.multiple);
                        this.commonTableStore.setTableButtonsJson(res.data.notStandardButtonConfig);
                        this.commonTableStore.setBaseTable(res.data.base_table);
                        this.commonTableStore.setCurd(res.data.curd);
                        this.commonTableStore.setTableWidth(res.data.table_width);
                        if (res.data.fixed_query_cfg) {
                                this.setTableCompomentQueryCfg(res.data.fixed_query_cfg);
                        }
                        return;
                }

                this.commonTableStore.setTableColumnsJson([]);
                this.commonTableStore.setFormCfg({});
                message.error('获取表格配置失败');
        };

        listData = async () => {
                let params = {
                        data: {
                                actcode: this.commonTableStore.action_code,
                                role: sessionStorage.getItem('role_code'),
                                user: sessionStorage.getItem('user'),
                                query_cfg: createQueryConfig(this.state.search_query_cfg, this.state.query_config),
                                isFilterSelfData: this.state.isFilterSelfData ? 'y' : 'n',
                                pageSize: this.commonTableStore.pageSize,
                                currentPage: this.commonTableStore.currentPage
                        },
                        method: 'POST'
                };

                params.geturl = toJS(this.commonTableStore.curd).geturl;
                if (params.geturl === undefined) {
                        return;
                }

                let json = await api.curd.listData(params);
                if (json.code == 200) {
                        this.commonTableStore.setDataSource(json.data);
                        this.commonTableStore.setTotal(json.total);
                        this.getTableColumns();
                        this.rowSelectChange([], []);
                }
        };

        getComponentByFile = (path) => {
                let startpath = path.substring(0, 3);
                let searchIndex = path.lastIndexOf('../');
                let endpath = path.substring(searchIndex + 3, path.length);
                let _compoment = null;
                if (startpath == '../') {
                        if (searchIndex == 0) {
                                _compoment = require('../' + endpath).default;
                        } else if (searchIndex == 3) {
                                _compoment = require('../../' + endpath).default;
                        } else if (searchIndex == 6) {
                                _compoment = require('../../../' + endpath).default;
                        }
                } else {
                        _compoment = require('' + path).default;
                }
                return _compoment;
        };

        renderButtons() {
                if (this.props.readOnly === true) {
                        return null;
                }
                if (!this.commonTableStore.TableButtonsJson) {
                        return null;
                }

                return this.commonTableStore.TableButtonsJson.map((item, index) => {
                        return (
                                <Button
                                        key={index}
                                        type={item.ui_type}
                                        htmlType="button"
                                        onClick={(event) => this.getButtonHandler(event, item)}
                                        size="small"
                                        style={{ margin: 8 }}>
                                        {item.title}
                                </Button>
                        );
                });
        }

        getButtonHandler(event, item) {
                var entry_function = item.entry_function.substring(0, item.entry_function.length - 2);
                let _compoment = this.getComponentByFile(item.file_path);

                if (item.using_component == 'y') {
                        this.setState(
                                {
                                        button_code: item.button_code,
                                        buttonUsedComponent: _compoment
                                },
                                () => {
                                        this.pluginComRef[entry_function]();
                                }
                        );
                } else {
                        _compoment[entry_function]();
                }
        }

        // commonTable 作为编辑器时候, x-props会传入 as_virtual属性,onChange 属性.
        RenderTablePluginCom() {
                let PluginCom = this.state.buttonUsedComponent;
                if (this.state.buttonUsedComponent) {
                        return (
                                <PluginCom
                                        ref={(item) => {
                                                this.pluginComRef = item;
                                        }}
                                        parentTable={this}
                                        as_virtual={this.props.as_virtual}
                                        editable={true}
                                        onChange={this.props.onChange}
                                        commonTableStore={this.commonTableStore}
                                        dataGridcode={this.props.dataGridcode}
                                        refreshTable={this.refreshTable}
                                        resetTable={this.resetTable}
                                        setQueryCfg={this.setTableCompomentQueryCfg}
                                        setSearchQueryConfig={this.setSearchQueryConfig}
                                        inquireModal={this.inquireModal}
                                        searchOrder={this.searchOrder}
                                        onCancel={this.props.onCancel}
                                />
                        );
                }
        }

        columnsRender(text, record, column_cfg) {
                if (text === '' || text === undefined) {
                        return '';
                }

                let table_columns_render_cfg = field_cfg[this.props.action_code];

                // 不存在处理函数
                if (table_columns_render_cfg === undefined) {
                        return text;
                }

                if (Object.keys(table_columns_render_cfg).includes(column_cfg.key) === false) {
                        return text;
                }
        }

        getTableColumns() {
                let hideColumns = ['uuid', 'processDefinitionKey', 'transactid', 'nodeKey'];
                let columns = [];
                this.commonTableStore.tableColumnsJson.map((item, index) => {
                        let column = {
                                title: item.title,
                                dataIndex: item.key,
                                key: item.key,
                                sorter: (a, b) => this.sorter(a[item.key], b[item.key]),
                                render: (text, record) => {
                                        return this.columnsRender(text, record, item);
                                }
                        };
                        if (hideColumns.includes(item.key) == false) {
                                columns.push(column);
                        }
                });

                columns.map((item) => {
                        let fieldValues = [];
                        fieldValues.push(item.title);
                        this.commonTableStore.dataSource.forEach((record) => {
                                fieldValues.push(record[item.dataIndex]);
                        });
                        var longest = fieldValues.reduce(function (a, b) {
                                if (a == null) {
                                        a = '';
                                }
                                if (b == null) {
                                        b = '';
                                }

                                return a.length > b.length ? a : b;
                        });

                        return (item.width = 40 + getTextWidth(longest));
                });

                this.setState({ columns: columns });
        }

        sorter(valueA, valueB) {
                let targetA = valueA != null && valueA.toString().toLowerCase();
                let targetB = valueB != null && valueB.toString().toLowerCase();
                return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
        }

        async setCurrentPage(currentPage) {
                if (this.commonTableStore.currentPage == currentPage) {
                        return;
                }
                this.commonTableStore.setCurrentPage(currentPage);
                await this.listData();
        }

        onRowClick(event, record) {
                if (this.props.sendData) {
                        let arr = [];
                        arr.push(record);
                        this.props.sendData(arr);
                }
                if (this.commonTableStore.selectType == 'y') {
                        this.commonTableStore.rowcheckChange([record.id], [record]);
                } else {
                        this.commonTableStore.rowSelectChange([record.id], [record]);
                }
                this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
        }

        rowSelectChange(selectedRowKeys, selectedRows) {
                this.commonTableStore.rowSelectChange(selectedRowKeys, selectedRows);
                this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
                if (this.props.sendData) {
                        this.props.sendData(selectedRows);
                }
        }

        onShowSizeChange = async (current, pageSize) => {
                this.commonTableStore.setCurrentPage(current);
                this.commonTableStore.setPageSize(pageSize);
                await this.listData();
        };

        getTableProps() {
                return {
                        onRow: (record) => {
                                return {
                                        onClick: (event) => this.onRowClick(event, record) // 点击行选中
                                };
                        },
                        loading: this.commonTableStore.loading,
                        rowKey: (record) => record.id,
                        bordered: true,
                        rowSelection: {
                                type: this.commonTableStore.selectType == 'y' ? 'checkbox' : 'radio',
                                selectedRowKeys: this.commonTableStore.selectedRowKeys,
                                onChange: (selectedRowKeys, selectedRows) =>
                                        this.rowSelectChange(selectedRowKeys, selectedRows)
                        },
                        scroll: {
                                x: parseInt(this.commonTableStore.table_width)
                                // y: '720px'
                        },
                        pagination: {
                                showSizeChanger: true,
                                onShowSizeChange: this.onShowSizeChange,
                                total: this.commonTableStore.total,
                                showLessItems: true,
                                defaultCurrent: this.commonTableStore.currentPage,
                                current: this.commonTableStore.currentPage,
                                pageSize: this.commonTableStore.pageSize,
                                showQuickJumper: true,
                                showTotal: (count) => {
                                        let pageNum = Math.ceil(count / this.commonTableStore.pageSize);
                                        return '共 ' + pageNum + '页/' + count + ' 条数据';
                                },
                                onChange: (currentPage) => this.setCurrentPage(currentPage)
                        }
                };
        }

        // 后台设置查看自己还是全部的数据
        filterSelfList = (isFilterSelfData) => {
                this.setState({ isFilterSelfData }, () => {
                        this.commonTableStore.setCurrentPage(1);
                        this.listData();
                });
        };

        getFilterButton = () => {
                if (this.commonTableStore.isExistence === false) {
                        return null;
                }

                return this.state.isFilterSelfData ? (
                        <Icon
                                title="查看所有数据"
                                style={filter_style}
                                type="filter"
                                theme="filled"
                                onClick={() => this.filterSelfList(false)}
                        />
                ) : (
                        <Icon
                                title="只查看自己数据"
                                style={filter_style}
                                type="filter"
                                onClick={() => this.filterSelfList(true)}
                        />
                );
        };

        render() {
                let styles = {
                        padding: '10px'
                };

                let tableProps = this.getTableProps();
                console.log(this.state.columns);

                return (
                        <div className="table_wrapper" style={styles}>
                                {this.RenderTablePluginCom()}
                                <div className="table_button">
                                        {this.renderButtons()}
                                        {this.getFilterButton()}
                                </div>

                                <Table
                                        size={this.props.size ? 'small' : 'default'}
                                        key={this.props.action_code}
                                        className="commonTable"
                                        dataSource={this.commonTableStore.dataSource}
                                        columns={this.state.columns}
                                        {...tableProps}
                                />
                        </div>
                );
        }
}

const filter_style = {
        fontSize: '16px'
};
