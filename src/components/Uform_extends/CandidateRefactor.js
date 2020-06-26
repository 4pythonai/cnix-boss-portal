
import React from 'react'
import { Tree, Icon, message } from 'antd'
import { autorun } from "mobx";
const { TreeNode } = Tree;
import api from '@/api/api'

import { inject, observer } from 'mobx-react'
@observer
export default class CandidateRefactor extends React.Component {
    constructor(props) {
        super(props)
	}



	renderTreeNodes = data => data.map((item) => {
		if (item.children) {
			return (
				<TreeNode title={item.title} key={item.key} dataRef={item}>
					{this.renderTreeNodes(item.children)}
				</TreeNode>
			);
		}
		return <TreeNode {...item} dataRef={item} />;
	})

	onCheck(checkedKeys, e) {
		if (checkedKeys.length >= 2) {

			let nextUser = checkedKeys[checkedKeys.length - 1];

			this.props.candidateStore.onCheck(nextUser, [checkedKeys[checkedKeys.length - 1]]);
			this.props.onChange({
				candidate: nextUser
			});
			return;
		}

		if (!e.node.isLeaf()) {
			message.error('请选择部门下的人员！');
			return;
		}

		let nextUser = checkedKeys[0];
		this.props.onChange({
			candidate: nextUser
		});
		this.props.candidateStore.onCheck(nextUser, checkedKeys);
	}

	getTreeProps(){
		let treeProps = {
			checkable: true,
				selectable: false,
				showLine: true,
				blockNode: true,
				checkedKeys: this.props.candidateStore.checkedKeys,
				multiple: false,
				onCheck:(checkedKeys, e) => this.onCheck(checkedKeys, e)
		}
		if(this.props.candidateStore.strategy === 'SelectPerson') {
			treeProps.onExpand = this.props.candidateStore.onExpandDept
		}
		return treeProps;
	}

	render() {
		return (
			<Tree {...this.getTreeProps()}>
				{this.renderTreeNodes(this.props.candidateStore.newTreeData)}
			</Tree>
		);
    }
}
