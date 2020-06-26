import React from 'react'
import { Input, Collapse, Icon, Card } from 'antd';
import Editor from '@/components/Uform_extends/wangeditor'
const { Panel } = Collapse;

export default class ArticleInformation extends React.Component {


    getPanelHeader = (title, required) => {
        return <span style={ { color: required ? '#e4393c' : 'rgba(0, 0, 0, 0.85)' } }>{ required ? '*' : '' }{ title }</span>
    }



    render() {
        let { disabled, formData, setFieldsValue } = this.props
        console.log(this.props)

        let showoainfo = formData.oaflag == 'y' ? true : false
         return (

            <div >
                {
                    showoainfo ? (
                        <Card title="条款信息" bodyStyle={ { padding: 0 } } style={ { overflowX: 'scroll' } }>
                            <Collapse
                                bordered={ false }
                                style={ { paddingLeft: '20px' } }
                                expandIcon={ ({ isActive }) => <Icon type="caret-right" rotate={ isActive ? 90 : 0 } /> }
                            >
                                <Panel header={ this.getPanelHeader('OA原始信息', true) } key="1">
                                    <section className="contractFormGroup">
                                        <div className="contractFormValue">
                                            <label className="input">
                                                <i className="icon-prepend fa fa-question-circle" />
                                                <Editor
                                                    key='oainfo'
                                                    disabled={ true }
                                                    value={ formData.oainfo || '' }
                                                    onChange={ value => setFieldsValue('oainfo', value) }
                                                ></Editor>
                                            </label>
                                        </div>
                                    </section>
                                </Panel>
                            </Collapse>
                        </Card>) :
                        (
                            <div></div>
                        )
                }
            </div>

        )
    }
}



