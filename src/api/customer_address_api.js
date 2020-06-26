<<<<<<< HEAD
import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`

export default class customer {
    static apis = {
        checkAddress: params => http(params, `${ api_root }/${ controller.address }/checkAddress`),
        checkIsOurData: params => http(params, `${ api_root }/${ controller.sales_api }/checkIsOurData`)


    }
}
=======
import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }/${ controller.address }`



class address {
    checkAddress = (params) => http(params, `${ api_root }/checkAddress`);

}

export default new address()
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
