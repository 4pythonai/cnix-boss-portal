
import React from 'react';


const SubTimeLineColumns = [
    {
        title: '账期',
        dataIndex: 'counter',
        key: 'counter'
    },
    {
        title: '起',
        dataIndex: 'periodstart',
        key: 'periodstart'
    },
    {
        title: '止',
        dataIndex: 'periodend',
        key: 'periodend'
    },
    {
        title: '满周期',
        dataIndex: 'fullcycle',
        key: 'fullcycle'
    },
    {
        title: '计算方法',
        dataIndex: 'info',
        key: 'info',
        render: (text,record) => {
            let snArray = [];
            snArray = text.split(';');

            let br = <br></br>;
            let result = null;
            if(snArray.length < 2) {
                return text;
            }
            for(let i = 0;i < snArray.length;i++) {
                if(i == 0) {
                    result = snArray[i];
                } else {
                    result = (
                        <span>
                            {result}
                            {br}
                            {snArray[i]}
                        </span>
                    );
                }
            }
            return <div>{result}</div>;
        }
    },
    {
        title: '费用',
        dataIndex: 'fee',
        key: 'fee'
    }
];

export default SubTimeLineColumns