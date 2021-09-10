export default class report {
    static methods = {
        // 应收/已收/欠费

        // 根据客户账单
        reportByPaperBill: '/Report/reportByPaperBill',

        // 根据合同账单
        reportByContractBill: '/Report/reportByContractBill',

        // 根据客户账单
        reportByProductFromPaperBill: '/Report/reportByProductFromPaperBill'
    };
}
