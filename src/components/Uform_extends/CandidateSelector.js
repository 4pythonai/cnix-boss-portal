
import React from 'react'
import { registerFormField, connect } from '@uform/react'
import { Tree, Icon, message } from 'antd'
const { TreeNode } = Tree;
import { inject, observer } from 'mobx-react'


@inject('FlowApprovalStore')
@observer
export default class CandidateSelector extends React.Component {
	constructor(props) {
		super()
		this.store = props.FlowApprovalStore
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

			this.store.onCheck(nextUser, [checkedKeys[checkedKeys.length - 1]]);
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
		this.store.onCheck(nextUser, checkedKeys);
	}

	getTreeProps(){
		let treeProps = {
			checkable: true,
				selectable: false,
				showLine: true,
				blockNode: true,
				checkedKeys: this.store.checkedKeys,
				multiple: false,
				onCheck:(checkedKeys, e) => this.onCheck(checkedKeys, e)
		}
		if(this.store.strategy === 'SelectPerson') {
			treeProps.onExpand = this.store.onExpandDept
		}
		return treeProps;
	}

	render() {
		return (
			<Tree {...this.getTreeProps()}>
				{this.renderTreeNodes(this.store.newTreeData)}
			</Tree>
		);
	}
}
