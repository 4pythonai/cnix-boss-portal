import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class auth {
    static apis = {
        domain: `${ root_url }:${ port }/auth/`,
        qr_url: `${ api_root }/qrcoder/img?transaction_id=`,
        // socket_url: 'wss://apis.sinnet.com.cn:9000/wss/web_login_queue/',
        socket_url: 'wss://apis.sinnet.com.cn:9000/wss/',

        // socket_url: 'wss://127.0.0.1:9001/wss/web_login_queue/',

        change_badge_num: 'ws://apis.sinnet.com.cn:9000/wss/change_badge_num/',
        miniLogin: 'https://apis.sinnet.com.cn/v8/weixin/scancallback?ENV=DEV',
        upload_display_url: `${ root_url }:${ port }/`
    }
}



