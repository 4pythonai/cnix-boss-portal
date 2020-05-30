import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class billing {
    static apis = {
        billtest: params => http(params, `${ api_root }/Billing/billtest`),
        saveBill: params => http(params, `${ api_root }/Billing/saveBill`),
        transferContract: params => http(params, `${ api_root }/App/transferContract`),
        prepareBills: params => http(params, `${ api_root }/Billing/prepareBills`),
        saveSettlement: params => http(params, `${ api_root }/Billing/saveSettlement`),
        settlementdetail: params => http(params, `${ api_root }/Billing/settlementdetail`),
        getUnUsedBills: params => http(params, `${ api_root }/Billing/getUnUsedBills`),
        saveCombinedBill: params => http(params, `${ api_root }/Billing/saveCombinedBill`),
        getPaperInfoById: params => http(params, `${ api_root }/Billing/getPaperInfoById`),
        getZones: params => http(params, `${ api_root }/Billing/getZones`),
        
        
    }
}


