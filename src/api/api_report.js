export default class report {
    static methods = {
        //- 根据合同账单
        reportByContractBill: '/Report/reportByContractBill',

        //- 收入预测
        reportByContractBillPrediction: '/Report/reportByContractBillPrediction',

        //- 根据客户账单
        reportByPaperBill: '/Report/reportByPaperBill',
        //- 根据客户账单,拆分产品
        reportByProductFromPaperBill: '/Report/reportByProductFromPaperBill'
    };
}
