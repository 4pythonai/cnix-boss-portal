import React from 'react';
import getTextWidth from './commonTableTextTool';
import JsonTreeModal from './JsonTreeModal';
import JsonTableModal from './JsonTableModal';

function sorter(valueA, valueB) {
    let targetA = valueA != null && valueA.toString().toLowerCase();
    let targetB = valueB != null && valueB.toString().toLowerCase();
    return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
}

function columnRender(text, record, column_cfg, action_code) {
    if (text === '' || text === undefined) {
        return '';
    }

    // 采购管理>采购合同账单,详情按钮,点击后出现json树形结构,后改为表格形式

    if (column_cfg.key == 'resource_logs') {
        return (
            <div>
                <JsonTableModal schema={'resource_logs'} record={record} />
            </div>
        );
    }

    if (column_cfg.key == 'billsjson') {
        return (
            <div>
                <JsonTreeModal schema={'billsjson'} record={record} />
            </div>
        );
    }

    if (action_code == 'custpaperbill') {
        if (column_cfg.key == 'payed_money') {
            console.log('payed_money', text);
            console.log('payed_money', record.total_money);
            // return <div>{text}</div>;

            let paidMoney = parseFloat(text);
            let totalMoney = parseFloat(record.total_money);

            if (isNaN(paidMoney)) {
                paidMoney = 0;
            }

            // 判断转换后的值是否为有效数字
            if (isNaN(totalMoney)) {
                return <div>数据无效</div>;
            }

            // 根据支付情况返回相应的文本
            if (paidMoney === totalMoney) {
                return <div>已付款 {text}</div>;
            } else if (paidMoney === 0) {
                return <div style={{ color: 'blue' }}>未付款</div>;
            } else if (paidMoney < totalMoney) {
                return <div style={{ color: 'red' }}>部分付款[{text}]</div>;
            } else {
                return <div>超额付款</div>; // 处理付超额的情况
            }
        }
    }

    return text;
}

export default function getTableColumns(commonTableStore) {
    console.log('commonTableStore', commonTableStore.action_code);

    let hideColumns = ['uuid', 'processDefinitionKey', 'transactid', 'nodeKey'];
    let columns = [];
    commonTableStore.tableColumnsJson.forEach((item, index) => {
        let column = {
            title: item.title,
            dataIndex: item.key,
            key: item.key,
            sorter: (a, b) => sorter(a[item.key], b[item.key]),
            render: (text, record) => {
                return columnRender(text, record, item, commonTableStore.action_code);
            }
        };
        if (hideColumns.includes(item.key) == false) {
            columns.push(column);
        }
    });

    columns.map((item) => {
        let fieldValues = [];
        fieldValues.push(item.title);
        commonTableStore.dataSource.forEach((record) => {
            fieldValues.push(record[item.dataIndex]);
        });
        var longest = fieldValues.reduce(function (a, b) {
            if (a == null) {
                a = '';
            }
            if (b == null) {
                b = '';
            }
            return a.length > b.length ? a : b;
        });
        if (item.dataIndex == 'resource_logs' || item.dataIndex == 'billsjson') {
            return (item.width = 40 + getTextWidth('资源详情'));
        } else {
            return (item.width = 40 + getTextWidth(longest));
        }
    });
    return columns;
}
