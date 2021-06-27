import React from 'react';
import { Radio } from 'antd';

export default class YesOrNo extends React.Component {
    onChange = (e) => {
        // this.props.getComponentValue(e.target.value)
        return 11;
    };

    render() {
        return (
            <Radio.Group
                disabled={this.props.editable ? !this.props.editable : false}
                onChange={this.onChange}
                value={this.props.value == '是' ? 'y' : this.props.value == '否' ? 'n' : this.props.value}>
                <Radio value={'y'}>yes</Radio>
                <Radio value={'n'}>No</Radio>
            </Radio.Group>
        );
    }
}
