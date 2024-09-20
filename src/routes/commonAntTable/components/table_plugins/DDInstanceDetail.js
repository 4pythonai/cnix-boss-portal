import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import ReactJson from 'react-json-view';
import DDFormCards from './DDFormCards';
import DDShutdown from './DDShutdown';

@observer
export default class DDInstanceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        detailJson: {},
        processInstanceId: null,
        formComponentValues: [],
        contractItem: {},
        operated: 'n'
    };

    init() {
        let _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec);

        let jsonObj = {};
        try {
            jsonObj = JSON.parse(_tmprec.detailJson);
            this.setState({ detailJson: jsonObj });
            this.setState({ processInstanceId: _tmprec.processInstanceId });
            this.setState({ formComponentValues: jsonObj.result.formComponentValues });
            let _contractItem = jsonObj.result.formComponentValues.find((item) => item.componentType === 'TextField' && item.name === '合同/补充协议编号');
            this.setState({ contractItem: _contractItem });
            this.setState({ operated: _tmprec.operated });
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
                        <DDShutdown operated={this.state.operated} processInstanceId={this.state.processInstanceId} contractField={this.state.contractItem} />
                    </div>
                )}
            </Modal>
        );
    }
}
