import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class report {
    static methods = {
        // 应收/已收/欠费

        // 根据客户账单
        reportByPaperBill: (params) => http(params, `${api_root}/Report/reportByPaperBill`),

        // 根据合同账单
        reportByContractBill: (params) => http(params, `${api_root}/Report/reportByContractBill`),

        // 根据客户账单
        reportByProductFromPaperBill: (params) => http(params, `${api_root}/Report/reportByProductFromPaperBill`)
    };
}
