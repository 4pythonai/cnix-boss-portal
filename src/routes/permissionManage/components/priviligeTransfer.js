import React from 'react'
import { Transfer } from 'antd'
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
                render={render}
                operations={operations}
                listStyle={listStyle}
            />
        )
    }

}
