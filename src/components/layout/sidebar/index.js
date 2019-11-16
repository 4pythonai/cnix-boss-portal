import React from 'react'
import { Menu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { hashHistory } from 'react-router'

@inject('navigation')
@observer
export default class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            menulist: []
        };
        this.store = props.navigation

    }



    async componentDidMount() {
        await this.store.getMenuList()
        let { menuList } = this.store
        this.setState({ menulist: menuList })
    }

    menuclickHandler(menuItem, item) {
        item.domEvent.preventDefault()
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem)
        this.store.setBreadcrumb(menuClicked);
        this.store.setCurrentMenu(menuClicked);
        this.store.setSelectedKeys(menuClicked.key)
        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                action_code: menuClicked.action_code,
                menu_code: menuClicked.menu
            }
        });
    }


    getChildren(menuitem, index) {
        let one = menuitem
        if (!one.children) {
            one.children = []
        }

        return (
            one.children.length === 0 ? (
                <Menu.Item key={menuitem.key} onClick={this.menuclickHandler.bind(this, one)}>

                    <Icon type={one.icon} />
                    <span title={one.text}>
                        {one.text}
                    </span>
                </Menu.Item>
            ) : (
                    <Menu.SubMenu key={menuitem.key} title={
                        <span>
                            <Icon type={one.icon} />
                            <span title={one.text}>
                                {one.text}
                            </span>
                        </span>
                    }
                    >
                        {one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex))}
                    </Menu.SubMenu>
                )
        )
    }

    onOpenChange(openKeys){
        this.store.setOpenKeys(openKeys)
    }

    render() {
        return (
            <div className="menuWrapper">
                {
                    this.state.menulist
                        ?
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={this.store.selectedKeys}
                            openKeys={this.store.openKeys}
                            onOpenChange={openKeys => this.onOpenChange(openKeys)}
                        >
                            {this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index))}
                        </Menu>
                        :
                        null
                }
            </div>
        )
    }
}
