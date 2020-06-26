
import React from 'react'
<<<<<<< HEAD

import { Tree } from 'antd'
import { inject, observer } from 'mobx-react'
import PriviligeTransfer from '../components/priviligeTransfer'
import '../privilige.scss'
=======
import { inject, observer } from 'mobx-react'
import PriviligeTransfer from '../components/priviligeTransfer'
import '../privilige.scss'
import { Button } from 'antd'

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
@inject('permissionManageStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.permissionManageStore
        this.state = {
            targetKeys: [],
            selectedKeys: [],
            disabled: false,
            dataSource: []
        };
    }


    async componentDidMount() {
        await this.store.getRoleMenuList()
<<<<<<< HEAD
        await this.store.getTreeMenuList();
=======
        await this.store.getAllMenuList();
    }

    textRender(item) {
        if (item.parent_text) {
            return item.parent_text + '-' + item.text
        }
        return item.text
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    render() {
        return (
            <div className="custServiceContent">
                <div className="current_role_text_box"> 当前角色：{this.store.currentRole.role_name} </div>
                <div className="allocationMenuContent">
                    <div className="option_menu_box">
<<<<<<< HEAD
                        
                        <PriviligeTransfer
                            dataSource={this.store.treeMenuList}
=======
                        <PriviligeTransfer
                            dataSource={this.store.allMenuList}
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            titles={['菜单', '已分配菜单']}
                            targetKeys={this.store.selectTartgetMenukeys}
                            selectedKeys={this.store.selectMenukeys}
                            onChange={this.store.saveMenuPermission}
                            onSelectChange={this.store.menuSelectChange}
<<<<<<< HEAD
=======
                            render={this.textRender}
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            operations={['确认', '取消']}
                            listStyle={{
                                width: 250,
                                height: 500,
<<<<<<< HEAD
                                overflow: 'scroll'
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
