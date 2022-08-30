export default class billing {
    static methods = {
        // 按照合同进行计费

        SingleContractBill: '/BillingApiSale/SingleContractBill',

        // 按照客户进行计费
        billByCust: '/BillingApiSale/billByCust',

        saveBill: '/BillingSale/saveBill',
        transferContract: '/App/transferContract',
        prepareBills: '/BillingSale/prepareBills',
        saveNewSettlement: '/BillingSale/saveNewSettlement',
        settlementdetail: '/BillingSale/settlementdetail',
        getUnUsedBills: '/BillingSale/getUnUsedBills',
        saveCombinedBill: '/BillingSale/saveCombinedBill',
        getPaperInfoById: '/BillingSale/getPaperInfoById',
        getZones: '/BillingSale/getZones',
        getZone: '/BillingSale/getZone',
        getContractRelatedResourcesAll: '/BillingSale/getContractRelatedResourcesAll',
        savePaperBillLocateYearMonth: '/BillingSale/savePaperBillLocateYearMonth',
        // IBM1 合同测试接口
        testIBM: '/BillingSale/testIBM',
        OneKeyContractBill: '/BillingApiSale/BatchContractBill',

        OneKeyPaperBill: '/BillingApiSale/OneKeyPaperBill',
        delete_onekeybills: '/Tools/delete_onekeybills',
        BatchSetBankItemStatus: '/BillingSale/BatchSetBankItemStatus',
        DEBUG: '/BillingSale/DEBUG',
        getUsages: '/BillingSale/getUsages'
    };
}
