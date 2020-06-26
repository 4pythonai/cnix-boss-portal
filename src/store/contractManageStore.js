import { observable, action, toJS } from "mobx";
import { hashHistory } from 'react-router'
import commonTableStore from "./commonTableStore";
import Print from '../utils/print'
import moment from 'moment'
import userStore from './userStore'
import api from '../api/api'
import { message } from "antd";
import ExportJsonExcel from 'js-export-excel'
import IDC_cfg_store from "./IDC_cfg_store";
import { formatDate } from '../utils/tools.js'
const dateFormat = 'YYYY-MM-DD HH:MM:SS';

class contractManageStore {
    // ***************合同列表**************

    @observable contractList = []
    @observable customTypeList = []
    @observable contract_no = ''
    @observable rights = {
        editSealNote: true,
        editReturnNote: true,
        editArchiveNote: true,
        lookSealNote: true,
        lookReturnNote: true,
        lookArchiveNote: true,

        seal: true, // 已用印撤销
        effectiveRevoke: true, // 已生效撤销
        willSignRevoke: true, // 待签撤销
        obsoleteRevoke: true,//作废撤销

        search: true, // 搜索
        seniorSearch: true, // 高级搜索
        print: true, // 打印
        exportExcel: true // 导出
    }
    @observable contractStatus = ''

    // ***************editNoteModle***************
    @observable noteVisible = false
    // 确认按钮的loading
    @observable confirmLoading = false
    @observable modalTitle = ""
    @observable noteTitle = ''
    @observable noteSubmitData = {}

    // ***************sealModal***********
    @observable sealConfirmLoading = false;
    @observable sealVisible = false

    // 用印提交数据
    @observable realSubmitData = {}


    /* 盖章数据*/
    @observable contractDepData = {
        seal_date: formatDate(new Date())
    }

    @observable sealSubmitData = {
        return_date: formatDate(new Date())
    }


    // ************高级搜索****************
    @observable seniorSearchVisible = false;
    @observable searchConfirmLoading = false
    @observable businessTypeList = []
    @observable isSeniorSearch = false
    @observable seniorSearchData = {
        staff_name: "",
        department: "",
        contract_no: "",
        customName: "",
        property: "",
        proWorkType: "",
        archives_no: "",
        contract_type: "",
        min_contract_money: "",
        max_contract_money: "",
        stamp_min_date: "",
        stamp_max_date: "",
        min_contract_start_date: "",
        max_contract_start_date: "",
        min_contract_end_date: "",
        max_contract_end_date: "",
        min_return_date: "",
        max_return_date: ""
    }
    @observable staffNameKeywords = ''

    /*************************** 普通搜索 ******************************/
    @observable searchData = {
        contract_no: '',
        archives_no: '',
        customer_name: '',
        customer_type: '',
        archive_note: '',
        seal_note: '',
        return_note: ''
    }

    /*************************** 客户类型 ******************************/
    @observable customerTypeVisible = false
    @observable customerTypeLoading = false
    @observable customerTypeModalTitle = ''
    @observable customerTypeEditData = {}
    @observable editCustomerTypeId = ''
    @observable searchCustomerTypeData = {}
    @observable allCustomerTypeList = []

    @action setContractState = status => this.contractStatus = status
    @action setSearchCustomerTypeData = (value, key) => this.searchCustomerTypeData[key] = value

    @action deleteCustomerType = async record => {
        let params = {
            data: {
                id: record.key
            },
            method: "POST"
        };
        let res = await api.deleteCustomerType(params)
        if (res.code != 200) {
            message.error(res.message);
            return;
        }
        message.success(res.message);
    }

    // 保存客户类型
    @action customerTypeSubmit = async () => {
        this.customerTypeLoading = true;
        let params = {
            data: {
                category: this.customerTypeEditData.customType,
                fill_person: this.customerTypeEditData.fillInUser,
                fill_date: this.customerTypeEditData.fillInDate,
            },
            method: 'POST'
        };
        var res = {};
        if (this.customerTypeModalTitle == '新增客户类型') {
            res = await api.contractManage.addCustomerType(params);
        }
        if (this.customerTypeModalTitle == '修改客户类型') {
            params.data.id = this.editCustomerTypeId;
            res = await api.contractManage.updateCustomerType(params);
        }

        if (res.code != 200) {
            message.error(res.msg);
            this.customerTypeLoading = false;
            return;
        }
        message.success(res.msg);
        this.customerTypeLoading = false;
        this.customerTypeVisible = false
        this.getCustomTypeList()
    }

    @action initCustomerTypeData = () => {
        this.customerTypeEditData = {
            fillInDate: formatDate(new Date()),
            fillInUser: userStore.userInfo.staff_name
        };
    }
    @action hideCustomerTypeModal = () => this.customerTypeVisible = false;
    // 编辑客户类型按钮
    @action editCustomerTypeHandle = (record) => {
        this.customerTypeEditData = {
            customType: record.customType,
            fillInUser: record.fillInUser,
            fillInDate: moment(new Date(record.fillInDate), "'YYYY/MM/DD HH:MM:SS'")
        };
        this.editCustomerTypeId = record.key;
        this.customerTypeModalTitle = '修改客户类型';
        this.customerTypeVisible = true;
    }

    // 新增客户类型按钮
    @action
    addCustomreType = () => {
        this.initCustomerTypeData();
        this.customerTypeModalTitle = '新增客户类型';
        this.customerTypeVisible = true;
    }


    @action
    fillInDateHandle = value => this.customerTypeEditData.fillInDate = value;
    @action
    fillInUserHandle = event => this.customerTypeEditData.fillInUser = event.target.value;
    @action
    customTypeHandle = event => this.customerTypeEditData.customType = event.target.value;

    // 跳转到合同详情页
    @action
    toContractDetail = (event, record, pageSource) => {
        event.preventDefault();
        event.stopPropagation();

        this.contract_no = record.contract_no;

        this.contractDepData.archives_no = this.contractDepData.archives_no
            ?
            this.contractDepData.archives_no
            :
            this.getArchivesNo(record.contract_no);

        console.log(this.contractDepData.archives_no);
        if (pageSource === 'detail') {
            hashHistory.push("contractManage/contractManageDetail");
            return;
        }

        hashHistory.push("contractManage/contractDetail");
    }

    // 设置归档编号
    @action getArchivesNo = contractNo => {

        contractNo = toJS(contractNo);
        IDC_cfg_store.detailContractno = contractNo;
        let position = contractNo.indexOf('-');
        return contractNo.slice(0, position + 1)
    }


    // 删除客户类型
    @action
    deleteContractRow = async (event, record) => {
        this.editCustomerTypeId = record.key;
        let params = {
            data: { id: this.editCustomerTypeId },
            method: 'POST'
        };
        let res = await api.contractManage.deleteCustomerType(params)
        if (res.code == 200) {
            message.success('删除成功');
            this.getCustomTypeList();
        }
    }

    @action getAllCustomerType = async () => {
        let res = await api.contractManage.getAllCustomerType();
        this.allCustomerTypeList = res.code == 200 ? res.data : [];
    }

    // 获取客户类型
    @action
    getCustomTypeList = async (notPagination) => {
        let params = {
            data: {
                pagenum: commonTableStore.currentPage,
                pagesize: commonTableStore.pageSize,
                ...this.searchCustomerTypeData
            },
            method: 'POST'
        };
        let res = await api.contractManage.getCustomTypeList(params)
        this.customTypeList = res.code == 200 ? res.data : [];
        if (notPagination) {
            return;
        }
        commonTableStore.total = parseInt(res.count);
        commonTableStore.loading = false;
    }

    setCurrentPage = (current, source) => {
        commonTableStore.currentPage = current;
        if (source == 'customerType') {
            this.getCustomTypeList();
            return;
        }
        if (source == 'contractList') {
            this.getContractList();
            return;
        }

    }

    @action
    editSealNote = (event, record) => {
        this.modalTitle = "修改盖章备注"
        this.noteTitle = "seal_note"
        this.noteVisible = true
        this.contract_no = record.contract_no
        this.noteSubmitData.note = record.seal_note
    }

    @action
    editReturnNote = (text, record) => {
        this.modalTitle = "修改返还备注"
        this.noteTitle = "return_note"
        this.noteVisible = true
        this.contract_no = record.contract_no
        this.noteSubmitData.note = record.return_note
    }

    @action
    editArchiveNote = (text, record) => {
        this.modalTitle = "修改归档备注"
        this.noteTitle = "archive_note"
        this.noteVisible = true
        this.contract_no = record.contract_no
        this.noteSubmitData.note = record.archive_note
    }


    // 高级搜索
    @action seniorSearchHandle = event => {
        this.isSeniorSearch = true;
        // @添加验证

        this.getContractList();
    }

    // 普通搜索
    @action searchContractList = () => {
        this.isSeniorSearch = false;
        this.getContractList();
    }

    // 获取合同列表
    @action
    getContractList = async () => {

        let tempparams = {
            pagenum: commonTableStore.currentPage,
            pagesize: commonTableStore.pageSize,
            isSeniorSearch: this.isSeniorSearch,
            contract_management_state: this.contractStatus
        };

        let data = this.isSeniorSearch ? { ...this.seniorSearchData, ...tempparams } : { ...this.searchData, ...tempparams };
        let params = {
            data: data,
            method: 'POST'
        };
        let res = await api.contractManage.getContractList(params);
        var tempData = [];
        if (res.code == 200) {
            res.data.map(item => {
                let tempObj = {
                    key: item.key,
                    seal_note: item.seal_note ? item.seal_note : '',
                    archive_note: item.archive_note ? item.archive_note : '',
                    return_note: item.return_note ? item.return_note : '',
                    contract_no: item.contract_no,
                    return_date: item.return_date ? item.return_date : '',
                    seal_date: item.seal_date ? item.seal_date : '',
                    failure_date: item.failure_date ? item.failure_date : '',
                    contract_name: item.contract_name,
                    customName: item.customName,
                    customer_type: item.customer_type,
                    contract_type: item.contract_type,
                    proWorkType: item.proWorkType,
                    contract_money: item.contract_money,
                    contract_begin_date: item.contract_begin_date ? item.contract_begin_date : '',
                    contract_end_date: item.contract_end_date ? item.contract_end_date : '',
                    staff_name: item.staff_name,
                    department: item.department,
                    customId: item.customer_id
                };
                tempData.push(tempObj)
            });
            commonTableStore.loading = false;
            this.contractList = tempData;
            commonTableStore.total = parseInt(res.count);
        }
        commonTableStore.loading = false;
        this.seniorSearchVisible = false;
    }

    @action
    handleCancel = () => this.noteVisible = false;

    @action noteHandle = e => this.noteSubmitData.note = e.target.value

    @action
    submitEditNote = async () => {
        this.confirmLoading = true;
        let params = {
            data: { noteTitle: this.noteTitle, contract_no: this.contract_no, ...this.noteSubmitData },
            method: 'POST'
        };
        let res = await api.contractManage.updateNote(params);
        if (res.code == 200) {
            message.success("修改成功");
            this.getContractList();
            this.noteVisible = false;
        }
    }


    // 撤销保存
    @action
    revokeHandle = async (event, record, status) => {
        let params = {
            data: {
                contract_state: status,
                contract_no: record.contract_no
            },
            method: 'POST'
        };
        let res = await api.contractManage.updateContractStatus(params)
        if (res.code == 200)
            message.success("撤销成功");
        this.getContractList();
    }

    // 用印操作保存
    @action
    submitSeal = async () => {
        let params = {
            data: { ...this.sealSubmitData, contract_no: this.contract_no },
            method: 'POST'
        };
        let res = await api.contractManage.saveStampData(params);
        if (res.code == 200) {
            message.success("保存成功");
            this.sealVisible = false;
            this.getContractList()
        }
    }

    // 用印按钮
    @action
    showSealModal = async (event, record) => {
        this.contract_no = record.contract_no;
        IDC_cfg_store.detailContractno = record.contract_no;
        await IDC_cfg_store.getContractByUUID();
        this.sealSubmitData.stamp_duty_tax = (record.contract_money / 1 * 0.0003).toFixed(2)
        this.sealVisible = true
    }

    @action
    handleSeal = () => this.sealVisible = false

    @action
    returnDataHandle = (moment, dateString) => this.sealSubmitData.return_date = dateString

    @action
    returnNoteHandle = event => this.sealSubmitData.return_note = event.target.value

    @action
    sealStateChange = event => this.sealSubmitData.state = event.target.value

    // 导出excel
    @action
    excelHandle = event => {
        if (this.contractList.length == 0) {
            message.error('暂时没有数据可打印');
            return;
        }

        let sheetData = this.getSheetData();
        var option = {};
        option.fileName = '合同'
        let sheetFilter = Object.keys(sheetData[0]);
        console.log(sheetData);
        option.datas = [
            {
                sheetData: sheetData,
                sheetName: 'sheet',
                sheetFilter: sheetFilter,
                sheetHeader: ['盖章备注', '归档备注', '返还备注', '合同号', '返还日期', '盖章日期', '做废日期', '合同名称', '客户名称', '客户类型', '合同性质', '业务类型', '合同金额', '合同起始日期', '合同终止日期', '负责人', '负责人部门']
            }
        ];
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();

    }

    @action getSheetData = () => {
        let arr = [];
        let resolveKey = ['return_date', 'failure_date', 'contract_begin_date', 'contract_end_date'];

        this.contractList.map(item => {
            let obj = {}
            for (let key in item) {
                console.log(key);
                if (key == 'key' || key == 'customId') {

                } else if (resolveKey.includes(key)) {
                    obj[key] = item[key] ? item[key].split(' ')[0] : ''
                } else {
                    obj[key] = item[key];
                }
            }
            arr.push(obj)
        })
        return arr;
    }

    // 打印
    printHandle = () => {
        Print('.contractTable', { 'no-print': '.no-print' });
    }

    @action getBusinessTypeList = async () => {
        let res = await api.contractManage.getBusinessTypeList();
        this.businessTypeList = res.code == 200 ? res.data : []
    }

    @action hiddenSeniorSearchModal = () => this.seniorSearchVisible = false
    @action showSeniorSearchModal = () => this.seniorSearchVisible = true

    // 设置搜索人员关键字
    @action
    staffNamekeyWordsHandle = value => {
        value = value.replace(/'/, "").replace(/(^\s*)|(\s*$)/g, "");
        this.staffNameKeywords = value
    }

    /***************** 高级搜索form状态 *******************/
    // 负责人
    @action
    selectStaffNameHandle = staff_name => {


        let user = userStore.userList.find(item => item.staff_name == staff_name);
        this.seniorSearchData.department = user.department;
        this.seniorSearchData.staff_name = user.staff_name
    }
    // 部门
    @action
    departmentHandle = event => this.seniorSearchData.department = event.target.value
    // 合同号
    @action
    contractNoHandle = event => this.seniorSearchData.contract_no = event.target.value
    // 业务类型
    @action
    businessTypeHandle = proWorkType => this.seniorSearchData.proWorkType = proWorkType

    // 合同类型
    @action
    contractTypeHandle = e => this.seniorSearchData.contract_type = e.target.value

    // 档案号
    @action
    archiveNoHandle = e => this.seniorSearchData.archives_no = e.target.value

    // 合同额
    @action
    minContractMoneyHandle = event => this.seniorSearchData.min_contract_money = event.target.value;
    // 合同额
    @action
    maxContractMoneyHandle = event => this.seniorSearchData.max_contract_money = event.target.value;
    // 盖章日期
    @action
    stampDateHandle = (info, mode) => {
        this.seniorSearchData.stamp_min_date = mode[0];
        this.seniorSearchData.stamp_max_date = mode[1];
    }
    // 合同起始日期
    @action
    contractStartDateHandle = (info, mode) => {
        this.seniorSearchData.min_contract_start_date = mode[0];
        this.seniorSearchData.max_contract_start_date = mode[1];
    }
    // 合同终止日期
    @action
    contractEndDateHandle = (info, mode) => {
        this.seniorSearchData.min_contract_end_date = mode[0];
        this.seniorSearchData.max_contract_end_date = mode[1];
    }
    // 返还日期
    @action
    returnDateHandle = (info, mode) => {
        this.seniorSearchData.min_return_date = mode[0];
        this.seniorSearchData.max_return_date = mode[1];
    }

    /********************************* 普通搜索formStore */
    @action searchContractNoHandle = event => this.searchData.contract_no = event.target.value
    @action searcharchivesNoHandle = event => this.searchData.archives_no = event.target.value
    @action searchCustomerNameHandle = event => this.searchData.customer_name = event.target.value
    @action searchCustomerTypeHandle = value => this.searchData.customer_type = value
    @action searchNoteTypeHandle = value => this.note_type = value
    @action searchNoteHandle = event => this.note = event.target.value

    /*   盖章的formStoreHandle  start */
    // 盖章日期
    @action sealDateHandle = (moment, date) => {
        this.contractDepData.seal_date = date;
    }

    // 盖章备注
    @action sealNoteHandle = event => this.contractDepData.seal_note = event.target.value

    // 档案号
    @action archiveNocb = event => this.contractDepData.archives_no = event.target.value
    // 客户类型
    @action customerTypeHandle = value => this.contractDepData.customer_type = value;

    /*   盖章的formStoreHandle  end */

    // 保存并盖章
    @action
    submitSealHandle = async () => {
        if (!this.validateSeal()) {
            return false;
        }
        let params = {
            data: { ...this.contractDepData, contract_no: this.contract_no },
            method: 'POST'
        }
        let res = await api.contractManage.sealOperation(params)
        if (res.code == 200) {
            message.success('盖章成功');
            hashHistory.push('contractManage/contractWillSign');
        }
    }

    @action validateSeal = () => {
        let validateArr = [
            {
                key: 'archives_no',
                text: '档案号',
                errorText: '档案号不能为空！'
            },
            {
                key: 'customer_type',
                text: '客户类型',
                errorText: '客户类型不能为空！'
            },
            {
                key: 'seal_date',
                text: '盖章时间',
                errorText: '盖章时间不能为空！'
            },
            {
                key: 'seal_note',
                text: '盖章备注',
                errorText: '盖章备注不能为空！'
            },
        ]

        validateArr.map(item => {
            for (let key in this.contractDepData) {
                if (!this.contractDepData[key] && item.key == key) {
                    message.error(item.errorText)
                    return false;
                }
            }
        })
        return true;

    }

    @action
    gotoContractWillSign = () => hashHistory.goBack()

}

export default new contractManageStore()
