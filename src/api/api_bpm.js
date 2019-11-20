import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class bpm {
    static apis = {


        // sync user data
        syncNetworkStatus: params => http(params, `${ api_root }/network/syncNetworkStatus`),

    }
}


