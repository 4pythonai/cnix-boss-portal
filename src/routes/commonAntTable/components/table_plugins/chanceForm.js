
import React from 'react'
import { Modal, message, Select, Input, InputNumber } from 'antd';
import { observer, inject } from "mobx-react";
import { SearchInput } from '../commonTableCom/searchInput'
import CustomerRemoteSelect from '../commonTableCom/CustomerRemoteSelect'
import api from '@/api/api'

@observer
export default class ChanceForm extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)

    }

    state = {
<<<<<<< HEAD
        currentCustomer: {},
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        visible: false,
        rowData: {
            clueId: null,
            oppName: null,
            proWorkType: null,
            contactPhone: null,
            email: null,
            oppType: null,
            address: null,
            salesStep: null,
            salesMoney: null,
            contactPerson: null,
            contactPhone: null,
            email: null,
            oppDesc: null,
            customName: null
        },

        form_cfg: [
            {
                label: '机会名称',
                key: 'oppName',
                type: 'input',
                required: true,
                regx: /[a-zA-Z0-9_\u4e00-\u9fa5]+/,
                errorMsg: "机会名字输入不合法！",
                isShowMsg: false,
            },
            {
                label: '业务类型',
                key: 'proWorkType',
                type: 'select',
                required: true,
                regx: /[a-zA-Z0-9_\u4e00-\u9fa5]+/,
                errorMsg: "请选择业务类型！",
                isShowMsg: false,
                options_list: [
                    { label: '请选择', value: '请选择' },
                    { label: 'IDC新签业务', value: 'IDC新签业务' },
                    { label: 'IDC续签业务', value: 'IDC续签业务' },
                    { label: 'ISP新签业务', value: 'ISP新签业务' },
                    { label: 'ISP续签业务', value: 'ISP续签业务' },
                    { label: '云服务业务', value: '云服务业务' },
                    { label: '云服务续签业务', value: '云服务续签业务' },
                    { label: 'CDN新签业务', value: 'CDN新签业务' },
                    { label: 'CDN续签业务', value: 'CDN续签业务' },
                ]
            },
            {
                label: '销售阶段',
                key: 'salesStep',
                type: 'select',
                required: true,
                errorMsg: "请选择销售阶段！",
                isShowMsg: false,
                options_list: [
                    { label: '请选择', value: '请选择' },
                    { label: '初步洽谈', value: '初步洽谈' },
                    { label: '需求确认', value: '需求确认' },
                    { label: '方案/报价', value: '方案/报价' },
                    { label: '谈判审核', value: '谈判审核' },
                    { label: '赢单', value: '赢单' },
                    { label: '输单', value: '输单' }
                ]
            },
            {
                label: '机会类型',
                type: 'select',
                key: 'oppType',
                required: true,
                errorMsg: "请选择机会类型！",
                notValue: '请选择',
                isShowMsg: false,
                options_list: [
                    { label: '请选择', value: '请选择' },
                    { label: '新客户', value: '新客户' },
                    { label: '老客户', value: '老客户' }
                ]
            },
            {
                label: '客户名称',
                type: 'searchCustomerInput',
                key: 'customerName',
                required: true,
                errorMsg: "客户输入不正确！",
                notValue: '请选择',
                isShowMsg: false,
                callBack: this.checkCustomer.bind(this),
                options_list: []
            },
            {
                label: '客户地址',
                type: 'string',
                key: 'address',
                required: true,
                errorMsg: '请选择客户地址！',
                isShowMsg: false,
                readOnly: true
            },
            {
                label: '销售金额',
                type: 'number',
                key: 'salesMoney',
<<<<<<< HEAD
                required: true,
=======
                required: false,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                regx: /[1-9]+/,
                errorMsg: "销售金额输入不正确（请输入数字）！",
                isShowMsg: false
            },
            {
                label: '客户联系人',
                type: 'input',
                key: 'contactPerson',
<<<<<<< HEAD
                required: true,
=======
                required: false,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                regx: /[a-zA-Z_\u4e00-\u9fa5]+/,
                errorMsg: "客户联系人输入不正确！",
                isShowMsg: false
            },
            {
                label: '客户电话',
                type: 'input',
                key: 'contactPhone',
<<<<<<< HEAD
                required: true,
                regx: /^1[34578]\d{9}$/,
                errorMsg: "客户电话输入不正确！",
=======
                required: false,
                regx: /^1[34578]\d{9}$/,
                errorMsg: "客户联系电话输入不正确！",
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                isShowMsg: false
            },
            {
                label: '客户邮箱',
                type: 'input',
                key: 'email',
                required: false,
                regx: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                errorMsg: "客户邮箱输入不正确！",
                isShowMsg: false
            },
            {
                label: '描述',
                type: 'textArea',
                key: 'oppDesc',
                required: false
            }
        ],
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length == 0) {
            message.error('请选择一条数据')
            return
        }

        let defaultData = {
            clueId: this.props.commonTableStore.selectedRows[0].id,
            oppName: this.props.commonTableStore.selectedRows[0].clues_name,
            proWorkType: this.props.commonTableStore.selectedRows[0].business_classification_type,
            contactPhone: this.props.commonTableStore.selectedRows[0].customer_phone,
            email: this.props.commonTableStore.selectedRows[0].customer_email,
<<<<<<< HEAD
            customerName: this.props.commonTableStore.selectedRows[0].customName
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }

        this.setState({
            visible: true,
<<<<<<< HEAD
            rowData: { ...this.state.rowData, ...defaultData },
            currentCustomer: {
                key: this.props.commonTableStore.selectedRows[0].customName,
                label: this.props.commonTableStore.selectedRows[0].customName
            }
        })

        let customer_cfg = {
            label: '客户名称',
            type: 'searchCustomerInput',
            key: 'customerName',
            required: true,
            errorMsg: "客户输入不正确！",
            notValue: '请选择',
            isShowMsg: false,
            callBack: this.checkCustomer.bind(this),
            options_list: []
        }
        // this._onChange(customer_cfg, this.props.commonTableStore.selectedRows[0].customName)
        this.addressHandle(this.props.commonTableStore.selectedRows[0].customName)

=======
            rowData: { ...this.state.rowData, ...defaultData }
        })
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    async saveHandler() {
        if (this.validateForm() === false) {
            return;
        }
        let params = { data: this.state.rowData, method: 'POST' };
        let res = await api.clue.transferToOpportunity(params);
        if (res.code == 200) {
            message.success(res.msg);
            this.setState({
                visible: false,
                rowData: {
                    clueId: null,
                    oppName: null,
                    proWorkType: null,
                    contactPhone: null,
                    email: null,
                    oppType: null,
                    address: null,
                    salesStep: null,
                    salesMoney: null,
                    contactPerson: null,
                    contactPhone: null,
                    email: null,
                    oppDesc: null,
                    customName: null
                }
            })

            this.props.refreshTable()
            return;
        }
        message.error(res.msg)
    }

    validateForm() {
        this.state.form_cfg.map(field_cfg => {
            this.validateField(field_cfg, this.state.rowData[field_cfg.key])
        })

        var validate = true;
        this.state.form_cfg.map(field_cfg => {
            let isShowMsg = field_cfg.isShowMsg ? true : false
            if (isShowMsg) {
                validate = false
            }
        })


        return validate
    }

    async checkCustomer(name, value) {
        let params = {
            data: { companyKey: value },
            method: 'POST'
        }
        let response = await api.customer.inquiryCompanyMsg(params);
        value != response.data.data.name
            ?
            this._setErrorMsg(name, true)
            :
            this._setErrorMsg(name, false);
    }

    _setErrorMsg(name, isShowMsg) {
        let form_cfg = [...this.state.form_cfg];
        let position = form_cfg.findIndex(item => item.key == name);

        form_cfg[position].isShowMsg = isShowMsg;

        this.setState({ form_cfg: form_cfg })
    }

    async validateField(field_cfg, value) {
        field_cfg['required'] = field_cfg.required === true ? field_cfg.required : false

        // 必填验证
        if (field_cfg.required === true && (value === '' || value === null || value == undefined || value == '请选择')) {
            this._setErrorMsg(field_cfg.key, true)
            return
        }

        // 必填, 有值验证
        if (field_cfg.required === true && value) {
            if (field_cfg.regx && !field_cfg.regx.test(value)) {
                this._setErrorMsg(field_cfg.key, true)
                return;
            }
<<<<<<< HEAD
=======

            // if (field_cfg.callBack) {
            //     await field_cfg.callBack(field_cfg.key, value);
            //     return
            // }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }

        // 非必填，有值时验证(not 请选择)
        if (field_cfg.required === false && value && field_cfg.callBack) {
            await field_cfg.callBack(field_cfg.key, value);
            return
        }

        this._setErrorMsg(field_cfg.key, false)
    }

    _onChange(field_cfg, value) {
<<<<<<< HEAD
        console.log(field_cfg, value)
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        let name = field_cfg.key;
        let rowData = { ...this.state.rowData };
        rowData[name] = value
        this.setState({
            rowData: rowData
        })
        this.validateField(field_cfg, value)
    }

    async addressHandle(companyName) {
        let params = {
            data: { companyKey: companyName },
            method: 'POST'
        }
        let res = await api.customer.inquiryCompanyMsg(params);
        let field_cfg = this.state.form_cfg.find(item => item.key == 'address');

        this._onChange(field_cfg, res.data.data.address)
    }


    onCancel() {
        this.setState({
            visible: false,
            rowData: {
                clueId: null,
                oppName: null,
                proWorkType: null,
                contactPhone: null,
                email: null,
                oppType: null,
                address: null,
                salesStep: null,
                salesMoney: null,
                contactPerson: null,
                contactPhone: null,
                email: null,
                oppDesc: null,
                customName: null
            }
        })
    }


    getOptions(options_list) {
        return options_list.map((option, index) => {
            return <Select.Option key={index} value={option.value}>{option.value}</Select.Option>
        })
    }

    getElement(item) {
        switch (item.type) {
            case 'input':
                return <Input
                    defaultValue={this.state.rowData[item.key] || null}
                    onChange={(e) => this._onChange(item, e.target.value)} />
            case 'string':
                return this.state.rowData[item.key]
            case 'select':
                return <Select
                    defaultValue={this.state.rowData[item.key]}
                    style={{ width: '100%' }}
                    onChange={value => this._onChange(item, value)}>
                    {this.getOptions(item.options_list)}
                </Select>
            case 'textArea':
                return <Input.TextArea
                    defaultValue={this.state.rowData[item.key]}
                    onChange={value => this._onChange(item, value.target.value)}>
                </Input.TextArea>

            case 'number':
                return <InputNumber
                    style={{ width: '100%' }}
                    defaultValue={this.state.rowData[item.key]}
                    onChange={value => this._onChange(item, value)}>
                </InputNumber>

            case 'searchCustomerInput':
                return <CustomerRemoteSelect
                    onChange={this._onChange.bind(this)}
                    field_cfg={item}
<<<<<<< HEAD
                    defaultValue = {this.state.currentCustomer}
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    addressHandle={this.addressHandle.bind(this)}
                    value={this.state.rowData.customName}
                />
        }
    }


    getFields() {
        return (
            <div className="data_form">
                {
                    this.state.form_cfg.map((item, index) => {
                        return <div key={index} className="form_group">
                            <div className="form_text_info">
                                {item.required && <span className="formIcon">*</span>}
                                {item.label}：</div>
                            <div className="form_value_node">
                                {this.getElement(item)}

                                <div className="errorMsg">
                                    {item.isShowMsg && item.errorMsg}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div >)
    }

    render() {
        return (
            <Modal
                destroyOnClose
                visible={this.state.visible}
                onCancel={() => this.onCancel()}
                onOk={() => this.saveHandler()}
                style={{ width: '400px' }}
                title="线索转为机会" >
                {this.getFields()}
            </Modal >)
    }
}


