import device from './api_device';
import processmanager from './api_processmanager';
import activity from './api_activity';
import curd from './api_curd';
import auth from './api_auth';
import bpm from './api_bpm';
import permission from './api_permission';
import user from './api_user';
import customer from './api_customer';
import activityRecord from './api_activityRecord';
import billing from './api_billing';
import network from './api_network';
import report from './api_report';
import button from './api_button';
import tools from './api_tools';
import filehandler from './api_file';
import buyin from './api_buyin';

import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';
const api_root = `${root_url}:${port}/${version_2}`;
export { api_root };

export default class api {
    static organization = {
        orgTree: (params) => http(params, `${api_root}/Organization/orgTree`),
        getDeptMembers: (params) => http(params, `${api_root}/Organization/getDeptMembers`)
    };

    static cabinet_api = {
        // 获取机柜数据
        getCabinetData: (params) => http(params, `${api_root}/Cabinet_api/getCabinetData`),
        getCabinetTableData: (params) => http(params, `${api_root}/Cabinet_api/getCabinetDetails`)
        // 获取机柜表格信息
    };
}

api.button = button.apis;
api.device_api = device.apis;
api.processmanager = processmanager.apis;
api.activity = activity.apis;
api.curd = curd.apis;
api.auth = auth.apis;
api.bpm = bpm.apis;
api.permission = permission.apis;
api.user = user.apis;
api.customer = customer.apis;
api.activityRecord = activityRecord.apis;
api.billing = billing.apis;
api.network = network.apis;
api.report = report.apis;
api.tools = tools.apis;
api.filehandler = filehandler.apis;
api.buyin = buyin.apis;
