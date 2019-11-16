import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class curd {
    static apis = {
        upload: `${ api_root }/File/upload`,
        listData: params => http(params, `${ api_root }/${ params.geturl }`),
        deleteData: params => http(params, `${ api_root }/${ params.delurl }`),
        updateData: params => http(params, `${ api_root }/${ params.updateurl }`),
        addData: params => http(params, `${ api_root }/${ params.addurl }`),
        addFiles: params => http(params, `${ api_root }/File/upload`),
        getFiles: params => http(params, `${ api_root }/Start_work/getStartWorkFilePathByUuid`),
        deleteFiles: params => http(params, `${ api_root }/File/deleteFile`),
        batchUpdate: params => http(params, `${ api_root }/${ controller.curd }/batchData`),
        getTableData: params => http(params, `${ api_root }/${ controller.curd }/getTableData`)

    }
}


