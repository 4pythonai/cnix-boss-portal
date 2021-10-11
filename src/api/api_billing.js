export default class billing {
    static methods = {
        // 按照合同进行计费
        billByContract: '/Billing/billByContract',

        // 按照客户进行计费
        billByCust: '/Billing/billByCust',

        saveBill: '/Billing/saveBill',
        transferContract: '/App/transferContract',
        prepareBills: '/Billing/prepareBills',
        saveNewSettlement: '/Billing/saveNewSettlement',
        settlementdetail: '/Billing/settlementdetail',
        getUnUsedBills: '/Billing/getUnUsedBills',
        saveCombinedBill: '/Billing/saveCombinedBill',
        getPaperInfoById: '/Billing/getPaperInfoById',
        getZones: '/Billing/getZones',
        getZone: '/Billing/getZone',
        getContractRelatedResources: '/Billing/getContractRelatedResources',
        savePaperBillLocateYearMonth: '/Billing/savePaperBillLocateYearMonth',
        // IBM1 合同测试接口
        testIBM: '/Billing/testIBM',
        OneKeyContractBill: '/Billing/OneKeyContractBill',
        OneKeyPaperBill: '/Billing/OneKeyPaperBill',
        delete_onekeybills: '/Tools/delete_onekeybills',
        OneKeyBuyInContractBill: '/BillingBuyIn/OneKeyBuyInContractBill',
        // 保存采购合同账单的付款记录
        SaveBuyInBillPayment: '/BillingBuyIn/SaveBuyInBillPayment',
        getUnPayedBuyInBills: '/BillingBuyIn/getUnPayedBuyInBills',
        BatchSetBankItemStatus: '/Billing/BatchSetBankItemStatus',
        GetBuyInPayPlan: '/BillingBuyIn/GetBuyInPayPlan',
        GetBuyInPayPlanDetail: '/BillingBuyIn/GetBuyInPayPlanDetail',
        GetBuyOwned: '/BillingBuyIn/GetBuyOwned',
        //- 出所有的合同账单
        OneKeyContractBillPrediction: '/Billing/OneKeyContractBillPrediction'
    };
}
