import React from 'react';
import getTextWidth from './commonTableTextTool';
import JsonTreeModal from './JsonTreeModal';
import JsonTableModal from './JsonTableModal';

function sorter(valueA, valueB) {
    let targetA = valueA != null && valueA.toString().toLowerCase();
    let targetB = valueB != null && valueB.toString().toLowerCase();
    return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
}

function columnRender(text, record, column_cfg) {
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

    return text;
}

export default function getTableColumns(commonTableStore) {
    let hideColumns = ['uuid', 'processDefinitionKey', 'transactid', 'nodeKey'];
    let columns = [];
    commonTableStore.tableColumnsJson.forEach((item, index) => {
        let column = {
            title: item.title,
            dataIndex: item.key,
            key: item.key,
            sorter: (a, b) => sorter(a[item.key], b[item.key]),
            render: (text, record) => {
                return columnRender(text, record, item);
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
