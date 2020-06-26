import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`

export default class activity {
    static apis = {
        getFormConfig: (params) => http(params, `${ api_root }/${ controller.activity }/getFormConfig`),
        getAssociateData: params => http(params, `${ api_root }/${ params.data.api }`),
        getACtcfg: params => http(params, `${ api_root }/${ controller.activity }/getACtcfg`),
        getFlowFormCfg: params => http(params, `${ api_root }/${ controller.bpm }/getFlowFormCfg`),
        getPortalDataGrids: params => http(params, `${ api_root }/${ controller.activity }/getPortalDataGrids`),
        batchSetButtons: params => http(params, `${ api_root }/${ controller.activity }/batchSetButtons`),
        addActionButton: params => http(params, `${ api_root }/${ controller.activity }/addActionButton`),
        addActionCode: params => http(params, `${ api_root }/${ controller.activity }/addActionCode`),
        deleteAction: params => http(params, `${ api_root }/${ controller.activity }/deleteAction`),
        getActCols: params => http(params, `${ api_root }/${ controller.activity }/getActCols`),
        getAllCategory: params => http(params, `${ api_root }/${ controller.activity }/getAllCategory`),
        saveTriggerGroup: params => http(params, `${ api_root }/${ controller.activity }/saveTriggerGroup`),
        getTriggerGroups: params => http(params, `${ api_root }/${ controller.activity }/getTriggerGroups`),
        deleteTriggerGroup: params => http(params, `${ api_root }/${ controller.activity }/deleteTriggerGroup`),
        saveFieldCfg: params => http(params, `${ api_root }/${ controller.activity }/saveFieldCfg`),
        modifyActionCode: params => http(params, `${ api_root }/${ controller.activity }/modifyActionCode`),
        resetQueryCfg: params => http(params, `${ api_root }/${ controller.activity }/resetQueryCfg`),
        saveOverrideQueryCfg: params => http(params, `${ api_root }/${ controller.activity }/saveOverrideQueryCfg`),

        addGridReferCfg: params => http(params, `${ api_root }/${ controller.activity }/addGridReferCfg`),

        //  基于 commonTable一条记录的数据,获取相关数据.  actionBasedRowPuller
        actionBasedRowPuller: params => http(params, `${ api_root }/${ controller.activity }/actionBasedRowPuller`),

        exportExcel: params => http(params, `${ api_root }/${ controller.activity }/exportExcel`),

        batchUpdateFieldCfg: params => http(params, `${ api_root }/${ controller.activity }/batchUpdateFieldCfg`),
        syncAllconfig: params => http(params, `${ api_root }/${ controller.activity }/syncAllconfig`),
        //表格排序接口
        saveActCodeColumnOrder:params => http(params, `${ api_root }/${ controller.activity }/saveActCodeColumnOrder`)



    }
}



