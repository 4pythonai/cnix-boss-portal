import { Divider, message, Modal, Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import './paper_bill_style.scss';
import MainPrinterCom from './CustPaperBillPrinterCompoments/MainPrinterCom';

@observer
export default class CustPaperBillPrinterDebug extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        paper_id: 0,
        paper_ids: [11924, 11923, 11922]
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length === 0) {
            message.error('请选择一个账单');
            return;
        }

        const current_rec = toJS(this.props.commonTableStore.selectedRows[0]);
        this.setState({
            paper_id: current_rec.id
        });

        this.setState({
            visible: true
        });
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    };

    loopids = () => {
        // this.state.paper_ids.forEach(async (element) => {
        //     this.setState({
        //         paper_id: element
        //     });

        //     return <MainPrinterCom paper_id={this.state.paper_id} />;
        // });

        (async () => {
            const data = [11924, 11923, 11922];
            data.forEach(async (e) => {
                const i = await function () {
                    this.setState({
                        paper_id: e
                    });
                };
                console.log(i);
            });
            console.log('this will print first');
        })();
    };

    getModalProps() {
        return {
            width: 1400,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '账单打印',
            bodyStyle: {
                width: 1400,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        };
    }

    render() {
        const modalProps = this.getModalProps();

        return (
            <Modal {...modalProps}>
                <div>
                    <Divider />

                    {/* <div> {this.state.paper_id}</div> */}
                    <MainPrinterCom paper_id={this.state.paper_id} />
                    {/* <Button onClick={() => this.loopids()}> Loop </Button> */}
                </div>
            </Modal>
        );
    }
}
