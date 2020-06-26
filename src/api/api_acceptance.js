import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class   custservice   {
    static apis = {

        // 开通响应竣工单
        addIDCCompleteorder: params => http(params, `${ api_root }/acceptance/addIDCCompleteorder`),
       
        addNetworkCompleteOrder: params => http(params, `${ api_root }/acceptance/addNetworkCompleteOrder`),
        addLineCompleteOrder: params => http(params, `${ api_root }/acceptance/addLineCompleteOrder`),
       
       
        getIDCCabinetOrderData: params => http(params, `${ api_root }/acceptance/getIDCCabinetOrderData`),
        getNetowkrOrderData: params => http(params, `${ api_root }/acceptance/getNetowkrOrderData`),
        getLineOrderData: params => http(params, `${ api_root }/acceptance/getLineOrderData`),
     
      
         
        
    }
}


