import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class notify {
    static methods = {
        // 根据关键字（用户名）获取所有用户
        saveReadNotify: (params) => http(params, `${api_root}/Notify/saveReadNotify`),
        sendSmsForContractDept: (params) => http(params, `${api_root}/Notify/sendSmsForContractDept`)
    };
}
