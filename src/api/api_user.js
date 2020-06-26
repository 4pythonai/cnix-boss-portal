import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class user {
    static apis = {
        // 根据关键字（用户名）获取所有用户
        getAllUser: (params) => http(params, `${ api_root }/${ controller.sales_api }/getAllUser`),
        login_mobile: (params) => http(params, `${ api_root }/auth/login_mobile`),
        login_qrscan: (params) => http(params, `${ api_root }/auth/login_qrscan`),
        saveRoleAsign: (params) => http(params, `${ api_root }/user/saveRoleAsign`),
        getPendingCount: (params) => http(params, `${ api_root }/${ controller.sales_api }/notify_bpm`),
        profile: params => http(params, `${ api_root }/${ controller.auth }/profile`),
        edit_password: params => http(params, `${ api_root }/${ controller.auth }/changepwd`),
        setnotify: params => http(params, `${ api_root }/${ controller.auth }/setnotify`),
        getUserRoles: params => http(params, `${ api_root }/${ controller.auth }/getUserRolesById`),
        getAllRoles: params => http(params, `${ api_root }/${ controller.user }/getAllRoles`),
        //编辑个人中心
        updateUserInformation: params => http(params, `${ api_root }/${ controller.user }/updateUserInformation`),
        // 离职人员销售合同未返交接单新增
        addResignHandover: params => http(params, `${ api_root }/ResignHandover/addResignHandover`),
        // 获取选择的合同
        getQuitSelectContractList: params => http(params, `${ api_root }/ResignHandover/getQuitSelectContractList`),
        // 离职人员销售合同未返交接单编辑
        editResignHandover: params => http(params, `${ api_root }/ResignHandover/editResignHandover`)
    }
}


