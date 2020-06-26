import React from 'react';
import { Select } from 'antd'
export default class PortTypeDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:''
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
       if(this.props.value){
           this.setState({
               value:this.props.value
           })
       }
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
                    <Select.Option value="电话">电话</Select.Option>
                    <Select.Option value="SDH">SDH</Select.Option>
                    <Select.Option value="以太网">以太网</Select.Option>
                    <Select.Option value="光纤">光纤</Select.Option>
                </Select>


            </div>
        );
    }
}