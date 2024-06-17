import React, { createRef } from 'react';
import { observer } from 'mobx-react';
import { Divider, message, Modal, DatePicker, Button } from 'antd';
import moment from 'moment';
import api from '@/api/api';
import PaperBillDownloader from './PaperBillDownloader';
import './paper_bill_style.scss';
import { Progress } from 'antd';

@observer
export default class CustPaperBillDownloaderSingle extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.commonTableStore.selectedRows);

        this.state = {
            visible: false,
            singleID: null
        };
        this.paperDownloaderRef = createRef();
        this.init = this.init.bind(this);
    }

    async init() {
        let { selectedRows } = this.props.commonTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一条记录');
            return;
        }

        let singleID = null;
        if (this.props.commonTableStore.selectedRows.length == 1) {
            singleID = this.props.commonTableStore.selectedRows[0].id;
        }
        this.setState({
            visible: true,
            singleID: singleID
        });
    }

    onCancel = () => {
        this.setState({
            visible: false,
            singleID: null
        });
    };

    getModalProps() {
        return {
            width: 1400,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '单账单下载',
            bodyStyle: {
                width: 1400,
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
                <div id="pdf-wrapper">
                    <PaperBillDownloader
                        autodownload={false}
                        ref={this.paperDownloaderRef}
                        paper_id={this.state.singleID}
                        onDownloadComplete={() => {
                            console.log('do-nothing');
                        }}
                    />
                </div>
            </Modal>
        );
    }
}
