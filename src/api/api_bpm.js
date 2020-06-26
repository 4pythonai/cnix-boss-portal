import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class bpm {
    static apis = {


        // 获取流程记录
        getFlowRecords: (params) => http(params, `${ api_root }/${ controller.bpm }/getFlowRecords`),

        // 启动流程： 
        startProcess: params => http(params, `${ api_root }/${ controller.bpm }/startProcess`),
        // 下一步
        nextStep: params => http(params, `${ api_root }/${ controller.bpm }/nextStep`),
        //归档 ArchivingProcess
        ArchivingProcess: params => http(params, `${ api_root }/${ controller.bpm }/ArchivingProcess`),
        // 终止
        terminateProcess: params => http(params, `${ api_root }/${ controller.bpm }/terminateProcess`),
        // 回退(返回上一步/发起人)
        returnToPrev: params => http(params, `${ api_root }/${ controller.bpm }/returnToPrev`),
        // 回退(发起人)
        returnToStart: params => http(params, `${ api_root }/${ controller.bpm }/returnToStart`),
        // 撤回流程 withDraw
        withDraw: params => http(params, `${ api_root }/${ controller.bpm }/withDraw`),

        getProcessButton: params => http(params, `${ api_root }/${ controller.bpm }/getProcessButton`),
        // 获取资源项的操作按钮

        // 获取流程的key
        getProcessList: params => http(params, `${ api_root }/${ controller.bpm }/getProcessList`),
        // 获取流程节点相关的数据权限
        getProcessNodeRights: params => http(params, `${ api_root }/${ controller.bpm }/getProcessNodeRights`),
        // 获取流程节点相关的数据权限

        getNextGroupsAndUsersOrLike: params => http(params, `${ api_root }/${ controller.bpm }/getNextGroupsAndUsersOrLike`),

        getStartuserByproDefKey: params => http(params, `${ api_root }/${ controller.bpm }/getStartuserByproDefKey`),

        getActivityDiagram: params => http(params, `${ api_root }/${ controller.bpm }/getActivityDiagram`),


        // 获取起始节点
        getStartStrategy: params => http(params, `${ api_root }/${ controller.bpm }/getStartStrategy`),

        // 非起始节点策略
        getStrategyByUuidAndPKey: params => http(params, `${ api_root }/${ controller.bpm }/getStrategyByUuidAndPKey`),

        getFlowsNotes: params => http(params, `${ api_root }/bpm/getFlowsNotes`),



        //流程节点成功的后续处理handler 
        addBossProcessNodeHandler: params => http(params, `${ api_root }/bpmcfg/addBossProcessNodeHandler`),
        //流程管理保存选择字段
        saveProcessParaFields: params => http(params, `${ api_root }/bpmcfg/saveProcessParaFields`),
        //流程配置区分配到节点回显
        getItemAssignInfo: params => http(params, `${ api_root }/bpmcfg/getItemAssignInfo`),
        // 流程管理设置权限
        saveBpmFobiddenCfg: params => http(params, `${ api_root }/bpmcfg/saveBpmFobiddenCfg`),
        // 获取流程管理设置权限详情
        getBpmFobiddenCfgList: params => http(params, `${ api_root }/bpmcfg/getBpmFobiddenCfgList`),

        //获取全部节点名称
        getAllNodeName: params => http(params, `${ api_root }/bpmcfg/getAllNodeName`),
        //流程概览
        getPorcessSummary: params => http(params, `${ api_root }/bpmcfg/getPorcessSummary`),

        //idc合同概览
        getIdcContrctLog: params => http(params, `${ api_root }/bpm/getIdcContrctLog`),

        //编辑竣工单
        updateIDCCompleteTask: params => http(params, `${ api_root }/bpm/updateIDCCompleteTask`),


        // 检查 IDC 竣工单是否可以编辑
        TestIDCCompleteTaskUpdate: params => http(params, `${ api_root }/bpm/TestIDCCompleteTaskUpdate`),

        //获取相关流程信息
        getReleatedFlowInfo: params => http(params, `${ api_root }/bpm/getReleatedFlowInfo`),
        // 添加分组
        saveProcessGroup: params => http(params, `${ api_root }/bpmcfg/saveProcessGroup`),
        //判断是否可编辑
        checkCanEdit: params => http(params, `${ api_root }/bpm/checkCanEdit`),
        //判断是否可以发起审批
        checkCanStartFlow:params => http(params, `${ api_root }/bpm/checkCanStartFlow`),

        isWhetherLaunchWorkOrder: params => http(params, `${ api_root }/bpm/isWhetherLaunchWorkOrder`),

        // 添加售前支持单
        addRresupportorder: params => http(params, `${ api_root }/support/addRresupportorder`),
        // 添加售后支持单
        addAftersupportorder: params => http(params, `${ api_root }/support/addRresupportorder`),


        getFiberResourceByPaperno: params => http(params, `${ api_root }/FiberResource/getFiberResourceByPaperno`),
        //通过transactid获取单据信息
        getLineDataByTransactid: params => http(params, `${ api_root }/bpm/getLineDataByTransactid`),
        //提交通过transactid获取的单据
        examineAndApproveLine: params => http(params, `${ api_root }/bpm/examineAndApproveLine`),
        // 根据合同获取单据
        getContractNetandLineInfo: params => http(params, `${ api_root }/resourcesOrder/getContractNetandLineInfo`),
        //获取竣工单信息
        getCompletionLineByUuid: params => http(params, `${ api_root }/Line/getCompletionLineByUuid`),
        //编辑竣工单信息
        addCompletionLine: params => http(params, `${ api_root }/Line/addCompletionLine`),
        // 获取数据字典表信息
        getNanxCodeTableByCategory: params => http(params, `${ api_root }/bpm/getNanxCodeTableByCategory`),

        //转网建中心保存并启动

        addEngineeringConstruction:params => http(params, `${ api_root }/EngineeringConstruction/addEngineeringConstruction`),
        //获取待办信息
        getPendingTask: params => http(params, `${ api_root }/bpm/getPendingTask`),
        //获取已办内容
        getPassedTask:params => http(params, `${ api_root }/bpm/getPassedTask`),
      

    }
}


