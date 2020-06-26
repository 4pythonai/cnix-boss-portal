import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class ActivityRecord {
    static apis = {
        removeMember: (params) => http(params, `${ api_root }/${ controller.sales_api }/deleteMember`),
        addMember: (params) => http(params, `${ api_root }/${ controller.sales_api }/addMember`),
        removeRecord: (params) => http(params, `${ api_root }/${ controller.sales_api }/removeRecord`),
        addReply: (params) => http(params, `${ api_root }/${ controller.sales_api }/addReply`),
        addRecord: (params) => http(params, `${ api_root }/${ controller.sales_api }/addRecord`),
        getRecordList: (params) => http(params, `${ api_root }/${ controller.sales_api }/recordList`),
        // 获取成员列表
        getMember: (params) => http(params, `${ api_root }/${ controller.sales_api }/getMember`),
        // 获取机会进度、活动记录
        getWechatSalesChanceChanceProgessById: (params) => http(params, `${ api_root }/${ controller.sales_api }/getWechatSalesChanceChanceProgessById`),
        // 提交详情
        addWechatSalesChanceChanceProgess: (params) => http(params, `${ api_root }/${ controller.sales_api }/addWechatSalesChanceChanceProgess`),
        // 获取相关资源调查单
        getResourceList: (params) => http(params, `${ api_root }/${ controller.sales_api }/getResourceList`)

    }
}


