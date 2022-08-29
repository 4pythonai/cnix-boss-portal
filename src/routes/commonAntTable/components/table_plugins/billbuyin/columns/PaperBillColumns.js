
const PaperBillColumns = [
    {
        title: '合同号',
        dataIndex: 'contract_no',
        key: 'contract_no',
        width: '140px'
    },
    {
        title: '账期开始',
        dataIndex: 'periodstart',
        key: 'periodstart',
        width: '150px'
    },
    {
        title: '账期结束',
        dataIndex: 'periodend',
        key: 'periodend',
        width: '150px'
    },

    {
        title: '账期金额',
        dataIndex: 'period_money',
        key: 'period_money',
        width: '156px'
    },
    {
        title: '调整金额',
        dataIndex: 'adjust_money',
        key: 'adjust_money'
    },
    {
        title: '调整事项',
        dataIndex: 'memo',
        key: 'memo'
    },
    {
        title: '实际金额',
        dataIndex: 'actual_money',
        key: 'actual_money'
    },

    {
        title: '账单类型',
        dataIndex: 'billtype',
        key: 'billtype'
    }
];

export default PaperBillColumns