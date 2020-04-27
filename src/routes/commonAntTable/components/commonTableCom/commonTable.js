import React from 'react'
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";
import { Button, Table, Input, message } from 'antd'
import { toJS } from 'mobx'
import { columnsRender } from '../../../../utils/columnsHandle'
import getColumnSearchProps from './getColumnSearchProps'
import ResizeableTitle from './resizeableTitle';
import commonTableStore from '@/store/commonTableStore'
import '../../commonTable.scss'
import api from '@/api/api'
const { Search } = Input

@observer
export default class CommonTable extends React.Component {


    constructor(props) {
        super(props)


        this.commonTableStore = new commonTableStore()

        this.state = {

            buttonUsedComponent: null,
            columns: [],
            query_cfg: this.props.query_cfg ? this.props.query_cfg : null           //表格保持自己的query_cfg
        }
    }
    // 查询
    inquireModal = async data => {
        console.log(444, data)
        await this.setState({ query_cfg: data })
        await this.listData()
    }
    //设置表格自己的query_cfg ,不是store的 query_cfg
    setTableCompomentQueryCfg = async cfg => {
        this.setState({ query_cfg: cfg })
    }
    async componentDidMount() {
        this.commonTableStore.resetTableStore();
        this.commonTableStore.clearPaginationStore();
        await this.commonTableStore.setActionCode(this.props.action_code)
        await this.refreshTable()
        this.getTableColumns()

        // 作为uform插件时的赋值处理
        if (this.props.onChange) {
            this.props.onChange(this.commonTableStore.dataSource)
        }
    }


    refreshTable = async () => {
        await this.getACtcfg('refreshTable')
        if (this.props.as_virtual == 'y') {
            return
        }
        await this.listData()
    }

    getACtcfg = async (source) => {
        this.commonTableStore.clearSelectRowData();
        let params = {
            data: {
                actcode: this.commonTableStore.action_code,
                role: sessionStorage.getItem("role_code"),
                user: sessionStorage.getItem("user")
            },
            method: 'POST'
        }

        let res = await api.activity.getACtcfg(params);

        if (res.code == 200) {
            this.commonTableStore.setTableColumnsJson(res.data.tableColumnConfig)
            this.commonTableStore.setFormCfg(res.data.formcfg);
            this.commonTableStore.setlayoutCfg(res.data.layoutcfg);

            if (res.data.staticformcfg) {
                this.commonTableStore.setstaticformcfg(res.data.staticformcfg);
            }

            this.commonTableStore.setselectType(res.data.multiple);
            this.commonTableStore.setTableButtonsJson(res.data.notStandardButtonConfig);
            this.commonTableStore.setBaseTable(res.data.base_table)
            this.commonTableStore.setCurd(res.data.curd)
            this.commonTableStore.setTableWidth(res.data.table_width)

            if (res.data.fixed_query_cfg) {
                console.log(res.data.fixed_query_cfg)
                this.setTableCompomentQueryCfg(res.data.fixed_query_cfg)
                // this.commonTableStore.setQueryCfg(res.data.fixed_query_cfg)

            } else {
                console.log('没有初始的query_cfg')
            }


            // this.commonTableStore.setQueryCfg(tmp_query_cfg)
            if (this.props.as_virtual != 'y') {
                // await this.listData()
            }
            return;
        }

        this.commonTableStore.setTableColumnsJson([])
        this.commonTableStore.setFormCfg({})
        message.error('获取表格配置失败');
    }

    listData = async () => {



        let params = {
            data: {
                actcode: this.commonTableStore.action_code,
                role: sessionStorage.getItem("role_code"),
                user: sessionStorage.getItem("user"),
                // query_cfg: query_cfg ? query_cfg : this.commonTableStore.query_cfg,
                query_cfg: this.state.query_cfg,

                pageSize: this.commonTableStore.pageSize,
                currentPage: this.commonTableStore.currentPage
            },
            method: 'POST'
        }


        params.geturl = toJS(this.commonTableStore.curd).geturl

        if (params.geturl === undefined) {
            return
        }

        let json = await api.curd.listData(params);
        if (json.code == 200) {
            this.commonTableStore.setDataSource(json.data);
            this.commonTableStore.setTotal(json.total)
        }

    }


    renderTableSearch() {
        return <Search style={ { width: "250px", marginTop: '5px' } } placeholder="请输入关键字" onSearch={ value => console.log(value) } enterButton />
    }



    getComponentByFile = (path) => {

        let startpath = path.substring(0, 3)
        let searchIndex = path.lastIndexOf('../')
        let endpath = path.substring(searchIndex + 3, path.length)
        let _compoment = null
        if (startpath == '../') {
            if (searchIndex == 0) {
                _compoment = require('../' + endpath).default
            } else if (searchIndex == 3) {
                _compoment = require('../../' + endpath).default
            } else if (searchIndex == 6) {
                _compoment = require('../../../' + endpath).default
            }
        } else {
            _compoment = require('' + path).default;
        }
        return _compoment
    }






    renderButtons() {
        if (!this.commonTableStore.TableButtonsJson) {
            return null
        }

        return this.commonTableStore.TableButtonsJson.map((item, index) => {
            return <Button
                key={ index }
                type={ item.ui_type }
                htmlType="button"
                onClick={ event => this.getButtonHandler(event, item) }
                size="small"
                style={ { margin: 8 } }
            >{ item.title }</Button>
        })
    }


    getButtonHandler(event, item) {

        var entry_function = item.entry_function
        let _compoment = this.getComponentByFile(item.file_path)

        if (item.using_component == "y") {
            this.setState(
                {
                    buttonUsedComponent: _compoment
                }, () => this.refs[item.component_name][entry_function.substring(0, entry_function.length - 2)]())

        } else {
            let funcstr = entry_function.substring(0, entry_function.length - 2)
            _compoment[funcstr]()
        }


    }

    // commonTable 作为编辑器时候, x-props会传入 as_virtual属性,onChange 属性.
    RenderTablePluginCom() {

        let PluginCom = this.state.buttonUsedComponent;

        if (this.state.buttonUsedComponent) {
            return <PluginCom
                ref={ PluginCom.name }
                parentTable={ this }
                as_virtual={ this.props.as_virtual }
                editable={ true }
                onChange={ this.props.onChange }
                commonTableStore={ this.commonTableStore }
                dataGridcode={ this.props.dataGridcode }
                refreshTable={ this.refreshTable }
                setQueryCfg={ this.setTableCompomentQueryCfg }
                inquireModal={ this.inquireModal }
            />
        }
    }





    columnsRender(text, column, record) {
        return column.alt_render == 'y' ? columnsRender[column.render_fun](text, record) : text;
    }

    handleResize = index => (e, { size }) => {
        const nextColumns = [...this.state.columns];
        console.log(size)
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        this.setState({
            columns: nextColumns
        })
    };

    getTableColumns() {
        let hideColumns = ['uuid', 'processDefinitionKey', 'nodeKey']
        let columns = [];
        this.commonTableStore.tableColumnsJson.map((item, index) => {
            let column = {
                title: item.title,
                dataIndex: item.key,
                key: item.key,
                width: index == 0 ? 100 : null,
                sorter: (a, b) => a[item.key] - b[item.key],
                //  ...getColumnSearchProps(item.key, this.commonTableStore),
                // render: (text, record) => this.columnsRender(text, item, record)
                // render: (text) => !text ? null : text
            }
            if (hideColumns.includes(item.key) == false) {
                columns.push(column)
            }
        })
        this.setState({ columns: columns });
    }


    getResizeColumns() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => {
                return {
                    width: column.width ? column.width : 200,
                    onResize: this.handleResize(index),
                }
            }
        }));
        return columns

    }

    async setCurrentPage(currentPage) {
        if (this.commonTableStore.currentPage == currentPage) {
            return;
        }
        this.commonTableStore.setCurrentPage(currentPage);
        await this.listData();
    }

    getTableComponents() {
        return {
            header: {
                cell: ResizeableTitle,
            },
        };
    }
    onRowClick(event, record) {
        console.log(event)
        if (this.props.sendData) {
            let arr = []
            arr.push(record)
            this.props.sendData(arr)
        }
        if (this.commonTableStore.selectType == 'y') {
            this.commonTableStore.rowcheckChange([record.id], [record])
        } else {
            this.commonTableStore.rowSelectChange([record.id], [record])
        }
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows)
    }

    rowSelectChange(selectedRowKeys, selectedRows) {
        this.commonTableStore.rowSelectChange(selectedRowKeys, selectedRows)
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows)
        if (this.props.sendData) {
            this.props.sendData(selectedRows)
        }
    }

    getTableProps() {
        return {
            onRow: record => {
                return {
                    onClick: event => this.onRowClick(event, record)     // 点击行选中
                }
            },
            loading: this.commonTableStore.loading,
            rowKey: record => record.id,
            bordered: true,
            dataSource: this.commonTableStore.dataSource,
            rowSelection: {
                type: this.commonTableStore.selectType == 'y' ? 'checkbox' : 'radio',
                selectedRowKeys: this.commonTableStore.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => this.rowSelectChange(selectedRowKeys, selectedRows)
            },
            scroll: {
                x: parseInt(this.commonTableStore.table_width)
            },
            pagination: {
                total: this.commonTableStore.total,
                showLessItems: true,
                defaultCurrent: this.commonTableStore.currentPage,
                current: this.commonTableStore.currentPage,
                pageSize: this.commonTableStore.pageSize,
                showQuickJumper: true,
                showTotal: (count) => {
                    let pageNum = Math.ceil(count / this.commonTableStore.pageSize);
                    return '共 ' + pageNum + '页' + '/' + count + ' 条数据';
                },
                onShowSizeChange: (current, pageSize) => {
                    console.log(current, pageSize);

                },
                onChange: currentPage => this.setCurrentPage(currentPage)
            },
            columns: this.getResizeColumns(),
        }
    }



    getSearchCom = () => {
        let contract_action_code_arr = [
            'waiting_for_signature',
            'already_seal',
            'obsolete_invalid',
            'contract_enquiry',
            'effective_boss_contract_new_receive',
            'effective_boss_contract_new_pay'
        ];
        if (contract_action_code_arr.includes(this.props.action_code)) {
            return <SearchContract
                query_cfg={ this.state.query_cfg }
                listData={ this.listData }
                setQueryCfg={ this.setTableCompomentQueryCfg }
            />
        }
    }





    render() {
        let styles = {
            padding: "10px"
        }

        let tableProps = this.getTableProps();

        return (<div className="table_wrapper" style={ styles }>

            { this.RenderTablePluginCom() }
            <div className="table_button">
                { this.getSearchCom() }
                { this.renderButtons() }
            </div>


            <Table key={ this.props.action_code } className="commonTable" components={ this.getTableComponents() } { ...tableProps } />

        </div>
        )
    }

}
