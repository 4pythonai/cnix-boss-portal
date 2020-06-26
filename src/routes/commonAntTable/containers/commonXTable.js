import React from 'react';
import CommonTable from '../components/commonTableCom/commonTable'

export default class CommonXTable extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return <CommonTable
                key={this.props.location.state.action_code}
                action_code={this.props.location.state.action_code}
                ref="commonTableRef" />
    }
}
