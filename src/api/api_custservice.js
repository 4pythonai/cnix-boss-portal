import { root_url, port, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class custservice {
    static apis = {


        setContractCustomerService: params => http(params, `${ api_root }/Custservice/setContractCustomerService`),
        cs_vs_contract_report: params => http(params, `${ api_root }/Custservice/cs_vs_contract_report`),
        ApplyNetLineCompleteOrder: params => http(params, `${ api_root }/Custservice/ApplyNetLineCompleteOrder`),
        ApplyCabinetCompleteOrder: params => http(params, `${ api_root }/Custservice/ApplyCabinetCompleteOrder`),
        ReturnCabinetCompleteOrder: params => http(params, `${ api_root }/Custservice/ReturnCabinetCompleteOrder`),
        ReturnNetLineCompleteOrder: params => http(params, `${ api_root }/Custservice/ReturnNetLineCompleteOrder`),

    }
}


