const UnSettledCustPaperBillCols = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '客户账单编号',
        dataIndex: 'paperno',
        key: 'paperno'
    },

    {
        title: '账单费用',
        dataIndex: 'total_money',
        key: 'total_money'
    },

    {
        title: '已结',
        dataIndex: 'payed',
        key: 'payed'
    },

    {
        title: '未结',
        dataIndex: 'unsettled',
        key: 'unsettled'
    },
    {
        title: '本次拟结',
        dataIndex: 'newsettled',
        key: 'newsettled'
    }
];

export default UnSettledCustPaperBillCols;
