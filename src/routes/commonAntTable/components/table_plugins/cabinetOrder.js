import React from "react";
import { message, Modal, Popover, Descriptions, Select } from "antd";
import api from "@/api/api";
import IDConeButtonStartForm from "./IDConeButtonStartForm";
import navigationStore from "@/store/navigationStore";
export default class CabinetOrder extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.resource_form_group = {};
    }

    state = {
        visible: false,
        formJsonGroup: null
    };

    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据");
            return;
        }
        if (!(await this.isWhetherLaunchWorkOrder())) {
            return;
        }

        // await this.getCustomerDetail();

        // 合同数据为空
        // if (Object.keys(this.state.contractData).length == 0) {
        //     message.error("合同数据为空");
        // }

        this.getFormJson();
    }

    // 普通合同没有归档，大客户合同没有审批到运营维护中心总经理不能发起工单
    isWhetherLaunchWorkOrder = async () => {
        let params = {
            data: {
                process_key:
                    this.props.commonTableStore.selectedRows[0].ifvip == "是"
                        ? "idc_order_vip"
                        : navigationStore.currentMenu.process_key,
                uuid: this.props.commonTableStore.selectedRows[0].uuid
            },
            method: "POST"
        };

        let res = await api.bpm.isWhetherLaunchWorkOrder(params);

        return res.checkresult === "n" ? false : true;
    };

    getCabinetElectricityList = cabinet_electricity_count => {
        if (!cabinet_electricity_count) {
            return [];
        }
        if (cabinet_electricity_count.length == 0) {
            return [];
        }

        return cabinet_electricity_count.map(item => ({
            label: item.keyvalue,
            value: item.keyvalue
        }));
    };

    getFormJson = async () => {
        let params = {
            data: {
                uuid: this.props.commonTableStore.selectedRows[0].uuid
            }
        };

        let json = await api.api_resource.getCabinetorderJson(params);
        if (json.code == "200") {
            this.setState({
                visible: true,
                formJsonGroup: json.jsonschema
            });
        }
    };

    saveFlowdataAndStart = async () => {
        let formData = [];
        let keys = Object.keys(this.resource_form_group);
        for (let j = 0; j < keys.length; j++) {
            let value_key = keys[j];
            let data_temp = await this.resource_form_group[value_key].getJsonFormData()
            data_temp.idc = this.state.formJsonGroup[j].idc
            formData.push(data_temp);
        }

        let params = {
            method: "POST",
            data: {
                contract_id: this.props.commonTableStore.selectedRows[0].id,
                forms: formData
            }
        };

        //预占工单
        let res = await api.api_resource.addCabinetPreAllocateOrder(params);
        if (res.code == 200) {
            this.setState({
                visible: false,
            })
            // this.resource_form_group = {}
        }
    };

    hideFormModal = () => {
        this.setState({
            visible: false
        });
        this.resource_form_group = {};
    };

    getOneStartFormProps(item, key) {
        item.schemajson.properties.group_all["x-props"] = {
            "title": `机柜预占工单（${ item.idc }）`
        }
        let formProps = {
            key,
            item,
            form_name: item.idc + key,
            contractData: this.state.contractData,
            as_virtual: this.props.as_virtual,
            editable: true,
            onChange: this.props.onChange,
            formCfg: item.schemajson,
            referinfo: this.props.commonTableStore.referinfo,
            layoutcfg: 2,
            selectedRows: this.props.commonTableStore.selectedRows,
            commonTableStore: this.props.commonTableStore,
            uuid: null,
            processDefinitionKey: "boss_cabinet_pre_allocate",
            registerForm: this.registerForm,
            initValue: {}
        };
        return formProps;
    }

    registerForm = (key, formRef) => {
        console.log(666, key, formRef);
        this.resource_form_group[key] = formRef;
    };

    render() {
        return (
            <Modal
                title="启动流程"
                onCancel={ this.hideFormModal }
                onOk={ this.saveFlowdataAndStart }
                okText="保存并启动"
                cancelText="取消"
                width="1200px"
                visible={ this.state.visible }
                destroyOnClose={ true }
            >
                { this.state.formJsonGroup &&
                    this.state.formJsonGroup.map((item, index) => {

                        return (
                            <IDConeButtonStartForm
                                key={ index }
                                { ...this.getOneStartFormProps(item, index) }
                            />

                        );
                    }) }
            </Modal>
        );
    }
}
