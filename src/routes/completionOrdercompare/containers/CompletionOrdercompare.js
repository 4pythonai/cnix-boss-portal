import React from "react";
import { Collapse } from "antd";
import "./CompletionOrder.scss";
import FlowReferInfo from "../../flow/containers/flowReferInfo";
import store from "@/store/FlowApprovalStore";
import { observer, inject } from "mobx-react";

const { Panel } = Collapse;
@inject("FlowApprovalStore")
@observer
export default class CompletionOrdercompare extends React.Component {
  constructor(props) {
    super();
    this.store = props.FlowApprovalStore;
    this.state = {
      obj: {}
    };
    this.getParams();
  }
  getParams() {
    var afterUrl = window.location.href.split("?")[1];
    let query_params = {};
    afterUrl.split("&").forEach(item => {
      let query_arr = item.split("=");
      if (query_arr[1] != "null") {
        query_params[query_arr[0]] = query_arr[1];
      } else {
        query_params[query_arr[0]] = null;
      }
    });

    console.log("查看参数", query_params);
    this.query_params = query_params;
  }
  async componentDidMount() {
    await this.store.initData();
    await this.store.setInitNode(this.query_params.init_node);
    await this.store.setProcessDefinitionKey(this.query_params.process_key);
    await this.store.setUuid(this.query_params.uuid);
    await this.store.setTransactid(this.query_params.transactid);
    await this.store.setReadonly(this.query_params.readonly);

    // NodeKey 为当时填写时候的 节点id

    if (this.query_params.nodeKey) {
      await this.store.setNodeKey(this.query_params.nodeKey);
    } else {
      await this.store.setNodeKey(null);
    }

    //setActCode action_code

    if (this.query_params.action_code) {
      await this.store.setActCode(this.query_params.action_code);
    } else {
      await this.store.setActCode("");
    }
    await this.store.getFlowFormCfg();
  }
  componentWillUnmount() {
    this.store.initData();
  }
  getReferenceInfo() {
    if (!this.store.flowFormCfg || !this.store.flowFormCfg.combinedRef) {
      return;
    }

    //单独处理复杂的合同静态编辑页面
    if (this.store.flowFormCfg.combinedRef.length > 0) {
      return (
        <Panel header="受理信息" key="1">
          {this.store.flowFormCfg.combinedRef.map((one, index) => (
            <FlowReferInfo xinfo={one} key={index} />
          ))}
        </Panel>
      );
    }
  }
  render() {
    return (
      <div className="flex_wrapper">
        <Collapse defaultActiveKey={["1"]} bordered={false}>
          {this.getReferenceInfo()}
        </Collapse>
      </div>
    );
  }
}
