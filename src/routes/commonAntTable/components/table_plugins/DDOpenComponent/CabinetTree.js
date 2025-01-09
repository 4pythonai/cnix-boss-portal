import React, { useState, useEffect, useRef } from 'react';
import { Input, Tree, message } from 'antd';
import { parse } from 'qs';
import api from '@/api/api'

const { TextArea } = Input;

const CabinetTree = ({ catid, product_name, bizCode }) => {
	// State management
	const [cabinetStr, setCabinetStr] = useState('');
	const [nodes, setNodes] = useState([]);
	const [treeData, setTreeData] = useState(null);
	const [rowObject, setRowObject] = useState({});

	const transformTreeData = (data) => {
		return data;
	};

	const initTree = async () => {
		try {
			const params = { data: {}, method: 'POST' };
			const response = await api.dresource.Network_tree(params);
			console.log("response", response);
			const transformedData = transformTreeData(response.tree);
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
			newCabinetStr = `${node.props.text}/${newCabinetStr}`;
			filteredNodes.push(node.props.id);
		}

		console.log("filteredNodes", filteredNodes);
		setCabinetStr(newCabinetStr);
		setNodes(filteredNodes);

		const RowObject = {}
		RowObject.operation = "删除"
		RowObject.bizcode = bizCode
		RowObject.catid = catid
		RowObject.product_name = product_name
		RowObject.restext = { nodes: filteredNodes, text: newCabinetStr, }
		console.log("🌸🌸🌸🌸🌸 RowObject", RowObject);
		setRowObject([RowObject]);

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


	return (
		<div>
			<TextArea
				value={cabinetStr}
				placeholder="选择的机柜"
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

export default CabinetTree;