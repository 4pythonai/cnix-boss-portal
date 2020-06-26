import React from 'react'
import { SchemaForm, Field, FormItemGrid, createAsyncFormActions, setValidationLanguage } from '@uform/antd'
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
import api from '../../../api/api'
import '../../../components/Uform_extends'
import '../../../components/Uform_extends/fileuploader'

import { Button, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

@observer
export default class InnerForm extends React.Component {
    constructor(props) {
        super(props);
        console.log("----------------------InnerForm--------");
        console.log(props);
        let inner_actions = createAsyncFormActions()
        this.state = {
            inner_actions: inner_actions,
            tag: props.tag,
            value: {}
        }
    }


    componentWillMount() {
        this.props.triggerRef(this)
        setValidationLanguage('zh_CN')
    }

    async componentDidMount() {

    }

    swapGhostField = formData => {
        console.log('form数据', formData)
        formData.map(rowData => {
            Object.keys(rowData).forEach(item => {

                let index = item.indexOf('ghost_')
                console.log(item, index)
                if (index != -1) {
                    let ghostValue = rowData[item];
                    index += 6;
                    let fieldKey = item.slice(index);
                    rowData[item] = rowData[fieldKey]
                    rowData[fieldKey] = ghostValue
                }
            })
        })


        return formData
    }


    getInnerFromData = async () => {
        console.log("在 InnerForm  内部方法 ,子组件是: ")
        let that = this
        console.log(that.state.inner_actions)
        let inner_fmdata = await that.state.inner_actions.submit()
        let ret = {}
        ret[this.props.tag] = inner_fmdata.values
        let newObject = {}
        const props_item = {}
        props_item[this.props.tag] = toJS(that.props.schema.properties);

        Object.keys(ret[this.props.tag]).forEach(item => {
            if (props_item[this.props.tag][item].hasOwnProperty('extracfg')) {


                // 虚拟表格处理
                let value = props_item[this.props.tag][item].type == 'TableEditor'
                    ?
                    this.swapGhostField(ret[this.props.tag][item])
                    :
                    ret[this.props.tag][item];
                newObject[item] = {
                    value: value,
                    extracfg: props_item[this.props.tag][item].extracfg
                }
            } else {
                newObject[item] = { value: ret[this.props.tag][item] }
            }
        });

        let newObject_val = {}
        newObject_val[this.props.tag] = newObject;
        return newObject_val
    }


    render() {
        return <div className='wddb'>
            <ConfigProvider local={{ local: zh_CN }}>

            <SchemaForm
                actions={this.state.inner_actions}
                effects={($, { setFieldState, getFieldState }) => {
                    $('onFormInit').subscribe(() => {
                        hide('id');
                        if(this.props.uuid){
                            getFlowsNotes()
                        }
                    })

                    const getFlowsNotes = async () => {
                        let params = { data: { uuid: this.props.uuid }, method: 'POST' }
                        let res = await api.bpm.getFlowsNotes(params);
                        if (res.code == 200) {
                            Object.keys(res.data).map(key => {
                                console.log(res.data[key],key)
                                setFieldState(key, state => {
                                    state.value = res.data[key]
                                })
                            })

                        }
                    }

                    const hide = name => {
                        setFieldState(name, state => {
                            state.visible = false
                        })
                    }
                }}
                tag={this.props.tag}
                value={this.state.value}
                editable={this.props.editable}
                schema={this.props.schema}
                labelCol={4}
                wrapperCol={12}
            >
            </SchemaForm>
        </ConfigProvider>
        </div>
    }
}

