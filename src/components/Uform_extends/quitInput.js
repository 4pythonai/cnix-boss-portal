import React from 'react';
import { Input } from 'antd'


export default class QuitInput extends React.Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            step: nextProps.step
        })
    }
    onClick = (value) => {
        this.props.parent.showContractModal()
    }
    render() {
        console.log(this.props.editable)
        if(this.props.editable === false) {
            return this.props.value
        }
        
        return (
            <Input readOnly  value={this.props.value} {...this.props} onClick={this.onClick}/>
        );
    }
}