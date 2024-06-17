import React, { createRef } from 'react';
import { observer } from 'mobx-react';
import { Divider, message, Modal, DatePicker, Button } from 'antd';
import moment from 'moment';
import api from '@/api/api';
import PaperBillDownloader from './PaperBillDownloader';
import './paper_bill_style.scss';
import { Progress } from 'antd';

@observer
export default class CustPaperBillDownloader extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.commonTableStore.selectedRows);
        let singleID = null;
        if (props.commonTableStore.selectedRows.length == 1) {
            singleID = props.commonTableStore.selectedRows[0].id;
        }

        this.state = {
            visible: false,
            paper_ids: [],
            currentPaperIdIndex: 0,
            total: 0,
            start: null,
            end: null,
            currentPaperId: null,
            percent: 0,
            singleID: singleID
        };
        this.paperDownloaderRef = createRef();
    }

    filterPapers = async () => {
        const fmdata = { start: this.state.start, end: this.state.end };
        this.setState({ currentPaperIdIndex: 0, paper_ids: [], total: 0, currentPaperId: null, percent: 0 });
        console.log('fmdata: ', fmdata);
        let params = { data: fmdata, method: 'POST' };
        let json = await api.billingSale.getPaperBillIDs(params);
        console.log(json.paperids);

        this.setState({ percent: 0, currentPaperId: null, total: json.total, paper_ids: json.paperids, visible: true }, () => {
            this.downloadNext();
        });
    };

    downloadNext = () => {
        console.log(this.state.currentPaperIdIndex);
        console.log(this.state.paper_ids.length);
        let _percent = Math.round((this.state.currentPaperIdIndex / this.state.paper_ids.length) * 100);
        console.log('_percent: ', _percent);

        this.setState({ percent: _percent });
        if (this.state.currentPaperIdIndex < this.state.paper_ids.length) {
            const currentPaperId = this.state.paper_ids[this.state.currentPaperIdIndex].id;
            this.setState({ currentPaperId: currentPaperId });
            console.log(`Downloading paper ID: ${currentPaperId}`);
            if (this.paperDownloaderRef.current) {
                this.paperDownloaderRef.current.props.onClick();
            }
        } else {
            message.success('所有账单下载完成');
        }
    };

    handleDownloadComplete = () => {
        this.setState((prevState) => ({ currentPaperIdIndex: prevState.currentPaperIdIndex + 1 }), this.downloadNext);
    };

    async init() {
        this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: false,
            paper_ids: [],
            currentPaperIdIndex: 0,
            total: 0,
            start: null,
            end: null,
            currentPaperId: null,
            percent: 0
        });
    };

    getModalProps() {
        return {
            width: 1400,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '账单批量下载工具',
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

    ChangeBstart = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ start: dateString });
    };

    ChangeBend = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ end: dateString });
    };

    render() {
        const modalProps = this.getModalProps();
        const { total, currentPaperIdIndex, paper_ids } = this.state;

        return (
            <Modal {...modalProps}>
                <div>
                    <div id="query">
                        <span style={{ fontWeight: 'bold' }}> 联系人: {localStorage.getItem('staff_name')} </span>
                        <span style={{ fontWeight: 'bold', marginLeft: '40px' }}> 账单创建时间 </span>
                        <DatePicker style={{ marginLeft: '10px' }} placeholder="账单创建时间" onChange={this.ChangeBstart} />
                        <DatePicker style={{ marginLeft: '10px' }} placeholder="账单创建时间" onChange={this.ChangeBend} />
                        <Button style={{ marginLeft: '10px', marginRight: '4px' }} type="primary" onClick={this.filterPapers} size={'large'}>
                            查询
                        </Button>
                    </div>

                    <div id="pdf-wrapper">
                        {this.state.currentPaperId && (
                            <div>
                                {this.state.currentPaperIdIndex >= 1 && (
                                    <div>
                                        {this.state.currentPaperIdIndex}/ID={this.state.currentPaperId}
                                    </div>
                                )}

                                <Progress percent={this.state.percent} />

                                <Divider />
                                <PaperBillDownloader
                                    autodownload={true}
                                    ref={this.paperDownloaderRef}
                                    paper_id={this.state.currentPaperId}
                                    onDownloadComplete={this.handleDownloadComplete}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        );
    }
}
