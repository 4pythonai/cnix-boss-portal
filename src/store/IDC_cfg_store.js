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

    @observable contractManageData = {}

    // 是否是大客户合同转正式合同
    @observable isFromBigContract = false

    // 页面来源
    @observable page_source = ''

    @computed get disabled() {


        return this.page_source == 'detail' ? true : false;
    }


    @computed get disabledSigners() {
        if ((this.isFromBigContract && this.page_source == 'add') || this.disabled) {
            return true
        }
        return false;
    }

    // 项目列表
    // @observable project_list = []

    // // 客户信息
    // @observable cust = {}
    // // 地址信息
    // @observable addresses = []
    // // 签约方列表
    // @observable signer_list = []


    // 收费周期列表
    @observable periord_list = []

    // 收费方式列表
    @observable charge_item_list = []


    // 附件上传列表
    @observable fileList = []



    // 是否选中固定合同
    @observable isFixedContract = false


    // 合同modle列表显示与否
    @observable showContractListModle = false


    @observable shorthand = ''
    @observable chinese_shorthand = ''

    @observable other = ''


    //其他数据
    @observable otherValue = ''
    @observable RequireOther = false

    @observable dataRights = 'self'   // self: 查看自己的， all: 查看所有的


    @observable oaflag = ''
    @observable oainfo = ''
    //监听新增合同选续签的时候，选的合同是否合适
    @observable rightContract = true



    @observable saveContractData = {
        oppId: null,

        attachment_url: '',
        chargeData: [],
        sign_type: null,
        rent_type: null,
        singer_our_company_id: '',
        singers_customers: [],
        customerId: null,
        project_no: '',
        oppId: '',
        singerReferInfo: {},
        back_to_back_contract_no: '',
        contract_first_payment: 0,
        payment_method: '网银',
        oaflag: '',
        oainfo: '',
        billingoption: '',  //  later or early


    }




    @observable uuid = ''

    @observable process_key = ''

    @observable signerCustomer = ''

    @observable visibleBTBContractModal = false

    @observable isFormal = ''

    @action setIsFormal = isFormal => this.isFormal = isFormal

    @observable setStampName = (stamp_name) => {
        this.saveContractData.stamp_name = stamp_name
    }

    @action setIsFromBigContract = isFromBigContract => this.isFromBigContract = isFromBigContract

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
            this.signerCustomer = signer.customName;
            this.chinese_shorthand = signer.chinese_shorthand
        }
    }



    @action setOurCompany = customerId => this.saveContractData.singer_our_company_id = customerId
    @action setDescription = event => {
        event.persist()
        this.saveContractData.description = event.target.value
    }

    @action setShorthand = shorthand => {
        this.shorthand = shorthand
        this.generateContractNo()
    }
    @action setChineseShorthand = chinese_shorthand => {
        this.chinese_shorthand = chinese_shorthand
    }

    @action
    clearContractState = () => {
        this.saveContractData = {
            attachment_url: '',
            chargeData: [],
            sign_type: null,
            rent_type: null,
            singer_our_company_id: '',
            singers_customers: [],
            project_name: '',
            project_no: '',
            charge_item: '',
            singersCustomers: [],
            oppId: '',
            singerReferInfo: {},
            back_to_back_contract_no: '',
            contract_first_payment: 0,
            payment_method: '网银',
            oaflag: '',
            oainfo: '',
            billingoption: '',
        };
        this.fileList = [];
        this.contract_action = ''
        this.contractManageData = {}
        this.isFromBigContract = false
        this.detailContractNo = ''
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
        if (this.saveContractData.contract_end_date && value.valueOf() > this.saveContractData.contract_end_date.valueOf()) {
            message.error('合同签定日期不能大于结束日期')
            return
        }
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
        if (this.saveContractData.contract_start_date && value.valueOf() < this.saveContractData.contract_start_date.valueOf()) {
            message.error('合同签定日期不能大于结束日期')
            return
        }
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
        console.log('changge签约类型');
        this.saveContractData.sign_type = value;
        if (value == '新签') {
            this.newSignHandle()
            this.generateContractNo()
            return;
        }

        if (value == '续签' || value == '补充协议' || value == '合同变更' || value == '顺延') {
            this._showContractListModle()
        }
    }

    @action changeRentType = (e) => this.saveContractData.rent_type = e.target.value



    // 合同份数
    @action setContractNumber = value => this.saveContractData.contractNumber = value

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

    @action setFieldsValue = (key, value) => {
        this.saveContractData[key] = value
        if (key === 'hasContract') {
            this.generateContractNo()
        }
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

    // 支付类型
    @action setPayType = value => this.saveContractData.pay_type = value;

    // 收费周期
    @action
    setBillingCycle = value => {
        this.saveContractData.billing_cycle = value
        chargeStore.setChargeBillingCycle();
    }

    @action  saveBillingoption = value => {
        this.saveContractData.billingoption = value
        let params = {
            data: { contract_no: this.detailContractNo, cutoff: value },
            method: 'POST'
        }
        api.billing.saveBillingoption(params);
        chargeStore.reMakedata(chargeStore.chargeSubmitData)
    }



    // 首付款
    @action setFirstPayment = value => this.saveContractData.contract_first_payment = value;


    @action
    makeReNewContractno = async () => {
        await this.generateContractNo();
        if (!this.rightContract) {
            return
        }
        await this.getContractByUUID('renewal');

        this._hideContractListModle();
    }

    @action generateContractNo = async () => {
        if (!this.saveContractData.sign_type) {
            return;
        }
        if (this.shorthand == '') {
            return
        }
        let params = {
            data: {
                sign_type: this.saveContractData.sign_type,
                shorthand: this.shorthand,
                contract_action: this.contract_action,
                hasContract: this.saveContractData.hasContract
            },
            method: 'POST'
        }

        if (this.isFromBigContract) {
            params.data.isFromBigContract = this.isFromBigContract
        }
        if (this.isFormal) {
            params.data.isFormal = this.isFormal
        }

        params.data['contract_no'] = this.detailContractNo

        let res = await api.contract_api.generateContractNo(params);

        if (res.code == 200) {
            this.rightContract = true
            this.saveContractData['contract_no'] = res.data;

            localStorage.setItem('contract_no', this.saveContractData.contract_no);
        } else {
            this.rightContract = false
        }

    }


    @action
    setIsToggleOn = value => this.isToggleOn = value;

    // 保存合同
    @action
    submitContractHandle = async (parameter) => {
        console.log('保存合同')

        console.log(parameter)

        let data = this.saveContractData;
        console.log('视图要保存的合同数据')
        console.log(data)

        if (!this.validate(data, this.contractValidata, false)) {
            return;
        }
        if (chargeStore.chargeSubmitData.length === 0) {
            message.error('请添加收费项！');
            return;
        }
        data['chargeData'] = chargeStore.chargeSubmitData;
        if (this.detailContractNo != '' && (this.page_source == 'edit' || this.saveContractData.sign_type == '续签')) {
            data['old_contract_no'] = this.detailContractNo;
        }
        data['contract_action'] = this.contract_action;

        data.ifvip = parameter.ifvip  // 是否为大客户合同

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
            console.log(params);

            let addRes = await api.contract_api.addContract(params);
            addRes.code == 200 && hashHistory.goBack()
            return;

        }
    }

    @action
    // 

    async getContractByUUID(isRenewal) {

        let params = {
            data: {
                process_key: this.process_key,
                uuid: this.uuid,
                // contract_action: this.contract_action
            },
            method: 'POST'
        };
        // if(this.detailContractNo!=''){
        //     params.data.contract_no=this.detailContractNo
        // }
        let res = await api.contract_api.getContractByUUID(params);
        console.log('合同详情:')
        console.log(res.data)
        await this.setEditData(res.data, isRenewal)
    }


    @action
    setEditData = async (contractData, isRenewal) => {
        this.RequireOther = contractData.payment_method == '其他' ? true : false;
        let data = {
            contractno: contractData.contractno ? contractData.contractno : '',
            ifvip: contractData.ifvip,
            contract_name: contractData.contract_name,
            contractNumber: contractData.contractNumber,
            sign_type: isRenewal == 'renewal' ? this.saveContractData.sign_type : contractData.sign_type,
            contract_no: this.saveContractData.contract_no ? this.saveContractData.contract_no : contractData.contract_no,
            project_no: contractData.project_no,
            contract_type: contractData.contract_type,
            contract_money: contractData.contract_money,
            signer: contractData.pay_supplier,
            payee_num: contractData.pay_supplier_certificate_no,
            billing_cycle: contractData.billing_cycle,
            pay_type: contractData.pay_type,
            contract_first_payment: contractData.contract_first_payment,
            contract_start_date: contractData.contract_start_date,
            contract_end_date: contractData.contract_end_date,
            attachment_url: contractData.attachment_url,
            rent_type: contractData.rent_type,
            payment_method: contractData.payment_method,
            otherValue: contractData.otherValue,
            customerId: contractData.customerId,
            oppId: contractData.oppId,
            project_name: contractData.project_name,
            singer_our_company_id: contractData.singer_our_company_id,
            singerReferInfo: contractData.selectedSigner,
            back_to_back_contract_no: contractData.back_to_back_contract_no,

            cabinet_description: contractData.cabinet_description,
            bandwidth_description: contractData.bandwidth_description,
            isp_description: contractData.isp_description,
            hasContract: contractData.hasContract,
            obligations_party_a: contractData.obligations_party_a,
            obligations_party_b: contractData.obligations_party_b,
            responsibility_party_a: contractData.responsibility_party_a,
            responsibility_party_b: contractData.responsibility_party_b,
            marketing_department_leader_clause: contractData.marketing_department_leader_clause,
            contract_model_outside_clause: contractData.contract_model_outside_clause,
            stamp_name: contractData.stamp_name,
            description: contractData.description,
            author: contractData.author,
            oaflag: contractData.oaflag,
            oainfo: contractData.oainfo,
            staffname: contractData.staffname,
            department: contractData.department,
            billingoption: contractData.billingoption,


        };

        console.log('setEditData----------->')


        data.contract_days = this.computedDate(data.contract_end_date, data.contract_start_date),
            this.contractManageData = {
                archive_note: contractData.archive_note,
                customer_type: contractData.customer_type,
                seal_date: contractData.seal_date,
                seal_note: contractData.seal_note,
                return_date: contractData.return_date,
                return_note: contractData.return_note,
                stamp_duty_tax: contractData.stamp_duty_tax,
                archives_no: contractData.archives_no,
                customer_type_id: contractData.customer_type_id
            }

        this.setEditDefaultSignCustomer(contractData.sign_customers)
        await this.setOurCompanyName(contractData.singer_our_company_id)
        this.setDefultFileList(contractData.attachment_url);

        this.saveContractData.sign_type = contractData.sign_type;
        this.saveContractData = { ...this.saveContractData, ...data };
        let contract_days = this.computedDate(this.saveContractData.contract_end_date, this.saveContractData.contract_start_date);
        this.setContractTerm(contract_days)
        localStorage.setItem('contract_no', this.saveContractData.contract_no);
        await chargeStore.getChargeList('y');

        if (this.saveContractData.ifvip === '是' && this.isFromBigContract === true) {
            this.generateContractNo()
        }
        console.log('查看isFormal', this.isFormal)
        if (this.isFormal) {

            this.setFieldsValue('hasContract', '是')
        }
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
        stamp_name: {
            require: true,
            requireText: '印章名称不能为空'
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

        contract_no: {
            require: true,
            requireText: '合同编号不能为空，请选择签约类型'
        },
        contract_type: {
            require: true,
            requireText: '合同类型不能为空',
            notAllow: '请选择'
        },
        hasContract: {
            require: true,
            requireText: '是否为预签订不能为空',
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
        marketing_department_leader_clause: {
            require: true,
            requireText: '市场部领导定夺条款不能为空'
        },


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
        // debugger
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

        let ignoreArr = ['chargeData', 'contract_days', 'attachment_url', 'remarks']

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
            if (data.contract_type == '固定合同' && chargeStore.chargeSumPrice != 0 && Math.abs(this.saveContractData.contract_money - chargeStore.chargeSumPrice) > 100) {
                message.error('固定合同金额与收费项总额不符');
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
                console.log('------------')
                console.log('检查' + key)

                console.log(data[key])

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





}

export default new IDC_cfg_store()
