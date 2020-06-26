import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class contractmanage {
    static apis = {
        getContractList: params => http(params, `${ api_root }/${ controller.contract_management }/getContractList`),
        getBusinessTypeList: params => http(params, `${ api_root }/${ controller.contract_management }/getBusinessTypeList`),
        getCustomTypeList: params => http(params, `${ api_root }/${ controller.contract_management }/getAllContractCustomerType`),
        addCustomerType: params => http(params, `${ api_root }/${ controller.contract_management }/insertContractCustomerType`),
        updateCustomerType: params => http(params, `${ api_root }/${ controller.contract_management }/updateContractCustomerType`),
        deleteCustomerType: params => http(params, `${ api_root }/${ controller.contract_management }/deleteContractCustomerType`),
        getAllContractCustomerType: params => http(params, `${ api_root }/${ controller.contract_management }/getAllContractCustomerType`),

        updateContractStatus: params => http(params, `${ api_root }/${ controller.contract_management }/updateContractStatus`),
        saveStampData: params => http(params, `${ api_root }/${ controller.contract_management }/saveStampData`),
        // 
        sealOperation: params => http(params, `${ api_root }/${ controller.contract_management }/sealOperation`),
        // 修改备注（盖章备注，归档备注，返还备注）
        updateNote: params => http(params, `${ api_root }/${ controller.contract_management }/updateContractNewNote`),
        // 获取所有的客户类型
        getAllCustomerType: params => http(params, `${ api_root }/${ controller.contract_management }/getAllCustomerType`)
    }
}


