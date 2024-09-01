import React from 'react';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { message, Modal, Badge } from 'antd';
import ReactJson from 'react-json-view';
import DDFormCards from './DDFormCards';
import DDShutdown from './DDShutdown';

@observer
export default class DDInstanceDetail extends React.Component {
    state = {
        visible: false,
        detailJson: {},
        formComponentValues: [],
        contractItem: {}
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
            let _contractItem = jsonObj.result.formComponentValues.find((item) => item.componentType === 'TextField' && item.name === '合同/补充协议编号');
            console.log('🌸🌸🌸🌸🌸🌸🌸🌸🌸', _contractItem); // 输出合同/补充协议编号
            this.setState({ contractItem: _contractItem });
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
                <ReactJson collapsed={true} src={this.state.detailJson} theme="monokai" />
                <DDFormCards formData={this.state.formComponentValues} />
                {this.state.contractItem && (
                    <div>
                        <DDShutdown contractField={this.state.contractItem} />
                    </div>
                )}
            </Modal>
        );
    }
}
