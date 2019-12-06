import React from 'react'
import FormRow from '../../../components/antdComponents/formRow'
import SelectRow from '../../../components/antdComponents/selectRow'
import { Radio, Select } from 'antd'
import { inject, observer } from 'mobx-react'

const RadioGroup = Radio.Group;

@inject('permissionManageStore')
@observer
export default class MenuModalContent extends React.Component {
    constructor(props) {
        super()
        this.store = props.permissionManageStore
    }

    render() {
        return (
            <div className="roleModalContent">
                <FormRow
                    title='菜单名称'
                    required="true"
                    fieldKey="text"
                    defaultValue={ this.store.menuRowData.text }
                    onChange={ this.store.setMenuRowData }
                />
                <FormRow
                    title='编码'
                    fieldKey="menu"
                    required="true"
                    defaultValue={ this.store.menuRowData.menu }
                    onChange={ this.store.setMenuRowData }
                />
                <FormRow
                    title='action_code'
                    fieldKey="action_code"
                    defaultValue={ this.store.menuRowData.action_code }
                    onChange={ this.store.setMenuRowData }
                />
                <FormRow
                    title='流程key2'
                    fieldKey="process_key"
                    defaultValue={ this.store.menuRowData.process_key }
                    onChange={ this.store.setMenuRowData }
                />
                <FormRow
                    title='路由'
                    fieldKey="router"
                    required="true"
                    defaultValue={ this.store.menuRowData.router ? this.store.menuRowData.router : "/table/commonXTable" }
                    onChange={ this.store.setMenuRowData }
                />

                <div className="form_group">
                    <div className="form_text_info">
                        <span style={ { color: 'red' } }>*</span>
                        <span>类型：</span>
                    </div>
                    <div className="form_value_node">
                        <Select
                            defaultValue={ this.store.menuRowData.type || '请选择' }
                            onChange={ event => this.store.setMenuRowData(event, this.props.fieldKey) }
                            style={ { width: '100%' } }
                        >
                            <Select.Option value='目录'>目录</Select.Option>
                            <Select.Option value='菜单'>菜单</Select.Option>
                        </Select>
                    </div>
                </div>
                <FormRow
                    title='图标'
                    fieldKey="icon"
                    defaultValue={ this.store.menuRowData.icon }
                    onChange={ this.store.setMenuRowData }
                />
                <div className="form_group">
                    <div className="form_text_info"><span style={ { color: 'red' } }>*</span>是否为一级菜单：</div>
                    <div className="form_value_node">
                        <RadioGroup
                            required
                            defaultValue={ this.store.menuRowData.isFirstMenu }
                            onChange={ event => this.store.setMenuRowData(event, 'isFirstMenu') }
                        >
                            <Radio value={ true }>是</Radio>
                            <Radio value={ false }>否</Radio>
                        </RadioGroup>

                    </div>
                </div>
                {
                    this.store.menuRowData.isFirstMenu
                        ?
                        null
                        :
                        <SelectRow
                            title='父菜单'
                            fieldKey="parent_id"
                            required="true"
                            defaultValue={ this.store.menuRowData.parent_id }
                            onChange={ this.store.setMenuRowData }
                            option_list={ this.store.allMenuList.filter(item => item.type == '目录') }
                        />
                }


            </div>

        )
    }
}
