import React, { useState, useEffect } from 'react';
import { message, Modal, Button } from 'antd'

import api from '@/api/api'

import {
    SchemaForm,
    createFormActions,
    Field
} from '@uform/antd'

const actions = createFormActions()


const GetFields = (props) => {

    const [value] = useState()
    let { selectedRows } = props.commonTableStore

    const selectedRow = selectedRows[0]


    return <SchemaForm
        value={value}
        actions={actions}

        labelCol={8}
        wrapperCol={12}
    >


        <Field
            type="string"
            title="备注"
            required
            name="replyContent"
            x-component="textarea"
        />

        <Field
            type="string"
            title="创建时间"
            default={selectedRow.date}
            editable={false}
            name="date"
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



export default class ChanceMsgReply extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
        }
    }

    init() {
        if (commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }

        this.setState({
            visible: true
        })
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    async saveFormData(data) {
        data = {
            recordId: selectedRow.record_id,
            ...data,
            replyMentionUser: []
        }
        let params = { data: data, method: 'POST' };

        await api.activityRecord.addReply(params)

        this.hideModal()
    }

    render() {
        return <Modal
            destroyOnClose
            footer={null}
            visible={this.state.visible}
            style={{ width: '400px' }}
            onCancel={() => this.hideModal()}
            title="客户地址审批" >
            <GetFields
                commonTableStore={this.props.commonTableStore}
                saveFormData={this.saveFormData.bind(this)}
            />
        </Modal>
    }
}