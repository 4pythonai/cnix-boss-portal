import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`



export default class api_contract {
    static apis = {
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
        getContractByUUID: params => http(params, `${ api_root }/${ controller.contract_api }/getContractByUUID`),
        
        
        // 更新收费项
        updateChargeItem: params => http(params, `${ api_root }/${ controller.contract_api }/updateChargeItem`),
        // 删除收费项
        deleteChargeItem: params => http(params, `${ api_root }/${ controller.contract_api }/deleteChargeItem`),
        // 添加收费项
        addChargeData: params => http(params, `${ api_root }/${ controller.contract_api }/addChargeItem`),
        // 获取收费项列表
        getChargeData: params => http(params, `${ api_root }/${ controller.contract_api }/getChargeData`),

        //获取资源列表
        getResItemList: params => http(params, `${ api_root }/${ controller.contract_api }/getResItemList`),
        //获取资源配置
        getUICfg: params => http(params, `${ api_root }/${ controller.resitemui }/getUICfg`),
        
        // 生成合同号
        generateContractNo: params => http(params, `${ api_root }/${ controller.contract_api }/generateContractNo`),
        // 获取合同详情  
        getContractDataById: params => http(params, `${ api_root }/${ controller.contract_api }/getContractDataById`),
        // 获取合同客户
        updateContractCustomer: params => http(params, `${ api_root }/${ controller.contract_api }/updateContractCustomerIdById`),
        // 获取合同详情
        getAddressList: params => http(params, `${ api_root }/${ controller.contract_api }/getAddressList`),
        
        
         
        // 收费项对比
        getChargeCompare: params => http(params, `${ api_root }/${ controller.contract_api }/checkCabinetItemsDifferent`),

        // 根据人员获取合同
        searchUserContractsUsage: params => http(params, `${ api_root }/${ controller.contract_api }/searchUserContractsUsage`),
       
        // 一键转为盖章(合同部)
        deliverToContractDepartment: params => http(params, `${ api_root }/${ controller.contract_api }/deliverToContractDepartment`),
        //收款合同转为付款合同
        turnReceiveToPay: params => http(params, `${ api_root }/${ controller.contract_api }/turnReceiveToPay`),

        //批量设置档案号
        batchSetArchieveNo: params => http(params, `${ api_root }/${ controller.contract_api }/batchSetArchieveNo`),
        
        
        backToAssistant: params => http(params, `${ api_root }/${ controller.contract_api }/backToAssistant`),
        //退回销售
        returnSalesContract:params => http(params, `${ api_root }/${ controller.contract_api }/returnSalesContract`),
        
        //同意转正式合同
        transferredFormalContract:params => http(params, `${ api_root }/${ controller.contract_api }/transferredFormalContract`),
        
        //预签合同转正式合同
        trunToRegular:params => http(params, `${ api_root }/${ controller.contract_api }/trunToRegular`),

        //获取真正的processkey and uuid
        getRealProcesskeyAndUUID  :params => http(params, `${ api_root }/${ controller.contract_api }/getRealProcesskeyAndUUID`),

        //获取真正的processkey and uuid
        ReceiveContractPaper  :params => http(params, `${ api_root }/${ controller.contract_api }/ReceiveContractPaper`),

         
         
    
    
    
    
    
    
    }
}


