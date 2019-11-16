import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }/${ controller.address }`



class address {
    checkAddress = (params) => http(params, `${ api_root }/checkAddress`);

}

export default new address()