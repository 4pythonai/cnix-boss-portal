import React from 'react';
import { Select } from 'antd';
import { inject, observer } from 'mobx-react';
import FormRow from '../../../components/antdComponents/formRow';

import BtnUsage from './BtnUsage';
@inject('permissionManageStore')
@observer
export default class ButtonModalContent extends React.Component {
    constructor(props) {
        super();
        this.store = props.permissionManageStore;
    }

    render() {
        return (
            <div className="roleModalContent">
                {/* 按钮的使用/分配情况 */}

                <BtnUsage button_code={this.store.buttonRowData.button_code} />
                <hr />

                <FormRow title="按钮名称" fieldKey="name" required="true" defaultValue={this.store.buttonRowData.name} onChange={this.store.setButtonRowData} />

                <FormRow title="按钮编码" fieldKey="button_code" required="true" defaultValue={this.store.buttonRowData.button_code} onChange={this.store.setButtonRowData} />
                <FormRow title="图标" fieldKey="icon" required="true" defaultValue={this.store.buttonRowData.icon} onChange={this.store.setButtonRowData} />
                <div className="form_group">
                    <div className="form_text_info">
                        <span style={{ color: 'red' }}>*</span>风格：
                    </div>
                    <div className="form_value_node">
                        <Select defaultValue={this.store.buttonRowData.style} style={{ width: 432 }} onChange={(event) => this.store.setButtonRowData(event, 'style')}>
                            <Select.Option value="primary">primary</Select.Option>
                            <Select.Option value="danger">danger</Select.Option>
                        </Select>
                    </div>
                </div>
                <FormRow title="文件路径" fieldKey="file_path" required="true" defaultValue={this.store.buttonRowData.file_path} onChange={this.store.setButtonRowData} />
                <FormRow title="入口函数" fieldKey="entry_function" required="true" defaultValue={this.store.buttonRowData.entry_function} onChange={this.store.setButtonRowData} />
                <div className="form_group">
                    <div className="form_text_info">
                        <span style={{ color: 'red' }}>*</span>是否使用组件：
                    </div>
                    <div className="form_value_node">
                        <Select
                            defaultValue={this.store.buttonRowData.using_component}
                            style={{ width: 432 }}
                            onChange={(event) => this.store.setButtonRowData(event, 'using_component')}>
                            <Select.Option value="y">是</Select.Option>
                            <Select.Option value="n">否</Select.Option>
                        </Select>
                    </div>
                </div>
                <FormRow title="组件名称" fieldKey="component_name" defaultValue={this.store.buttonRowData.component_name} onChange={this.store.setButtonRowData} />
            </div>
        );
    }
}
