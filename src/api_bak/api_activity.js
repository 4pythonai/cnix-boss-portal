import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class activity {
    static methods = {
        getAssociateData: (params) => http(params, `${api_root}/${params.data.api}`),
        getACtcfg: (params) => http(params, `${api_root}/Activity/getACtcfg`),
        getPortalDataGrids: (params) => http(params, `${api_root}/Activity/getPortalDataGrids`),
        batchSetButtons: (params) => http(params, `${api_root}/Activity/batchSetButtons`),
        addActionButton: (params) => http(params, `${api_root}/Activity/addActionButton`),
        addActionCode: (params) => http(params, `${api_root}/Activity/addActionCode`),
        deleteAction: (params) => http(params, `${api_root}/Activity/deleteAction`),
        getActCols: (params) => http(params, `${api_root}/Activity/getActCols`),
        getAllCategory: (params) => http(params, `${api_root}/Activity/getAllCategory`),
        saveTriggerGroup: (params) => http(params, `${api_root}/Activity/saveTriggerGroup`),
        getTriggerGroups: (params) => http(params, `${api_root}/Activity/getTriggerGroups`),
        deleteTriggerGroup: (params) => http(params, `${api_root}/Activity/deleteTriggerGroup`),
        saveFieldCfg: (params) => http(params, `${api_root}/Activity/saveFieldCfg`),
        modifyActionCode: (params) => http(params, `${api_root}/Activity/modifyActionCode`),
        saveOverrideQueryCfg: (params) => http(params, `${api_root}/Activity/saveOverrideQueryCfg`),
        addGridReferCfg: (params) => http(params, `${api_root}/Activity/addGridReferCfg`),

        //  基于 commonTable一条记录的数据,获取相关数据.  actionBasedRowPuller
        actionBasedRowPuller: (params) => http(params, `${api_root}/Activity/actionBasedRowPuller`),

        exportExcel: (params) => http(params, `${api_root}/Activity/exportExcel`),

        batchUpdateFieldCfg: (params) => http(params, `${api_root}/Activity/batchUpdateFieldCfg`),
        syncAllconfig: (params) => http(params, `${api_root}/Activity/syncAllconfig`),
        //表格排序接口
        saveActCodeColumnOrder: (params) => http(params, `${api_root}/Activity/saveActCodeColumnOrder`),
        saveTips: (params) => http(params, `${api_root}/Activity/saveTips`)
    };
}
