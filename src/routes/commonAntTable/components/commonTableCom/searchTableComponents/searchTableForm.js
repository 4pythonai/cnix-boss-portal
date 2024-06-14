import React from 'react';
import MyForm from './MyForm';
import { createAsyncFormActions } from '@uform/antd';

export default class SearchTableForm extends React.Component {
    constructor(props) {
        super(props);

        let actions = createAsyncFormActions();

        this.state = {
            actions: actions
        };
    }

    componentWillMount() {
        this.props.saveActions(this, this.props.form_index);
    }

    getSearchTableFormData = async () => {
        let inner_fmdata = await this.state.actions.submit();
        return inner_fmdata.values;
    };

    render() {
        return <MyForm actions={this.state.actions} form_index={this.props.form_index} field_list={this.props.field_list} formCfg={this.props.formCfg} onOk={this.props.onOk} />;
    }
}
