import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class processmanager {
    static methods = {
        getAllProcess: (params) => http(params, `${api_root}/Bpmcfg/getAllProcess`),
        getAllRoles: (params) => http(params, `${api_root}/Auth/getAllRoles`),
        getAllBiztable: (params) => http(params, `${api_root}/rdbms/getAllBiztable`),
        getAllPlugins: (params) => http(params, `${api_root}/rdbms/getAllPlugins`),
        getProcessMaintableList: (params) => http(params, `${api_root}/curd/getProcessMaintableList`),
        getTableCols: (params) => http(params, `${api_root}/rdbms/getTableCols`),
        setPkMain: (params) => http(params, `${api_root}/Bpmcfg/setPkMain`),
        deletePKmain: (params) => http(params, `${api_root}/Bpmcfg/deletePKmain`),
        addReferCfg: (params) => http(params, `${api_root}/Bpmcfg/addReferCfg`), //参考区
        addProcessAddCfg: (params) => http(params, `${api_root}/Bpmcfg/addProcessAddCfg`), //增加区
        addProcessResCfg: (params) => http(params, `${api_root}/Bpmcfg/addProcessResCfg`), //资源分配
        addProcessModifyCfg: (params) => http(params, `${api_root}/bpm/addProcessModifyCfg`), //修改区
        saveCCcfg: (params) => http(params, `${api_root}/Bpmcfg/saveCCcfg`), //分配到节点
        getAllPapernoRules: (params) => http(params, `${api_root}/Bpmcfg/getAllPapernoRules`), //所有的paperno
        savePaperNORuleUsage: (params) => http(params, `${api_root}/Bpmcfg/savePaperNORuleUsage`), // 保存配置
        SaveRefItemAssign: (params) => http(params, `${api_root}/Bpmcfg/SaveRefItemAssign`), // 保存配置

        // sync user data
        syncActivitiuser: (params) => http(params, `${api_root}/Bpmcfg/syncActivitiuser`), //同步BOSS=>流程引擎
        syncNodeIdAndName: (params) => http(params, `${api_root}/Bpmcfg/syncNodeIdAndName`), //从流程引擎同步sid/nodename到boss

        listExtracfg: (params) => http(params, `${api_root}/Bpmcfg/listExtracfg`) //获取流程相关信息
    };
}
