import React from "react";
import { observer } from "mobx-react";
import { Modal } from "antd";
import ReactJson from "react-json-view";
import DDFormCards from "./DDFormCards";
import DDOpen from "./DDOpen";

@observer
export default class DDOpenInstanceDetail extends React.Component {
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
        operated: "n",
        maincode: "",
        contractno: "",
    };

    init() {
        const _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec);

        let jsonObj = {};
        try {
            jsonObj = JSON.parse(_tmprec.detailJson);
            this.setState({ detailJson: jsonObj });
            this.setState({ processInstanceId: _tmprec.processInstanceId });
            this.setState({
                formComponentValues: jsonObj.result.formComponentValues,
            });
            const _contractItem = jsonObj.result.formComponentValues.find(
                (item) =>
                    item.componentType === "TextField" &&
                    item.name === "合同/补充协议编号",
            );
            this.setState({ contractItem: _contractItem });
            this.setState({ operated: _tmprec.operated });
            this.setState({ maincode: _tmprec.maincode });
            this.setState({ contractno: _tmprec.contractno });
        } catch (error) {
            jsonObj = { aa: "解析失败" };
            this.setState({ detailJson: jsonObj });
        }

        this.showModal();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Modal
                destroyOnClose
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={1320}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <div id="left1" style={{ width: '30%' }}>
                        <ReactJson
                            collapsed={true}
                            src={this.state.detailJson}
                            theme="monokai"
                        />
                        <DDFormCards formData={this.state.formComponentValues} />
                    </div>
                    <div id="right1" style={{ width: '70%' }}>

                        <DDOpen
                            operated={this.state.operated}
                            processInstanceId={this.state.processInstanceId}
                            contractField={this.state.contractItem}
                            maincode={this.state.maincode}
                            contractno={this.state.contractno}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}
