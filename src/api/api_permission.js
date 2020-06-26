import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class permission {
    static apis = {

        getRoleMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getRoleMenuList`),
        // 根据角色获取用户
        getUserByRole: (params) => http(params, `${ api_root }/${ controller.permission }/getUserByRole`),

        getAllMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getAllMenuList`),
        getTreeMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getTreeMenuList`),
        // 分配菜单（添加、取消）
        saveMenuPermission: (params) => http(params, `${ api_root }/${ controller.permission }/saveMenuPermissions`),
        getRoleButtonList: (params) => http(params, `${ api_root }/${ controller.permission }/getRoleButtonList`),
        getAllButtonList: (params) => http(params, `${ api_root }/${ controller.permission }/getAllButtonList`),
        // 分配按钮（添加、取消）
        saveButtonPermissions: (params) => http(params, `${ api_root }/${ controller.permission }/saveButtonPermissions`),
        // 获取分配的二级菜单和按钮
        getSecondMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getSecondMenuList`),
        // 获取已分配的一级菜单

        getFirstMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getFirstMenuList`),
        // getFirstMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getMenuList`),


        //getMenuList


        // 获取角色列表
        getRoleList: (params) => http(params, `${ api_root }/${ controller.permission }/getRoleList`),
        // 新增角色
        addRole: (params) => http(params, `${ api_root }/${ controller.permission }/addRole`),
        // 编辑角色
        updateRole: (params) => http(params, `${ api_root }/${ controller.permission }/updateRole`),
        // 删除角色
        deleteRoleRow: (params) => http(params, `${ api_root }/${ controller.permission }/deleteRole`),


        // 获取按钮列表
        getButtonList: (params) => http(params, `${ api_root }/${ controller.permission }/getButtonList`),
        // 新增按钮
        addButton: (params) => http(params, `${ api_root }/${ controller.permission }/addButton`),
        // 编辑按钮
        updateButton: (params) => http(params, `${ api_root }/${ controller.permission }/updateButton`),
        // 删除按钮
        deleteButtonRow: (params) => http(params, `${ api_root }/${ controller.permission }/deleteButton`),


        // 获取菜单列表
        getMenuList: (params) => http(params, `${ api_root }/${ controller.permission }/getMenuList`),
        // 新增菜单
        addMenu: (params) => http(params, `${ api_root }/${ controller.permission }/addMenu`),
        // 编辑菜单
        updateMenu: (params) => http(params, `${ api_root }/${ controller.permission }/updateMenu`),
        // 删除菜单
        deleteMenuRow: (params) => http(params, `${ api_root }/${ controller.permission }/deleteMenu`),

        getButtonByMenuIdAndRole: params => http(params, `${ api_root }/${ controller.permission }/getButtonByMenuIdAndRole`),

        getTableColumnUi: params => http(params, `${ api_root }/${ controller.permission }/getTableColumnUi`),
        
        getUserInformationByMenuId: params => http(params, `${ api_root }/${ controller.permission }/getUserInformationByMenuId`),
        
        getRoleByMenuId: params => http(params, `${ api_root }/${ controller.permission }/getRoleByMenuId`),

    }

}

