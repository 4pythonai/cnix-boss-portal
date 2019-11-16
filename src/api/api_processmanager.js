import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class processmanager {
    static apis = {
        getAllProcess: params => http(params, `${ api_root }/bpm/getAllProcess`),
        getAllRoles: params => http(params, `${ api_root }/bpm/getAllRoles`),
        getAllBiztable: params => http(params, `${ api_root }/rdbms/getAllBiztable`),
        getAllPlugins: params => http(params, `${ api_root }/rdbms/getAllPlugins`),
        getProcessMaintableList: params => http(params, `${ api_root }/curd/getProcessMaintableList`),
        getTableCols: params => http(params, `${ api_root }/rdbms/getTableCols`),
        setPkMain: params => http(params, `${ api_root }/bpm/setPkMain`),
        deletePKmain: params => http(params, `${ api_root }/bpm/deletePKmain`),
        addReferCfg: params => http(params, `${ api_root }/bpm/addReferCfg`),  //参考区
        addProcessAddCfg: params => http(params, `${ api_root }/bpm/addProcessAddCfg`),  //增加区
        addProcessResCfg: params => http(params, `${ api_root }/bpm/addProcessResCfg`),  //资源分配
        addProcessModifyCfg: params => http(params, `${ api_root }/bpm/addProcessModifyCfg`), //修改区
        saveItemAssign: params => http(params, `${ api_root }/bpm/saveItemAssign`),   //分配到节点
        saveCCcfg: params => http(params, `${ api_root }/bpm/saveCCcfg`),   //分配到节点
        getAllPapernoRules: params => http(params, `${ api_root }/bpm/getAllPapernoRules`),   //所有的paperno  
        savePaperNORuleUsage: params => http(params, `${ api_root }/bpm/savePaperNORuleUsage`),   // 保存配置
        saveAdditemAsReferCfg: params => http(params, `${ api_root }/bpm/saveAdditemAsReferCfg`),   // 保存配置
    }
}

