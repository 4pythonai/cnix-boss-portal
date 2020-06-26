
import React from 'react'
import { inject, observer } from 'mobx-react'
import PriviligeTransfer from '../components/priviligeTransfer'
import '../privilige.scss'

@inject('permissionManageStore')
@observer
export default class AllocationButton extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.permissionManageStore
    }

    componentDidMount() {
        this.store.getRoleButtonList()
        this.store.getAllButtonList();
    }

    textRender(item) {
        if (item.parent_text) {
            return <div className="buttonItem">
                {item.parent_text + '-'}
                <span className="buttonText">{item.text}</span>
            </div>
        }
        return item.text
    }

    render() {
        return (
            <div className="custServiceContent">
                <div className="current_role_text_box"> 当前角色：{this.store.currentRole.role_name} </div>
                <div className="allocationMenuContent">
                    <div className="option_menu_box">
                        <PriviligeTransfer
                            dataSource={this.store.buttonList}
                            titles={['按钮', '已分配按钮']}
                            targetKeys={this.store.selectTartgetButtonkeys}
                            selectedKeys={this.store.selectButtonkeys}
                            onChange={this.store.saveButtonPermissions}
                            onSelectChange={this.store.buttonSelectChange}
                            render={this.textRender}
                            operations={['确认', '取消']}
                            listStyle={{
                                width: 350,
                                height: 500,
                            }}
                        />
                    </div>
                </div>

            </div>
        )
    }
}
