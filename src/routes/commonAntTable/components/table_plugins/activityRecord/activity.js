import React, { useState, useEffect } from 'react';
import api from '@/api/api'
import { Button, List } from 'antd'

import { withLatestFrom, map, debounceTime } from 'rxjs/operators'

import ReplyModal from './replyModal'

import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {

    const [value] = useState()


    return <SchemaForm
        value={value}
        actions={actions}
        effects={($, { setFieldState, getFieldState }) => {
            $('onSearchMention', 'releaseMentionUser')
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
                        setFieldState('releaseMentionUser', state => {
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
            title="记录类型"
            required
            name="recordType"
            default=''
            enum={[
                {
                    label: '快速记录',
                    value: '快速记录'
                },
                {
                    label: '电话',
                    value: '电话'
                },
                {
                    label: '拜访签到',
                    value: '拜访签到'
                },
                {
                    label: 'QQ联系',
                    value: 'QQ联系'
                },
                {
                    label: '邮件回复',
                    value: '邮件回复'
                }
            ]}
        />

        <Field
            type="string"
            title="要@的人"
            required
            name="releaseMentionUser"
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
            title="记录内容"
            required
            name="recordContent"
            x-component='textarea'
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



const RenderActivityList = props => {
    return (
        <List
            size="small"
            style={{ marginTop: '20px', minHeight: '500px', overflowX: 'scroll' }}
            header={<div style={recordHeaderStyle}>活动记录列表</div>}
            footer={null}
            bordered
            dataSource={props.recordList}
            renderItem={
                item => <List.Item >
                    <div style={recordItemStyle}>
                        <div style={{ overflow: 'hidden', width: '100%' }}>
                            <div style={{ float: 'left' }}>
                                <div>记录创建者： {item.userName}</div>
                                <div>记录类型： {item.recordType}</div>
                                <div>记录时间： {item.recodeDate}</div>
                                <div>记录内容： {item.recodeContent}</div>
                            </div>
                            <div style={{ float: 'right' }}>
                                <Button type="primary" onClick={() => props.replyModalRef.showModal(item)}>回复</Button>
                            </div>
                        </div>
                        {
                            item.replyData && item.replyData.length != 0
                                ?
                                <ul style={replyListStyle}>
                                    {
                                        item.replyData.map((replyItem,index) => {
                                            return <li key={index}>
                                                <h4>回复人：{replyItem.replyName}</h4>
                                                <h4>回复时间：{replyItem.replyDate}</h4>
                                                <div className="replayContent" style={{ textIndent: '2em' }}>
                                                    {replyItem.replyContent}
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                                : null
                        }

                    </div>
                </List.Item>}
        />
    )
}


export default class Activity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recordList: []
        }
    }

    componentDidMount() {
        this.getRecordList()
    }

    getRecordList = async () => {
        let params = {
            data: {
                whichType: this.props.action_code == "IDC_sales_chance" ? '机会' : '线索',
                relationId: this.props.selectedRow.id
            },
            method: 'POST'
        }
        let res = await api.activityRecord.getRecordList(params);
        if (res.code == 200) {
            this.setState({
                recordList: res.data
            })
        }
    }


    saveFormData = async data => {
        data.releaseMentionUser = data.releaseMentionUser.map(item => item.slice(item.indexOf('_') + 1))
        data = {
            relationId: this.props.selectedRow.id,
            whichType: this.props.action_code == "IDC_sales_chance" ? '机会' : '线索',
            ...data,
        }
        let params = { data: data, method: 'POST' };

        await api.activityRecord.addRecord(params)
    }



    render() {
        return <div>
            <GetFields saveFormData={this.saveFormData} />
            <RenderActivityList recordList={this.state.recordList} removeMember={this.removeMember} replyModalRef={this.refs.ReplyModalRef} />
            <ReplyModal getRecordList={this.getRecordList} ref="ReplyModalRef" />
        </div>
    }
}




const replyListStyle = {
    backgroundColor: "#ccc",
    padding: '5px',
    borderRadius: '3px',
    marginTop: '5px',
    listStyleType: 'none'
}


const recordItemStyle = {
    width: '100%',
    backgroundColor: '#eee',
    padding: '10px',
    borderRadius: '5px'
}


const recordHeaderStyle = { fontSize: '16px', fontWeight: 'bold' }


