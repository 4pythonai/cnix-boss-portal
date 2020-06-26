import React from 'react'
<<<<<<< HEAD
import { Transfer, Button, Tree  } from 'antd'

const { TreeNode } = Tree;
=======
import { Transfer } from 'antd'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
export default class PriviligeTransfer extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        let { dataSource, titles, targetKeys, selectedKeys, onChange, onSelectChange, onScroll, render, operations, listStyle, ...rest } = this.props;
        console.log(this.props);
        return (
            <Transfer
                dataSource={dataSource}
                titles={titles}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
<<<<<<< HEAD
                operations={operations}
                listStyle={listStyle}
                render={item => item.text}
            >
                {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === 'left') {
                    const leftCheckedKeys = [...selectedKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            checkedKeys={leftCheckedKeys}
                            onCheck={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(leftCheckedKeys, eventKey));
                            }}
                            onSelect={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(leftCheckedKeys, eventKey));
                            }}
                        >
                            {leftGenerateTree(dataSource, targetKeys)}
                        </Tree>
                    );
                }
                if (direction === 'right') {
                    const rightCheckedKeys = [...selectedKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            checkedKeys={rightCheckedKeys}
                            onCheck={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !leftIsChecked(rightCheckedKeys, eventKey));
                            }}
                            onSelect={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !leftIsChecked(rightCheckedKeys, eventKey));
                            }}
                        >
                            {rightGenerateTree(dataSource, targetKeys)}
                        </Tree>
                    );
                }
            }}
            </Transfer>


=======
                render={render}
                operations={operations}
                listStyle={listStyle}
            />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        )
    }

}
<<<<<<< HEAD

const leftGenerateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode  {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
            {leftGenerateTree(children, checkedKeys)}
        </TreeNode>
    ));
};
const rightGenerateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode disabled={checkedKeys.includes(props.key) ? false : true} {...props} key={props.key}>
            {rightGenerateTree(children, checkedKeys)}
        </TreeNode>
    ));
};


const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
  };
const leftIsChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
  };
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
