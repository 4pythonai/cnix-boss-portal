import { Divider, message, Modal } from 'antd';
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { createRef } from 'react';
import './paper_bill_style.scss';
import PaperBillDownloader from './PaperBillDownloader';
import moment from 'moment';
import api from '@/api/api';

@observer
export default class CustPaperBillDownloader extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = {
            visible: false,
            paper_ids: [],
            total: 0,
            start: null,
            end: null
        };
    }

    filterPapers = async () => {
        const fmdata = { start: this.state.start, end: this.state.end };
        console.log('fmdata: ', fmdata);
        let params = { data: fmdata, method: 'POST' };
        let json = await api.billingSale.getPaperBillIDs(params);
        console.log(json.paperids);

        this.buttonRefs = json.paperids.map(() => createRef());
        this.setState({ total: json.total, paper_ids: json.paperids, visible: true });
    };

    batchDownload = () => {
        console.log(this.buttonRefs);

        this.buttonRefs.forEach((ref) => {
            if (ref.current) {
                console.log(ref.current);
                ref.current.props.onClick();
            }
        });
    };

    async init() {
        this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1400,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '账单下载',
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

        const { total } = this.state;
        const buttonText = total === 0 ? '批量下载' : `批量下载 ${total}条`;

        return (
            <Modal {...modalProps}>
                <div>
                    <div id="query">
                        <span style={{ fontWeight: 'bold' }}> 联系人: {localStorage.getItem('staff_name')} </span>
                        <span style={{ fontWeight: 'bold', marginLeft: '40px' }}> 账单创建时间 </span>
                        <DatePicker style={{ marginLeft: '10px' }} placeholder="账单创建时间" onChange={this.ChangeBstart} />
                        <DatePicker style={{ marginLeft: '10px' }} placeholder="账单创建时间" onChange={this.ChangeBend} />

                        <Button style={{ marginLeft: '10px' }} type="primary" onClick={this.filterPapers} size={'large'}>
                            查询
                        </Button>

                        <Button style={{ marginLeft: '10px' }} type="primary" onClick={this.batchDownload} icon="download" size="large" disabled={total === 0}>
                            {buttonText}
                        </Button>
                    </div>
                    <div id="pdf-wrapper">
                        {this.state.paper_ids.map((item, index) => (
                            <div>
                                <Divider />
                                <PaperBillDownloader ref={this.buttonRefs[index]} key={index} paper_id={item.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        );
    }
}
