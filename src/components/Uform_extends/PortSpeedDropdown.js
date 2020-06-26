import React from 'react';
import { Select } from 'antd'
export default class PortSpeedDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:''
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {          
            this.setState({
                value:this.props.value
            })
    }
    onChange(e) {
        this.setState({
            value:e
        })
        this.props.onChange(e)
    }
    render() {
        const selectedvalue=this.state.value!=''?this.state.value:this.props.value
        return (
            <div>
                <Select value={selectedvalue} style={{ width: '100%' }} onChange={this.onChange}>
                    <Select.Option value="100M">100M</Select.Option>
                    <Select.Option value="1G">1G</Select.Option>
                    <Select.Option value="10G">10G</Select.Option>
                </Select>


            </div>
        );
    }
}