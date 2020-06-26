import React from "react";
import { message, Modal, Popover, Descriptions, Select } from "antd";
import api from "@/api/api";
import navigationStore from "@/store/navigationStore";


import IDConeButtonStartForm from "./IDConeButtonStartForm";
import { toJS } from "mobx";


// 新版本一键启动, 

export default class IDCtribleorder extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;

        this.state = {
            form_visible: false,
            ordersJson: [],
            customerInfo: {},
            customer_id: "",
            addressName: "",
            cabinetElectricityList: [],
            contractData: {}
        };
        this.resource_form_group = {};
        this.init = this.init.bind(this);
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据");
            return;
        }

        let params = {
            data: {
                uuid: this.props.commonTableStore.selectedRows[0].uuid
            },
            method: "POST"
        };

        let res = await api.api_resource.getTribleJson(params);


        if (res.code == 200) {
            var orderjson = []
            if (res.cabjson) {
                for (var i = 0; i < res.cabjson.length; i++) {
                    res.cabjson[i].processDefinitionKey = 'boss_cabinet_pre_allocate'
                }
                orderjson.push(res.cabjson)
            }

            if (res.networkjson) {
                // 网络工单,数组只能有一个记录.
                for (var j = 0; j < res.networkjson.length; j++) {
                    res.networkjson[j].processDefinitionKey = 'idc_network_op_order'
                }
                orderjson.push(res.networkjson)
            }

            if (res.linejson) {
                // 网络工单,数组只能有一个记录.
                for (var j = 0; j < res.linejson.length; j++) {
                    res.linejson[j].processDefinitionKey = 'idc_isp_line_order'
                }
                orderjson.push(res.linejson)
            }




            this.setState({
                ordersJson: orderjson
            });

            console.log('查看orderjson',orderjson);

        }


        if (!await this.isWhetherLaunchWorkOrder()) {
            return
        }

        this.setState({
            form_visible: true
        });

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




    saveFlowdataAndStart = async () => {


        let formData = {};
        let keys = Object.keys(this.resource_form_group);
        for (let j = 0; j < keys.length; j++) {
            let value_key = keys[j];
            formData[value_key] = await this.resource_form_group[
                value_key
            ].getJsonFormData();
        }

        let params = {
            method: "POST",
            data: {
                uuid: this.props.commonTableStore.selectedRows[0].uuid,
                forms: formData
            }
        };

        console.log(params);

        let res = await api.api_resource.addCabinetOrNetworkOrLineOrder(params);
        if (res.code == 200) {
            this.setState({
                form_visible: false,
                ordersJson: []
            });
            this.resource_form_group = {};
        }
    };

    hideFormModal = () => {
        this.setState({
            form_visible: false,
            ordersJson: []
        });
        this.resource_form_group = {};
    };

    registerForm = (key, formRef) => {
        this.resource_form_group[key] = formRef;
    };



    getOneStartFormProps(item, key) {
        console.log(item)

        if (item.processDefinitionKey == "boss_cabinet_pre_allocate") {
            item.schemajson.properties.group_all["x-props"] = {
                'title': "机柜预占工单(" + item.idc + ")"
            }
        }

        if (item.processDefinitionKey == "idc_network_op_order") {
            item.schemajson.properties.group_all["x-props"] = {
                'title': "网络开通工单(" + item.idc + ")"
            }
        }

        if (item.processDefinitionKey == "idc_isp_line_order") {
            item.schemajson.properties.group_all["x-props"] = {
                'title': "线路开通工单"
            }
        }


        // item.schemajson.properties.group_all["x-props"] = {
        //     'title': item.idc
        // }

        //         res.cabjson[i].processDefinitionKey = 'boss_cabinet_pre_allocate'
        //         res.networkjson[j].processDefinitionKey = 'idc_network_op_order'

        let formprops = {
            form_name: item.processDefinitionKey + key,
            formCfg: item.schemajson,
            onChange: this.props.onChange,
            referinfo: this.props.commonTableStore.referinfo,
            commonTableStore: this.props.commonTableStore,
            registerForm: this.registerForm,
            processDefinitionKey: item.processDefinitionKey,
            layoutcfg: 2
        }
        return formprops
    }


    generateForm() {
        return this.state.ordersJson.map((billitem, index) => {
            return billitem.map((item, index) => {
                return (
                    <IDConeButtonStartForm
                        key={ index }
                        { ...this.getOneStartFormProps(item, index) }
                    />
                );
            })

        });
    }

    render() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            return null;
        }

        return (
            <Modal
                title="启动流程"
                onCancel={ this.hideFormModal }
                onOk={ this.saveFlowdataAndStart }
                okText="保存并启动"
                cancelText="取消"
                width="1200px"
                visible={ this.state.form_visible }
                destroyOnClose={ true }
            >



                { this.generateForm() }
            </Modal>
        );
    }
}
