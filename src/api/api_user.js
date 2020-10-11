import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class user {
    static apis = {
        // 根据关键字（用户名）获取所有用户
        getAllUser: (params) => http(params, `${ api_root }/Sales_api/getAllUser`),
        login_mobile: (params) => http(params, `${ api_root }/Auth/login_mobile`),
        login_qrscan: (params) => http(params, `${ api_root }/Auth/login_qrscan`),
        saveRoleAsign: (params) => http(params, `${ api_root }/user/saveRoleAsign`),
        profile: params => http(params, `${ api_root }/Auth/profile`),
        edit_password: params => http(params, `${ api_root }/Auth/changepwd`),
        getUserRoles: params => http(params, `${ api_root }/Auth/getUserRolesById`),
        getAllRoles: params => http(params, `${ api_root }/${ controller.user }/getAllRoles`),
        //编辑个人中心
        updateUserInformation: params => http(params, `${ api_root }/${ controller.user }/updateUserInformation`),
        // 离职人员销售合同未返交接单新增
        }
}


