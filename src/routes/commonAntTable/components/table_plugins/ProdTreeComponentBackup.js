// 现在没有用到，  以后备用
import { treeFunc } from '@/utils/tools';
import { Tree } from 'antd';
import React from 'react';

const { TreeNode } = Tree;

export default class ProdTreeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: [
                {
                    key: '999',
                    name: 'CPE租用',
                    parent_id: '0'
                },
                {
                    key: '1000',
                    name: 'NJN-SD-001',
                    parent_id: '999'
                },
                {
                    key: '1001',
                    name: 'NJN-SD-002',
                    parent_id: '999'
                },

                {
                    key: '1',
                    name: '机柜',
                    parent_id: '0'
                },
                {
                    key: '2',
                    name: '端口',
                    parent_id: '0'
                },
                {
                    key: '3',
                    name: '跳线',
                    parent_id: '0'
                },
                {
                    key: '4',
                    name: '引接缆',
                    parent_id: '0'
                },
                {
                    key: '5',
                    name: '室内光纤',
                    parent_id: '0'
                },
                {
                    key: '6',
                    name: '一次性费用',
                    parent_id: '0'
                },
                {
                    key: '7',
                    name: '带宽',
                    parent_id: '0'
                },
                {
                    key: '8',
                    name: '传输',
                    parent_id: '0'
                },
                {
                    key: '9',
                    name: '机位',
                    parent_id: '0'
                },
                {
                    key: '10',
                    name: '设备租用',
                    parent_id: '0'
                },
                {
                    key: '11',
                    name: '云专线',
                    parent_id: '0'
                },
                {
                    key: '12',
                    name: '互联网品质优化',
                    parent_id: '0'
                },
                {
                    key: '13',
                    name: '服务',
                    parent_id: '0'
                },
                {
                    key: '14',
                    name: 'DC机柜',
                    parent_id: '1'
                },
                {
                    key: '15',
                    name: 'IX机柜',
                    parent_id: '1'
                },
                {
                    key: '16',
                    name: '10A-4200/个',
                    parent_id: '14'
                },
                {
                    key: '17',
                    name: '13A-4800/个',
                    parent_id: '14'
                },
                {
                    key: '18',
                    name: '16A-5500/个',
                    parent_id: '14'
                },
                {
                    key: '19',
                    name: '20A-6500/个',
                    parent_id: '14'
                },
                {
                    key: '20',
                    name: '32A-12000/个',
                    parent_id: '14'
                },
                {
                    key: '21',
                    name: '10A-5000/个',
                    parent_id: '15'
                },
                {
                    key: '22',
                    name: '13A-6000/个',
                    parent_id: '15'
                },

                {
                    key: '23',
                    name: '20A-10000/个',
                    parent_id: '15'
                },
                {
                    key: '24',
                    name: '32A-12000/个',
                    parent_id: '15'
                },
                {
                    key: '25',
                    name: 'IX',
                    parent_id: '2'
                },
                {
                    key: '26',
                    name: 'DC',
                    parent_id: '2'
                },
                {
                    key: '27',
                    name: 'GE-3000',
                    parent_id: '25'
                },
                {
                    key: '28',
                    name: '10GE-7000',
                    parent_id: '25'
                },
                {
                    key: '29',
                    name: '40GE-28000',
                    parent_id: '25'
                },
                {
                    key: '30',
                    name: '100GE-70000',
                    parent_id: '25'
                },
                {
                    key: '31',
                    name: 'GE-0',
                    parent_id: '26'
                },
                {
                    key: '32',
                    name: '10GE-0',
                    parent_id: '26'
                },
                {
                    key: '33',
                    name: '联通-0M',
                    parent_id: '7'
                },
                {
                    id: '34',
                    name: '电信-0M',
                    parent_id: '7'
                },
                {
                    key: '35',
                    name: '移动-0M',
                    parent_id: '7'
                },
                {
                    key: '36',
                    name: 'BGP-0M',
                    parent_id: '7'
                },
                {
                    key: '37',
                    name: '铁通-0M',
                    parent_id: '7'
                },
                {
                    key: '38',
                    name: '机房内跳线',
                    parent_id: '3'
                },
                {
                    key: '39',
                    name: 'IX机柜-500/对/月',
                    parent_id: '38'
                },
                {
                    key: '40',
                    name: 'DC机柜-1000/对/月',
                    parent_id: '38'
                },
                {
                    key: '41',
                    name: '无机柜-2000/对/月',
                    parent_id: '38'
                },
                {
                    key: '42',
                    name: '引接缆-300/对/公里/月',
                    parent_id: '4'
                },
                {
                    key: '43',
                    name: '市内光纤-300/对/公里/月',
                    parent_id: '5'
                },
                {
                    key: '44',
                    name: '一次性费用-0/次',
                    parent_id: '6'
                },
                {
                    key: '46',
                    name: 'ip',
                    parent_id: '0'
                },
                {
                    key: '47',
                    name: 'ip地址-0/个',
                    parent_id: '46'
                },
                {
                    key: '48',
                    name: '传输-0/MB',
                    parent_id: '8'
                },
                {
                    key: '49',
                    name: '机位-1200/U/月',
                    parent_id: '9'
                },
                {
                    key: '50',
                    name: '设备租用-1000/月',
                    parent_id: '10'
                },
                {
                    key: '51',
                    name: '云专线-80/M/月',
                    parent_id: '11'
                },
                {
                    key: '52',
                    name: '互联网品质优化-0/M/月',
                    parent_id: '12'
                },
                {
                    key: '53',
                    name: '服务-0/月',
                    parent_id: '13'
                }
            ]
        };
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
    }

    renderTreeNodes = (data) =>
        data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.name} onClick={this.nodeClick}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.name} dataRef={item} />;
        });

    render() {
        return (
            <div>
                <Tree>{this.renderTreeNodes(treeFunc(this.state.Product))}</Tree>
            </div>
        );
    }
}
