import React, { useState } from 'react';
import { message, Button } from 'antd'
 

import {
    SchemaForm,
    createFormActions,
    Field,
    FormButtonGroup
} from '@uform/antd'
import { toJS } from 'mobx';

const actions = createFormActions()




const GetFields = (props) => {
    console.log(props,'查看数据')
    const [value] = useState()
    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onFieldChange', 'contract_no').subscribe(fieldState => {
                if(fieldState.value){
                    fieldState.value=fieldState.value.replace(/(^\s*)|(\s*$)/g,"")
                }
                    props.setQuery(fieldState.value, 'vset_1')
               
                
            })

            $('onFieldChange', 'customer_id1').subscribe(fieldState => {
                if(fieldState.value){
                    fieldState.value=fieldState.value.replace(/(^\s*)|(\s*$)/g,"")
                }
                    props.setQuery(fieldState.value, 'vset_2')
                
            })
            $('onFieldChange', 'archives_no').subscribe(fieldState => {
                if(fieldState.value){
                    fieldState.value=fieldState.value.replace(/(^\s*)|(\s*$)/g,"")
                }
                    props.setQuery(fieldState.value, 'vset_3')
                
            })
            $('onFieldChange', 'contract_management_state').subscribe(fieldState => {
                if(fieldState.value){
                    fieldState.value=fieldState.value.replace(/(^\s*)|(\s*$)/g,"")
                }
                    props.setQuery(fieldState.value, 'vset_4')
               
            })
        }}
        inline
    >

        <Field
            type="string"
            title="合同号"
            name="contract_no"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')                    
                    props.refreshTable()
                }
            })}
        />


        <Field
            type="string"
            title="客户名称"
            name="customer_id1"
            default=''
            
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />

        <Field
            type="string"
            title="档案号"
            name="archives_no"
            default=''
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />

        

        {props.getele()}

        <FormButtonGroup>
            <Button style={{ marginTop: '5px' }} type="primary" htmlType="button" size="small" onClick={props.refreshTable}>搜索合同</Button>
        </FormButtonGroup>

    </SchemaForm>
}



export default class SearchContract extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query_cfg: {
                count: 5,
                lines: {
                    
                    field_1: "contract_no",
                    vset_1: '',
                    operator_1: "like",
                    and_or_1: "and",
                    field_2: "customer_id1",
                    vset_2: '',
                    operator_2: "like",
                    and_or_2: "and",
                    field_3: "archives_no",
                    vset_3: '',
                    operator_3: "like",
                    and_or_3: "and",
                    field_4: "contract_management_state",
                    vset_4: '',
                    operator_4: "=",
                    and_or_4: "and"
                    
                }
            }
        }


    }



    async saveFormData(data) {

        this.props.refreshTable();

    }


    setQuery = (value, key) => {
        let { query_cfg } = this.state

        query_cfg.lines[key] = value
        this.setState({ query_cfg })
    }

    refreshTable = async () => {
        console.log(7,this.props.query_cfg.lines)
        if(Object.keys(this.props.query_cfg.lines).length/4==1||Object.keys(this.props.query_cfg.lines).length/4==5){
            var objlines=this.state.query_cfg.lines
            var linescount=5
        }
        if(Object.keys(this.props.query_cfg.lines).length/4==2||Object.keys(this.props.query_cfg.lines).length/4==6){
            var objlines={
                
                field_2: "contract_no",
                vset_2: this.state.query_cfg.lines.vset_1||'',
                operator_2: "like",
                and_or_2: "and",
                field_3: "customer_id1",
                vset_3: this.state.query_cfg.lines.vset_2||'',
                operator_3: "like",
                and_or_3: "and",
                field_4: "archives_no",
                vset_4: this.state.query_cfg.lines.vset_3||'',
                operator_4: "like",
                and_or_4: "and",
                field_5: "contract_management_state",
                vset_5: this.state.query_cfg.lines.vset_4||'',
                operator_5: "=",
                and_or_5: "and"
            }
            var linescount=6
        }



        let query_cfg = {
            count: linescount,
            lines: {
                ...this.props.query_cfg.lines,
                ...objlines
            }
        }
        query_cfg.lines.vset_1 = query_cfg.lines.vset_1 || ''
        query_cfg.lines.vset_2 = query_cfg.lines.vset_2 || ''
        query_cfg.lines.vset_3 = query_cfg.lines.vset_3 || ''
        query_cfg.lines.vset_4 = query_cfg.lines.vset_4 || ''
        
        console.log( toJS (this.props))
        
        await  this.props.clearPaginationStore()
        await this.props.setQueryCfg(query_cfg)
        await this.props.listData()
    }

    getele () {
        let action_codes = [
            'obsolete_invalid'
        ];

        if(action_codes.includes(this.props.action_code)){
            return <Field
            type="string"
            title="合同状态"
            name="contract_management_state"
            default=''
            enum={[
                {
                    label: '生效作废',
                    value: 'okobsolete'
                },
                {
                    label: '未生效作废',
                    value: 'obsolete'
                },
                
            ]}
            
            x-effect={dispatch => ({
                onPressEnter(e) {
                    dispatch('onChangeOption')
                    props.refreshTable()
                }
            })}
        />
        }
    }




    render() {
        
        return <GetFields
        getele = {this.getele.bind(this)}
            commonTableStore={this.props.commonTableStore}
            setQuery={this.setQuery.bind(this)}
            refreshTable={this.refreshTable}
        />
    }
}