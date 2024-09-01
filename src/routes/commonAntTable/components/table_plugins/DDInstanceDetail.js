import React from 'react';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { message, Modal, Badge } from 'antd';
import ReactJson from 'react-json-view';
import DDFormCards from './DDFormCards';

@observer
export default class DDInstanceDetail extends React.Component {
    state = {
        visible: false,
        detailJson: {},
        formComponentValues: []
    };

    init() {
        if (this.props.commonTableStore.selectedRows.length !== 1) {
            message.error('请选择一条数据！');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec);

        let jsonObj = {};
        try {
            jsonObj = JSON.parse(_tmprec.detailJson);
            console.log('🌸🌸🌸🌸🌸🌸🌸🌸🌸', jsonObj); // 输出解析后的 JSON 对象
            this.setState({ detailJson: jsonObj });
            this.setState({ formComponentValues: jsonObj.result.formComponentValues });
        } catch (error) {
            jsonObj = { aa: '解析失败' };
            this.setState({ detailJson: jsonObj });
        }

        this.showModal();
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <Modal destroyOnClose visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} width={1320}>
                <div>DD钉钉流程详情:</div>
                {/* <ReactJson src={this.state.detailJson} theme="monokai" /> */}
                <DDFormCards formData={this.state.formComponentValues} />
            </Modal>
        );
    }
}
