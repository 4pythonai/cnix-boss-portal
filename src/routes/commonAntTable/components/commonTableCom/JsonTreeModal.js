import React from 'react';
import { Modal, Button } from 'antd';
import { JSONTree } from 'react-json-tree';

export default class JsonTreeModal extends React.Component {
    constructor(props) {
        console.log('🚀 ~ file: JsonTreeModal.js ~ line 7 ~ JsonTreeModal ~ constructor ~ props', props);
        super(props);
    }
    state = {
        visible: this.props.visible
    };

    showModal = (e) => {
        console.log(this.props);
        this.setState({
            visible: true
        });
    };

    hideModal = (e) => {
        this.setState({
            visible: false
        });
    };

    render() {
        const theme = {
            scheme: 'monokai',
            author: 'wimer hazenberg (http://www.monokai.nl)',
            base00: '#272822',
            base01: '#383830',
            base02: '#49483e',
            base03: '#75715e',
            base04: '#a59f85',
            base05: '#f8f8f2',
            base06: '#f5f4f1',
            base07: '#f9f8f5',
            base08: '#f92672',
            base09: '#fd971f',
            base0A: '#f4bf75',
            base0B: '#a6e22e',
            base0C: '#a1efe4',
            base0D: '#66d9ef',
            base0E: '#ae81ff',
            base0F: '#cc6633'
        };

        let bigjson = '{}';
        let title = '';
        if (this.props.schema == 'resource_logs') {
            bigjson = this.props.record.resource_logs;
            title = '资源详情';
        }
        if (this.props.schema == 'billsjson') {
            bigjson = this.props.record.billsjson;
            title = '包含的合同账单详情';
        }

        let rlog = JSON.parse(bigjson.replace(/\\/, ''));

        return (
            <div>
                <Button onClick={this.showModal}>详情...</Button>
                <Modal visible={this.state.visible} title={title} onOk={this.hideModal} onCancel={this.hideModal} width={1320}>
                    <div>
                        <JSONTree theme={theme} data={rlog} />
                    </div>
                </Modal>
            </div>
        );
    }
}
