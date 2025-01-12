import React, { useState, useEffect } from 'react';
import { Input, Tree, Button, Card, Row, Col } from 'antd';
import api from '@/api/api';

const { TextArea } = Input;

const Ethernet = ({ appendrows, catid, product_name, bizCode }) => {
    const [treeData, setTreeData] = useState(null);
    const [fromCabinet, setFromCabinet] = useState({ nodes: [], text: '' });
    const [toCabinet, setToCabinet] = useState({ nodes: [], text: '' });
    const [activeSelection, setActiveSelection] = useState('from'); // 'from' or 'to'

    const initTree = async () => {
        try {
            const params = { data: {}, method: 'POST' };
            const response = await api.dresource.Network_tree_all(params);
            setTreeData(response.tree);
        } catch (error) {
            console.error('Failed to fetch tree data:', error);
        }
    };

    const onCheck = (checkedKeys, info) => {
        const filteredNodes = [];
        let cabinetStr = '';

        // 只处理最后选中的节点
        const lastNode = info.checkedNodes[info.checkedNodes.length - 1];
        if (lastNode && lastNode.props.nodetype.includes("cabinet")) {
            cabinetStr = lastNode.props.text;
            filteredNodes.push(lastNode.props.id);

            if (activeSelection === 'from') {
                setFromCabinet({ nodes: filteredNodes, text: cabinetStr });
            } else {
                setToCabinet({ nodes: filteredNodes, text: cabinetStr });
            }
        }
    };

    const handleSubmit = () => {
        if (!fromCabinet.nodes.length || !toCabinet.nodes.length) {
            return;
        }
        const RowObject = {}
        RowObject.operation = "删除"
        RowObject.bizcode = bizCode
        RowObject.catid = catid
        RowObject.product_name = product_name
        RowObject.deliverType = "业务"
        RowObject.memo = ""
        RowObject.restext = JSON.stringify({
            from: fromCabinet,
            to: toCabinet
        })
        appendrows(RowObject);
    };

    useEffect(() => {
        initTree();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div style={{ marginBottom: 16 }}>
                <Button
                    type={'default'}
                    icon="left"
                    onClick={() => setActiveSelection('from')}
                    style={{ marginRight: 8 }}
                >
                    选择起始机柜
                </Button>
                <Button
                    type={'default'}
                    icon="right"
                    onClick={() => setActiveSelection('to')}
                    style={{ marginRight: 8 }}
                >
                    选择目标机柜
                </Button>
                <Button onClick={handleSubmit}>确定</Button>
            </div>

            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Card title="起始机柜">
                        <TextArea
                            value={fromCabinet.text}
                            placeholder="请选择起始机柜"
                            readOnly
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="目标机柜">
                        <TextArea
                            value={toCabinet.text}
                            placeholder="请选择目标机柜"
                            readOnly
                        />
                    </Card>
                </Col>
            </Row>

            {treeData && (
                <Tree
                    checkable
                    defaultExpandAll={false}
                    onCheck={onCheck}
                    treeData={treeData}
                    fieldNames={{
                        title: 'label',
                        children: 'children'
                    }}
                />
            )}
        </div>
    );
};

export default Ethernet;