import React from 'react'
import { Tree, Icon } from 'antd'
const { TreeNode } = Tree;
import { inject, observer } from 'mobx-react'


@inject('FlowApprovalStore')
@observer
export default class UserTree extends React.Component {
	constructor(props) {
		super()
		this.store = props.FlowApprovalStore
	}



	renderTreeNodes = data => data.map((item) => {
		if (item.children) {
			return (
				<TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type="meh-o" />}>
					{this.renderTreeNodes(item.children)}
				</TreeNode>
			);
		}
		return <TreeNode {...item} dataRef={item} />;
	})

	render() {
		return (
			<Tree
				checkable
				selectable = {false}
				onExpand={this.store.onExpandDept}
				showLine
				blockNode
				checkedKeys = {this.store.checkedKeys}
				multiple = {false}
				onCheck={this.store.onCheck}
			>
				{this.renderTreeNodes(this.store.newTreeData)}
			</Tree>
		);
	}
}
