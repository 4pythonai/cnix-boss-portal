import React from "react";
import FlowFormWrapper from "../components/flowFormWrapper";
import "../flow.scss";
import { Button, Collapse, Descriptions, Icon, message } from "antd";
import { toJS } from "mobx";
import { hashHistory } from "react-router";
import { observer, inject } from "mobx-react";
import FlowReferInfo from "./flowReferInfo";
import GuideReferInfo from "./guideReferInfo";

import api from "@/api/api";
import ContractContainer from "@/routes/contract/components/contractContainer";
import DetailWrapper from "@/routes/contract/components/detailCom/detailWrapper";
import ISPContractContainer from "@/routes/contract/components/contractContainer";
import FlowmModal from "./flowFromModal";
import VoucherMOdal from "./voucherMOdal";
// import CombineModal from './combineModal'

const { Panel } = Collapse;

@inject("FlowApprovalStore")
@observer
export default class FlowForm extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.FlowApprovalStore;
    this.state = {
      visible: false,
      flowformdata: {},
    };

    this.children = [];
  }

  async componentDidMount() {
    this.children = [];
    await this.store.initData();
    await this.store.setInitNode(this.props.location.state.init_node);
    
    await this.store.setProcessDefinitionKey(
      this.props.location.state.process_key
    );
    await this.store.setUuid(this.props.location.state.uuid);
    await this.store.setTransactid(this.props.location.state.transactid);

    await this.store.setReadonly(this.props.location.state.readonly);

    // NodeKey 为当时填写时候的 节点id

    if (this.props.location.state.nodeKey) {
      await this.store.setNodeKey(this.props.location.state.nodeKey);
    } else {
      await this.store.setNodeKey(null);
    }

    //setActCode action_code

    if (this.props.location.state.action_code) {
      await this.store.setActCode(this.props.location.state.action_code);
    } else {
      await this.store.setActCode("");
    }

    await this.store.getFlowFormCfg();

    //获取流程策略
    if (this.store.readonly) {
      return;
    }
    let { processBtns } = this.store.flowFormCfg;
    for (var i = 0; i < processBtns.length; i++) {
      if (processBtns[i].btn_text == "同意") {
        return;
      }
    }

    await this.store.getFlowTactics();

    console.log(
      "FlowForm",
      this.props.location.state,
      "flowFormStore:processDefinitionKey",
      this.store.processDefinitionKey
    );
  }

  componentWillUnmount() {
    this.store.initData();
  }

  bindRef = function (ref) {
    this.children.push(ref);
  };

  //大客户合同警告

  getVIPcontract_warning() {
    if (
      this.store.flowFormCfg &&
      this.store.flowFormCfg.hasOwnProperty("vipcontractwarning")
    ) {
      return (
        <div>
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          大客户预签合同
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
        </div>
      );
    }

    if (
      this.store.flowFormCfg &&
      this.store.flowFormCfg.hasOwnProperty("formalvipcontractwarning")
    ) {
      return (
        <div>
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          大客户正式合同
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
          <Icon type="star" theme="twoTone" twoToneColor="#ff0000" />
        </div>
      );
    }
    return null;
  }

  getPaperTitle() {
    if (!this.store.flowFormCfg) {
      return;
    }
    return this.store.flowFormCfg.papertitle;
  }

  getRelatedButton() {
    if (!this.store.flowFormCfg) {
      return;
    }

    return (
      <Button
        style={{ marginLeft: "20px" }}
        size="default"
        htmlType="button"
        type="primary"
        onClick={(event) => this.ShowRelatedInfo(event)}
      >
        查看相关流程信息
      </Button>
    );
  }

  async ShowRelatedInfo() {
    if (!this.store.flowFormCfg) {
      return;
    }
    let data = {
      process_key: this.store.processDefinitionKey,
      uuid: this.store.uuid,
      nodeKey: this.store.nodeKey,
      readonly: true,
      init_node: "n",
      action_code: this.store.actcode,
      page_source: "detail", // IDC合同专用开关
    };

    let params = "";
    let keys = Object.keys(data);
    keys.map((key, index) => {
      params +=
        index + 1 === keys.length
          ? `${key}=${data[key]}`
          : `${key}=${data[key]}&`;
    });

    let new_url = `http:${window.location.host}/#/flow/flowRelatedInfo?${params}`;

    window.open(new_url, "_blank");
  }

  getContractMsg() {
    let show_idc_component_arr = [
      "idc_order",
      "idc_order_shadow",
      "idc_order_payment",
      "idc_order_vip",
    ];
    let rely_on_contract_arr = [
      "idc_order_stop",
      "sales_con_change_seal",
      "sales_con_tovoid_app",
    ];
    if (
      show_idc_component_arr.includes(this.props.location.state.process_key)
    ) {
      return (
        <DetailWrapper
          isShowFlowHistory={false}
          defaultProps={this.props.location.state}
        ></DetailWrapper>
      );
    }
    if (rely_on_contract_arr.includes(this.props.location.state.process_key)) {
      let defaultProps = { ...this.props.location.state };
      // delete defaultProps.process_key
      // delete defaultProps.uuid
      return (
        <DetailWrapper
          isShowFlowHistory={false}
          defaultProps={{
            ...defaultProps,
            // process_key: 'idc_order',
          }}
        ></DetailWrapper>
      );
    }
    if (
      this.props.location.state.process_key == "isp_order" ||
      this.props.location.state.process_key == "isp_order_payment"
    ) {
      return (
        <ISPContractContainer
          defaultProps={this.props.location.state}
        ></ISPContractContainer>
      );
    }

    return null;
  }

  //操作指南区
  getGuideInfo() {
    if (!this.store.flowFormCfg || !this.store.flowFormCfg.guide_area) {
      return;
    }
    if (this.store.flowFormCfg.guide_area.length > 0) {
      let content_html = this.store.flowFormCfg.guide_area[0].text;
      return (
        <Panel header="操作指南" key="1">
          {<GuideReferInfo xinfo={content_html} key={"guide_1"} />}
        </Panel>
      );
    }
  }

  //静态信息参考区
  getReferenceInfo() {
    //单独处理复杂的合同静态编辑页面
    if (!this.store.flowFormCfg) {
      return null;
    }
    if (!this.store.flowFormCfg.combinedRef) {
      return null;
    }

    if (
      this.store.flowFormCfg.combinedRef.length < 0 &&
      this.getContractMsg() != null
    ) {
      return null;
    }

    return (
      <Panel header="受理信息" key="2">
        {this.getContractMsg()}
        {this.store.flowFormCfg.combinedRef.map((one, index) => {
          if (one.bigdata[0]._type == "actiongrid_as_add_as_ref") {
            return (
              <div>
                <div
                  style={{
                    marginBottom: "9px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {one.bigtitle}
                </div>
                <FlowFormWrapper
                  workload={true}
                  uuid={this.store.uuid}
                  triggerRef={this.bindRef.bind(this)}
                  schema={one.bigdata[0]}
                  key={"add_area_" + index}
                  tag={"add_area_" + index}
                  editable={true}
                />
              </div>
            );
          } else {
            return <FlowReferInfo xinfo={one} key={index} />;
          }
        })}
      </Panel>
    );
  }

  // 信息添加区
  getAddAreaCom() {
    if (!this.store.flowFormCfg || !this.store.flowFormCfg.add_area) {
      return null;
    }
    let schema = this.store.flowFormCfg.add_area;
    if (schema.properties.length != 0) {
      return (
        <Panel header="新增区[编辑]" key="3">
          <FlowFormWrapper
            uuid={this.store.uuid}
            triggerRef={this.bindRef.bind(this)}
            schema={schema}
            key={"add_area"}
            tag={"add_area"}
            editable={true}
          />
        </Panel>
      );
    }
  }

  // 批注区
  getFlowNotes() {
    if (!this.store.flowFormCfg || !this.store.flowFormCfg.flow_notes) {
      return;
    }

    if (!this.store.flowFormCfg.flow_notes) {
      return;
    }

    let schema = this.store.flowFormCfg.flow_notes;

    if (this.store.init_node == "y") {
      schema.properties.flow_notes.required = false;
    }

    return (
      <FlowFormWrapper
        uuid={this.store.uuid}
        triggerRef={this.bindRef.bind(this)}
        schema={schema}
        key={"flow_notes"}
        tag={"flow_notes"}
        editable={true}
      />
    );
  }

  // 候选人
  getFlowCandidate() {
    // 详情只读，不显示候选人
    if (this.store.readonly) {
      return null;
    }

    if (!this.store.flowFormCfg || !this.store.flowFormCfg.candidate) {
      return;
    }
    if (this.store.newTreeData.length == 0) {
      return null;
    }
    console.log("this.store.newTreeData", this.store.newTreeData);
    let schema = this.store.flowFormCfg.candidate;
    return (
      <FlowFormWrapper
        triggerRef={this.bindRef.bind(this)}
        schema={schema}
        key={"candidate"}
        tag={"candidate"}
        editable={true}
      />
    );
  }

  // 流程按钮区
  getApproveButtonGroup() {
    if (this.store.readonly) {
      return null;
    }

    if (!this.store.flowFormCfg || !this.store.flowFormCfg.processBtns) {
      return;
    }

    let { processBtns } = this.store.flowFormCfg;

    let tempArr = [];
    for (let key in processBtns) {
      tempArr.push(processBtns[key]);
    }

    return (
      <div className="approvalOption">
        {tempArr.map((item) => {
          return (
            <Button
              key={item.btnid}
              disabled={this.store.preventRepeatClick}
              className="marginRihgt10"
              size="default"
              htmlType="button"
              type="primary"
              onClick={(event) =>
                this.FlowFormAction(
                  event,
                  this.store[item.flowhandle],
                  item.flowhandle
                )
              }
            >
              {item.btn_text}
            </Button>
          );
        })}
      </div>
    );
  }

  async FlowFormAction(event, callback, handle) {
    // if (this.store.preventRepeatClick === true) {
    //     message.warning('等待后台处理，请您勿重复操作！')
    //     return;
    // }
    var handlearr = [
      "mergeProcessHandlerYes",
      "mergeProcessHandlerNO",
      "completionOrder",
      "lineCompletionOrder",
      "showvoucherMOdal",
    ];
    if (handlearr.indexOf(handle) != -1) {
      callback();
      return;
    }

    let flowFormData = await this.getFormData();
    console.log(flowFormData);
    callback(event, flowFormData);
  }

  async getFormData() {
    let flowFormData = {};
    console.log("查看this.children", this.children);
    for (let i = 0; i < this.children.length; i++) {
      let subinnerform = this.children[i];
      let subformdata = await subinnerform.getInnerFromData();
      flowFormData = Object.assign(flowFormData, subformdata);
    }
    return flowFormData;
  }
  back() {
    hashHistory.goBack();
  }
  render() {
    return (
      <div className="flex_wrapper">
        <div>
          <h2 style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
            {this.getVIPcontract_warning()}
          </h2>

          <h3 style={{ textAlign: "center", margin: "10px 0" }}>
            {this.getPaperTitle()}
            {this.store.flowFormCfg && this.store.flowFormCfg.groupcounter > 1
              ? this.getRelatedButton()
              : null}
          </h3>
        </div>

        <Collapse bordered={false} defaultActiveKey={["1", "2", "3", "4", "5"]}>
          {this.getGuideInfo()}
          {this.getReferenceInfo()}
          {this.getAddAreaCom()}

          <Panel header="流程处理" key="5">
            {this.getFlowNotes()}
            {this.getFlowCandidate()}
            {this.getApproveButtonGroup()}
            {/* <Button type='primary' onClick={this.store.showcombineModal}>合并竣工单</Button>
                    <Button type='primary' onClick={event=>this.store.combineOrdercompare(event)}>对比竣工单</Button> */}
          </Panel>
        </Collapse>
        {this.store.voucherVisible == true ? (
          <VoucherMOdal
            store={this.store}
            visible={this.store.voucherVisible}
            cancel={this.store.cancelvoucherMOdal}
          ></VoucherMOdal>
        ) : null}
        {/* {<CombineModal store={this.store} visible={this.store.combineVisible} cancel={this.store.cancelcombineModal}></CombineModal>  } */}
        {this.store.visible == true ? (
          <FlowmModal
            back={() => this.back()}
            visible={this.store.visible}
            cancel={() => this.store.hideModal()}
            transactid={this.props.location.state.transactid}
          ></FlowmModal>
        ) : null}
      </div>
    );
  }
}
