import React, { useState, useEffect } from 'react';
import api from '@/api/api'
import '@/components/Uform_extends/asyncMention'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import { Button, List, Icon, Popconfirm } from 'antd'
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
            $('onSearchMember', 'member')
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
                        let userList = res.data.map(item => ({ value: item.id + `_${item.staff_name}`, label: item.staff_name + `(${item.department})` }))
                        setFieldState('member', state => {
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
            title="搜索成员"
            required
            name="member"
            default=''
            x-effect={dispatch => ({
                onSearch(value) {
                    dispatch('onSearchMember', value)
                }
            })}
            x-props={{ showSearch: true, filterLocal: false }}
        />

        <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="button" className="marginRihgt10" onClick={async event => {
                await actions.validate()
                let formData = actions.getFormState().values;
                await props.saveFormData(formData);
            }
            }>确认分享此数据</Button>
        </div>
    </SchemaForm>
}

export default class TeamMembers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            memberList: []
        }
    }

    componentDidMount() {
        this.getMemberList()
    }

    getMemberList = async () => {
        let params = {
            data: {
                chanceId: this.props.selectedRow.id
            },
            method: 'POST'
        }
        let res = await api.activityRecord.getMember(params)
        if (res.code == 200) {
            this.setState({
                memberList: res.data
            })
        }
    }

    saveFormData = async data => {
        data.member = data.member.slice(0, data.member.indexOf('_'))
        data = {
            chance_id: this.props.selectedRow.id,
            ...data,
        }
        let params = { data: data, method: 'POST' };

        let res = await api.activityRecord.addMember(params)

        if (res.code == 200) {
            this.getMemberList()
        }
    }

    removeMember = async (member) => {
        let params = {
            data: {
                id: member.id
            },
            method: 'POST'
        };
        let res = await api.activityRecord.removeMember(params);
        if (res.code == 200) {
            this.getMemberList()
        }
    }


    render() {
        return <div>
            <GetFields saveFormData={this.saveFormData} />
            <RenderMemberList memberList={this.state.memberList} removeMember={this.removeMember} />
        </div>
    }
}





const RenderMemberList = props => {
    return <List
        size="small"
        style={{ marginTop: '20px' }}
        header={<div style={{ fontSize: '16px', fontWeight: 'bold' }}>团队成员列表</div>}
        footer={null}
        bordered
        dataSource={props.memberList}
        renderItem={item => <List.Item
            avatar={
                <Icon type="environment" style={{ width: '25px', height: '25px' }} />
            }
        >
            <div style={{ overflow: 'hidden', width: '100%' }}>
                <div style={{ float: 'left' }}>{item.staff_name}</div>

                <div style={{ float: 'right' }}>
                    <Popconfirm title="确定要删除吗?" onConfirm={() => props.removeMember(item)}>
                        <a>删除</a>
                    </Popconfirm>

                </div>
            </div>
        </List.Item>}
    />
}