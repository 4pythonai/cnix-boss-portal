export default class user {
    static methods = {
        // 根据关键字（用户名）获取所有用户
        getAllUser: '/Sales_api/getAllUser',
        login_mobile: '/Auth/login_mobile',
        login_qrscan: '/Auth/login_qrscan',
        saveRoleAsign: '/user/saveRoleAsign',
        profile: '/Auth/profile',
        edit_password: '/Auth/changepwd',
        getUserRoles: '/Auth/getUserRolesById',
        getAllRoles: '/User/getAllRoles',
        //编辑个人中心
        resetPassword: '/User/resetPassword',
        updateUserInformation: '/User/updateUserInformation'
        // 离职人员销售合同未返交接单新增
    };
}
