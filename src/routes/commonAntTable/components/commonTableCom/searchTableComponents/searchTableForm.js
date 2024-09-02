import React from 'react';
import { Modal, Row, Button, Select, Input } from 'antd';
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators';
import { toJS } from 'mobx';
import { SchemaForm, createAsyncFormActions, Field, FormItemGrid, createFormActions } from '@uform/antd';
const { Option } = Select;

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

    handleFormInit = ($, setFieldState) => {
        $('onFormInit').subscribe(() => {
            setFieldState('field_' + this.props.form_index, (state) => {
                state.enum = this.props.fieldList;
            });
        });
    };

    handleSaveValue = ($, setFieldState, contentfield) => {
        $('savevalue', contentfield).subscribe(() => {
            this.props.onOk();
        });

        $('onFieldChange', contentfield).subscribe((fieldState) => {
            if (fieldState.value) {
                setFieldState(contentfield, (state) => {
                    console.log('🌼🌼🌼🌼🌼🌼');
                    console.log('🌼🌼🌼🌼🌼🌼 state', state);
                    console.log('🌼🌼🌼🌼🌼🌼 state.value', state.value);
                    console.log('🌼🌼🌼🌼🌼🌼 state.value', typeof state.value);
                    if (typeof state.value == 'number') {
                        state.value = state.value;
                    } else {
                        state.value = state.value ? state.value.replace(/(^\s*)|(\s*$)/g, '') : '';
                    }
                });
            }
        });
    };

    handleFieldChange = ($, setFieldState, field) => {
        $('onFieldChange', field)
            .pipe(
                withLatestFrom($('onChangeOption')),
                map(([fieldState, { payload: option }]) => {
                    return {
                        state: fieldState,
                        option
                    };
                })
            )
            .subscribe(async ({ state, option }) => {
                let formCfg = toJS(this.props.formCfg);

                let operator = 'operator_' + this.props.form_index;

                let keys = Object.keys(formCfg);
                let fieldType = '';
                for (let i = 0; i < keys.length; i++) {
                    let field_group_key = keys[i];
                    if (formCfg[field_group_key].properties[state.value]) {
                        fieldType = formCfg[field_group_key].properties[state.value].type;
                        break;
                    }
                }

                switch (fieldType) {
                    case 'string':
                        this.setEnum(operator, this.props.operation_list.string);
                        this.setType('vset_' + this.props.form_index, 'string');
                        break;
                    case 'number':
                        this.setEnum(operator, this.props.operation_list.number);
                        this.setType('vset_' + this.props.form_index, 'number');
                        break;
                    case 'date':
                        this.setEnum(operator, this.props.operation_list.date);
                        this.setType('vset_' + this.props.form_index, 'date');
                        break;
                    default:
                        this.setEnum(operator, this.props.operation_list.other);
                        this.setType('vset_' + this.props.form_index, 'string');
                }
            });
    };

    setEnum = (name, operator_list) => {
        this.state.actions.setFieldState(name, (state) => {
            state.props.enum = operator_list;
            for (var k = 0; k < operator_list.length; k++) {
                if (operator_list[k].value === 'like') {
                    state.value = 'like';
                }
            }
        });
    };

    setType = (name, type) => {
        this.state.actions.setFieldState(name, (state) => {
            state.props.type = type;
            if (type !== 'date') {
                state.value = '';
            }
        });
    };

    render() {
        return (
            <SchemaForm
                actions={this.state.actions}
                effects={($, { setFieldState }) => {
                    this.handleFormInit($, setFieldState);
                    this.handleSaveValue($, setFieldState, 'vset_' + this.props.form_index);
                    this.handleFieldChange($, setFieldState, 'field_' + this.props.form_index);
                }}
                labelCol={8}
                wrapperCol={16}>
                <FormItemGrid gutter={3} cols={[8, 8, 8]}>
                    <Field
                        type="string"
                        title="搜索字段"
                        name={'field_' + this.props.form_index}
                        default=""
                        required
                        enum={this.props.field_list}
                        x-effect={(dispatch) => ({
                            onChange(value, type, option) {
                                dispatch('onChangeOption', option);
                            }
                        })}
                    />
                    <Field type="string" title="搜索条件" required name={'operator_' + this.props.form_index} />
                    <Field
                        type="string"
                        title="搜索内容"
                        name={'vset_' + this.props.form_index}
                        default={null}
                        x-effect={(dispatch) => ({
                            onPressEnter(value, type, option) {
                                dispatch('savevalue', option);
                            }
                        })}
                    />
                </FormItemGrid>
            </SchemaForm>
        );
    }
}
