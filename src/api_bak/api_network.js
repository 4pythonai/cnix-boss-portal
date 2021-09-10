import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class network {
    static methods = {
        saveBatchIP: (params) => http(params, `${api_root}/Network/saveBatchIP`),
        saveBatchODFPort: (params) => http(params, `${api_root}/Network/saveBatchODFPort`),
        getOdfsummary: (params) => http(params, `${api_root}/Network/getOdfsummary`),
        saveSwinnerLink: (params) => http(params, `${api_root}/Network/saveSwinnerLink`),
        clear_ibm_net_usage: (params) => http(params, `${api_root}/Network/clear_ibm_net_usage`),
        SetRsBillingState: (params) => http(params, `${api_root}/Network/SetRsBillingState`)
    };
}
