export default class billing {
    static methods = {
        saveBuyBill: '/BillingBuy/saveBill',

        getContractRelatedResourcesAll: '/BillingBuy/getContractRelatedResourcesAll',
        getUnUsedBills: '/BillingBuy/getUnUsedBills',
        OneKeyContractBill: '/BillingApiBuy/BatchContractBill',

        SingleContractBill: '/BillingApiBuy/SingleContractBill',
        saveBuyinPayment: '/BillingBuy/saveBuyinPayment',
        OneKeyBuyInContractBill: '/BillingBuy/OneKeyBuyInContractBill',
        SaveBuyInBillPayment: '/BillingBuy/SaveBuyInBillPayment',
        getUnPayedBuyInBills: '/BillingBuy/getUnPayedBuyInBills',
        GetBuyInPayPlan: '/BillingBuy/GetBuyInPayPlan',
        GetBuyInPayPlanDetail: '/BillingBuy/GetBuyInPayPlanDetail',
        GetBuyOwned: '/BillingBuy/GetBuyOwned',
        saveVendorBill: '/BillingBuy/saveVendorBill',
        OneKeyVendorPaperBill: '/BillingApiBuy/OneKeyVendorPaperBill',
        prepareBuyInBills: '/BillingBuy/prepareBuyInBills',
        saveNewSettlement: '/BillingBuy/saveNewSettlement',
        BatchSetPayItemStatus: '/BillingBuy/BatchSetPayItemStatus'
    };
}
