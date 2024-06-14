// MyForm.js
import React from 'react';
import { SchemaForm, Field, FormItemGrid } from '@uform/antd';
import { withLatestFrom, map } from 'rxjs/operators';
import { toJS } from 'mobx';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: props.actions
        };

        this.operation_list = {
            string: [
                {
                    label: '包含',
                    value: 'like'
                },
                {
                    label: '等于',
                    value: '='
                },
                {
                    label: '不等于',
                    value: '!='
                }
            ],
            date: [
                {
                    label: '大于等于',
                    value: '>='
                },
                {
                    label: '等于',
                    value: '='
                },
                {
                    label: '小于等于',
                    value: '<='
                },
                {
                    label: '为空',
                    value: 'IS_NULL'
                },
                {
                    label: '不为空',
                    value: 'IS_NOT_NULL'
                }
            ],
            number: [
                {
                    label: '大于等于',
                    value: '>='
                },
                {
                    label: '等于',
                    value: '='
                },
                {
                    label: '小于等于',
                    value: '<='
                }
            ],
            other: [
                {
                    label: '包含',
                    value: 'like'
                },
                {
                    label: '等于',
                    value: '='
                },
                {
                    label: '小于等于',
                    value: '!='
                }
            ]
        };
    }

    setEnum = (name, operator_list) => {
        this.state.actions.setFieldState(name, (state) => {
            console.log(state, name, operator_list);
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

    handleFormInit = () => {
        this.state.actions.setFieldState(`field_${this.props.form_index}`, (state) => {
            state.enum = this.props.fieldList;
        });
    };

    handleOnFieldChange = (fieldState) => {
        let contentfield = `vset_${this.props.form_index}`;
        if (fieldState.value) {
            this.state.actions.setFieldState(contentfield, (state) => {
                console.log('💚💚💚💚💚💚💚');
                console.log('state: ', state);
                if (typeof state.value === 'string') {
                    state.value = state.value.replace(/(^\s*)|(\s*$)/g, '');
                }
            });
        }
    };

    handleFieldChange = async ({ selectedField, option }) => {
        console.log(' 👻👻👻👻👻👻👻👻👻👻 selectedField ', selectedField);

        let formCfg = toJS(this.props.formCfg);
        let operator = `operator_${this.props.form_index}`;
        let keys = Object.keys(formCfg);
        let _type = '';

        for (let i = 0; i < keys.length; i++) {
            let field_group_key = keys[i];
            console.log('field_group_key: ', field_group_key);
            console.log(' 💚💚💚 💚💚💚 💚💚💚 💚💚💚', formCfg[field_group_key].properties);

            // 获取字段类型
            _type = formCfg[field_group_key].properties[selectedField.value].type;
            break;
        }

        console.log(' 💚💚💚 字段类型', _type);

        switch (_type) {
            case 'string':
                this.setEnum(operator, this.operation_list.string);
                this.setType(`vset_${this.props.form_index}`, 'string');
                break;
            case 'number':
                this.setEnum(operator, this.operation_list.number);
                this.setType(`vset_${this.props.form_index}`, 'number');
                break;
            case 'date':
                this.setEnum(operator, this.operation_list.date);
                this.setType(`vset_${this.props.form_index}`, 'date');
                break;
            default:
                this.setEnum(operator, this.operation_list.other);
                this.setType(`vset_${this.props.form_index}`, 'string');
        }
    };

    render() {
        return (
            <SchemaForm
                actions={this.state.actions}
                effects={($, { setFieldState }) => {
                    $('onFormInit').subscribe(this.handleFormInit);

                    const contentfield = `vset_${this.props.form_index}`;

                    $('savevalue', contentfield).subscribe(() => {
                        this.props.onOk();
                    });

                    $('onFieldChange', contentfield).subscribe(this.handleOnFieldChange);
                    const field = `field_${this.props.form_index}`;
                    $('onFieldChange', field)
                        .pipe(
                            withLatestFrom($('onChangeOption')),
                            map(([selectedField, { payload: option }]) => ({
                                selectedField,
                                option
                            }))
                        )
                        .subscribe(this.handleFieldChange);
                }}
                labelCol={8}
                wrapperCol={16}>
                <FormItemGrid gutter={3} cols={[8, 8, 8]}>
                    <Field
                        type="string"
                        title="搜索字段"
                        name={`field_${this.props.form_index}`}
                        default=""
                        required
                        enum={this.props.field_list}
                        x-effect={(dispatch) => ({
                            onChange(value, type, option) {
                                dispatch('onChangeOption', option);
                            }
                        })}
                    />
                    <Field type="string" title="搜索条件" required name={`operator_${this.props.form_index}`} />
                    <Field
                        type="string"
                        title="搜索内容"
                        name={`vset_${this.props.form_index}`}
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

export default MyForm;
