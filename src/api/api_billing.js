import {root_url,port,version_2} from './api_config/base_config'
import http from './http'

const api_root = `${root_url}:${port}/${version_2}`


export default class billing {
  static apis = {


    // 按照合同进行计费
    billByContract: params => http(params,`${api_root}/Billing/billByContract`),

    // 按照客户进行计费
    billByCust: params => http(params,`${api_root}/Billing/billByCust`),


    saveBill: params => http(params,`${api_root}/Billing/saveBill`),
    transferContract: params => http(params,`${api_root}/App/transferContract`),
    prepareBills: params => http(params,`${api_root}/Billing/prepareBills`),
    saveSettlement: params => http(params,`${api_root}/Billing/saveSettlement`),
    settlementdetail: params => http(params,`${api_root}/Billing/settlementdetail`),
    getUnUsedBills: params => http(params,`${api_root}/Billing/getUnUsedBills`),
    saveCombinedBill: params => http(params,`${api_root}/Billing/saveCombinedBill`),
    getPaperInfoById: params => http(params,`${api_root}/Billing/getPaperInfoById`),
    getZones: params => http(params,`${api_root}/Billing/getZones`),
    getContractRelatedResources: params => http(params,`${api_root}/Billing/getContractRelatedResources`),
    savePaperBillLocateYearMonth: params => http(params,`${api_root}/Billing/savePaperBillLocateYearMonth`),
    // IBM1 合同测试接口
    testIBM: params => http(params,`${api_root}/Billing/testIBM`),
    OneKeyCostBill: params => http(params,`${api_root}/Billing/OneKeyCostBill`),
    percentComputer:params => http(params,`${api_root}/Billing/percentComputer`),
  }
}


