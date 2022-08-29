export default class billing {
    static methods = {
        SingleContractBill: '/BillingApiBuy/SingleContractBill',
        prepareBuyInBills: '/Billing/prepareBuyInBills',
        saveBuyinPayment: '/BillingBuyIn/saveBuyinPayment',
        OneKeyBuyInContractBill: '/BillingBuyIn/OneKeyBuyInContractBill',
        SaveBuyInBillPayment: '/BillingBuyIn/SaveBuyInBillPayment',
        getUnPayedBuyInBills: '/BillingBuyIn/getUnPayedBuyInBills',
        GetBuyInPayPlan: '/BillingBuyIn/GetBuyInPayPlan',
        GetBuyInPayPlanDetail: '/BillingBuyIn/GetBuyInPayPlanDetail',
        GetBuyOwned: '/BillingBuyIn/GetBuyOwned'
    };
}
