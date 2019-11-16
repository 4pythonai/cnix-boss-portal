import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class ActivityRecord {
    static apis = {
        removeMember: (params) => http(params, `${ api_root }/${ controller.sales }/deleteMember`),
        addMember: (params) => http(params, `${ api_root }/${ controller.sales }/addMember`),
        removeRecord: (params) => http(params, `${ api_root }/${ controller.sales }/removeRecord`),
        addReply: (params) => http(params, `${ api_root }/${ controller.sales }/addReply`),
        addRecord: (params) => http(params, `${ api_root }/${ controller.sales }/addRecord`),
        getRecordList: (params) => http(params, `${ api_root }/${ controller.sales }/recordList`),
        // 获取成员列表
        getMember: (params) => http(params, `${ api_root }/${ controller.sales }/getMember`),
    }
}


