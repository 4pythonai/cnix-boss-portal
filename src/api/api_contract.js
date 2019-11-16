import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`



export default class api_contract {
    static apis = {
        // 文件上传
        upload: `${ api_root }/${ controller.contract_api }/uploadfile`,
        // 生成合同号的不重复5位数字
        getNorepeatNumbre: (params) => http(params, `${ api_root }/${ controller.contract_api }/readBossNorepeatNumber`),
        //获取签约方
        getSignerList: (params) => http(params, `${ api_root }/${ controller.contract_api }/getPartyB`),
        // 获取项目列表
        getProjectList: (params) => http(params, `${ api_root }/${ controller.contract_api }/findProjectByName`),
        // 保存合同
        addContract: (params) => http(params, `${ api_root }/${ controller.contract_api }/addContract`),
        // 删除附件
        deleteFile: (params) => http(params, `${ api_root }/${ controller.contract_api }/deletefile`),
        // 获取客户地址详情
        getAddressById: (params) => http(params, `${ api_root }/${ controller.contract_api }/getAddressById`),
        // 获取基本配置
        getContractBizConfig: (params) => http(params, `${ api_root }/${ controller.contract_api }/getContractBizConfig`),

        // 合同列表
        getContractList: (params) => http(params, `${ api_root }/${ controller.contract_api }/contractList`),
        // 更改合同状态
        changeContractStatus: params => http(params, `${ api_root }/${ controller.contract_api }/ChangeContractStatus`),
        // 删除合同
        deleteContract: params => http(params, `${ api_root }/${ controller.contract_api }/deleteContract`),
        // 修改合同
        updateContract: params => http(params, `${ api_root }/${ controller.contract_api }/updateContract`),
        // 获取合同详情
        getContractByContractNo: params => http(params, `${ api_root }/${ controller.contract_api }/getContractByContractNo`),

        // 更新收费项
        updateChargeItem: params => http(params, `${ api_root }/${ controller.contract_api }/updateChargeItem`),
        // 删除收费项
        deleteChargeItems: params => http(params, `${ api_root }/${ controller.contract_api }/deleteChargeItems`),
        // 添加收费项
        addChargeData: params => http(params, `${ api_root }/${ controller.contract_api }/addChargeItems`),
        // 获取收费项列表
        getChargeData: params => http(params, `${ api_root }/${ controller.contract_api }/getChargeData`),

        //获取资源列表
        getResItemList: params => http(params, `${ api_root }/${ controller.contract_api }/getResItemList`),
        //获取资源配置
        getUICfg: params => http(params, `${ api_root }/${ controller.resitemui }/getUICfg`),
        // 计算资源项的收费

        getResbilling: params => http(params, `${ api_root }/${ controller.billing_api }/Testbilling`),

        // 生成合同号
        generateContractNo: params => http(params, `${ api_root }/${ controller.contract_api }/generateContractNo`),
        // 获取合同详情
        getContractDetail:params => http(params, `${ api_root }/${ controller.contract_api }/getContractDataById`),
        // 获取合同客户
        updateContractCustomer:params => http(params, `${ api_root }/${ controller.contract_api }/updateContractCustomerIdById`),
        // 获取合同详情
        getAddressList:params => http(params, `${ api_root }/${ controller.contract_api }/getAddressList`)
    }
}


