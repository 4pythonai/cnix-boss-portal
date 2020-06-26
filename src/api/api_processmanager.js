<<<<<<< HEAD
import { root_url, port, version_2 } from './api_config/base_config'
=======
import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class processmanager {
    static apis = {
<<<<<<< HEAD
        getAllProcess: params => http(params, `${ api_root }/bpmcfg/getAllProcess`),
        getAllRoles: params => http(params, `${ api_root }/bpmcfg/getAllRoles`),
=======
        getAllProcess: params => http(params, `${ api_root }/bpm/getAllProcess`),
        getAllRoles: params => http(params, `${ api_root }/bpm/getAllRoles`),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        getAllBiztable: params => http(params, `${ api_root }/rdbms/getAllBiztable`),
        getAllPlugins: params => http(params, `${ api_root }/rdbms/getAllPlugins`),
        getProcessMaintableList: params => http(params, `${ api_root }/curd/getProcessMaintableList`),
        getTableCols: params => http(params, `${ api_root }/rdbms/getTableCols`),
<<<<<<< HEAD
        setPkMain: params => http(params, `${ api_root }/bpmcfg/setPkMain`),
        deletePKmain: params => http(params, `${ api_root }/bpmcfg/deletePKmain`),
        addReferCfg: params => http(params, `${ api_root }/bpmcfg/addReferCfg`),  //参考区
        addProcessAddCfg: params => http(params, `${ api_root }/bpmcfg/addProcessAddCfg`),  //增加区
        addProcessResCfg: params => http(params, `${ api_root }/bpmcfg/addProcessResCfg`),  //资源分配
        addProcessModifyCfg: params => http(params, `${ api_root }/bpm/addProcessModifyCfg`), //修改区


        saveItemAssign: params => http(params, `${ api_root }/bpmcfg/saveItemAssign`),

        SaveAddItemAsRefer: params => http(params, `${ api_root }/bpmcfg/SaveAddItemAsRefer`),

        saveCCcfg: params => http(params, `${ api_root }/bpmcfg/saveCCcfg`),   //分配到节点
        getAllPapernoRules: params => http(params, `${ api_root }/bpmcfg/getAllPapernoRules`),   //所有的paperno  
        savePaperNORuleUsage: params => http(params, `${ api_root }/bpmcfg/savePaperNORuleUsage`),   // 保存配置
        SaveRefItemAssign: params => http(params, `${ api_root }/bpmcfg/SaveRefItemAssign`),   // 保存配置

        //saveAdditemAsReferCfg

        // sync user data
        syncActivitiuser: params => http(params, `${ api_root }/bpmcfg/syncActivitiuser`),  //同步BOSS=>流程引擎
        syncNodeIdAndName: params => http(params, `${ api_root }/bpmcfg/syncNodeIdAndName`),   //从流程引擎同步sid/nodename到boss 


        listExtracfg: params => http(params, `${ api_root }/bpmcfg/listExtracfg`)        //获取流程相关信息
=======
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
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
}

