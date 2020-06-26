import { observable, action, toJS, autorun, computed } from "mobx";
import api from '../api/api'
import IDC_cfg_store from './IDC_cfg_store'
<<<<<<< HEAD
import billingSummaryStore from './billingSummaryStore'
import navigationStore from './navigationStore'
=======
import OneContractBillingStore from './OneContractBillingStore'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import { message } from 'antd'
import { getMaxRowKey } from '../utils/tools'


class chargeStore {
    @observable chargeRowData = {
        memo: ''
    }

<<<<<<< HEAD

    @observable selectedRowKeys = []

    @observable selectedRows = []

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    // 峰值显示标识
    @observable isShowPeakValue = false

    // 带宽类型显示标识
    @observable isShowWidthType = true

    // 收费周期rowspan 的处理
    @observable cycleFeeCount = 0;

    // 收费项总计
    @observable chargeSumPrice = 0;

    @observable cahrge_cyclefee_summary = 0;

    @observable charge_onetimefee_summary = 0;

    // 编辑/新增收费项
    @observable chargeOption = ''

    // 资源项
    @observable fee_item_list = []

    // 收费项配置
    @observable charge_cfg = {}
    // 收费项
    @observable chargeShowListData = []

    // 提交后台的收费项数据
    @observable chargeSubmitData = []

<<<<<<< HEAD
=======
    // 波分的所在机房处理
    @observable idcLocation = {}

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    // 带宽运营商checkBox处理
    @observable selectCheckBoxList = []

    // 预留费时间处理
    @observable disabledDate = {}

    @action clearStore = () => {
        this.chargeSubmitData = [];
        this.chargeRowData = {};
        this.chargeShowListData = [];
        this.chargeSumPrice = 0
<<<<<<< HEAD
        this.selectedRowKeys = []
        this.selectedRows = []
    }

    @computed get isShowCompareButton() {
        if (!IDC_cfg_store.saveContractData.contract_no) {
            return false
        }
        if (IDC_cfg_store.saveContractData.contract_no.indexOf('-V') != -1) {
            return true
        }
        return false
    }


    @computed get isShowOneceLoc() {
        if (this.chargeRowData.charge_fee_type == '一次性费用' && (this.chargeRowData.once_charge_type === '机柜一次性费用' || this.chargeRowData.once_charge_type === '网络一次性费用')) {
            return true
        }

        return false
    }



    // 联动

    @observable dropdownRef = []
    @observable triggers = []

    @observable schmeForm = []
    @action registerSchmeForm(obj) {
        this.schmeForm.push(obj)
    }

    @action registerDropDown(key, obj) {
        this.dropdownRef[key] = obj
    }

    @action clearDropdownRef() {
        this.dropdownRef = [];
    }




    @action registerTrigger(obj) {
        this.triggers.push(obj)
    }

    @action clearTrigger() {
        this.triggers = [];
    }


=======
    }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    /******************* 收费项弹框 *************************/
    @observable chargeModalVisible = false;

    @action hideChargeModal = () => {
        this.chargeModalVisible = false;
        this.chargeRowData = {};
        this.initSubmitChargeData();
    }

    @action addChargeBtnHandle = charge_fee_type => {
        if (IDC_cfg_store.saveContractData.contract_type == null || IDC_cfg_store.saveContractData.contract_type == '') {
            message.error('请选择合同类型')
            this.chargeModalVisible = false;
            return
        }

        if (IDC_cfg_store.saveContractData.rent_type == null || IDC_cfg_store.saveContractData.rent_type === '') {
            message.error('请选择整租/散租')
            this.chargeModalVisible = false;
            return
        }

        if (IDC_cfg_store.saveContractData.billing_cycle == null || IDC_cfg_store.saveContractData.billing_cycle == '请选择') {
            this.chargeModalVisible = false;
            message.error('请选择收费周期')
            return
        }
<<<<<<< HEAD
        if (!IDC_cfg_store.saveContractData.pay_type || IDC_cfg_store.saveContractData.pay_type === '请选择') {
=======
        if (IDC_cfg_store.saveContractData.pay_type === null || IDC_cfg_store.saveContractData.pay_type === '请选择') {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.chargeModalVisible = false;
            message.error('请选择支付类型')
            return
        }
        if (IDC_cfg_store.saveContractData.contract_first_payment === null || IDC_cfg_store.saveContractData.contract_first_payment === '') {
            this.chargeModalVisible = false;
            message.error('请选择输入首付款')
            return
        }

<<<<<<< HEAD
        if (IDC_cfg_store.saveContractData.contract_start_date === null || IDC_cfg_store.saveContractData.contract_start_date === '' ||
            IDC_cfg_store.saveContractData.contract_start_date == undefined
        ) {
=======
        if (IDC_cfg_store.saveContractData.contract_start_date === null || IDC_cfg_store.saveContractData.contract_start_date === '') {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.chargeModalVisible = false;
            message.error('请选择合同签订日期')
            return
        }
<<<<<<< HEAD

        console.log('合同签订日期:')
        console.log(IDC_cfg_store.saveContractData.contract_start_date)


=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (IDC_cfg_store.saveContractData.contract_end_date === null || IDC_cfg_store.saveContractData.contract_end_date == null) {
            this.chargeModalVisible = false;
            message.error('请选择合同结束日期')
            return
        }
        this.chargeOption = 'add'
        this.initSubmitChargeData();
        this.chargeRowData.charge_fee_type = charge_fee_type;
        this.chargeModalVisible = true;

    }

<<<<<<< HEAD

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @action showChargeModal = () => this.chargeModalVisible = true;

    /******************* 费用详情弹框 ***********************/
    @observable feeSummaryVisible = false;

    @action hideFeeSummaryModal = () => this.feeSummaryVisible = false;
    @action showFeeSummaryModal = () => this.feeSummaryVisible = true;


    /******************* 监听收费项 ****************/
    @action selSelectCheckBox = (checkedList, key) => {
        this.chargeRowData[key] = checkedList.join(',');
    }

    @action feeItemChange = (event, key) => {
        this.chargeRowData[key] = event.target.value;
        //@获取资源项id
    }

    @action setShowPeakValue = () => this.isShowPeakValue = true

    @action setHidePeakValue = () => {
        this.isShowPeakValue = false
        this.chargeRowData.peak_value = ''
    }


<<<<<<< HEAD
    @action rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
    }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

    @action setShowWidthType = () => this.isShowWidthType = true;

    @action setHideWidthType = () => {
        this.isShowWidthType = false;
        this.chargeRowData.bandwidth_type = ''
    }

    @action setNormalFiledsValue = async (event, key) => {
<<<<<<< HEAD
        if (event === null || event === undefined) {
=======

        console.log(event, key)
        if (event === null) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.chargeRowData[key] = '';
            return;
        }



        if (event.target) {
            this.chargeRowData[key] = event.target.value == '请选择' ? '' : event.target.value;
        } else {
            this.chargeRowData[key] = event == '请选择' ? '' : event;
        }

        if (key == 'res_id') {
<<<<<<< HEAD
            this.chargeRowData = {
                res_id: this.chargeRowData.res_id,
                charge_fee_type: this.chargeRowData.charge_fee_type
            }
            if (this.chargeRowData.key) {
                chargeRowData.key = this.chargeRowData.key
            }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            await this.getui_cfg();
            return;
        }

<<<<<<< HEAD
        // idc联动
        if (key == 'start_type') {
            console.log('clear start')
            this.chargeRowData.loc_start == ''
        }
        if (key == 'end_type') {
            console.log('clear end')
            this.chargeRowData.loc_end == ''
        }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


        if (this.chargeRowData.resname == '带宽') {
            // 设置显示带宽类型
            this.chargeRowData.billing_methods == 'using_fee_fixed_with_overflow'
                ?
                this.setHideWidthType()
                :
                this.setShowWidthType();

            // 显示带宽超出计费方式的 峰值
            this.chargeRowData.over_bandwidth_billing_method == '峰值'
                ?
                this.setShowPeakValue()
                :
                this.setHidePeakValue()
        }

        if (key == 'charge_fee_type') {
            this.initSubmitChargeData();
            return;
        }


        this.setIdcServiceFeeWidthCount(event, this.charge_cfg);

    }

    @action setIdcServiceFeeWidthCount = (value, charge_cfg) => {
        if (charge_cfg.id == 12) {
            charge_cfg.using_fee_common_without_step.map(item => {
                if (item.compoment_name === 'idcServiceFeeWidthCountRender' && this.chargeRowData.free_amount) {
                    this.idcServiceFeeWidthCount = (this.chargeRowData.free_amount / 1024).toFixed(2);
                }
            })
        }
    }
    @action setResUnit = (charge_cfg) => {
<<<<<<< HEAD
        if (this.charge_cfg.using_fee_common_with_step) {
            this.resUnitCB(charge_cfg.using_fee_common_with_step);
        }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (charge_cfg.using_fee_common_without_step) {
            this.resUnitCB(charge_cfg.using_fee_common_without_step);
        }
        if (this.charge_cfg.using_fee_fixed_without_overflow) {
            this.resUnitCB(charge_cfg.using_fee_fixed_without_overflow);
        }
        if (this.charge_cfg.using_fee_fixed_with_overflow) {
            this.resUnitCB(charge_cfg.using_fee_fixed_with_overflow);
        }
<<<<<<< HEAD


        // 单位为一个时默认选择第一个
        if (charge_cfg.spec) {
            charge_cfg.spec.map((item, index) => {
                if (item.unit && item.unit.options_list.length === 1) {
                    this.setNormalFiledsValue(item.unit.options_list[0].text, item.unit.ui_id)
                }

                // 使用月数默认为第一个
                if (item.ui_id === 'used_months' && this.chargeOption == 'add') {
                    this.setNormalFiledsValue(IDC_cfg_store.saveContractData.contract_days, item.ui_id);
                    this.setNormalFiledsValue(item.unit.options_list[0].text, item.unit.ui_id)
                }
            })
        }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }


    @action resUnitCB = (data) => {
        data.map(item => {
            if (item.unit && item.unit.text) {
                this.chargeRowData[item.unit.ui_id] = item.unit.text;
            }
        })
    }

    @action setDateFiledsValue = (mode, date, key) => {

        this.chargeRowData[key] = date
        if ((key == 'end_date' && this.chargeRowData.start_date)) {
            this.computedDate(key)
        }
        if (key == 'start_date' && this.chargeRowData.end_date) {
            this.computedDate(key)
        }
        this.timer()
    }
    @action timer = () => {
        var contract_start = new Date(new Date(IDC_cfg_store.saveContractData.contract_start_date).setDate(new Date(IDC_cfg_store.saveContractData.contract_start_date).getDate() - 1))
        var fee_end = new Date(new Date(this.chargeRowData.end_date).setDate(new Date(this.chargeRowData.end_date).getDate()))
        if (contract_start >= new Date(this.chargeRowData.start_date)) {
            this.chargeRowData.start_date = ''
            message.error('预留起始时间不能小于合同起始时间');
            return;
        }
<<<<<<< HEAD
        if (new Date(IDC_cfg_store.saveContractData.contract_end_date) < fee_end) {
=======
        if (new Date(IDC_cfg_store.saveContractData.contract_end_date) <= fee_end) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.chargeRowData.end_date = ''
            message.error('预留结束时间不能大于合同结束时间');
            return;
        }
    }

    @action computedDate = key => {
        if ((new Date(this.chargeRowData.start_date) - new Date(this.chargeRowData.end_date)) > 0) {
            this.chargeRowData[key] = ''
            message.error('预留中止时间必须大于预留起始时间');
            return;
        }

    }

<<<<<<< HEAD
=======
    @action setEndIdcLocation = value => {
        if (value === '请选择') {
            this.chargeRowData.loc = '请选择'
            return;
        }
        this.idcLocation['endIdcLocation'] = value;
        this.setLoc()
    }

    @action setStartIdcLocation = value => {
        if (value === '请选择') {
            this.chargeRowData.loc = '请选择'
            return;
        }

        this.idcLocation['startIdcLocation'] = value;
        this.setLoc()

    }

    @action setLoc = () => {
        if (!this.idcLocation.startIdcLocation || this.idcLocation.startIdcLocation === '请选择') {
            return;
        }
        if (!this.idcLocation.endIdcLocation || this.idcLocation.endIdcLocation === '请选择') {
            return;
        }
        this.chargeRowData.loc = this.idcLocation.startIdcLocation + ',' + this.idcLocation.endIdcLocation
    }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


    /************** 收费项交互 ****************/
    // 获取资源项列表
    @action getFeeItemList = async () => {
<<<<<<< HEAD
        let params = {
            data: {
                contract_type: navigationStore.currentMenu.action_code
            }
        }
        let res = await api.contract_api.getResItemList(params);
=======
        let res = await api.contract_api.getResItemList();
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (res.code == 200) {
            this.fee_item_list = res.data;
        }
    }
    @action getui_cfg = async () => {
        let params = {
            data: {
                resid: this.chargeRowData.res_id
            },
            method: 'POST'
        };

        let res = await api.contract_api.getUICfg(params);
        this.charge_cfg = res;
<<<<<<< HEAD

        this.chargeRowData.resname = res.resname;

        // 设置收费项的收费周期
        if ((IDC_cfg_store.saveContractData.billing_cycle != '一次性' || IDC_cfg_store.saveContractData.billing_cycle != '请选择') && this.chargeOption == 'add') {
=======
        this.chargeRowData.resname = res.resname;

        if (IDC_cfg_store.saveContractData.billing_cycle != '一次性' || IDC_cfg_store.saveContractData.billing_cycle != '请选择') {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.chargeRowData.billing_cycle = IDC_cfg_store.saveContractData.billing_cycle;
        }

        this.setResUnit(this.charge_cfg);
<<<<<<< HEAD

        if (!this.chargeRowData.billing_methods && res.billing_methods.length == 1) {
            this.chargeRowData.billing_methods = res.billing_methods[0].method;
        } else if (this.chargeOption == 'add') {
            this.chargeRowData.billing_methods = '';
        }
    }

    getGhostData = formData => {
        this.triggers.map(item => {
            formData['ghost_' + item.props['x-props'].ass_select_field_id] = formData[item.props['x-props'].ass_select_field_id]
            let option_obj = item.state.optionList.find(optionItem => (optionItem.value == formData[item.props['x-props'].ass_select_field_id]))
            formData[item.props['x-props'].ass_select_field_id] = option_obj ? option_obj.label : ''
        })
        return formData
    }
=======
        if (!this.chargeRowData.billing_methods && res.billing_methods.length == 1) {
            this.chargeRowData.billing_methods = res.billing_methods[0].method;
        }
    }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

    // 保存收费项
    @action saveChargeItem = async (e) => {
        e.preventDefault();
        e.stopPropagation();
<<<<<<< HEAD


=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let chargeSubmitRowData = {
            ui_cfg: this.chargeRowData.ui_cfg ? this.chargeRowData.ui_cfg : this.charge_cfg,
            key: this.chargeRowData.key
                ?
                this.chargeRowData.key
                :
                getMaxRowKey(this.chargeSubmitData),
            ...this.chargeRowData
        };

        // @表单验证
        if (this.validateChargeData(chargeSubmitRowData) == false) {
            return;
        }

<<<<<<< HEAD
        if (this.chargeOption == 'add' || (this.chargeOption == 'edit' && IDC_cfg_store.page_source == 'add')) {
            this.chargeRowData = this.getGhostData({ ...this.chargeRowData })
        }

        chargeSubmitRowData = { ...chargeSubmitRowData, ...this.chargeRowData }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        // 编辑收费项
        if (IDC_cfg_store.page_source == 'edit' && this.chargeOption == 'edit') {
            await this.updateChargeData(chargeSubmitRowData);
            return;
        }
        // 编辑合同时新增收费项
        if (IDC_cfg_store.page_source == 'edit' && this.chargeOption == 'add') {
            await this.addChargeData(chargeSubmitRowData);
            return;
        }

        // 录入合同时新增收费项
        if (IDC_cfg_store.page_source == 'add' && this.chargeOption == 'add') {

            this.chargeSubmitData = [chargeSubmitRowData, ...this.chargeSubmitData];
            this.reMakedata(this.chargeSubmitData);
            this.hideChargeModal();
            return;
        }
        // 录入合同时编辑收费项
        if (IDC_cfg_store.page_source == 'add' && this.chargeOption == 'edit') {

            let submitIndex = this.chargeShowListData.findIndex(item => item.key == this.chargeRowData.key);
            this.chargeSubmitData.splice(submitIndex, 1, this.chargeRowData);
            this.hideChargeModal()
            this.reMakedata(this.chargeSubmitData)
            return;
        }
    }


    // 初始化提交收费项信息
    @action initSubmitChargeData = () => {
        this.charge_cfg = {};
        this.selectCheckBoxList = [];
<<<<<<< HEAD
=======
        this.idcLocation = {}
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.idcServiceFeeWidthCount = '';
        this.chargeRowData = {
            memo: '',
            charge_fee_type: this.chargeRowData.charge_fee_type ? this.chargeRowData.charge_fee_type : ''
        }
    }

    // 新增收费项
    @action addChargeData = async chargeSubmitRowData => {
        let params = {
            data: {
                contract_no: IDC_cfg_store.detailContractNo,
                contract_action: IDC_cfg_store.contract_action,
                ...chargeSubmitRowData,
            },
            method: 'POST'
        };

        let res = await api.contract_api.addChargeData(params);
        if (res.code == 200) {
            message.success('新增收费项成功');
            this.hideChargeModal()
            await this.getChargeList();
            return;
        }
        message.error(res.msg);
    }

    // 修改收费项
    @action updateChargeData = async data => {
        let params = {
            data: {
                contract_no: IDC_cfg_store.detailContractNo,
                contract_action: IDC_cfg_store.contract_action,
                ...data,
            },
            method: 'POST'
        }
        let res = await api.contract_api.updateChargeItem(params);
        if (res.code == 200) {
<<<<<<< HEAD
            message.success('修改成功！');
=======
            message.success('编辑成功！');
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            // 刷新收费项列表
            await this.getChargeList();
            this.hideChargeModal();
        }
    }


    // 删除收费项
    @action deleteChargeRow = async (record) => {
        // 编辑合同时的删除
        if (IDC_cfg_store.page_source == 'edit') {
            let params = {
                data: {
                    id: record.key,
                    contract_action: IDC_cfg_store.contract_action,
                },
                method: 'POST'
            };

<<<<<<< HEAD
            let res = await api.contract_api.deleteChargeItem(params);
=======
            let res = await api.contract_api.deleteChargeItems(params);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            if (res.code == 200) {
                this.getChargeList();
                message.success('删除成功！');
                return;
            }
            message.success('删除失败！');
        }

        // 录入合同时的删除
        if (IDC_cfg_store.page_source == 'add') {
            let submitIndex = this.chargeSubmitData.findIndex(item => item.key == record.key);
            this.chargeSubmitData.splice(submitIndex, 1);
            this.reMakedata(this.chargeSubmitData);
        }
    }


    // 编辑收费项按钮
    @action editChargeRow = (event, key) => {
        event.stopPropagation();
        this.chargeOption = 'edit';
<<<<<<< HEAD
        this.chargeRowData = { ...this.chargeSubmitData.find(item => item.key == key) }
=======
        this.chargeRowData = this.chargeSubmitData.find(item => item.key == key)

        console.log(this.chargeRowData)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        if (this.chargeRowData.charge_fee_type == '一次性费用') {
            this.charge_cfg = {};
            this.showChargeModal();
            return;
        }

        if (this.chargeRowData.charge_fee_type == '周期性费用') {
            this.charge_cfg = this.chargeRowData.ui_cfg;
<<<<<<< HEAD
=======
            if (this.chargeRowData.loc) {
                let index = this.chargeRowData.loc.indexOf(',');
                if (index != -1) {
                    this.idcLocation.startIdcLocation = this.chargeRowData.loc.slice(0, index);
                    this.idcLocation.endIdcLocation = this.chargeRowData.loc.slice(index + 1);
                }
            }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

            // 带宽的计费方式为： 基础带宽加上超出带宽计费 时 判断峰值是否显示，带宽类型是否显示
            if (this.chargeRowData.resname == '带宽' && this.chargeRowData.billing_methods == 'using_fee_fixed_with_overflow') {
                // @@隐藏带宽类型
                this.setHideWidthType()
                this.chargeRowData.over_bandwidth_billing_method == '峰值' ? this.setShowPeakValue() : this.setHidePeakValue(false)
            }

            if (this.chargeRowData.resname == '带宽' && this.chargeRowData.billing_methods == 'using_fee_fixed_without_overflow') {
                this.setShowWidthType()
            }


            this.getFeeItemList();
<<<<<<< HEAD
            this.getui_cfg();
=======
            this.getui_cfg(this.chargeRowData.res_id);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            this.showChargeModal();

        }
    }

    // 获取收费项列表
<<<<<<< HEAD
    @action getChargeList = async (noUpdateContractmoney, flow_type) => {

        let params = {
            data: {
                // contract_no: IDC_cfg_store.detailContractNo,
=======
    @action getChargeList = async (noUpdateContractmoney) => {

        let params = {
            data: {
                contract_no: IDC_cfg_store.detailContractNo,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                uuid: IDC_cfg_store.uuid,
                process_key: IDC_cfg_store.process_key
            },
            method: 'POST'
        };

        let res = await api.contract_api.getChargeData(params);
<<<<<<< HEAD
        if (flow_type) {
            if (res.data.length <= 0) {
                return;
            }

            let flow_types = ['A', 'B', 'C']
            if (flow_types.includes(flow_type)) {
                res.data = res.data.filter(item => item.ui_cfg == undefined || item.ui_cfg.flow_type === flow_type)
            }
        }

        console.log('查看过滤后的数据', flow_type, res);
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        await this.reMakedata(res.data, noUpdateContractmoney);
    }

    // 统一设置收费项的收费周期
    @action setChargeBillingCycle = () => {
        this.chargeSubmitData.forEach(item => {
            if (item.billing_cycle) {
                item.billing_cycle = IDC_cfg_store.saveContractData.billing_cycle
            }
        })
        this.reMakedata(this.chargeSubmitData);

    }



    @action reMakedata = async (chargeData, noUpdateContractmoney) => {

<<<<<<< HEAD
        if (this.isCanCharge(chargeData) === false) {
            console.log('not charge')
=======
        if (chargeData == '' || chargeData.length == 0) {
            await this.getResbilling(chargeData, noUpdateContractmoney);
            this.chargeShowListData = [];
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            return;
        }

        chargeData = this.sortChargeSubmitData(chargeData);

        this.getCycleFeeCount(chargeData)
        let showChargeData = [];
        let chargeItemData = [];

        chargeData = await this.getResbilling(chargeData, noUpdateContractmoney);
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        chargeData.map(item => {
            showChargeData.push(this.formOfShowData(item, item.ui_cfg));
            chargeItemData.push(item)
        })
<<<<<<< HEAD
        // 排序 机柜  网络  线路
        chargeItemData.sort(this.ownSort)
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.chargeShowListData = showChargeData;
        this.chargeSubmitData = chargeItemData;

        IDC_cfg_store.saveContractData['chargeData'] = chargeItemData;
    }

<<<<<<< HEAD

    @action ownSort(a, b) {
        if (a.ui_cfg && b.ui_cfg) {
            if (a.ui_cfg.flow_type <= b.ui_cfg.flow_type) {
                return -1;
            } else {
                return 1;
            }
        } else {
            return -1
        }

    }
    @action getResbilling = async (chargeData, noUpdateContractmoney) => {

        // alert(noUpdateContractmoney)

        let { billingoption, contract_no, contract_end_date, contract_start_date, rent_type, contract_type, billing_cycle, contract_days, pay_type, contract_first_payment } = IDC_cfg_store.saveContractData

        let params = {
            data: { billingoption: billingoption, payCycle: billing_cycle, contract_no, chargeData, contract_end_date, contract_start_date, rent_type, contract_type, contract_days, pay_type, contract_first_payment },
            method: 'POST'
        };


        let res = await api.billing.getResbilling(params);
=======
    @action getResbilling = async (chargeData, noUpdateContractmoney) => {
        let { contract_end_date, contract_start_date, rent_type, contract_type, billing_cycle, contract_days, pay_type, give_day, contract_first_payment } = IDC_cfg_store.saveContractData
        let params = {
            data: { payCycle: billing_cycle, chargeData, contract_end_date, contract_start_date, rent_type, contract_type, contract_days, pay_type, give_day, contract_first_payment },
            method: 'POST'
        };

        let res = await api.contract_api.getResbilling(params);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.chargeSumPrice = res.total_summary;
        this.cahrge_cyclefee_summary = res.cyclefee_summary;
        this.charge_onetimefee_summary = res.onetimefee_summary;

<<<<<<< HEAD
        // 如果用户设置的 manualset_billing_itmes 有数据,这使用用户设置的总和




        // 合同额重新赋值

=======
        // 合同额重新赋值
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        IDC_cfg_store.saveContractData.contract_money = noUpdateContractmoney == 'y'
            ?
            IDC_cfg_store.saveContractData.contract_money
            :
            res.total_summary;

<<<<<<< HEAD

        if (res.manualset_billing_itmes.length > 0) {
            // alert('使用用户的合计数据')
            // IDC_cfg_store.saveContractData.contract_money
            let user_setting_sum = res.manualset_billing_itmes
                .map(item => item.money)
                .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
            IDC_cfg_store.saveContractData.contract_money = user_setting_sum.toFixed(2)
            // IDC_cfg_store.saveContractData.contract_money =1999;


        }



        billingSummaryStore.setBillingData(res)
=======
        OneContractBillingStore.setBillingData(res)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        return res.chargeData
    }

<<<<<<< HEAD
    isCanCharge = chargeData => {
        if (chargeData == '' || chargeData.length == 0) {
            this.chargeSumPrice = 0;
            this.chargeShowListData = [];
            this.chargeSubmitData = []
            return false;
        }

        let data = IDC_cfg_store.saveContractData

        if (!data.billing_cycle || data.billing_cycle == '请选择') {
            return false
        }
        if (data.contract_first_payment === undefined) {
            return false
        }
        if (!data.rent_type) {
            return false
        }
        if (!data.contract_type) {
            return false
        }
        if (!data.contract_end_date) {
            return false
        }
        if (!data.contract_start_date) {
            return false
        }
        if (!data.pay_type || data.pay_type == '请选择') {
            return false
        }

        return true

    }

=======
    // 获取一次性费用
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @action getCycleFeeCount = data => {
        let cycleFeeCount = 0
        data.map((item, index, arr) => {
            if (item.charge_fee_type === '周期性费用') {
                cycleFeeCount++
            }
        })
        this.cycleFeeCount = cycleFeeCount
    }

    @action sortChargeSubmitData = data => {
        return data.slice().sort((this.compare('charge_fee_type')))
    }

    compare = (prop) => {
        return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    formOfShowData = (rowData, charge_cfg) => {
<<<<<<< HEAD

        console.log(rowData)

        let returnRowData = {
            key: rowData.key ? rowData.key : getMaxRowKey(this.chargeSubmitData),
            charge_fee_type: rowData.charge_fee_type,
            itemend: rowData.itemend,
            itemstart: rowData.itemstart,
=======
        let returnRowData = {
            key: rowData.key ? rowData.key : getMaxRowKey(this.chargeSubmitData),
            charge_fee_type: rowData.charge_fee_type,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            memo: rowData.memo ? rowData.memo : '',
            row_summary: rowData.row_summary != undefined ? rowData.row_summary : '',
            sub_summary: rowData.sub_summary != undefined ? rowData.sub_summary : '',
        };

        if (rowData.contract_no) {
            returnRowData['contract_no'] = rowData.contract_no;
        }

        if (rowData.charge_fee_type == '一次性费用') {
<<<<<<< HEAD

            var onetime_item = {
                loc: '',
                resname: rowData.once_charge_type,
                price: rowData.price + '元',
                description: this.getOneceDescription(rowData),
                num: '',
                ...returnRowData
            }
            console.log('一个一次性费用费用项')
            console.log(onetime_item)

            return onetime_item

        }

        if (rowData.charge_fee_type == '周期性费用') {
            // 周期性费用
            var cycle_item = {
                resname: charge_cfg.resname += rowData.reserved_cabinet_type ? (rowData.reserved_cabinet_type) : '',
                price: this.getShowPrice(rowData, charge_cfg),
                description: this.getShowDescription(rowData, charge_cfg),
                num: this.getNum(rowData),
                ...returnRowData
            }
            console.log('一个周期性费用项')
            console.log(cycle_item)
            return cycle_item
        }


    }

    getOneceDescription = (rowData) => {
        if (rowData.charge_fee_type === '一次性费用' && (rowData.once_charge_type == '机柜一次性费用' || rowData.once_charge_type == '网络一次性费用')) {
            return rowData.loc ? '所在机房：' + rowData.loc : '所在机房:'
        }

        return null
    }


    getDescriptionLoc(rowData, charge_cfg) {
        let loc_desc = ''
        charge_cfg.loc.map((item, index) => {

            loc_desc += item.ui_title + ':' + rowData[item.ui_id] + '，';
            if (charge_cfg.loc.length == 1) {
                charge_cfg.loc[0].loc.map(item => {

                    let value = rowData[item.ui_id] ? rowData[item.ui_id] : '';
                    loc_desc += item.ui_title + ':' + value + '，';
                })
                return loc_desc
            }
            if (rowData.start_type && rowData.start_type == '楼内' && index == 1) {

                charge_cfg.loc[1].loc.map(item => {

                    let value = rowData[item.ui_id] ? rowData[item.ui_id] : '';
                    loc_desc += item.ui_title + '（起点）:' + value + '，';
                })
            } else if (rowData.start_type && rowData.end_type == '楼内' && index == 3) {
                charge_cfg.loc[3].loc.map(item => {
                    let value = rowData[item.ui_id] ? rowData[item.ui_id] : '';
                    loc_desc += item.ui_title + '（结束）:' + value + '，';
                })
            }
        })





        return loc_desc
    }

    getNum(rowData) {
        // 应该先显示 amout,
        if (rowData.amount) {
            return rowData.amount
        }
        // free_amount似乎不应该出现,崔瞎XX写.
        if (rowData.free_amount) {
            return rowData.free_amount
        }
=======
            return {
                loc: '',
                resname: rowData.costName,
                price: rowData.price + '元',
                description: '',
                num: '',
                ...returnRowData
            }
        }
        // 周期性费用
        return {
            loc: rowData.loc,
            resname: charge_cfg.resname += rowData.reserved_cabinet_type ? (rowData.reserved_cabinet_type) : '',
            price: this.getShowPrice(rowData, charge_cfg),
            description: this.getShowDescription(rowData, charge_cfg),
            num: this.getNum(rowData),
            ...returnRowData
        }
    }

    getNum(rowData) {
        if (rowData.amount) {
            return rowData.amount
        }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        if (rowData.top_limited_amount) {
            return rowData.top_limited_amount
        }
        if (rowData.base_amount) {
            return rowData.base_amount
        }
        return ''
    }

    //算日期的天数
    @action getDaysOfMonth(year, month) {
        var date = new Date(year, month, 0);
        var days = date.getDate();
        return days;
    }

    getShowPrice(rowData, charge_cfg) {
        // 普通计费
        if (charge_cfg.billing_methods.length == 1 && charge_cfg.billing_methods[0].text == '') {
            var price = rowData.price + "元";
            price += rowData.price_unit ? '/' + rowData.price_unit : '';
            price += rowData.billing_cycle ? '/' + rowData.billing_cycle : '';

            return price
        }
        // 没有超出费用
        if (rowData.billing_methods == 'using_fee_fixed_without_overflow' || rowData.billing_methods == 'using_fee_common_with_step') {
            let price = rowData.price_in_fixed + '元';
            price += rowData.price_in_fixed_unit ? '/' + rowData.price_in_fixed_unit : '';
            price += rowData.billing_cycle ? '/' + rowData.billing_cycle : '';
            return price;
        }
        // 有超出费用
        if (rowData.billing_methods == 'using_fee_fixed_with_overflow') {
            let price = rowData.price_in_base + '元';
            price += rowData.price_in_base_unit ? '/' + rowData.price_in_base_unit : '';
            price += rowData.billing_cycle ? '/' + rowData.billing_cycle : '';
            return price;
        }
    }

    getShowDescription(data, charge_cfg) {
        let ignorePrice = ['price', 'price_in_base'];
<<<<<<< HEAD
        let description = this.getDescriptionLoc(data, charge_cfg);
        description += this.getDescriptionSpec(data, charge_cfg, ignorePrice);
=======

        let description = this.getDescriptionSpec(data, charge_cfg, ignorePrice);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

        description += this.getBillingMethods(data, charge_cfg);

        if (this.canShowFee()) { // 是否显示价格信息
            return description
        }

        description += this.getFeeCommonDescription(data, charge_cfg, ignorePrice);

        description += this.getFeeCommonWithStepDescription(data, charge_cfg, ignorePrice);

        description += this.getFeeFixedDescription(data, charge_cfg, ignorePrice);

        description += this.getFeeBaseAndOverflowDescription(data, charge_cfg, ignorePrice);

        // 带宽峰值处理
        description += this.getPeakValue(data, charge_cfg, ignorePrice);
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        return description
    }

    canShowFee() {
        return false
    }

    getPeakValue(data) {
        let description = ''
        if (data.res_id == 7 && data.billing_methods == 'using_fee_fixed_with_overflow' && data.peak_value) {
            return "峰值：" + data.peak_value
        }

        return ''
    }

    getBillingMethods(data, charge_cfg) {
        let billing_methods_title = ''
        if (charge_cfg.billing_methods.length == 2) {
            billing_methods_title = charge_cfg.billing_methods.find(item => item.method == data.billing_methods).text
            return '计费方式：' + billing_methods_title + ','
        }
        return ''
    }

    // 普通计费
    getFeeCommonDescription(data, charge_cfg, ignorePrice) {
<<<<<<< HEAD

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let description = ''
        if (charge_cfg.using_fee_common_without_step == undefined) {
            return description
        }

        charge_cfg.using_fee_common_without_step.map(item => {
            if (ignorePrice.includes(item.ui_id))
                return;
            if (charge_cfg.id == 12 && item.compoment_name === 'idcServiceFeeWidthCountRender') {
                description += data[item.ui_id] ? item.ui_title + ':' + data[item.ui_id] + 'M = ' + (data[item.ui_id] / 1024).toFixed(2) + 'G，' : ''
                return
            }
            description += data[item.ui_id] ? item.ui_title + ':' + data[item.ui_id] + ',' : ''
        })
        return description

    }
    // 普通计费withStep
    getFeeCommonWithStepDescription(data, charge_cfg, ignorePrice) {
        let description = ''
        if (data.billing_methods != 'using_fee_common_with_step' || charge_cfg.using_fee_common_with_step == undefined) {
            return description
        }

        charge_cfg.using_fee_common_with_step.map(item => {
            if (ignorePrice.includes(item.ui_id))
                return;

            description += data[item.ui_id] ? item.ui_title + ':' + data[item.ui_id] + ',' : ''
        })
        return description;
    }


    // 固定计费方式
    getFeeFixedDescription(data, charge_cfg, ignorePrice) {
        let description = ''
        if (data.billing_methods != 'using_fee_fixed_without_overflow' || charge_cfg.using_fee_fixed_without_overflow == undefined) {
            return description
        }
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        charge_cfg.using_fee_fixed_without_overflow.map(item => {
            if (ignorePrice.includes(item.ui_id))
                return;

<<<<<<< HEAD
            description += data[item.ui_id] ? item.ui_title + ':' + data[item.ui_id] : '';

            description += item.cycle ? '/' + data.billing_cycle + ',' : ','

=======
            description += data[item.ui_id] ? item.ui_title + ':' + data[item.ui_id] + ',' : ''
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        })
        return description;
    }

    // 超出计费方式
    getFeeBaseAndOverflowDescription(data, charge_cfg, ignorePrice) {
        let description = ''



        if (data.billing_methods != 'using_fee_fixed_with_overflow' || charge_cfg.using_fee_fixed_with_overflow == undefined) {
            return description
        }

        // 超电上限处理
        if (data.cabinet_electricity_count) {
            description += '超电上限：' + data.alt_amount + '/' + data.alt_amount_unit + ','
        }

        charge_cfg.using_fee_fixed_with_overflow.map(item => {
            if (ignorePrice.includes(item.ui_id) == false && item.ui_id != 'alt_amount' && item.compoment_name != 'cabinet_electricity_count') {
                description += item.ui_title + ':' + data[item.ui_id];
                description += (item.unit && data[item.unit.ui_id]) ? '元/' + data[item.unit.ui_id] : '';
                description += (item.cycle && data[item.cycle.ui_id]) ? '/' + data[item.cycle.ui_id] + '，' : '，';

            }
        })
        return description;
    }

    // 获取详细信息的规格部分
    getDescriptionSpec(data, charge_cfg) {
        let description = ''
        if (charge_cfg.spec == undefined) {
            return description;
        }

<<<<<<< HEAD
        let ignoreSpec = ['cabinet_electricity_count', 'used_months']
        // 机柜电量处理
        if (data.cabinet_electricity_count) {
            description += '机柜电量：' + data.cabinet_electricity_count + data.cabinet_electricity_count_unit + ','
        }
        // 使用月数处理
        if (data.used_months) {
            description +=
                data.used_months_unit == '月'
                    ?
                    '使用时间：' + data.used_months + '个' + this.getMonthUnit(data) + ','
                    :
                    '使用时间：' + data.used_months + this.getMonthUnit(data) + ','
=======
        let ignoreSpec = ['cabinet_electricity_count']
        // 机柜电量处理
        if (data.cabinet_electricity_count) {
            description += '机柜电量：' + data.cabinet_electricity_count + '/' + data.cabinet_electricity_count_unit + ','
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }

        charge_cfg.spec.map(item => {
            if (ignoreSpec.includes(item.ui_id) == false)
                // 带宽类型不显示的时候不拼接
                if (this.isShowWidthType === false && charge_cfg.id == 7 && item.ui_id == 'bandwidth_type') {
                    description += ''
                } else {
<<<<<<< HEAD
                    description += data[item.ui_id] ?
                        item.ui_title + ':' + data[item.ui_id] + '，'
                        :
                        item.ui_title + ': ，'
=======
                    description += item.ui_title + ':' + data[item.ui_id] + '，'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                }
        })
        return description;
    }

<<<<<<< HEAD
    getMonthUnit = (data) => {
        return data.used_months_unit ? data.used_months_unit : ''
    }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    // 收费项验证
    validateChargeData(data) {
        return data.charge_fee_type == '一次性费用'
            ?
            this.onceValidate(data)
            :
            this.cycleValidate(data);
    }

    // 一次性验证
    onceValidate = data => {
        if (!data.costName) {
            message.error('费用名称不能为空！');
            return false;
        }
<<<<<<< HEAD
        if ((this.isShowOneceLoc && !data.loc) || (this.isShowOneceLoc && data.loc === '请选择')) {
            message.error('所在机房不能为空！')
            return false
        }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (data.price === '' || data.price == undefined) {
            message.error('单价不能为空！');
            return false;
        }
<<<<<<< HEAD
        if (data.once_charge_type === '' || data.once_charge_type == undefined) {
            message.error('收费项不能为空！');
            return false;
        }
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        return true
    }

    // 周期性验证
    cycleValidate = data => {
        // 资源项验证
        if (data.res_id == undefined) {
            message.error('请选择收费项.');
            return false;
        }
<<<<<<< HEAD

        // 计费方式验证
        if (data.ui_cfg.billing_methods) {
            if (!data.billing_methods) {
                message.error('请选择计费方式');
                return false
            }
        }
        // 所在机房验证
        if (this.cycleValidateCb(data.ui_cfg.loc, data) == false) {
            return false;
        }

        // 计费方式验证
=======
        // 所在机房验证
        if (data.loc == undefined || data.loc.indexOf('请选择') != -1 || data.loc.indexOf('undefined') != -1) {
            message.error(data.ui_cfg.loc.check_tip_text + data.ui_cfg.loc.ui_title);
            return false;
        }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (data.ui_cfg.billing_methods && data.ui_cfg.billing_methods.length == 2) {
            if (data.billing_methods == undefined || data.billing_methods == '请选择') {
                message.error('请选择计费方式');
                return false;
            }
            if (data.billing_methods == 'fee_fixed' && this.cycleValidateCb(data.ui_cfg.using_fee_fixed_without_overflow, data) == false) {
                return false;
            }
            if (data.billing_methods == 'using_fee_fixed_with_overflow' && this.cycleValidateCb(data.ui_cfg.using_fee_fixed_with_overflow, data) == false) {
                return false;
            }
        }

        // 普通计费验证
        if (data.ui_cfg.billing_methods.length == 1) {
            if (this.cycleValidateCb(data.ui_cfg.using_fee_common_without_step, data) == false) {
                return false;
            }
        }
        // 规格字段的验证
        if (data.ui_cfg.spec != undefined && data.ui_cfg.spec.length != 0) {
            if (this.cycleValidateCb(data.ui_cfg.spec, data) == false) {
                return false;
            };
        }

        return true
    }

    cycleValidateCb(config, data) {
<<<<<<< HEAD
        console.log("周期性字段验证......")

        console.log(toJS(config))
        console.log(toJS(data))


=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        if (config == undefined) return true;
        for (let i = 0; i < config.length; i++) {
            let item = config[i];
            if (item.is_required == 'y') {

                // 带宽的带宽类型验证
                if (item.ui_id == 'bandwidth_type' && this.isShowWidthType == false) {
                    continue;
                }

<<<<<<< HEAD
                // 带宽峰值的验证
                if (item.ui_id == 'over_bandwidth_billing_method' && data[item.ui_id] == '峰值' && !data[item.peak_value.ui_id]) {
                    message.error(data[item.ui_id] + '不能为空')
                    return false;
                }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                if (data[item.ui_id] === '' || data[item.ui_id] == undefined || data[item.ui_id] == '请选择') {
                    message.error(item.check_tip_text + item.ui_title);
                    return false;
                }
                if (item.cycle && data[item.cycle.ui_id] == undefined) {
                    message.error(item.check_tip_text + item.ui_title + '周期');
                    return false
                }
<<<<<<< HEAD
                if ((item.unit && data[item.unit.ui_id] == undefined && item.unit.text) || (item.unit && data[item.unit.ui_id] == undefined && item.unit.options_list)) {
=======
                if (item.unit && data[item.unit.ui_id] == undefined) {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    message.error(item.check_tip_text + item.ui_title + '单位');
                    return false
                }
            }
        }
        return true
    }
}

export default new chargeStore()
