import React from 'react';
import { Input } from 'antd'
import api from '../../api/api'
import FlowApprovalStore from '@/store/FlowApprovalStore'


export default class LineEndPointer extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            value: ''
        }
        console.log(props)
    }
    async componentWillMount() {
        let params = {
            method: 'POST',
            data: {
                "uuid": FlowApprovalStore.uuid,
            }
        }
        let res = await api.lineorder.getLineEndPoint(params)
        if (res.code == 200) {
            this.setState({
                value: res.data
            }, () => { this.props.onChange(this.state.value) })
        }
    }
    render() {

        return (
            <Input readOnly placeholder="" value={ this.state.value } />
        );
    }
}