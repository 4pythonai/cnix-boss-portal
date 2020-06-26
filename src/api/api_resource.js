import { root_url, port, controller, version_2 } from './api_config/base_config'
import http from './http'

const api_root = `${ root_url }:${ port }/${ version_2 }`


export default class Api_resource {
    static apis = {
        // addResourcesOrder: params => http(params, `${ api_root }/${ controller.resourcesOrder }/addResourcesOrder`),
        // addIdcIspLineOrderData: params => http(params, `${ api_root }/${ controller.resourcesOrder }/addIdcIspLineOrderData`),
        // addIdcNetworkOpOrderData: params => http(params, `${ api_root }/${ controller.resourcesOrder }/addIdcNetworkOpOrderData`),

        addCabinetOrNetworkOrLineOrder: params => http(params, `${ api_root }/${ controller.resourcesOrder }/addCabinetOrNetworkOrLineOrder`),
        getNetworkorderJson: params => http(params, `${ api_root }/Networkorder/getNetworkorderJson`),
        getLineOrderJson: params => http(params, `${ api_root }/LineOrder/getLineOrderJson`),




        getResourceSurvey: params => http(params, `${ api_root }/ResourcesOrder/getResourceSurvey`),
        getCabinetorderJson: params => http(params, `${ api_root }/CabinetOrder/getCabinetorderJson`),
        //预占工单
        addCabinetPreAllocateOrder: params => http(params, `${ api_root }/CabinetOrder/addCabinetPreAllocateOrder`),
        salesAddPoweronOrder: params => http(params, `${ api_root }/CabinetOrder/salesAddPoweronOrder`),

        // 网络工单 
        addNetworkOrder: params => http(params, `${ api_root }/Networkorder/addNetworkOrder`),

        //线路工单
        addLineOrder: params => http(params, `${ api_root }/LineOrder/addLineOrder`),

        //工程师生成上架工单
        generateEnginnerStartCabinetPre:params => http(params, `${ api_root }/CabinetOrder/generateEnginnerStartCabinetPre`),

        //根据客户id获取所有机柜
        getCabinetDataByCustomerid:params => http(params, `${ api_root }/CabinetOrder/getCabinetDataByCustomerid`),

        //根据合同号获取所有机柜

        getCabinetDataByCustomeridOrContractNo:params => http(params, `${ api_root }/CabinetOrder/getCabinetDataByCustomeridOrContractNo`),
        
        //根据上架工单单据号获取未竣工机柜
        getCabinetDataByPPowerenId:params => http(params, `${ api_root }/CabinetOrder/getCabinetDataByPPowerenId`),
        // 一键启动,获取3个json
        getTribleJson: params => http(params, `${ api_root }/bpm/getTribleJson`)



    }
}


