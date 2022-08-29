export default class billing {
    static methods = {
        // 按照合同进行计费

        SingleContractBill: '/BillingApiSale/SingleContractBill',

        // 按照客户进行计费
        billByCust: '/BillingApiSale/billByCust',

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
        getContractRelatedResourcesAll: '/Billing/getContractRelatedResourcesAll',
        savePaperBillLocateYearMonth: '/Billing/savePaperBillLocateYearMonth',
        // IBM1 合同测试接口
        testIBM: '/Billing/testIBM',
        OneKeyContractBill: '/BillingApiSale/BatchContractBill',

        OneKeyPaperBill: '/BillingApiSale/OneKeyPaperBill',
        delete_onekeybills: '/Tools/delete_onekeybills',
        BatchSetBankItemStatus: '/Billing/BatchSetBankItemStatus',
        DEBUG: '/Billing/DEBUG',
        getUsages: '/Billing/getUsages'
    };
}
