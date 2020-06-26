import React from 'react'
import { Menu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { hashHistory } from 'react-router'

<<<<<<< HEAD
import { randomString } from '@/utils/tools'

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
@inject('navigation')
@observer
export default class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
<<<<<<< HEAD
            menulist: [],
=======
            menulist: []
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        };
        this.store = props.navigation

    }



<<<<<<< HEAD
=======



>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    async componentDidMount() {
        await this.store.getMenuList()
        let { menuList } = this.store
        this.setState({ menulist: menuList })
    }

    menuclickHandler(menuItem, item) {
<<<<<<< HEAD

        item.domEvent.preventDefault()
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem)

        // 点击菜单刷新右侧功能
        if (JSON.stringify(menuClicked) == JSON.stringify(this.store.currentMenu) && window.location.href.indexOf(menuClicked.router) != -1) {
            this.store.changeUpdateKey()
            return;
        }

        this.store.setBreadcrumb(menuClicked);
        this.store.setCurrentMenu(menuClicked);

=======
        item.domEvent.preventDefault()
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem)
        this.store.setBreadcrumb(menuClicked);
        this.store.setCurrentMenu(menuClicked);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.store.setSelectedKeys(menuClicked.key)
        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                action_code: menuClicked.action_code,
                menu_code: menuClicked.menu
            }
        });
<<<<<<< HEAD

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }


    getChildren(menuitem, index) {
        let one = menuitem
<<<<<<< HEAD
        if (!one.children) {
            one.children = []
        }

        return (
            one.children.length === 0 ? (
                <Menu.Item key={menuitem.key} onClick={this.menuclickHandler.bind(this, one)}>

                    {one.icon ? <Icon type={one.icon} /> : null

                    }

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
=======

        if (!one.children) {
            one.children = []
        }
        if (!one.icon) {
            one.icon = 'File'
        }




        return (
            one.children.length === 0 ? (
                <Menu.Item key={ menuitem.key } onClick={ this.menuclickHandler.bind(this, one) }>

                    <Icon type={ one.icon } />

                    <span title={ one.text }>
                        { one.text }
                    </span>
                </Menu.Item>
            ) : (
                    <Menu.SubMenu key={ menuitem.key } title={
                        <span>
                            <Icon type={ one.icon } />
                            <span title={ one.text }>
                                { one.text }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            </span>
                        </span>
                    }
                    >
<<<<<<< HEAD
                        {one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex))}
=======
                        { one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex)) }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </Menu.SubMenu>
                )
        )
    }

    onOpenChange(openKeys) {
        this.store.setOpenKeys(openKeys)
    }

    render() {
<<<<<<< HEAD
        const defaultProps = this.store.isCollapse ? {} : { openKeys: this.store.openKeys };
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        return (
            <div className="menuWrapper">
                {
                    this.state.menulist
                        ?
                        <Menu
                            mode="inline"
                            theme="dark"
<<<<<<< HEAD
                            selectedKeys={this.store.selectedKeys}
                            onOpenChange={openKeys => this.onOpenChange(openKeys)}
                            // inlineCollapsed={this.props.collapsed}
                            {...defaultProps}
                        >
                            {this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index))}
=======
                            selectedKeys={ this.store.selectedKeys }
                            openKeys={ this.store.openKeys }
                            onOpenChange={ openKeys => this.onOpenChange(openKeys) }
                        >
                            { this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index)) }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                        </Menu>
                        :
                        null
                }
            </div>
        )
    }
}
