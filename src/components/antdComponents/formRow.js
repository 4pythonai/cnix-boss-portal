import React from 'react'
<<<<<<< HEAD
import {Input} from 'antd'
=======
import { Input } from 'antd'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

export default class FormRow extends React.Component {

    render() {
<<<<<<< HEAD
        return (<div className="form_group">
            <div className="form_text_info">{this.props.required?<span style={{color:'red'}}>*</span>:<span></span>}{this.props.title}：</div>
            <div className="form_value_node">    
                <Input
                    disabled={this.props.disabled?true:false}
                    defaultValue={this.props.defaultValue}
                    onChange={event => this.props.onChange(event.target.value, this.props.fieldKey)}
=======
        return (<div key={ this.props.fieldKey } className="form_group">
            <div className="form_text_info">{ this.props.required ? <span style={ { color: 'red' } }>*</span> : <span></span> }{ this.props.title }：</div>
            <div className="form_value_node">
                <Input
                    disabled={ this.props.disabled ? true : false }
                    defaultValue={ this.props.defaultValue }
                    onChange={ event => this.props.onChange(event.target.value, this.props.fieldKey) }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                />
            </div>
        </div>
        )
    }
}
