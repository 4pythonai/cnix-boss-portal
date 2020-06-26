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
      actcode: "boss_equipment_materials",
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
                name: {
                  type: "DeviceDroplist",
                  title: "名称",
                  required: true,
                  
                },

                model: {
                  enum:[],
                  type: "string",
                  title: "型号",
                  required: true,
                  // "x-props": { readOnly: true }
                },
                company: {
                  type: "string",
                  title: "单位",
                  required: true,
                  "x-props": { readOnly: true }
                },
                count: {
                  type: "DeviceNumber",
                  title: "数量",
                  required: true
                },
                cost: {
                  type: "string",
                  title: "设备成本",
                  required: true,
                  "x-props": { readOnly: true }
                },
                price: {
                  type: "string",
                  title: "金额",
                  required: true,
                  "x-props": { readOnly: true }
                },
                provider: {
                  type: "providerList",
                  title: "提供方",
                },
                position: {
                  type: "string",
                  title: "存放位置",
                },
                useuser: {
                  type: "GetLander",
                  title: "领用人",
                  required: true,
                },
              },
            }}
            effects={($, { setFieldState, getFieldState }) => {
                $('onFormInit').subscribe(async () => {
                      setFieldState("name", (state) => {
                        state.value = this.state.value.name;
                      });
                      setFieldState("model", (state) => {
                        state.value = this.state.value.id;
                      });
                      setFieldState("count", (state) => {
                        state.value = this.state.value.count;
                      });
                      setFieldState("provider", (state) => {
                        state.value = this.state.value.ghost_provider;
                      });
                      setFieldState("position", (state) => {
                        state.value = this.state.value.position;
                      });
                })
                $("onFieldChange", "name").subscribe(async (fieldState) => {
                  if (!fieldState.value) {
                    return;
                  }
                  let params = {
                    data: {
                      sbName: fieldState.value,
                    },
                    method: "POST",
                  };
                  let res = await api.equipmentMaterial.getSbTypeBysbName(
                    params
                  );
                  if(res.code==200){
                    setFieldState("model", (state) => {
                      let datarr=[]
                      for(var i=0;i<res.data.length;i++){
                        let obj={}
                        obj.label=res.data[i].sbType
                        obj.value=res.data[i].id
                        datarr.push(obj)
                      }
                      state.value=res.data[0].id

                      state.props.enum=datarr
                    });
                    
                  }
                
                })
              $("onFieldChange", "model").subscribe(async (fieldState) => {
                if (!fieldState.value) {
                  return;
                }
                let params = {
                  data: {
                    id: fieldState.value,
                  },
                  method: "POST",
                };
                let res = await api.equipmentMaterial.getEquipmentMaterialById(
                  params
                );
                if (res.code == 200) {
                  setFieldState("name", (state) => {
                    state.value = res.data[0].id;
                  });
                  setFieldState("model", (state) => {
                    state.value = res.data[0].sbType;
                  });
                  setFieldState("cost", (state) => {
                    state.value = res.data[0].cost;
                  });
                  setFieldState("company", (state) => {
                    state.value = res.data[0].sbUnit;
                  });
                  setFieldState("cost", (state) => {
                    state.value = res.data[0].sbPrice;
                  });
                  setFieldState("price", (state) => {
                    if(getFieldState('count').value!=undefined){
                      state.value = getFieldState('cost').value*getFieldState('count').value
                    }
                    
                  });
                
                }
              });
              $("onFieldChange", "count").subscribe(async (fieldState) => {
                if (!fieldState.value) {
                  return;
                }                
                setFieldState("price", (state) => {
                  state.value = getFieldState('cost').value*fieldState.value
                });
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
