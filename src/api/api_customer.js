import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class customer {
    static apis = {
          inquiryCompanyMsg: (params) => http(params, `${ api_root }/Sales_api/inquiryCompanyMsg`),
        // 根据客户id获取客户地址
         // 提交地址，待审批
         inquiryCompanyList: (params) => http(params, `${ api_root }/Sales_api/inquiryCompanyList`),
      }
}


