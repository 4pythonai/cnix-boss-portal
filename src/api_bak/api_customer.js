import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class customer {
    static methods = {
        inquiryCompanyMsg: (params) => http(params, `${api_root}/Sales_api/inquiryCompanyMsg`),
        inquiryCompanyList: (params) => http(params, `${api_root}/Sales_api/inquiryCompanyList`)
    };
}
