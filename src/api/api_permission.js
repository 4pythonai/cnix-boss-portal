import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class permission {
    static apis = {
        getRoleMenuList: (params) => http(params, `${api_root}/Permission/getRoleMenuList`),
        // 根据角色获取用户
        getUserByRole: (params) => http(params, `${api_root}/Permission/getUserByRole`),

        getAllMenuList: (params) => http(params, `${api_root}/Permission/getAllMenuList`),
        getTreeMenuList: (params) => http(params, `${api_root}/Permission/getTreeMenuList`),
        // 分配菜单（添加、取消）
        saveMenuPermission: (params) => http(params, `${api_root}/Permission/saveMenuPermissions`),
        getRoleButtonList: (params) => http(params, `${api_root}/Permission/getRoleButtonList`),
        getAllButtonList: (params) => http(params, `${api_root}/Permission/getAllButtonList`),
        // 分配按钮（添加、取消）
        saveButtonPermissions: (params) => http(params, `${api_root}/Permission/saveButtonPermissions`),
        // 获取分配的二级菜单和按钮
        getSecondMenuList: (params) => http(params, `${api_root}/Permission/getSecondMenuList`),
        // 获取已分配的一级菜单

        getFirstMenuList: (params) => http(params, `${api_root}/Permission/getFirstMenuList`),
        // 获取角色列表
        getRoleList: (params) => http(params, `${api_root}/Permission/getRoleList`),
        // 新增角色
        addRole: (params) => http(params, `${api_root}/Permission/addRole`),
        // 编辑角色
        updateRole: (params) => http(params, `${api_root}/Permission/updateRole`),
        // 删除角色
        deleteRoleRow: (params) => http(params, `${api_root}/Permission/deleteRole`),

        // 获取菜单列表
        getMenuList: (params) => http(params, `${api_root}/Permission/getMenuList`),
        // 新增菜单
        addMenu: (params) => http(params, `${api_root}/Permission/addMenu`),
        // 编辑菜单
        updateMenu: (params) => http(params, `${api_root}/Permission/updateMenu`),

        getUserInformationByMenuId: (params) => http(params, `${api_root}/Permission/getUserInformationByMenuId`),

        getRoleByMenuId: (params) => http(params, `${api_root}/Permission/getRoleByMenuId`)
    };
}
