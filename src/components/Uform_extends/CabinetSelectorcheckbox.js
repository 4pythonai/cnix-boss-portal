import React, { useState } from "react";
import {
  Form,
  Select,
  Table,
  Modal,
  Button,
  Input,
  Icon,
  Checkbox,
  message,
  Radio,
} from "antd";
import api from "@/api/api";
import CommonTable from "@/routes/commonAntTable/components/commonTableCom/commonTable";
import { inject, observer } from "mobx-react";
@inject("IDC_cfg_store")
export default class CabinetSelectorcheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedRows: [],
      contractDetail: {},
      customerList: [],
      customerid: "",
      chargeData: [],
      selectedKeys: [],
      cabinetData: [],
      setlectedCabinets:[],
      charageSelectedId: "",
    };
    this.store = this.props.IDC_cfg_store;
    this.handleOk = this.handleOk.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  async componentDidMount() {
    if (
      this.props.commontablestore.selectedRows[0] &&
      this.props.commontablestore.selectedRows[0].contractno != null
    ) {
      let params = {
        data: {
          id: this.props.commontablestore.selectedRows[0].ghost_contractno
            ? this.props.commontablestore.selectedRows[0].ghost_contractno
            : this.props.commontablestore.selectedRows[0].contractno,
          contract_action: "IDCReceiveContract",
        },
        method: "POST",
      };
      let res = await api.contract_api.getContractDataById(params);
      if (res.code == 200) {
        let arr = [
          {
            customerName: res.data.customName,
            addressName: res.data.address,
          },
        ];
        res.data.sign_customers = arr;
        this.setState({
          contractDetail: res.data,
          chargeData: res.data.chargeData,
        });
        if (
          this.props.commontablestore.action_code ==
            "boss_idc_isp_retreat_line" ||
          this.props.commontablestore.action_code == "idc_network_close_order"
        ) {
          var arr1 = [];
          arr1.push(this.props.commontablestore.selectedRows[0].chagredataId);
          this.setState({
            selectedKeys: arr1,
          });
        }

        this.props.onChange(
          this.props.commontablestore.selectedRows[0].ghost_contractno
            ? this.props.commontablestore.selectedRows[0].ghost_contractno
            : this.props.commontablestore.selectedRows[0].contractno
        );
      }
    }
  }
  onClick() {
    this.setState({
      visible: true,
    });
  }
  onChange(e) {
    this.setState({
        setlectedCabinets: e
    },()=>{this.props.onChange(this.state.setlectedCabinets)})
  }

  getrowdata() {
      console.log(9999999999,this.state.cabinetData)
    if (this.state.cabinetData.length > 0) {
      return (
        <Checkbox.Group onChange={this.onChange.bind(this)}>
          {this.state.cabinetData.map((item, index) => {
            return (
              <Checkbox
                style={{ marginLeft: "2px",marginTop:'5px' }}
                key={index}
                value={item.cabinet_no}
              >
                {item.cabinet_no}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      );
    }
  }

  async handleOk() {
    if (this.state.selectedRows.length != 0) {
      let params = {
        data: {
          id: this.state.selectedRows[0].id,
          contract_action: "IDCReceiveContract",
        },
        method: "POST",
      };
      let res = await api.contract_api.getContractDataById(params);
      if (res.code == 200) {
        if (res.data.sign_customers.length == 1) {
          this.setState({
            visible: false,
            contractDetail: res.data,
            chargeData: res.data.chargeData,
          });
        }
      }
      let params1 = {
        data: {
          contract_no: this.state.selectedRows[0].contract_no,
          size: 1000,
          page: 1,
        },
        method: "POST",
      };
      let resp = await api.cabinet_api.getCabinetTableData(params1);
      if (resp.code == 200) {
        this.setState({
          cabinetData: resp.data,
        });
      }
    } else {
      message.error("您还没有选择合同，请选择");
    }
  }
  sendData(selectedRows) {
    this.setState({
      selectedRows: selectedRows,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
      selectedRows: [],
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.onClick}>根据合同选择机柜</Button>
        <div>{this.getrowdata()}</div>
        <Modal
          title="选择合同"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          width="1200px"
          visible={this.state.visible}
        >
          <CommonTable
            ref="commonTableRef"
            key="boss_contract_work_order"
            action_code={
              this.props.uform_para == "select_IDC_contract"
                ? "select_IDC_contract"
                : "boss_contract_work_order"
            }
            sendData={(res) => this.sendData(res)}
          />
        </Modal>
      </div>
    );
  }
}
