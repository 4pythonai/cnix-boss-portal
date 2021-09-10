import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class buyin {
    static methods = {
        getVendors: (params) => http(params, `${api_root}/Buyin/getVendors`),
        saveBuyInProd: (params) => http(params, `${api_root}/Buyin/saveBuyInProd`),
        getBandWidthCarriers: (params) => http(params, `${api_root}/Buyin/getBandWidthCarriers`)
    };
}
