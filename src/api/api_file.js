import {root_url,port,controller,version_2} from './api_config/base_config'
import http from './http'

const api_root = `${root_url}:${port}/${version_2}`


export default class filehandler {
  static apis = {
    uploadFile: `${api_root}/File/uploadFile`,
    upload: `${api_root}/File/upload`,
    uploadBankExcel: `${api_root}/File/uploadBankExcel`,
    addFiles: params => http(params,`${api_root}/File/upload`),
    getFiles: params => http(params,`${api_root}/Start_work/getStartWorkFilePathByUuid`),
    deleteFiles: params => http(params,`${api_root}/File/deleteFile`),
  }
}