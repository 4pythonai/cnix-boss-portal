export default class permission {
    static methods = {
        getRoleMenuList: '/Permission/getRoleMenuList',
        // 根据角色获取用户
        getUserByRole: '/Permission/getUserByRole',

        getAllMenuList: '/Permission/getAllMenuList',
        getTreeMenuList: '/Permission/getTreeMenuList',
        // 分配菜单（添加、取消）
        saveMenuPermission: '/Permission/saveMenuPermissions',
        getRoleButtonList: '/Permission/getRoleButtonList',
        getAllButtonList: '/Permission/getAllButtonList',
        // 分配按钮（添加、取消）
        saveButtonPermissions: '/Permission/saveButtonPermissions',
        // 获取分配的二级菜单和按钮
        getSecondMenuList: '/Permission/getSecondMenuList',
        // 获取已分配的一级菜单

        getFirstMenuList: '/Permission/getFirstMenuList',
        // 获取角色列表
        getRoleList: '/Permission/getRoleList',
        // 新增角色
        addRole: '/Permission/addRole',
        // 编辑角色
        updateRole: '/Permission/updateRole',
        // 删除角色
        deleteRoleRow: '/Permission/deleteRole',

        // 获取菜单列表
        getMenuList: '/Permission/getMenuList',
        // 新增菜单
        addMenu: '/Permission/addMenu',
        // 编辑菜单
        updateMenu: '/Permission/updateMenu',
        deleteMenuRow: '/Permission/deleteMenu',
        getUserInformationByMenuId: '/Permission/getUserInformationByMenuId',
        getRoleByMenuId: '/Permission/getRoleByMenuId',
        getBtnForbiddens: '/Permission/getBtnForbiddens',
        getActRoleList: '/Permission/getActRoleList',
        saveForbiddenBtns: '/Permission/saveForbiddenBtns',
        orgTree: '/Organization/orgTree',
        getDeptMembers: '/Organization/getDeptMembers',
        getButtonInfo: '/Permission/getButtonInfo',

        // 角色相关的 字段隐藏配置
        saveRoleFieldVisible: '/Permission/saveRoleFieldVisible',
        getRoleFieldVisible: '/Permission/getRoleFieldVisible'
    };
}
