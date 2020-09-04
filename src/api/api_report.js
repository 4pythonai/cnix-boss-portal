import { root_url, port, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class report {
    static apis = {

        // 应收报表


        getShouldPay: params => http(params, `${ api_root }/Report/getShouldPay`),
        getOwnedReport: params => http(params, `${ api_root }/Report/getOwnedReport`),
        getPayedReport: params => http(params, `${ api_root }/Report/getPayedReport`),


        // 根据客户账单
        getShouldPayByPaperBill: params => http(params, `${ api_root }/Report/getShouldPayByPaperBill`),
        getMRRReport: params => http(params, `${ api_root }/Report/getMRRReport`),



    }
}


