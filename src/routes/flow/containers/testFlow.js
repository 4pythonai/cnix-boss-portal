import React from 'react'
import SelfForm from  '../components/selfForm'

const selfForm_ref = React.createRef()

export default class testFlow  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAntForm: false,
        }
    }

    render() {

        return (

            <div id="scrollXContent">
                    <SelfForm ref={selfForm_ref} action_code={this.props.action_code}/>
            </div>

        );
    }
};
