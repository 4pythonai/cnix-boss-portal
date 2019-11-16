import { observable, action, computed, toJS } from "mobx";

import api from '../api/api'
import { hashHistory } from 'react-router'



class navigationStore {

    constructor(props) {

        // // 浏览器回退
        window.addEventListener("popstate", async (e) => {

            this.getBreadcrumbSessionStorage();
            let url = window.location.href
            let actionIndex = url.indexOf('_k');
            let end_string = url.slice(actionIndex + 3)
            let sessionKey = '@@History/' + end_string
            let actionMsg = JSON.parse(sessionStorage.getItem(sessionKey))

            if (actionMsg && actionMsg.menu_code) {
                let next_menu_cfg = this.deepQuery(actionMsg.menu_code, this.menuList, 'menu')
                this.setBreadcrumb(next_menu_cfg)
                this.setCurrentMenu(next_menu_cfg)
            }

        }, false);

        // 浏览器刷新
        window.onload = () => {
            this.getBreadcrumbSessionStorage();
            this.setCurrentMenu(this.breadcrumb[this.breadcrumb.length - 1]);
        }
    }

    @observable breadcrumb = []
    @observable isCollapse = false
    // @observable routerText = '首页'

    @observable openKeys = []
    @observable selectedKeys = []

    @observable currentMenu = {};

    @observable badge_sum = 0
    @observable address_count = 0
    @observable message_count = 0
    @observable affair_count = 0

    // 菜单列表
    @observable menuList = [];

    // button权限
    @observable buttonRights = {}

    @action clear = () => {
        this.currentMenu = {}
        this.breadcrumb = []
        sessionStorage.clear();
        this.selectedKeys = []
        this.openKeys = []
    }

    @action toggleCollapse = () => {
        this.isCollapse = !this.isCollapse
    }

    // @action
    // setRouterText = routerText => {
    //     this.routerText = routerText
    // }

    @action setCurrentMenu = (nav_row, state_action) => {
        // 没有菜单列表时，菜单配置为空处理
        if (nav_row == undefined) {
            return;
        }
        this.setSelectedKeys([nav_row.key])
        this.currentMenu = nav_row;
    }

    @action setSelectedKeys = selectedKeys => this.selectedKeys = selectedKeys


    @action change_badge_num = data => {
        this.badge_sum = data.badge_sum;
        this.address_count = data.address_count;
        this.message_count = data.message_count;
        this.affair_count = data.affair_count;
    }


    //三级未测试
    @action setBreadcrumb(item) {


        let paths = []
        this.xloop(toJS(this.menuList), item.parent_id, paths)

        if (paths[0]) {
            if (!paths[0].parent_id == "") {
                this.xloop(toJS(this.menuList), paths[0].parent_id, paths)
            }
        }


        paths.reverse()
        paths.push(item)
        this.breadcrumb = paths

        this.setComputedOpenKeys()
        this.setBreadcrumbSessionStorage();
    }



    @action setOpenKeys = openKeys => this.openKeys = openKeys

    @action setComputedOpenKeys = () => {
        let openKeys = this.breadcrumb.map(item => {
            if (item.children) {
                return item.key
            }
        })
        this.setOpenKeys(openKeys)
    }

    @action getBreadcrumbSessionStorage = () => {
        if (sessionStorage.getItem("breadcrumb")) {
            this.breadcrumb = JSON.parse(sessionStorage.getItem("breadcrumb"))
            this.setComputedOpenKeys()
            return
        }
    }

    @action setBreadcrumbSessionStorage = () => {
        sessionStorage.setItem("breadcrumb", JSON.stringify(this.breadcrumb));
    }





    xloop(menu, pid, breadcrumbs) {
        menu.forEach(k => {
            if (k.key == pid) {
                breadcrumbs.push(k)
                return k;
            } else {
                if (k.children) {
                    this.xloop(k.children, pid, breadcrumbs);
                }
            }
        });
    }

    @action
    async getMenuList() {

        // console.log('获取菜单....')
        //直接根据 token 就可以获取,不需要发送role_code
        let params = {
            data: {},
            method: 'POST'
        }
        let res = await api.permission.getMenuList(params);

        if (res.code == 200) {
            this.menuList = res.data.menuList;
            // 登录后首页面包屑展示
            if (!sessionStorage.getItem("breadcrumb")) {
                this.setBreadcrumb(this.menuList[0])
                this.setCurrentMenu(this.menuList[0])
            }
        }
    }


    // params : {
    //  action_code: ''   必填
    // }
    @action switchRouter = params => {
        // 更新设置面包屑
        let next_menu_cfg = this.deepQuery(params.action_code, this.menuList, 'action_code');
        this.setBreadcrumb(next_menu_cfg)
        this.setCurrentMenu(next_menu_cfg)

        hashHistory.push({ pathname: '/table/commonXTable', state: params })

    }

    @action deepQuery(value, menuList, key) {
        var isGet = false;
        var retNode = null;

        function deepSearch(value, menuList) {
            for (var i = 0; i < menuList.length; i++) {
                let menu = menuList[i]
                if (value == menu[key] || isGet) {

                    isGet || (retNode = menu);
                    isGet = true;
                    break;
                }
                if (menu.children && menu.children.length > 0) {
                    deepSearch(value, menu.children);
                }
            }
        }

        deepSearch(value, menuList);
        return retNode;
    }

}

export default new navigationStore()


