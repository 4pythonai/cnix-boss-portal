import React, { useState, useEffect, } from 'react';
import { Input, Tree, Button } from 'antd';
import api from '@/api/api'

const { TextArea } = Input;

const Cabinet = ({ appendrows, catid, product_name, bizCode }) => {
	const [cabinetStr, setCabinetStr] = useState('');
	const [treeData, setTreeData] = useState(null);
	const [rowObject, setRowObject] = useState({});

	const initTree = async () => {
		try {
			const params = { data: {}, method: 'POST' };
			const response = await api.dresource.Network_tree(params);
			console.log("response", response);
			const transformedData = response.tree
			setTreeData(transformedData);
		} catch (error) {
			console.error('Failed to fetch tree data:', error);
		}
	};

	// Handle tree selection
	const onCheck = (checkedKeys, info) => {
		console.log("选中的 keys:", checkedKeys);
		console.log("选中的节点信息:", info.checkedNodes);// info.checkedNodes[0]  props as {text,id}


		let newCabinetStr = '';
		const filteredNodes = [];

		// loop checkedNodes to get newCabinetStr
		for (const node of info.checkedNodes) {
			console.log("NDE:", node);
			if (node.props.nodetype.includes("cabinet")) {
				newCabinetStr = `${node.props.text}/${newCabinetStr}`;
				filteredNodes.push(node.props.id);
			}

		}

		console.log("filteredNodes", filteredNodes);
		setCabinetStr(newCabinetStr);
		// setNodes(filteredNodes);

		const RowObject = {}
		RowObject.operation = "删除"
		RowObject.bizcode = bizCode
		RowObject.catid = catid
		RowObject.product_name = product_name
		RowObject.restext = JSON.stringify({ nodes: filteredNodes, text: newCabinetStr })
		console.log("🌸🌸🌸🌸🌸 RowObject", RowObject);
		// appendrows(RowObject);
		setRowObject(RowObject);

	};

	// Helper function to find node by ID in tree
	const findNodeById = (data, id) => {
		if (!data) return null;

		for (const item of data) {
			if (item.id === id) return item;
			if (item.children) {
				const found = findNodeById(item.children, id);
				if (found) return found;
			}
		}
		return null;
	};

	// Initialize on mount
	useEffect(() => {
		initTree();
	}, []);

	const callAppendrows = () => {
		console.log("🌸🌸🌸🌸🌸 rowObject", rowObject);
		appendrows(rowObject);
	}

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
				<h3 style={{ margin: 0 }}>选择机柜:</h3>
				<Button onClick={callAppendrows} >确定</Button>
			</div>
			{/* 选中的资源 */}
			<TextArea
				style={{ marginTop: '4px' }}
				value={cabinetStr}
				placeholder="选中的机柜"
				readOnly
			/>

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

export default Cabinet;