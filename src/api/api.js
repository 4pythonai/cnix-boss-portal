import device from './api_device';
import processmanager from './api_processmanager';
import activity from './api_activity';
import curd from './api_curd';
import auth from './api_auth';
import bpm from './api_bpm';
import permission from './api_permission';
import user from './api_user';
import customer from './api_customer';
import billingSale from './api_billing_sale';
import billingBuy from './api_billing_buy';

import network from './api_network';
import sdwan from './api_sdwan';
import report from './api_report_sale';
import buyReport from './api_report_buy';
import button from './api_button';
import tools from './api_tools';
import filehandler from './api_file';
import buyin from './api_buyin';
import api_contract from './api_contract';
import api_redislog from './api_redislog';
import dd from './api_dd';
import { api_root } from './api_config/base_config';
import http from './http';
export { api_root };
export default class api {}

api.button = button;
api.device = device;
api.processmanager = processmanager;
api.activity = activity;
api.curd = curd;
api.auth = auth;
api.bpm = bpm;
api.permission = permission;
api.user = user;
api.customer = customer;
api.billingSale = billingSale;
api.billingBuy = billingBuy;
api.network = network;
api.sdwan = sdwan;
api.report = report;
api.buyReport = buyReport;
api.tools = tools;
api.filehandler = filehandler;
api.buyin = buyin;
api.contract = api_contract;
api.redislog = api_redislog;
api.dd = dd;

Object.keys(api).forEach((schema, index, array) => {
    const methods = api[schema].methods;
    // console.log(methods);
    Object.keys(methods).forEach((method, index, array) => {
        let url = methods[method];
        api[schema][method] = (params) => http(params, `${api_root}${url}`);
    });
});

api.curd.listData = (params) => http(params, `${api_root}/${params.geturl}`);
api.curd.deleteData = (params) => http(params, `${api_root}/${params.delurl}`);
api.curd.updateData = (params) => http(params, `${api_root}/${params.updateurl}`);
api.curd.addData = (params) => http(params, `${api_root}/${params.addurl}`);
api.activity.getAssociateData = (params) => http(params, `${api_root}/${params.data.api}`);
