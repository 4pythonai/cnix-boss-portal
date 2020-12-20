import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';
const api_root = `${ root_url }:${ port }/${ version_2 }`;
export default class tools {
    static apis = {
         sync_contractbillids_vs_paperbill_ids: (params) => http(params, `${ api_root }/Tools/sync_contractbillids_vs_paperbill_ids`),
         check_dup_contractbillids_used: (params) => http(params, `${ api_root }/Tools/check_dup_contractbillids_used`),
          
    }
}

