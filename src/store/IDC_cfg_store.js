import { observable, action, toJS, autorun, computed } from "mobx";
import api from '../api/api'
import { root_url, port } from '@/api/api_config/base_config'
import { formatDate, randomString } from '../utils/tools.js'
import contractManageStore from './contractManageStore'
import chargeStore from './chargeStore'
import { message } from 'antd'
import { hashHistory } from 'react-router'

class IDC_cfg_store {
    constructor() {
        this.detailContractNo = this.detailContractNo ? this.detailContractNo : localStorage.getItem('contract_no')
    }

    @observable contract_action = ''

    @observable detailContractNo = ''

    // 页面来源
    @observable page_source = ''

    @computed get disabled() {
        return this.page_source == 'detail' ? true : false;
    }

    // 项目列表
    // @observable project_list = []

    // 客户信息
    @observable cust = {}
    // 地址信息
    @observable addresses = []
    // 签约方列表
    @observable signer_list = []
    // 收费项列表
    @observable fee_item_list = []
    // 收费周期列表
    @observable periord_list = []

    // 收费方式列表
    @observable charge_item_list = []



    @observable searchProjectKeywords = ''


    // 附件上传列表
    @observable fileList = []

    // 合同期限
    @observable contract_start_date = null
    @observable contract_end_date = null
    @observable contract_billing_day = null

    // 是否选中固定合同
    @observable isFixedContract = false

    // 合同编号
    @observable contract_no = null

    // 合同modle列表显示与否
    @observable showContractListModle = false

    //收费周期
    @observable chargeCycles = ''

    @observable PowerConversion = ''

    @observable shorthand = ''

    @observable other = ''

    //结算方式
    @observable clearing = {}

    //其他数据
    @observable otherValue = ''
    @observable RequireOther = false

    @observable dataRights = 'self'   // self: 查看自己的， all: 查看所有的

    @observable saveContractData = {
        oppId: null,
        give_explain: '',
        give_day: '',
        attachment_url: '',
        chargeData: [],
        sign_type: null,
        rent_type: null,
        singer_our_company_id: '',
        singers_customers: [],
        customerId: null,
        contract_billing_start: '',
        contract_billing_end: '',
        enddate_ondemand: '',
        contract_billing_day: '',
        project_no: '',
        oppId: '',
        singerReferInfo: {},
        back_to_back_contract_no: ''
    }




    @observable uuid = ''

    @observable process_key = ''

    @observable signerCustomer = ''

    @observable visibleBTBContractModal = false

    @action showBTBContractModal = () => this.visibleBTBContractModal = true;
    @action hideBTBContractModal = () => this.visibleBTBContractModal = false;

    @action setProcessKey = process_key => this.process_key = process_key

    @action setUuid = uuid => this.uuid = uuid


    @action setContactAction = contract_action => this.contract_action = contract_action

    @action setSingersCustomers = singers_customers => this.saveContractData.singers_customers = singers_customers

    @action setSingerReferInfo = singerReferInfo => this.saveContractData.singerReferInfo = singerReferInfo

    @action setBackToBackContract = back_to_back_contract_no => this.saveContractData.back_to_back_contract_no = back_to_back_contract_no

    @action getAddressList = async (customerId, addressId) => {
        if (!customerId) {
            return []
        }

        let params = { data: { customer_id: customerId, addressId }, method: 'POST' };
        let res = await api.contract_api.getAddressList(params);
        if (res.code == 200) {
            return res.data;
        }
        return {
            addressList: [],
            addressName: ''
        }
    }

    @action getCustomerReferInfo = async (customerId) => {
        if (!customerId) {
            return {}
        }

        let params = { data: { customerId: customerId }, method: 'POST' };

        let res = await api.customer.getCustomerDetailByUserPhone(params);
        console.log('查看默认返回值', res)
        if (res.code == 200) {
            return {
                customerReferInfo: res.data.customerReferInfo,
                customerName: res.data.customName
            }
        }
        return {
            customerList: [],
            customerName: ''
        }
    }
    @action setDefaultSignCustomer = async (customerId, addressId) => {
        let customerMsg = await this.getCustomerReferInfo(customerId);
        let addressMsg = await this.getAddressList(customerId, addressId)
        // 默认为一个已签约方
        let singers_customers = [
            {
                customerId: customerId ? customerId : '',
                addressId: addressId ? addressId : '',
                customerReferInfo: customerMsg.customerReferInfo,
                addressList: addressMsg.addressList,
                addressName: addressMsg.addressName,
                isRenderButton: false,
                customerName: customerMsg.customerName
            }
        ]
        this.setSingersCustomers(singers_customers)
    }


    @action setEditDefaultSignCustomer = singers_customers => {
        let new_singers_customers = []
        for (let i = 0; i < singers_customers.length; i++) {
            let item = singers_customers[i];
            new_singers_customers.push({
                customerId: item.customerId,
                addressId: item.addressId,
                customerName: item.customerName,
                addressName: item.addressName,
                customerReferInfo: item.customerReferInfo,
                addressList: item.addressList,
                isRenderButton: i == 0 ? false : true,
                readOnly: (this.contract_action == 'IDCReceiveContract' && this.page_source == 'add') ? true : false
            })
        }

        this.setSingersCustomers(new_singers_customers)
    }

    @action setOurCompanyName = async customerId => {
        let params = { method: 'POST' };
        let res = await api.contract_api.getSignerList(params);
        if (res.code == 200) {
            let signer = res.data.find(item => item.id == customerId)
            this.signerCustomer = signer.customName
        }
    }



    @action setOurCompany = customerId => this.saveContractData.singer_our_company_id = customerId

    @action setShorthand = shorthand => {
        this.shorthand = shorthand
        this.generateContractNo()
    }

    @action
    clearContractState = () => {
        this.saveContractData = {
            give_explain: '',
            give_day: '',
            attachment_url: '',
            chargeData: [],
            sign_type: null,
            rent_type: null,
            singer_our_company_id: '',
            singers_customers: [],
            project_name: '',
            contract_billing_start: '',
            contract_billing_end: '',
            enddate_ondemand: '',
            contract_billing_day: '',
            project_no: '',
            charge_item: '',
            singersCustomers: [],
            oppId: '',
            singerReferInfo: {},
            back_to_back_contract_no: ''
        };
        this.fileList = [];
        this.contract_action = ''
    }

    @action setDataRights = dataRights => this.dataRights = dataRights

    @action setPageSource = page_source => this.page_source = page_source

    @action
    changeOther = (e) => {
        this.saveContractData.otherValue = e.target.value
    }

    //展示其他
    @action payment_method = value => {
        this.saveContractData.payment_method = value;
        if (value == '其他') {
            this.RequireOther = true
            this.other = 1
        } else {
            this.other = 0
            this.RequireOther = false
        }
    }

    @action
    async getIDC_contract_global_cfg() {
        let res = await api.contract_api.getContractBizConfig();
        this.periord_list = res.periord_list
        this.charge_item_list = res.charge_way
    }




    @action setNew = () => {
        this.newSignHandle()
        this.saveContractData.sign_type = '新签'
    }


    @action setDefaultActiveCollapse = activeCollapse => this.activeCollapse = activeCollapse

    @action setDetailContractNo = detailContractNo => this.detailContractNo = detailContractNo



    @action
    toggleIsFixedContract = value => {
        this.saveContractData.contract_type = value;
        this.isFixedContract = value == '固定合同' ? true : false
    }


    @action setOppid = oppid => this.saveContractData.oppId = oppid;

    // 合同签订日期
    @action
    changeContractStartDate = (info, value) => {
        this.saveContractData.contract_start_date = value;
        if (this.saveContractData.contract_end_date) {
            let contract_days = this.computedDate(this.saveContractData.contract_end_date, this.saveContractData.contract_start_date);
            this.setContractTerm(contract_days)
            chargeStore.reMakedata(chargeStore.chargeSubmitData)
        }
    }

    // 合同结束日期
    @action
    changeContractEndDate = (info, value) => {
        this.saveContractData.contract_end_date = value;
        if (this.saveContractData.contract_start_date) {
            let contract_days = this.computedDate(this.saveContractData.contract_end_date, this.saveContractData.contract_start_date);
            this.setContractTerm(contract_days)
            chargeStore.reMakedata(chargeStore.chargeSubmitData)
        }
    }


    // 合同期限
    @action
    setContractTerm = value => this.saveContractData.contract_days = value;



    computedDate = (endDate, startDate) => {
        let sumDate = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24;
        return Math.floor(sumDate + 1)
    }

    @action _showContractListModle = () => this.showContractListModle = true;

    @action _hideContractListModle = () => this.showContractListModle = false;



    // 合同名称
    @action setContractName = value => this.saveContractData.contract_name = value;
    // 签约类型
    @action changeSignType = (value, isfromChance) => {

        this.saveContractData['sign_type'] = value;
        if (value == '新签') {
            if (typeof isfromChance == 'object') {
                let singers_customers = this.saveContractData.singers_customers[0]
                let contract_action = this.contract_action
                singers_customers.customerReferInfo = {};
                singers_customers.customerId = ''
                singers_customers.addressId = ''
                singers_customers.customerName = ''
                singers_customers.addressName = ''

                this.clearContractState()
                this.contract_action = contract_action
                this.saveContractData.sign_type = value
                this.saveContractData.singers_customers = [singers_customers]
                chargeStore.clearStore()
            }

            this.newSignHandle()
            this.generateContractNo()
            return;
        }

        if (value == '续签') {
            this._showContractListModle()
        }
    }

    @action changeRentType = (e) => this.saveContractData.rent_type = e.target.value

    //要求完工日期   
    @action setOndemandEnddate = (mode, value) => this.saveContractData.enddate_ondemand = value


    // 合同份数
    @action setContractNumber = value => this.saveContractData.contractNumber = value;

    // 项目编号
    @action setProjectNo = (e) => {
        let index = e.target.selectIndex;
        let project_no = e.target.options[index].getAttribute('data-projectno');
        this.saveContractData.project_no = project_no;
    }

    // 固定合同额
    @action setContractMoney = value => this.saveContractData.contract_money = value

    // 附件
    @action setAttachmentUrl = url => {
        console.log(this.saveContractData.attachment_url, url)
        if (this.saveContractData.attachment_url) {
            this.saveContractData.attachment_url = this.saveContractData.attachment_url + ',' + url;

            return;
        }
        this.saveContractData.attachment_url = url;
    }

    // 删除附件
    @action deleteAttachmentUrl = url => {
        if (!this.saveContractData.attachment_url) {
            return;
        }

        let attachment_arr = this.saveContractData.attachment_url.split(',');
        let attachment_index = attachment_arr.findIndex(item => item == url);

        attachment_arr.splice(attachment_index, 1)
        this.saveContractData.attachment_url = attachment_arr.join(',');

        console.log('查看附件地址', this.saveContractData.attachment_url)
    }

    // 设置文件回显列表
    @action
    setFileList = fileList => this.fileList = fileList;


    @action
    updateFileList = url => {
        if (this.fileList.length > 0) {
            this.fileList = this.fileList.filter(item => item.response.data.indexOf(url) == -1);
            return;
        }
        this.fileList = []
    }

    // 付款方
    @action setPayCompany = event => this.saveContractData.pay_company = event.target.value;
    // 支付类型
    @action setPayType = value => this.saveContractData.pay_type = value;

    // 收费周期
    @action
    setBillingCycle = value => {
        this.saveContractData.billing_cycle = value
        chargeStore.setChargeBillingCycle();
    }
    // 首付款
    @action setFirstPayment = value => this.saveContractData.contract_first_payment = value;

    // 赠送时间
    @action setGiveDay = event => this.saveContractData.give_day = event.target.value;
    // 赠送说明
    @action setGiveExplain = event => this.saveContractData.give_explain = event.target.value;

    @action
    makeReNewContractno = async () => {
        await this.getContractDetail();
        this.saveContractData.sign_type = '续签';
        await this.generateContractNo();


        this._hideContractListModle();
    }

    @action generateContractNo = async () => {

        if (!this.saveContractData.sign_type) {
            return;
        }

        let params = {
            data: {
                sign_type: this.saveContractData.sign_type,
                shorthand: this.shorthand,
                contract_action: this.contract_action
            },
            method: 'POST'
        }

        params.data['contract_no'] = this.detailContractNo

        let res = await api.contract_api.generateContractNo(params);

        if (res.code == 200) {

            this.saveContractData['contract_no'] = res.data;

            localStorage.setItem('contract_no', this.saveContractData.contract_no);
        }

    }


    @action
    setIsToggleOn = value => this.isToggleOn = value;

    // 保存合同
    @action
    submitContractHandle = async () => {

        let data = this.saveContractData;
        if (!this.validate(data, this.contractValidata, false)) {
            return;
        }
        data['chargeData'] = chargeStore.chargeSubmitData;
        if (this.detailContractNo != '') {
            data['old_contract_no'] = this.detailContractNo;
        }
        data['contract_action'] = this.contract_action;

        let params = {
            data: data,
            method: 'POST'
        }
        if (this.page_source == 'edit') {
            let res = await api.contract_api.updateContract(params)
            res.code == 200 && hashHistory.goBack()
            return;
        }
        if (this.page_source == 'add') {
            let addRes = await api.contract_api.addContract(params);
            addRes.code == 200 && hashHistory.goBack()
            return;
        }
    }

    @action
    async getContractDetail() {

        let params = {
            data: {
                process_key: this.process_key,
                uuid: this.uuid,
                contract_no: this.detailContractNo,
                contract_action: this.contract_action
            },
            method: 'POST'
        };

        let res = await api.contract_api.getContractByContractNo(params);

        await this.setEditData(res.data)
    }


    @action
    setEditData = async contractData => {
        this.RequireOther = contractData.payment_method == '其他' ? true : false;
        let data = {
            contract_name: contractData.contract_name,
            contractNumber: contractData.contractNumber,
            sign_type: contractData.sign_type,
            contract_no: contractData.contract_no,
            project_no: contractData.project_no,
            contract_type: contractData.contract_type,
            contract_money: contractData.contract_money,
            signer: contractData.pay_supplier,
            payee_num: contractData.pay_supplier_certificate_no,
            pay_company: contractData.pay_company,
            billing_cycle: contractData.billing_cycle,
            pay_type: contractData.pay_type,
            contract_first_payment: contractData.contract_first_payment,
            contract_start_date: contractData.contract_start_date,
            contract_end_date: contractData.contract_end_date,
            contract_days: contractData.contract_days,
            give_day: contractData.give_day,
            give_explain: contractData.give_explain,
            contract_billing_start: contractData.pay_begin_date != '0000-00-00' ? contractData.pay_begin_date : null,
            contract_billing_end: contractData.pay_end_date != '0000-00-00' ? contractData.pay_end_date : null,
            enddate_ondemand: contractData.enddate_ondemand != '0000-00-00' ? contractData.enddate_ondemand : null,
            contract_billing_day: contractData.pay_interval,
            attachment_url: contractData.attachment_url,
            rent_type: contractData.rent_type,
            payment_method: contractData.payment_method,
            otherValue: contractData.otherValue,
            customerId: contractData.customerId,
            oppId: contractData.oppId,
            project_name: contractData.project_name,
            singer_our_company_id: contractData.singer_our_company_id,
            singerReferInfo: contractData.selectedSigner,
            back_to_back_contract_no: contractData.back_to_back_contract_no
        };

        let contractManageData = {
            archive_note: contractData.archive_note,
            customer_type: contractData.customer_type,
            seal_date: contractData.seal_date,
            seal_note: contractData.seal_note,
            return_date: contractData.return_date || formatDate(new Date()),
            return_note: contractData.return_note,
            stamp_duty_tax: contractData.stamp_duty_tax
        }
        contractManageStore.sealSubmitData = {
            ...contractManageStore.sealSubmitData,
            return_date: contractData.return_date ? contractData.return_date : formatDate(new Date()),
            state: contractData.contract_management_state,
            return_note: contractData.return_note
        }

        if (contractData.archives_no) {

            contractManageData.archives_no = contractData.archives_no
        }

        contractManageStore.contractDepData = { ...contractManageStore.contractDepData, ...contractManageData }

        this.setEditDefaultSignCustomer(contractData.sign_customers)
        await this.setOurCompanyName(contractData.singer_our_company_id)
        this.setDefultFileList(contractData.attachment_url);

        this.saveContractData.sign_type = contractData.sign_type;
        this.saveContractData = { ...this.saveContractData, ...data };
        localStorage.setItem('contract_no', this.saveContractData.contract_no);
        await chargeStore.getChargeList('y');
    }

    // 设置格式化附件的列表
    @action setDefultFileList = urlArr => {
        console.log('查看附件', urlArr);
        if (!urlArr) {
            this.fileList = [];
            return;
        }

        let attach_url_arr = urlArr.split(',');
        let fileList = []

        attach_url_arr.map((item, index) => {
            let point = item.lastIndexOf('/') + 1;
            let name = item.slice(point)
            if (name == '') {
                return;
            }
            fileList.push({
                uid: index + 1,
                name: name,
                status: 'done',
                response: {
                    code: 200,
                    data: item
                }, // custom error message to show
                url: root_url + ':' + port + item,
            })
        })


        this.fileList = fileList;
    }

    @action newSignHandle = async () => {
        this._hideContractListModle();
        this.generateContractNo()
    }




    contractValidata = {
        chargeData: [],

        singer_our_company_id: {
            require: true,
            requireText: '签约方不能为空'
        },
        payment_method: {
            require: true,
            requireText: '结算方式不能为空'
        },


        contract_name: {
            require: true,
            requireText: '合同名称不能为空'
        },
        contractNumber: {
            require: true,
            requireText: '合同份数不能为空',
            regx: /[0-9]/,
            regxText: '合同份数只能是数字'
        },
        sign_type: {
            require: true,
            requireText: '签约类型不能为空'
        },
        rent_type: {
            require: true,
            requireText: '整租散组不能为空'
        },
        enddate_ondemand: {
            require: true,
            requireText: '要求完工日期不能为空'
        },

        contract_no: {
            require: true,
            requireText: '合同编号不能为空，请选择签约类型'
        },
        contract_type: {
            require: true,
            requireText: '合同类型不能为空',
            notAllow: '请选择'
        },

        pay_type: {
            require: true,
            requireText: '支付类型不能为空',
            notAllow: '请选择'
        },
        billing_cycle: {
            require: true,
            requireText: '请选择收费周期',
            notAllow: '请选择'
        },
        contract_first_payment: {
            require: false,
            requireText: '首付款不能为空'
        },
        contract_days: {
            require: true,
            requireText: '合同期限不能为空'
        },
        contract_start_date: {
            require: true,
            requireText: '合同签订日期不能为空'
        },
        contract_end_date: {
            require: true,
            requireText: '合同结束日期不能为空'
        },

        give_day: {},
        give_explain: {},
        attachment_url: {},

    }

    validateSingerCustomer = data => {
        if (data.singers_customers.length == 0) {
            message.error('签约方不能为空');
            return false
        }

        for (let index = 0; index < data.singers_customers.length; index++) {
            let singer = data.singers_customers[index];
            if (singer) {
                if (!singer.customerId) {
                    message.error('签约方不能为空');
                    return false
                }
                if (!singer.addressId) {
                    message.error('客户地址不能为空');
                    return false
                }
            }
        }
        // 签约方重复判断
        if (this.validateSingerCustomerRepeat(data.singers_customers) === false) {
            return false
        }
    }

    validateSingerCustomerRepeat = signerCustomer => {
        console.log(signerCustomer)
        debugger
        for (let i = 0; i < signerCustomer.length; i++) {
            let field_pre = signerCustomer[i].customerId
            for (let j = i + 1; j < signerCustomer.length; j++) {
                let field_next = signerCustomer[j].customerId
                console.log(field_pre, field_next, field_pre == field_next)
                if (field_pre === field_next) {
                    message.warning('签约方字段不能重复')
                    return false;
                }
            }
        }
    }


    validate = (data, validata, ischargeData) => {

        let ignoreArr = ['chargeData', 'contract_days', 'attachment_url', 'give_explain', 'give_day', 'remarks']

        let keys = Object.keys(validata);
        let submitKeys = Object.keys(data)
        let isAllowSave = true;

        if (this.validateSingerCustomer(data) === false) {
            isAllowSave = false;
            return isAllowSave;
        }


        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (ischargeData == false && ignoreArr.includes(key)) {
                continue
            }

            if (!submitKeys.includes(key)) {
                message.error(validata[key].requireText);
                isAllowSave = false;
                break;
            }



            if (data.contract_type == '固定合同' && (data.contract_money === '' || data.contract_money === undefined)) {
                message.error('固定合同额不能为空');
                isAllowSave = false;
                break;
            }
            if (data.contract_type == '固定合同' && chargeStore.chargeSumPrice != 0 && Math.sqrt(this.saveContractData.contract_money - chargeStore.chargeSumPrice) > 10) {
                message.error('更改金额与收费项总额差值不能大于10');
                isAllowSave = false;
                break;
            }


            if (data.payment_method == '其他' && (data.otherValue === '' || data.otherValue == undefined)) {
                message.error('收费类型的其他不能为空');
                isAllowSave = false;
                break;
            }
            if (validata[key].notAllow == data[key]) {
                message.error(validata[key].requireText);
                isAllowSave = false;
                break;
            }

            if (validata[key].require) {
                let keysarr = ['contractNumber', 'contract_first_payment']
                let value = keysarr.includes(key) ? data[key] : data[key].replace(/(^\s*)|(\s*$)/g, "");
                if (value === '') {
                    message.error(validata[key].requireText)
                    isAllowSave = false;
                    break;
                }
            }
        }

        return isAllowSave
    }



    @action
    async testBill(params) {
        let res = await api.billing_api.testbill(params);

        console.log(res);
        OneContractBillingStore.cycle_store = []
        OneContractBillingStore.cycle_store = res.billing_store.cycle_store
        OneContractBillingStore.onetime_store = res.billing_store.onetime_store

        OneContractBillingStore.cyclefee_summary = res.cyclefee_summary
        OneContractBillingStore.onetimefee_summary = res.onetimefee_summary
        OneContractBillingStore.total_summary = res.total_summary

    }


}

export default new IDC_cfg_store()
