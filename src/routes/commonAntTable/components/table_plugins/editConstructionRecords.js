import CommonTableForm from "../commonTableCom/commonTableForm";
import React from "react";
import { observer, inject } from "mobx-react";
import CommonModal from "../commonTableCom/commonModal";
import FlowApprovalStore from '@/store/FlowApprovalStore'

import api from "@/api/api";

import { Modal, Descriptions, message } from "antd";

import {
  SchemaForm,
  Submit,
  FormButtonGroup,
  createFormActions,
} from "@uform/antd";

@observer
export default class EditDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {},
    };
    this.init = this.init.bind(this);
  }

  init() {
      if(this.props.commonTableStore.selectedRows.length!=1){
          message.error('请选择一条数据')
          return
      }
      this.setState({
          value:this.props.commonTableStore.selectedRows[0]
      })
    this.refs.commonModalRef.showModal();
  }

   saveFormData = async (values) => {
    values.id=this.state.value.id
    values.uuid=this.state.value.uuid
    let data={
      actcode: "boss_construction_workload_manager",
      rawdata:values
    }
    let params = { data: data, method: "POST",addurl:'/curd/updateData' };
    let res = await api.curd.addData(params);
    if (res.code == 200) {
      this.props.refreshTable()
      this.refs.commonModalRef.onCancelHandle();
    }
  };

  render() {
    return (
      <CommonModal
        width="600px"
        footer={null}
        title="编辑设备"
        ref="commonModalRef"
      >
        <div style={{ marginLeft: "100px", marginTop: "15px" }}>
          <SchemaForm
            onSubmit={(values) => this.saveFormData(values)}
            schema={{
              type: "object",
              properties: {
                authorname: {
                    type: "SearchUser",
                    title: "施工人员",
                    required: true,
                    
                  },
                  currentdeptname: {
                    type: "string",
                    title: "所在部门",
                    required: true,
                    "x-props": { readOnly: true }
                  },
                  adddate: {
                    type: "date",
                    title: "施工时间",
                    required: true
                  },
                  constructiondesc: {
                    type: "string",
                    title: "施工情况",
                    required: true
                  },
                  workload: {
                    type: "string",
                    title: "工作量",
                    required: true,
                  }
              },
            }}
            effects={($, { setFieldState, getFieldState }) => {
                $('onFormInit').subscribe(async () => {
                      setFieldState("authorname", (state) => {
                        state.value = this.state.value.authorname;
                      });
                      setFieldState("currentdeptname", (state) => {
                        state.value = this.state.value.currentdeptname;
                      });
                      setFieldState("adddate", (state) => {
                        state.value = this.state.value.adddate;
                      });
                      setFieldState("constructiondesc", (state) => {
                        state.value = this.state.value.constructiondesc;
                      });
                      setFieldState("workload", (state) => {
                        state.value = this.state.value.workload;
                      });
                })
                $("onFieldChange", "authorname").subscribe(async (fieldState) => {
                    if (!fieldState.value) {
                      return;
                    }
                    let params = {
                        data: {
                          searchKey: fieldState.value,
                        },
                        method: "POST",
                      };
                      let res = await api.user.getAllUser(params);
                  
                      if (res.code == 200) {
                        setFieldState("currentdeptname", (state) => {
                            state.value = res.data[0].department
                          });
                      }
                  
                  })
            }}
            labelCol={5}
            wrapperCol={15}
          >
            <FormButtonGroup style={{ marginLeft: "150px" }}>
              <Submit>保存</Submit>
            </FormButtonGroup>
          </SchemaForm>
        </div>
      </CommonModal>
    );
  }
}
