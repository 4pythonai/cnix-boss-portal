import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class billing {
    static methods = {
        // 按照合同进行计费
        billByContract: (params) => http(params, `${api_root}/Billing/billByContract`),

        // 按照客户进行计费
        billByCust: (params) => http(params, `${api_root}/Billing/billByCust`),

        saveBill: (params) => http(params, `${api_root}/Billing/saveBill`),
        transferContract: (params) => http(params, `${api_root}/App/transferContract`),
        prepareBills: (params) => http(params, `${api_root}/Billing/prepareBills`),
        saveNewSettlement: (params) => http(params, `${api_root}/Billing/saveNewSettlement`),
        settlementdetail: (params) => http(params, `${api_root}/Billing/settlementdetail`),
        getUnUsedBills: (params) => http(params, `${api_root}/Billing/getUnUsedBills`),
        saveCombinedBill: (params) => http(params, `${api_root}/Billing/saveCombinedBill`),
        getPaperInfoById: (params) => http(params, `${api_root}/Billing/getPaperInfoById`),
        getZones: (params) => http(params, `${api_root}/Billing/getZones`),
        getZone: (params) => http(params, `${api_root}/Billing/getZone`),
        getContractRelatedResources: (params) => http(params, `${api_root}/Billing/getContractRelatedResources`),
        savePaperBillLocateYearMonth: (params) => http(params, `${api_root}/Billing/savePaperBillLocateYearMonth`),
        // IBM1 合同测试接口
        testIBM: (params) => http(params, `${api_root}/Billing/testIBM`),
        OneKeyContractBill: (params) => http(params, `${api_root}/Billing/OneKeyContractBill`),
        OneKeyPaperBill: (params) => http(params, `${api_root}/Billing/OneKeyPaperBill`),
        delete_onekeybills: (params) => http(params, `${api_root}/Tools/delete_onekeybills`),
        OneKeyBuyInContractBill: (params) => http(params, `${api_root}/BillingBuyIn/OneKeyBuyInContractBill`),
        // 保存采购合同账单的付款记录
        SaveBuyInBillPayment: (params) => http(params, `${api_root}/BillingBuyIn/SaveBuyInBillPayment`),
        getUnPayedBuyInBills: (params) => http(params, `${api_root}/BillingBuyIn/getUnPayedBuyInBills`),
        BatchSetBankItemStatus: (params) => http(params, `${api_root}/Billing/BatchSetBankItemStatus`),
        GetBuyInPayPlan: (params) => http(params, `${api_root}/BillingBuyIn/GetBuyInPayPlan`),
        GetBuyInPayPlanDetail: (params) => http(params, `${api_root}/BillingBuyIn/GetBuyInPayPlanDetail`),
        GetBuyOwned: (params) => http(params, `${api_root}/BillingBuyIn/GetBuyOwned`)
    };
}
