
import React from 'react'
import FlowHistory from './flowHistory'

export default class FlowProgress extends React.Component {
    render() {
        let uuid = this.props.location.state.uuid
        let pkey = this.props.location.state.processDefinitionKey


        return (
            <div className="progress">
                <FlowHistory uuid={uuid} process_key={pkey} />
                <img src={this.props.location.state.progressImgUrl} />

            </div>
        )
    }
}
