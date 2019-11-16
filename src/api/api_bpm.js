import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class bpm {
    static apis = {
        // 根据角色获取用户
        getUswerByRole: (params) => http(params, `${ api_root }/${ controller.bpm }/getUswerByRole`),
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

        getResButton: params => http(params, `${ api_root }/${ controller.bpm }/getResButton`),
        // 获取流程的key
        getProcessList: params => http(params, `${ api_root }/${ controller.bpm }/getProcessList`),
        // 获取流程节点相关的数据权限
        getProcessNodeRights: params => http(params, `${ api_root }/${ controller.bpm }/getProcessNodeRights`),
        // 获取流程节点相关的数据权限
        getAllResourceButtonByKey: params => http(params, `${ api_root }/${ controller.bpm }/getAllResourceButtonByKey`),

        getNextGroupsAndUsersOrLike: params => http(params, `${ api_root }/${ controller.bpm }/getNextGroupsAndUsersOrLike`),

        getStartuserByproDefKey: params => http(params, `${ api_root }/${ controller.bpm }/getStartuserByproDefKey`),

        progressImgUrl: processRoot + '/process/getDiagram',

        //获取全部节点名称
        getAllNodeName: params => http(params, `${ api_root }/${ controller.bpm }/getAllNodeName`),

        // 获取起始节点
        getStartStrategy: params => http(params, `${ api_root }/${ controller.bpm }/getStartStrategy`),

        // 非起始节点策略
        getStrategyByUuidAndPKey: params => http(params, `${ api_root }/${ controller.bpm }/getStrategyByUuidAndPKey`),


        // sync user data
        syncActivitiuser: params => http(params, `${ api_root }/${ controller.bpm }/syncActivitiuser`),


        //流程节点成功的后续处理handler 

        insertBossProcess: params => http(params, `${ api_root }/${ controller.bpm }/addBossProcessNodeHandler`),

        //流程管理保存选择字段
        saveProcessParaFields: params => http(params, `${ api_root }/${ controller.bpm }/saveProcessParaFields`),

        //流程配置区分配到节点回显
        getItemAssignInfo: params => http(params, `${ api_root }/${ controller.bpm }/getItemAssignInfo`),

        getFlowsNotes: params => http(params, `${ api_root }/${ controller.bpm }/getFlowsNotes`)

    }
}


