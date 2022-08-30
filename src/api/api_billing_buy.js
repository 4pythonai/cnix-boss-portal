export default class billing {
    static methods = {
        saveBuyBill: '/BillingBuy/saveBill',

        getContractRelatedResourcesAll: '/BillingBuy/getContractRelatedResourcesAll',

        OneKeyContractBill: '/BillingApiBuy/BatchContractBill',

        SingleContractBill: '/BillingApiBuy/SingleContractBill',
        prepareBuyInBills: '/BillingSale/prepareBuyInBills',
        saveBuyinPayment: '/BillingBuy/saveBuyinPayment',
        OneKeyBuyInContractBill: '/BillingBuy/OneKeyBuyInContractBill',
        SaveBuyInBillPayment: '/BillingBuy/SaveBuyInBillPayment',
        getUnPayedBuyInBills: '/BillingBuy/getUnPayedBuyInBills',
        GetBuyInPayPlan: '/BillingBuy/GetBuyInPayPlan',
        GetBuyInPayPlanDetail: '/BillingBuy/GetBuyInPayPlanDetail',
        GetBuyOwned: '/BillingBuy/GetBuyOwned'
    };
}
