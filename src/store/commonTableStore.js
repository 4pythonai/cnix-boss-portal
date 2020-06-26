import { observable, action, toJS } from "mobx";


class commonTableStore {
    /* 
     * 公用table配置,菜单button权限   // @后续添加搜索配置
    */

    @observable action_code = null;

    @observable selectedRowKeys = [];

    @observable selectedRows = [];

    @observable dataSource = [];

    @observable tableOptionType = null;

    @observable searchText = ''

    @observable searchdataIndex = ''

    @observable total = 0

    @observable currentPage = 1

<<<<<<< HEAD
    @observable pageSize = 20
=======
    @observable pageSize = 10
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

    @observable loading = false

    @observable formCfg = null

<<<<<<< HEAD
    @observable referinfo = null

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @observable layoutcfg = null

    @observable staticformcfg = null

    @observable selectType = null

    @observable curd = {}

<<<<<<< HEAD
    @observable isExistence = true

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @observable TableButtonsJson = []

    @observable tableColumnsJson = []

    // @observable query_cfg = null //查询参数.

    @observable base_table = null

    @observable triggers = []

    @observable schmeForm = []

    @observable table_action = null

    @observable fixed_query_cfg = null

<<<<<<< HEAD
    @observable dropdownRef = []

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


    @observable table_width = 2000

<<<<<<< HEAD
    @action setIsExistence = isExistence => this.isExistence = isExistence;

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @action registerSchmeForm(obj) {
        this.schmeForm.push(obj)
    }

<<<<<<< HEAD
    @action registerDropDown(key,obj){
        this.dropdownRef[key] = obj
    }

    @action clearDropdownRef() {
        this.dropdownRef = [];
    }

    @action setPageSize = pageSize => this.pageSize = pageSize

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778



    @action registerTrigger(obj) {
        this.triggers.push(obj)
    }

    @action clearTrigger() {
        this.triggers = [];
    }

    @action resetTableStore = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.dataSource = [];
        this.tableOptionType = null;
        this.searchText = ''
        this.total = 0
        this.currentPage = 1
        this.pageSize = 10
        this.loading = false
        this.formCfg = null
        this.layoutcfg = null
        this.staticformcfg = null
        this.selectType = null
        this.curd = {}
        this.tableColumnsJson = []
        this.query_cfg = null
        this.base_table = null;
    }

    @action clearSelectRowData = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
    }
    @action clearPaginationStore = () => {
        this.total = 0;
        this.loading = false;
        this.currentPage = 1;
    }


    @action setActionCode = actcode => this.action_code = actcode


    // TO-DO  如果已经有 fixed_query_cfg , 则应该合并 .
    // @action setQueryCfg = newcfg => {
    //     console.log("query_cfg 变化 ")
    //     console.log(newcfg)
    //     this.query_cfg = newcfg
    // }


    // @action setFixedQueryCfg = newcfg => {
    //     console.log("setFixedQueryCfg 变化 ")
    //     console.log(newcfg)
    //     this.fixed_query_cfg = newcfg
    // }


    // 设置操作table的类型
    @action setTableOptionType = tableOptionType => this.tableOptionType = tableOptionType;

    @action rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
    }
    @action rowcheckChange = (selectedRowKeys, selectedRows) => {
<<<<<<< HEAD
=======

        console.log(selectedRowKeys)
        console.log(selectedRows)


>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (!this.selectedRowKeys.includes(selectedRowKeys[0])) {
            this.selectedRowKeys = this.selectedRowKeys.concat(selectedRowKeys);
            this.selectedRows = this.selectedRows.concat(selectedRows);
        }
<<<<<<< HEAD

    }
=======
    }



>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @action
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchdataIndex = dataIndex
        console.log(selectedKeys, dataIndex)
    }


    @action
    handleReset = (clearFilters) => {
        clearFilters();
        this.searchText = '';
    }

    @action setTableAction = table_action => this.table_action = table_action


    @action setCurrentPage = currentPage => this.currentPage = currentPage


    @action setTableLoading = loading => this.loading = loading;


    @action setDataSource = dataSource => this.dataSource = dataSource

    @action setTotal = total => this.total = total

    @action setTableColumnsJson = tableColumnsJson => this.tableColumnsJson = tableColumnsJson

    @action setFormCfg = formCfg => this.formCfg = formCfg;

<<<<<<< HEAD
    @action setReferinfo = referinfo => this.referinfo = referinfo;




=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @action setlayoutCfg = layoutcfg => this.layoutcfg = layoutcfg;

    @action setstaticformcfg = staticformcfg => this.staticformcfg = staticformcfg;

    @action setselectType = selectType => this.selectType = selectType;

    @action setTableButtonsJson = json => this.TableButtonsJson = json

    @action setBaseTable = base_table => this.base_table = base_table

    @action setCurd = curd => this.curd = curd

    @action setTableWidth = table_width => this.table_width = table_width


}

export default commonTableStore
