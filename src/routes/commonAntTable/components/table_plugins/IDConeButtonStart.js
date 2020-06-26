// import React from "react";
// import { message, Modal, Popover, Descriptions, Select } from "antd";
// import api from "@/api/api";
// import navigationStore from "@/store/navigationStore";
// import ChargeTable from "@/routes/contract/components/chargeCom/ChargeTable";
// import chargeStore from "@/store/chargeStore";
// import IDC_cfg_store from "@/store/IDC_cfg_store";
// import IDConeButtonStartForm from "./IDConeButtonStartForm";
// import { toJS } from "mobx";
// import cabinet_deploy from "./idc_flow_json/cabinet_deploy.json";
// import cabinet_occupy from "./idc_flow_json/cabinet_occupy.json";
// import network_deploy from "./idc_flow_json/network_deploy.json";
// import ispline_deploy from "./idc_flow_json/ispline_deploy.json";

// export default class IDConeButtonStart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.commonTableStore = props.commonTableStore;
//     this.chargeStore = chargeStore;
//     this.IDC_cfg_store = IDC_cfg_store;
//     this.state = {
//       form_visible: false,
//       chargeSubmitData: [],
//       customerInfo: {},
//       customer_id: "",
//       addressName: "",
//       cabinetElectricityList: [],
//       contractData: {}
//     };
//     this.resource_form_group = {};
//     this.init = this.init.bind(this);
//   }

//   async init() {
//     if (this.props.commonTableStore.selectedRows.length != 1) {
//       message.error("请选择一条数据");
//       return;
//     }
//    if (!await this.isWhetherLaunchWorkOrder()) {
//             return
//         }

//     this.setState({
//       form_visible: true
//     });

//     await this.getChargeData();
//     await this.getCustomerDetail();
//     // 合同数据为空
//     if (Object.keys(this.state.contractData).length == 0) {
//       message.error("合同数据为空");
//     }
//     // 收费项数据为空
//     if (this.state.chargeSubmitData.length == 0) {
//       message.error("收费项数据为空");
//     }
//   }

//   // 普通合同没有归档，大客户合同没有审批到运营维护中心总经理不能发起工单
//   isWhetherLaunchWorkOrder = async () => {
//     let params = {
//       data: {
//         process_key:
//           this.props.commonTableStore.selectedRows[0].ifvip == "是"
//             ? "idc_order_vip"
//             : navigationStore.currentMenu.process_key,
//         uuid: this.props.commonTableStore.selectedRows[0].uuid
//       },
//       method: "POST"
//     };

//     let res = await api.bpm.isWhetherLaunchWorkOrder(params);

//     return res.checkresult === "n" ? false : true;
//   };

//   getCustomerDetail = async () => {
//     let params = {
//       data: {
//         contract_action: "IDCReceiveContract",
//         id: this.props.commonTableStore.selectedRows[0].id
//       },
//       method: "POST"
//     };

//     let res = await api.contract_api.getContractDataById(params);

//     if (res.code == 200) {
//       let cabinetElectricityList = this.getCabinetElectricityList(
//         res.data.cabinet_electricity_count
//       );
//       await this.setState({
//         contractData: res.data,
//         cabinetElectricityList,
//         customerInfo: res.data,
//         customer_id:
//           res.data.sign_customers.length > 0
//             ? res.data.sign_customers[0].customerId
//             : "",
//         addressName:
//           res.data.sign_customers.length > 0
//             ? res.data.sign_customers[0].addressName
//             : ""
//       });
//     }
//   };

//   customerChange = customer_id => {
//     let address = this.state.customerInfo.sign_customers.find(
//       item => item.customerId == customer_id
//     );
//     let addressName = address.addressName;
//     this.setState({ customer_id, addressName });
//   };

//   async getChargeData() {
//     this.IDC_cfg_store.setUuid(this.commonTableStore.selectedRows[0].uuid);
//     this.IDC_cfg_store.setProcessKey(navigationStore.currentMenu.process_key);
//     // this.IDC_cfg_store.setDetailContractNo(
//     //   this.commonTableStore.selectedRows[0].contract_no
//     // );
//     this.props.type
//       ? await this.chargeStore.getChargeList("", this.props.type)
//       : await this.chargeStore.getChargeList("", this.props.type);

//     if (this.props.cabinet_process_key === "reserved_response") {
//       var chargeData = [];
//       for (var i = 0; i < this.chargeStore.chargeSubmitData.length; i++) {
//         if (this.chargeStore.chargeSubmitData[i].resname == "机柜预留费") {
//           chargeData.push(this.chargeStore.chargeSubmitData[i]);
//         }
//       }
//       this.setState({ chargeSubmitData: chargeData });
//     } else if (this.props.cabinet_process_key === "open_response") {
//       var chargeData = [];
//       for (var i = 0; i < this.chargeStore.chargeSubmitData.length; i++) {
//         if (
//           this.chargeStore.chargeSubmitData[i].resname == "机柜(含电)" ||
//           this.chargeStore.chargeSubmitData[i].resname == "机柜(机电分离)"
//         ) {
//           chargeData.push(this.chargeStore.chargeSubmitData[i]);
//         }
//       }
//       this.setState({ chargeSubmitData: chargeData });
//     } else {
//       this.setState({ chargeSubmitData: this.chargeStore.chargeSubmitData });
//     }
//   }

//   renderMore(text, record, title, count) {
//     return (
//       <Popover title={title} content={text}>
//         <span className="lookMore">{text}</span>
//       </Popover>
//     );
//   }

//   getTableColumns() {
//     return [
//       {
//         title: "收费类型",
//         dataIndex: "charge_fee_type",
//         key: "charge_fee_type",
//         width: 120
//       },
//       {
//         title: "收费项",
//         dataIndex: "resname",
//         key: "resname",
//         width: 150
//       },
//       {
//         title: "单价",
//         dataIndex: "price",
//         key: "price",
//         width: 150
//       },

//       {
//         title: "数量",
//         dataIndex: "num",
//         key: "num",
//         width: 81
//       },

//       {
//         title: "详细信息",
//         dataIndex: "description",
//         key: "description"
//       },
//       {
//         title: "备注",
//         dataIndex: "memo",
//         key: "memo",
//         render: (text, record) => this.renderMore(text, record, "备注", 8)
//       }
//     ];
//   }

//   saveFlowdataAndStart = async () => {
//     if (!this.state.customer_id) {
//       message.warning("请选择客户！");
//       return;
//     }

//     let formData = {};
//     let keys = Object.keys(this.resource_form_group);
//     for (let j = 0; j < keys.length; j++) {
//       let value_key = keys[j];
//       formData[value_key] = await this.resource_form_group[
//         value_key
//       ].getJsonFormData();
//       formData[value_key]["charge_id"] = this.resource_form_group[
//         value_key
//       ].props.billitem.key;
//     }

//     let params = {
//       method: "POST",
//       data: {
//         contract_id: this.props.commonTableStore.selectedRows[0].id,
//         forms: formData
//       }
//     };

//     console.log(params);

//     let res = await api.api_resource.addCabinetOrNetworkOrLineOrder(params);
//     if (res.code == 200) {
//       this.setState({
//         form_visible: false,
//         chargeSubmitData: []
//       });
//       this.resource_form_group = {};
//     }
//   };

//   hideFormModal = () => {
//     this.setState({
//       form_visible: false,
//       chargeSubmitData: []
//     });
//     this.resource_form_group = {};
//   };

//   registerForm = (key, formRef) => {
//     this.resource_form_group[key] = formRef;
//   };

//   getCabinetElectricityList = cabinet_electricity_count => {
//     if (!cabinet_electricity_count) {
//       return [];
//     }
//     if (cabinet_electricity_count.length == 0) {
//       return [];
//     }

//     return cabinet_electricity_count.map(item => ({
//       label: item.keyvalue,
//       value: item.keyvalue
//     }));
//   };

//   getGhostData = formData => {
//     this.props.commonTableStore.triggers.map(item => {
//       if (item.props.ass_select_field_id === "preoccupationidc") {
//         formData["ghost_" + item.props.ass_select_field_id] =
//           formData[item.props.ass_select_field_id];

//         let option_obj = item.state.optionList.find(optionItem => {
//           console.log(optionItem, formData[item.props.ass_select_field_id]);
//           if (optionItem.value == formData[item.props.ass_select_field_id]) {
//             return optionItem;
//           }
//         });
//         formData[item.props.ass_select_field_id] =
//           typeof option_obj === "object" ? option_obj.label : "";
//       }
//     });
//     return formData;
//   };

//   // 获取表单配置
//   generateJsonConfig(billitem) {
//     if (billitem.ui_cfg.flow_type == "A") {
//       if (this.props.cabinet_process_key === "open_response") {
//         this.commonTableStore.formCfg = cabinet_deploy; //机柜开通模拟.
//         return cabinet_deploy;
//       }
//       if (this.props.cabinet_process_key === "reserved_response") {
//         this.commonTableStore.formCfg = cabinet_occupy; //机柜预占模拟.
//         return cabinet_occupy;
//       }
//       this.commonTableStore.formCfg = cabinet_deploy; //机柜开通模拟.
//       return cabinet_deploy;
//     }

//     if (billitem.ui_cfg.flow_type == "B") {
//       this.commonTableStore.formCfg = network_deploy; //网络开通模拟.
//       return network_deploy;
//     }

//     if (billitem.ui_cfg.flow_type == "C") {
//       let form_json = this.refineLineJson(billitem);
//       return form_json;
//     }

//     return null;
//   }

//   // 线路工单重新配置.

//   refineLineJson(billitem) {
//     //  9	C	y	y	y	机房跳线	jumper	y				NULL	NULL	NULL	NULL	n
//     // 11	C	y	y	y	DX费用	dx	y				NULL	NULL	NULL	NULL	n
//     // 14	C	y	y	y	专线	private_circuit	y				NULL	NULL	NULL	NULL	n
//     // 15	C	y	y	y	波分	wavelength_division	y				NULL	NULL	NULL	NULL	n
//     // 16	C	y	y	y	裸纤	simple_fiber	y				NULL	NULL	NULL	NULL	y

//     //   // DX 业务, 需要填写 对方的机房.
//     // if(billitem.ui_cfg.rescode == 'dx'){
//     //     form_json.
//     // }

//     // console.log(toJS(billitem))
//     let x_ispline_deploy = ispline_deploy;
//     // console.log(x_ispline_deploy)

//     // 专线
//     // if (billitem.ui_cfg.rescode == 'private_circuit') {
//     if (billitem.ui_cfg.flow_type == "C" && billitem.ui_cfg.rescode != "dx") {
//       if (billitem.start_type == "楼外") {
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.a_idcid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.a_buildingid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.a_floorid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.a_roomid;
//       }

//       if (billitem.end_type == "楼外") {
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.z_idcid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.z_buildingid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.z_floorid;
//         delete x_ispline_deploy.properties.group_all.properties
//           .UFORM_NO_NAME_FIELD0.properties.z_roomid;
//       }
//     }

//     // DX
//     if (billitem.ui_cfg.rescode == "dx") {
//       x_ispline_deploy.properties.group_all.properties.UFORM_NO_NAME_FIELD0.properties.z_idcid.required = true;
//       x_ispline_deploy.properties.group_all.properties.UFORM_NO_NAME_FIELD0.properties.z_idcid[
//         "x-props"
//       ].disabled = false;
//     }

//     this.commonTableStore.formCfg = x_ispline_deploy; //线路开通模拟.
//     // console.log(x_ispline_deploy)
//     return x_ispline_deploy;
//   }

//   // 获取表单的流程key
//   getProcessKey(type) {
//     if (type == "A") {
//       if (this.props.cabinet_process_key) {
//         return this.props.cabinet_process_key;
//       }
//       return "open_response";
//     }

//     if (type == "B") {
//       return "idc_network_op_order";
//     }
//     if (type == "C") {
//       return "idc_isp_line_order";
//     }
//     return null;
//   }

//   // 初始化form value
//   getInitValue(billitem) {
//     let type = billitem.ui_cfg.flow_type;
//     if (type == "A") {
//       return {
//         ischarging: "y",
//         preoccupationidc: this.getLoc_A(billitem),

//         startPoint: this.getStartPoint(billitem),
//         endPoint: this.getEndPoint(billitem),
//         accesstype: this.getAccesstype(billitem),
//         orderdesc: this.state.contractData.cabinet_description,
//         addcabinetpower: billitem.cabinet_electricity_count || 0,
//         cabinetsnumber: billitem.top_limited_amount
//       };
//     }

//     if (type == "B") {
//       return {
//         preoccupationidc: this.getLoc_B(billitem),
//         startPoint: this.getStartPoint(billitem),
//         endPoint: this.getEndPoint(billitem),
//         accesstype: this.getAccesstype(billitem),
//         taskrequirementdescription: this.state.contractData
//           .bandwidth_description
//       };
//     }
//     if (type == "C") {
//       // console.log(toJS(billitem))
//       return {
//         a_idcid: this.getLoc_C_start(billitem),
//         z_idcid: this.getLoc_C_end(billitem),

//         startPoint: this.getStartPoint(billitem),
//         endPoint: this.getEndPoint(billitem),

//         accesstype: this.getAccesstype(billitem),
//         taskrequirementdescription: this.state.contractData.isp_description
//       };
//     }
//   }

//   // 获取idc
//   getLoc_A = billitem => {
//     let loc = "";

//     billitem.ui_cfg.loc[0].options_list.map(item => {
//       if (item.text === billitem.loc) {
//         loc = item.value;
//       }
//     });
//     console.log("获取idc数据查看", billitem);
//     console.log("A的loc", loc);
//     return loc;
//   };

//   getLoc_B = billitem => {
//     let loc = "";
//     billitem.ui_cfg.loc[0].options_list.map(item => {
//       if (
//         (item.text === billitem.loc && billitem.ui_cfg.flow_type === "A") ||
//         (item.text === billitem.loc && billitem.ui_cfg.flow_type === "B") ||
//         (item.text === billitem.loc && billitem.ui_cfg.flow_type === "C")
//       ) {
//         loc = item.value;
//       }
//     });
//     console.log("获取idc数据查看", billitem);
//     console.log("B的loc", loc);
//     return loc;
//   };

//   getLoc_C_start = billitem => {
//     // console.log(toJS(billitem))
//     let loc = "";

//     if (billitem.ui_cfg.rescode == "dx") {
//       billitem.ui_cfg.loc[0].options_list.map(item => {
//         if (item.text === billitem.loc) {
//           loc = item.value;
//         }
//       });
//       return loc;
//     } else {
//       billitem.ui_cfg.loc[1].options_list.map(item => {
//         if (item.text === billitem.loc_start) {
//           loc = item.value;
//         }
//       });
//       return loc;
//     }
//   };

//   getLoc_C_end = billitem => {
//     // console.log(toJS(billitem))
//     if (billitem.ui_cfg.rescode == "dx") {
//       return "";
//     }

//     let loc = "";
//     billitem.ui_cfg.loc[3].options_list.map(item => {
//       if (item.text === billitem.loc_end) {
//         loc = item.value;
//       }
//     });

//     return loc;
//   };

//   // 起点
//   getStartPoint(rowdata) {
//     if (rowdata.resname === "DX费用") {
//       return rowdata.loc;
//     }
//     if (rowdata.loc_start && rowdata.loc_end) {
//       return rowdata.loc_start;
//     }
//     return rowdata.loc;
//   }

//   // 终点
//   getEndPoint(rowdata) {
//     if (rowdata.resname === "DX费用") {
//       return rowdata.dx_vernor;
//     }
//     if (rowdata.loc_start && rowdata.loc_end) {
//       return rowdata.loc_end;
//     }
//     return rowdata.loc;
//   }

//   // 接入类型
//   getAccesstype(rowdata) {
//     if (rowdata.resname == "裸纤") {
//       return "裸纤";
//     }
//     if (rowdata.resname == "波分") {
//       return "波分";
//     }
//     if (rowdata.resname == "DX费用") {
//       return "DX";
//     }
//     if (rowdata.resname == "机房跳线") {
//       return rowdata.jumper_type;
//     }
//     if (rowdata.resname == "专线") {
//       return rowdata.line_type;
//     }
//     return "";
//   }

//   getOneStartFormProps(billitem, key) {
//     let form_json = this.generateJsonConfig(billitem);
//     let formProps = {
//       key,
//       billitem,
//       form_name: billitem.ui_cfg.flow_type + key,
//       contractData: this.state.contractData,
//       as_virtual: this.props.as_virtual,
//       editable: true,
//       onChange: this.props.onChange,
//       formCfg: form_json,
//       referinfo: this.props.commonTableStore.referinfo,
//       layoutcfg: 2,
//       selectedRows: this.props.commonTableStore.selectedRows,
//       commonTableStore: this.props.commonTableStore,
//       uuid: null,
//       processDefinitionKey: this.getProcessKey(billitem.ui_cfg.flow_type),
//       registerForm: this.registerForm,
//       initValue: this.getInitValue(billitem)
//     };

//     // 机柜资源工单，获取人员接口添加是否收费参数
//     if (billitem.ui_cfg.flow_type == "A") {
//       formProps.getUserParams = { ischarging: "y" };
//     }
//     return formProps;
//   }

//   generateForm() {
//     return this.state.chargeSubmitData.map((billitem, index) => {
//       if (billitem.ui_cfg) {
//         return (
//           <IDConeButtonStartForm
//             key={index}
//             {...this.getOneStartFormProps(billitem, index)}
//           />
//         );
//       }
//     });
//   }

//   render() {
//     if (this.props.commonTableStore.selectedRows.length != 1) {
//       return null;
//     }
//     // 合同数据为空
//     if (Object.keys(this.state.contractData).length == 0) {
//       // message.error('合同数据为空')
//       return null;
//     }
//     // 收费项数据为空
//     if (this.state.chargeSubmitData.length == 0) {
//       // message.error('收费项数据为空')
//       return null;
//     }

//     return (
//       <Modal
//         title="启动流程"
//         onCancel={this.hideFormModal}
//         onOk={this.saveFlowdataAndStart}
//         okText="保存并启动"
//         cancelText="取消"
//         width="1200px"
//         visible={this.state.form_visible}
//         destroyOnClose={true}
//       >
//         <ChargeTable
//           key="form_chargeTable"
//           disabled={true}
//           scroll={{ x: 1356 }}
//           columns={this.getTableColumns()}
//         />
//         {this.state.customerInfo.sign_customers ? (
//           <Descriptions bordered column={4}>
//             <Descriptions.Item span={2} label="销售负责人">
//               {this.state.customerInfo.staff_name}
//             </Descriptions.Item>
//             <Descriptions.Item span={2} label="销售负责人部门">
//               {this.state.customerInfo.currentdeptname}
//             </Descriptions.Item>

//             <Descriptions.Item span={2} label="选择客户">
//               <Select
//                 style={{ width: "300px" }}
//                 onChange={this.customerChange}
//                 value={this.state.customer_id || ""}
//               >
//                 {this.state.customerInfo.sign_customers.map(item => {
//                   return (
//                     <Select.Option
//                       key={item.customerId}
//                       value={item.customerId}
//                     >
//                       {item.customerName}
//                     </Select.Option>
//                   );
//                 })}
//               </Select>
//             </Descriptions.Item>
//             <Descriptions.Item span={2} label="客户地址">
//               {this.state.addressName}
//             </Descriptions.Item>
//             <Descriptions.Item span={2} label="客户联系人">
//               {this.state.customerInfo.contactPerson}
//             </Descriptions.Item>
//             <Descriptions.Item span={2} label="客户联系电话">
//               {this.state.customerInfo.contactPhone}
//             </Descriptions.Item>
//           </Descriptions>
//         ) : null}

//         {this.generateForm()}
//       </Modal>
//     );
//   }
// }
