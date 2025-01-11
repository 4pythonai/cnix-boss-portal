import React, { useRef, useState } from 'react';
import { Button, Tree, Input } from 'antd';
import api from '@/api/api';

const { TextArea } = Input;

const Uloc = ({ appendrows, catid, product_name, bizCode }) => {
    const [ulocStr, setUlocStr] = useState('');
    const [treeData, setTreeData] = useState([]);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [rowObject, setRowObject] = useState({});

    // 获取树形数据
    React.useEffect(() => {
        const fetchTreeData = async () => {
            try {
                const params = { method: 'POST', data: {} };
                const response = await api.dresource.Cabinet_tree_rent(params);

                // 添加父节点信息
                const processTreeData = (nodes, parent = null) => {
                    return nodes.map(node => ({
                        ...node,
                        parentNode: parent,
                        children: node.children ? processTreeData(node.children, node) : null
                    }));
                };

                const processedTree = processTreeData(response.tree);
                setTreeData(processedTree);
            } catch (error) {
                console.error('Failed to fetch tree data:', error);
            }
        };

        fetchTreeData();
    }, []);

    // 处理选中节点
    const onCheck = (checkedKeys, info) => {
        console.log('checkedKeys:', checkedKeys);
        console.log('info:', info);
        const checkedNodes = info.checkedNodes;
        let _ulocstr = '';
        const nodes = [];

        for (const node of checkedNodes) {
            if (node.props.category === 'uloc') {
                const parentTitle = node.props.parentNode?.label || '';  // 使用处理过的parentNode
                _ulocstr += `[${parentTitle}/#${node.props.label}]`;
                nodes.push(node.props.id);
            }
        }

        console.log('构建的机位字符串:', _ulocstr);
        setUlocStr(_ulocstr);
        setSelectedNodes(nodes);
    };

    // 保存数据
    const handleSave = () => {


        const RowObject = {
            operation: "删除",
            bizcode: bizCode,
            catid: catid,
            product_name: product_name,
            restext: JSON.stringify({
                text: ulocStr,
                nodes: selectedNodes  // 使用去重后的IP数组
            })
        };
        setRowObject(RowObject);
        appendrows(RowObject);
    };

    return (
        <div className="w-full">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ margin: 0 }}>选择机位:</h3>
                <Button
                    size="small"
                    onClick={handleSave}
                >
                    确定
                </Button>
            </div>

            <div className="mb-3">
                <TextArea
                    value={ulocStr}
                    readOnly
                    placeholder="选中的U位"
                    style={{ marginTop: '4px' }}
                />
            </div>

            <div>
                <Tree
                    checkable
                    defaultExpandAll={false}
                    treeData={treeData}
                    onCheck={onCheck}
                    fieldNames={{
                        title: 'label',
                        key: 'id',
                        children: 'children'
                    }}
                />
            </div>
        </div>
    );
};

export default Uloc;