export default class processmanager {
    static methods = {
        getAllProcess: '/Bpmcfg/getAllProcess',
        getAllRoles: '/Auth/getAllRoles',
        getAllBiztable: '/rdbms/getAllBiztable',
        getAllPlugins: '/rdbms/getAllPlugins',
        getProcessMaintableList: '/curd/getProcessMaintableList',
        getTableCols: '/rdbms/getTableCols',
        setPkMain: '/Bpmcfg/setPkMain',
        deletePKmain: '/Bpmcfg/deletePKmain',
        addReferCfg: '/Bpmcfg/addReferCfg', //参考区
        addProcessAddCfg: '/Bpmcfg/addProcessAddCfg', //增加区
        addProcessResCfg: '/Bpmcfg/addProcessResCfg', //资源分配
        addProcessModifyCfg: '/bpm/addProcessModifyCfg', //修改区
        saveCCcfg: '/Bpmcfg/saveCCcfg', //分配到节点
        getAllPapernoRules: '/Bpmcfg/getAllPapernoRules', //所有的paperno
        savePaperNORuleUsage: '/Bpmcfg/savePaperNORuleUsage', // 保存配置
        SaveRefItemAssign: '/Bpmcfg/SaveRefItemAssign', // 保存配置

        // sync user data
        syncActivitiuser: '/Bpmcfg/syncActivitiuser', //同步BOSS=>流程引擎
        syncNodeIdAndName: '/Bpmcfg/syncNodeIdAndName', //从流程引擎同步sid/nodename到boss
        listExtracfg: '/Bpmcfg/listExtracfg '
    };
}
