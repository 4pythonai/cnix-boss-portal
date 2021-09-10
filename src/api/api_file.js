import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class filehandler {
    static apis = {
        upload: `${api_root}/File/upload`,
        uploadBankExcel: `${api_root}/File/uploadBankExcel`
    };
}
