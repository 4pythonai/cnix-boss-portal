import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class customer {
    static apis = {
        // 获取客户列表
        getCustomer: `${ api_root }/${ controller.sales }/getCustomer`,
        // 获取地址列表
        getCustomerAddressList: (params) => http(params, `${ api_root }/${ controller.sales }/getCustomerAddressList`),
        removeCustomer: (params) => http(params, `${ api_root }/${ controller.sales }/removeCustomer`),
        inquiryCompanyMsg: (params) => http(params, `${ api_root }/${ controller.sales }/inquiryCompanyMsg`),
        // 根据客户id获取客户地址
        getAddressByCustomerId: (params) => http(params, `${ api_root }/${ controller.sales }/getAddressByCustomerId`),
        addCustomer: (params) => http(params, `${ api_root }/${ controller.sales }/addCustomer`),
        // 提交地址，待审批
        pendingAddress: (params) => http(params, `${ api_root }/${ controller.sales }/pendingAddress`),
        removeAddress: (params) => http(params, `${ api_root }/${ controller.sales }/removeAddress`),
        editCustomer: (params) => http(params, `${ api_root }/${ controller.sales }/editCustomer`),
        inquiryCompanyList: (params) => http(params, `${ api_root }/${ controller.sales }/inquiryCompanyList`),
        getCustomerLikeByCustomName: (params) => http(params, `${ api_root }/${ controller.sales }/getCustomerLikeByCustomName`),
        getCustomerDetailByUserPhone: params => http(params, `${ api_root }/${ controller.sales }/getCustomerDetailByUserPhone`),
    }
}


