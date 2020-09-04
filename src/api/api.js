import device from './api_device'
import processmanager from './api_processmanager'
import activity from './api_activity'
import curd from './api_curd'
import auth from './api_auth'
import bpm from './api_bpm'
import permission from './api_permission'
import user from './api_user'
import customer from './api_customer'
import activityRecord from './api_activityRecord'
import billing from './api_billing'
import network from './api_network'
import report from './api_report'


import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`

export { api_root }






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







}


api.device_api = device.apis
api.processmanager = processmanager.apis
api.activity = activity.apis
api.curd = curd.apis
api.auth = auth.apis
api.bpm = bpm.apis
api.permission = permission.apis
api.user = user.apis
api.customer = customer.apis
api.activityRecord = activityRecord.apis
api.billing = billing.apis
api.network = network.apis
api.report = report.apis