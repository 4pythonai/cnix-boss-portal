import React from 'react';
import { Row, message, Col, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import PathForm from './pathForm';
import { SchemaForm, createAsyncFormActions, Field } from '@uform/antd';

import { randomString } from '@/utils/tools';
const actions = createAsyncFormActions();
@observer
export default class Pathwrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        actions: actions,
        pointForms: []
    };

    componentDidMount() {
        if (this.props.form_option === 'edit') {
            let pointForms = [];
            this.props.formData.points.map((item) => {
                pointForms.push({ value: item, disabled: true, params: 'showall', form_key: randomString(5) });
            });

            this.setState({ pointForms });
        }
    }

    saveFormData = async () => {
        if (this.state.pointForms.length == 0) {
            message.info('请添加点位');
            return;
        }

        let inner_fmdata = await this.state.actions.submit();
        let { xpathname } = inner_fmdata.values;

        let points = [];

        for (let i = 0; i < this.state.pointForms.length; i++) {
            let subForm = this.state.pointForms[i].formQuote;
            let subFormData = await subForm.getFormValue(subForm);
            points = [...points, subFormData];
        }

        let params = {
            data: {
                points,
                xpathname: xpathname,
                counter: points.length
            },
            method: 'POST'
        };

        if (this.props.form_option === 'edit') {
            params.data.id = this.props.commonTableStore.selectedRows[0].id;
        }

        let res = this.props.form_option === 'add' ? await api.device.addBossXpath(params) : await api.device.updateBossXpath(params);
        if (res.code == 200) {
            this.props.refreshTable();
            this.props.hideModal();
        }
    };

    registerForm = (formQuote, form_order) => {
        let { pointForms } = this.state;
        pointForms[form_order].formQuote = formQuote;
        this.setState({ pointForms });
    };

    addPoint = () => {
        let { pointForms } = this.state;
        pointForms.push({ value: {}, disabled: false, params: 'showavailable', form_key: randomString(5) });
        this.setState({ pointForms });
    };

    deletePoint = (index) => {
        let newPointForms = [];
        this.state.pointForms.map((item, item_index) => {
            if (item_index != index) {
                item.form_key = randomString(5);
                newPointForms.push(item);
            }
        });

        this.setState({ pointForms: newPointForms });
        console.log(this.state.pointForms);
    };

    setXpathname = (event) => {
        this.setState({
            xpathname: event.target.value
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={22} style={{ paddingTop: '10px' }}>
                        <SchemaForm
                            value={this.props.form_option === 'edit' ? { xpathname: this.props.formData.xpathname } : {}}
                            labelCol={7}
                            actions={this.state.actions}
                            wrapperCol={15}>
                            <Field
                                required
                                title="跳纤名称"
                                type="string"
                                name="xpathname"
                                x-props={{
                                    style: {
                                        width: '100%'
                                    },
                                    disabled: this.props.form_option === 'edit' ? true : false
                                }}
                            />
                        </SchemaForm>
                    </Col>
                    <Col span={2} style={addCol} onClick={(event) => this.addPoint()}>
                        <Icon type="folder-add" style={addIcon} />
                        <br />
                        <span style={{ fontSize: '10px' }}>添加点位</span>
                        {/* plus */}
                    </Col>
                </Row>

                {this.state.pointForms.map((item, index) => {
                    return (
                        <div key={item.form_key}>
                            <Row style={index == 0 ? firstRowPoint : otherRowPoint}>
                                <Col span={22}>点位</Col>
                                <Col span={2}>
                                    <Icon style={deleteIcon} type="delete" onClick={() => this.deletePoint(index)} />
                                </Col>
                            </Row>
                            <Row style={contentRow}>
                                <Col span={22}>
                                    <PathForm
                                        form_option={this.props.form_option}
                                        form_value={item.value}
                                        form_disabled={item.disabled}
                                        form_params={item.params}
                                        registerForm={this.registerForm}
                                        form_order={index}
                                        commonTableStore={this.props.commonTableStore}></PathForm>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const deleteIcon = {
    flex: '0 0 30px',
    marginLeft: '10px',
    fontSize: '24px',
    marginTop: '10px',
    color: '#ff4d4f'
};
const firstRowPoint = {
    border: '1px solid #e8e8e8',
    borderBottom: '0',
    paddingLeft: '15px',
    lineHeight: '40px'
};
const otherRowPoint = {
    border: '1px solid #e8e8e8',
    borderBottom: '0',
    paddingLeft: '15px',
    lineHeight: '40px',
    marginTop: '20px'
};
const contentRow = {
    border: '1px solid #e8e8e8',
    paddingTop: '20px'
};
const addCol = {
    textAlign: 'center',
    height: '32px',
    cursor: 'pointer'
};
const addIcon = {
    marginLeft: '10px',
    color: '#304156',
    fontSize: '24px'
};
