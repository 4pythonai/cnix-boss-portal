import CommonTableForm from "../../commonTableCom/commonTableForm";
import React from "react";
import { observer, inject } from "mobx-react";

import api from "@/api/api";

import { Modal, Descriptions, message } from "antd";

import {
  SchemaForm,
  Submit,
  FormButtonGroup,
  createFormActions,
} from "@uform/antd";

// 单独为腾然准备的竣工单按钮.

@observer
export default class GenerateCabinetCompleteOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      refer_uuid: "",
      refer_paperno: "",
      setlectedCabinets: [],
      canedit: "true",
      endtype: "acceptance_cabinet",
      rowkey: [],
      obj: {},
    };
    this.init = this.init.bind(this);
  }

  init() {
    if (this.props.commonTableStore.selectedRows.length != 1) {
      message.error("请选择一条数据");
      return;
    }
    if (this.props.commonTableStore.selectedRows[0].flownode != "已归档") {
      message.error("已归档数据才可以生成竣工单");
      return;
    }
    if (
      this.props.commonTableStore.selectedRows[0].processDefinitionKey !=
      "boss_cabinet_pre_allocate"
    ) {
      message.error("只有机柜开通工单才可以生成竣工单");
      return;
    }
    this.fetchOrderInfo();
    console.log(this.props.commonTableStore.selectedRows);
  }

  async fetchOrderInfo() {
    let params = {
      data: {
        uuid: this.props.commonTableStore.selectedRows[0].uuid,
        contractno: this.props.commonTableStore.selectedRows[0].contractno,
      },
      method: "POST",
    };

    let res = await api.acceptance.getIDCCabinetOrderData(params);
    this.setState({ visible: true });
    let row = this.props.commonTableStore.selectedRows[0];
    let obj = {};
    let rowKey = [];
    obj.开通单流水号 = row.paperno;
    obj.合同编号 = res.orderdata.contractno;
    obj.合同名称 = res.orderdata.contractname;
    obj.客户名称 = res.orderdata.custname;
    obj.合同类型 = res.orderdata.rent_type;
    obj.新增机柜数量 = res.orderdata.cabinetsnumber;
    obj.申请人 = res.orderdata.author;
    obj.添加日期 = row.adddate;
    obj.流程状态 = row.flownode;
    obj.机柜编号 = res.orderdata.cabinets;

    rowKey = Object.keys(obj);
    this.setState({
      rowkey: rowKey,
      obj: obj,
    });

    console.log(this.state.rowkey);
    console.log(this.state.obj);
  }

  saveFormData = async (values) => {
    values.refer_uuid = this.props.commonTableStore.selectedRows[0].uuid;
    values.refer_paperno = this.props.commonTableStore.selectedRows[0].paperno;

    values.endtype = this.state.endtype;
    let params = { data: values, method: "POST" };
    let res = await api.acceptance.addIDCCompleteorder(params);
    if (res.code == 200) {
      this.setState({
        visible: false,
      });
    }
  };

  handlecancel() {
    this.setState({
      visible: false,
    });
  }

  renderrows(key, value) {
    console.log(key);
    console.log(value);

    if (key == "机柜编号") {
      if (value) {
        let arr = value.split(",");
        return arr.map((item) => {
          return <div>{item}</div>;
        });
      }
      return value;
    }

    return value;
  }

  hideCustomerModal() {
    this.setState({ visible: false });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log("================render");
    console.log(this.state.rowkey);
    console.log(this.state.rowkey.length);

    if (this.state.rowkey.length > 1) {
      return (
        <Modal
          width="1200px"
          footer={null}
          height={1000}
          title="新增机柜竣工单"
          ref="commonModalRef"
          layoutcfg={2}
          closable={true}
          cancelText="取消"
          okText="确认"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.visible}
        >
          <div>
            <Descriptions
              key={this.state.rowkey}
              bordered
              columns={2}
              style={{ marginLeft: "10px" }}
            >
              {this.state.rowkey.map((onekey, index) => {
                return (
                  <Descriptions.Item key={onekey} label={onekey}>
                    {this.renderrows(onekey, this.state.obj[onekey])}
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </div>
          <div style={{ marginLeft: "100px", marginTop: "15px" }}>
            <SchemaForm
              onSubmit={(values) => this.saveFormData(values)}
              schema={{
                type: "object",
                properties: {
                  // "completed_cabinets": {
                  //     "type": "UncompletedCabinetSelector",
                  //     "title": "选择机柜",
                  //     "x-props": { 'paperno': this.state.obj.paperno },
                  //     "required": true
                  // },

                  delivertime: {
                    type: "date",
                    title: "上架日期",
                    required: true,
                  },

                  powerontime: {
                    type: "date",
                    title: "加电日期",
                    required: true,
                  },
                  fileuploader: {
                    type: "fileuploader",
                    "x-props": { edit: this.state.canedit, uform_para: "true" },
                    title: "上传附件",
                  },
                  memo: {
                    type: "string",
                    "x-component": "textarea",
                    title: "备注",
                    required: true,
                  },
                },
              }}
              labelCol={5}
              wrapperCol={15}
            >
              <FormButtonGroup style={{ marginLeft: "350px" }}>
                <Submit>生成竣工单</Submit>
              </FormButtonGroup>
            </SchemaForm>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal
          width="1000px"
          height={1000}
          footer={null}
          title="新增机柜竣工单"
          ref="commonModalRef"
          layoutcfg={2}
          closable={true}
          cancelText="取消"
          okText="确认"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.visible}
        ></Modal>
      );
    }
  }
}
