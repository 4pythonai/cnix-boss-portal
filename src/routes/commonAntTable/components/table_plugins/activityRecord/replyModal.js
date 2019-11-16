import React, { useState, useEffect } from 'react';
import api from '@/api/api'
import '@/components/Uform_extends/asyncMention'
import { withLatestFrom, map, debounceTime } from 'rxjs/operators'
import { Button, Modal } from 'antd'
import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'


const actions = createFormActions()
const GetFields = (props) => {

    const [value, setValue] = useState()

    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onSearchMention', 'replyMentionUser')
                .pipe(
                    map(fieldState => {
                        return fieldState
                    }),
                    debounceTime(400)
                )
                .subscribe(async ({ payload }) => {
                    if (!payload) {
                        return;
                    }

                    let params = {
                        data: {
                            searchKey: payload
                        },
                        method: 'POST',
                    }
                    let res = await api.user.getAllUser(params)

                    if (res.code == 200) {
                        let userList = res.data.map(({ id, staff_name, department }) => ({ value: staff_name + `_${id}`, label: staff_name + `(${department})`, id }))
                        setFieldState('replyMentionUser', state => {
                            state.loading = false
                            state.props.enum = userList
                        })
                    }
                })
        }}
        labelCol={6}
        wrapperCol={18}
    >

        <Field
            type="string"
            title="要@的人"
            required
            name="replyMentionUser"
            default={[]}

            x-effect={dispatch => ({
                onChange(value, type, option) {
                    console.log(type, option)
                    dispatch('onChangeOption', option, type)
                },
                onSearch(value) {
                    dispatch('onSearchMention', value)
                }
            })}
            x-props={{ mode: "multiple", showSearch: true, filterLocal: false, autoClearSearchValue: true }}
        />
        <Field
            type="string"
            title="回复内容"
            required
            name="replyContent"
            x-component='textarea'
            default=''
        />

        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>提交</Button>
        </div>
    </SchemaForm>
}

export default class TeamMembers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            recordId: ''
        }
    }

    showModal = record => {
        console.log(record)
        this.setState({ visible: true, recordId: record.id })
    }

    hideModal = () => {
        this.setState({ visible: false })
    }


    saveFormData = async data => {
        data.replyMentionUser = data.replyMentionUser.map(item => item.slice(item.indexOf('_') + 1))
        data = {
            recordId: this.state.recordId,
            ...data,
        }
        let params = { data: data, method: 'POST' };

        let res = await api.activityRecord.addReply(params)

        if (res.code == 200) {
            this.props.getRecordList()
            this.hideModal()
        }
    }

    render() {
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            style={{ width: '400px' }}
            onCancel={() => this.hideModal()}
            title="回复活动记录" >
            <GetFields saveFormData={this.saveFormData} />
        </Modal>
    }
}