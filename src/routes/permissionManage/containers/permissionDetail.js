
import React from 'react'
import { inject, observer } from 'mobx-react'
import SearchTree from '../../../components/antdComponents/searchTree'
import '../privilige.scss'

@inject('permissionManageStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.permissionManageStore
    }

    getTreeProps() {
                return {
                    
                    loadData:this.store.getSecondMenuList,
                    dataList: this.store.rolePermissionList,
                    getFirstNode: this.store.getFirstMenuList,
                    treeKey: 'key',
                    treeTitle: 'title'
                }
            }

    render() {
        return (
                    <div className="custServiceContent">
                        <div className="current_role_text_box"> 当前角色：{this.store.currentRole.role_name} </div>
                        <div className="allocationMenuContent">
                            <div className="option_menu_box">
                                <SearchTree {...this.getTreeProps()}/>
                            </div>
                        </div>
                    </div>
        )
    }
}
