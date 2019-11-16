import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class user {
    static apis = {
        // 根据关键字（用户名）获取所有用户
        getAllUser: (params) => http(params, `${ api_root }/${ controller.sales }/getAllUser`),
        login_mobile: (params) => http(params, `${ api_root }/auth/login_mobile`),
        login_qrscan: (params) => http(params, `${ api_root }/auth/login_qrscan`),
        saveRoleAsign: (params) => http(params, `${ api_root }/user/saveRoleAsign`),
        getPendingCount: (params) => http(params, `${ api_root }/${ controller.sales }/notify_bpm`),
        profile: params => http(params, `${ api_root }/${ controller.auth }/profile`),
        edit_password: params => http(params, `${ api_root }/${ controller.auth }/changepwd`),
        setnotify: params => http(params, `${ api_root }/${ controller.auth }/setnotify`),
        uploadfile: params => http(params, `${ api_root }/${ controller.auth }/uploadfile`),
        getUserRoles: params => http(params, `${ api_root }/${ controller.auth }/getUserRolesById`),
        getAllRoles: params => http(params, `${ api_root }/${ controller.user }/getAllRoles`),
    }
}


