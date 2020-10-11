import { root_url, port, version_2 } from './api_config/base_config'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class auth {
    static apis = {
        socket_url: 'wss://apis.sinnet.com.cn:9000/wss/',
        miniLogin: 'https://apis.sinnet.com.cn/v8/weixin/scancallback?ENV=DEV',
    }
}



