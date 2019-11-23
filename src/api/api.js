import { root_url, port, controller, processRoot, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`

export { api_root }


import device from './api_device'
import processmanager from './api_processmanager'
import activity from './api_activity'
import curd from './api_curd'
import auth from './api_auth'
import bpm from './api_bpm'
import api_contract from './api_contract'
import contractmanage from './api_contractmanage'
import permission from './api_permission'
import user from './api_user'
import customer from './api_customer'
import activityRecord from './api_activityRecord'
import billing from './api_billing'



export default class api {

    static organization = {
        orgTree: params => http(params, `${ api_root }/${ controller.organization }/orgTree`),
        getDeptMembers: params => http(params, `${ api_root }/${ controller.organization }/getDeptMembers`),
    }


    static donothing = {
        xxxxx: params => http(params, `${ api_root }/${ params.addurl }`),
    }




    static cabinet_api = {
        // 获取机柜数据
        getCabinetData: params => http(params, `${ api_root }/${ controller.cabinet_api }/getCabinetData`),
        getCabinetTableData: params => http(params, `${ api_root }/${ controller.cabinet_api }/getCabinetDetails`),
        //获取机柜表格信息


    }
    static completion = {
        // 获取开工单列表（已归档）
        getStartWorkAndCompleteList: (params) => http(params, `${ api_root }/${ controller.completion }/getStartWorkAndCompletionList`),
        getCompletionList: (params) => http(params, `${ api_root }/${ controller.completion }/getCompletionList`),
        addCompletionOrder: (params) => http(params, `${ api_root }/${ controller.completion }/AddCompletion`),
        updateCompletionOrder: (params) => http(params, `${ api_root }/${ controller.completion }/updateCompletionBill`),
        deleteCompletionOrder: (params) => http(params, `${ api_root }/${ controller.completion }/deleteCompletionBill`),
        getCompletionOrderDetail: (params) => http(params, `${ api_root }/${ controller.completion }/getCompletionDetail`),
        getCompletionBillCabinet: (params) => http(params, `${ api_root }/${ controller.completion }/getCompletionBillCabinet`),
        deleteCabinetShelf: (params) => http(params, `${ api_root }/${ controller.completion }/deleteCabinetShelf`),
    }
    static equipmentMaterial = {
        addEquipmentMaterial: (params) => http(params, `${ api_root }/${ controller.equipmentMaterial }/addEquipmentMaterial`),
        deleteEquipmentMaterial: (params) => http(params, `${ api_root }/${ controller.equipmentMaterial }/deleteEquipmentMaterial`),
        updateEquipmentMaterial: (params) => http(params, `${ api_root }/${ controller.equipmentMaterial }/updateEquipmentMaterial`),
        getEquipmentMaterialList: (params) => http(params, `${ api_root }/${ controller.equipmentMaterial }/findEquipmentMaterialList`),
    }






    static button = {
        insertButton: (params) => http(params, `${ api_root }/${ controller.button }/insertButton`),
        deleteButton: (params) => http(params, `${ api_root }/${ controller.button }/deleteButtonById`),
        updateButton: (params) => http(params, `${ api_root }/${ controller.button }/updateButtonById`),
        getButtonList: (params) => http(params, `${ api_root }/${ controller.button }/getButtonListLikeNameOrButtonCodeMethod`),
        addmenuButton: (params) => http(params, `${ api_root }/${ controller.button }/addButtonAndActionCodeConnect`)
    }


    static address_api = {
        getFinishedAddress: (params) => http(params, `${ api_root }/${ controller.sales }/getFinishedAddress`),
        getSponsorData: (params) => http(params, `${ api_root }/${ controller.sales }/getSponsorData`),
        getUnFinishedAddress: (params) => http(params, `${ api_root }/${ controller.sales }/getUnFinishedAddress`),
        check_address: (params) => http(params, `${ api_root }/${ controller.sales }/check_address`),
    }

    static opportunity = {
        getAllChance: (params) => http(params, `${ api_root }/${ controller.sales }/getAllChance`),
        removeChance: (params) => http(params, `${ api_root }/${ controller.sales }/removeChance`),

        addOpp: (params) => http(params, `${ api_root }/${ controller.sales }/addOpp`),
        updateOpp: (params) => http(params, `${ api_root }/${ controller.sales }/updateOpp`),
    }


    static record = {
        punchCard: `${ api_root }/${ controller.sales }/punchCard`,
        getRecord: `${ api_root }/${ controller.sales }/getRecord`,
        getWeekDay: `${ api_root }/${ controller.sales }/getWeekDay`,
        removeWorkContent: (params) => http(params, `${ api_root }/${ controller.sales }/removeWorkContent`),
        addWorkContent: (params) => http(params, `${ api_root }/${ controller.sales }/addWorkContent`),
        updateWorkContent: (params) => http(params, `${ api_root }/${ controller.sales }/updateWorkContent`),
    }


    static clue = {
        removeClue: (params) => http(params, `${ api_root }/${ controller.sales }/removeClue`),
        addClue: (params) => http(params, `${ api_root }/${ controller.sales }/addClue`),
        editClue: (params) => http(params, `${ api_root }/${ controller.sales }/editClue`),
        transferToOpportunity: (params) => http(params, `${ api_root }/${ controller.sales }/transferToOpportunity`),
        getClues: `${ api_root }/${ controller.sales }/getClues`,
    }



    static message = {
        getWechatMetion: (params) => http(params, `${ api_root }/${ controller.sales }/getWechatMetion`),
        recordListRecordReply: (params) => http(params, `${ api_root }/${ controller.sales }/recordListRecordReply`),
        addReply: (params) => http(params, `${ api_root }/${ controller.sales }/addReply`),
    }

    static graphs = {
        getAnnualSalesData: (params) => http(params, `${ api_root }/${ controller.sales }/getAnnualSalesData`),
        getCharg_nameSales: (params) => http(params, `${ api_root }/${ controller.sales }/getCharg_nameSales`),
        getReport: (params) => http(params, `${ api_root }/${ controller.sales }/getReport`),
    }



    // 测试接口
    static test = {
        userInfo: params => http(params, `http://localhost:3000/userInfo`),
    }



    static mock = {
        getProvince: params => http(null, 'http://localhost:3003/getProvince'),
        getCities: params => http(null, 'http://localhost:3003/getCities'),
        getArea: params => http(null, 'http://localhost:3003/getArea'),

    }
}


api.device_api = device.apis
api.processmanager = processmanager.apis
api.processmanager = processmanager.apis
api.activity = activity.apis
api.curd = curd.apis
api.auth = auth.apis
api.bpm = bpm.apis
api.contract_api = api_contract.apis
api.contractManage = contractmanage.apis
api.permission = permission.apis
api.user = user.apis
api.customer = customer.apis
api.activityRecord = activityRecord.apis
api.billing = billing.apis