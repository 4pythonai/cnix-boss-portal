import { root_url, port, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`



export default class device {
    static apis = {
        getProdSpec: (params) => http(params, `${ api_root }/device/getProdSpec`),
        addModel: (params) => http(params, `${ api_root }/device/addModel`),
        addOdfModel: (params) => http(params, `${ api_root }/device/addOdfModel`),
        addSwitchModel: (params) => http(params, `${ api_root }/device/addSwitchModel`),
        addWdmModel: (params) => http(params, `${ api_root }/device/addWdmModel`),
        saveXpath: (params) => http(params, `${ api_root }/device/saveXpath`),
        addBossXpath: (params) => http(params, `${ api_root }/device/addBossXpath`),
        updateBossXpath: (params) => http(params, `${ api_root }/device/updateBossXpath`),
    }
}

